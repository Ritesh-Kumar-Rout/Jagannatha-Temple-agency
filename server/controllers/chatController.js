const { GoogleGenerativeAI } = require('@google/generative-ai');
const FestivalInfo = require('../models/FestivalInfo');
const ChatLog = require('../models/ChatLog');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const topicFallbacks = {
  history: "Ratha Yatra is the grand chariot festival of Lord Jagannath, Balabhadra, and Subhadra in Puri. The deities travel from the Jagannath Temple to Gundicha Temple, symbolizing the Lord coming out to bless everyone.",
  schedule: "The main sequence is Snana Purnima, Anasara, Netrotsava, Gundicha Yatra, Hera Panchami, Bahuda Yatra, Suna Besha, Adhara Pana, and Niladri Bije.",
  chariots: "The three chariots are Nandighosha for Lord Jagannath, Taladhwaja for Balabhadra, and Darpadalana for Subhadra. They are rebuilt every year and pulled by devotees on Bada Danda.",
  temple: "Lord Jagannath is worshipped with Balabhadra and Subhadra at the Jagannath Temple in Puri, one of the Char Dham pilgrimage sites.",
  travel: "You can reach Puri by train, road, or via Bhubaneswar airport. Puri railway station is close to the temple area, and buses/taxis connect Puri with Bhubaneswar and nearby places.",
  rituals: "Important rituals include daily sevas, Snana Purnima, Pahandi Bije, Chhera Pahanra, Gundicha Yatra, Bahuda Yatra, Suna Besha, Adhara Pana, and Niladri Bije.",
  facts: "A famous belief is that Mahaprasad is cooked in stacked earthen pots, and the top pot is said to cook first. The temple kitchen is also known as one of the world's largest."
};

const getFallbackCategory = (cleanMessage) => {
  if (cleanMessage.includes('history') || cleanMessage.includes('about ratha')) return 'history';
  if (cleanMessage.includes('schedule') || cleanMessage.includes('date') || cleanMessage.includes('calendar')) return 'schedule';
  if (cleanMessage.includes('chariot') || cleanMessage.includes('rath') || cleanMessage.includes('nandighosha')) return 'chariots';
  if (cleanMessage.includes('ritual') || cleanMessage.includes('snana') || cleanMessage.includes('pahandi') || cleanMessage.includes('suna besha')) return 'rituals';
  if (cleanMessage.includes('reach') || cleanMessage.includes('travel') || cleanMessage.includes('train') || cleanMessage.includes('bus') || cleanMessage.includes('flight')) return 'travel';
  if (cleanMessage.includes('jagannath') || cleanMessage.includes('temple') || cleanMessage.includes('lord')) return 'temple';
  if (cleanMessage.includes('fact') || cleanMessage.includes('interesting')) return 'facts';
  return null;
};

const sendAndLog = async (res, userMessage, reply) => {
  try {
    await ChatLog.create({ userMessage, botResponse: reply });
  } catch (dbError) {
    console.warn('Could not save chat log, DB might be down.');
  }

  return res.json({ reply });
};

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ reply: 'Please provide a message.' });
    }

    const cleanMessage = message.toLowerCase().trim();

    const greetings = ['hi', 'hii', 'hello', 'hey', 'namaste', 'jai jagannath'];
    if (greetings.some(g => cleanMessage === g || cleanMessage.startsWith(g + ' '))) {
      return sendAndLog(res, message, "Jai Jagannath! I am the Ratha Yatra Assistant. I can tell you about festival history, rituals, chariots, and travel information for Puri.");
    }

    const messageWords = cleanMessage
      .replace(/[^\w\s]/gi, '')
      .split(/\s+/)
      .filter(w => w.length > 3 || ['ratha', 'puri', 'god'].includes(w));

    let info = null;
    if (messageWords.length > 0) {
      const fallbackCategory = getFallbackCategory(cleanMessage);

      if (fallbackCategory) {
        info = await FestivalInfo.findOne({ category: fallbackCategory });
      } else if (cleanMessage === 'puri' || cleanMessage.includes('about puri')) {
        info = await FestivalInfo.findOne({ category: 'history' });
      } else {
        info = await FestivalInfo.findOne({
          $or: [
            { title: { $regex: messageWords.join('|'), $options: 'i' } },
            { category: { $regex: messageWords.join('|'), $options: 'i' } }
          ]
        });
      }
    }

    if (info) {
      return sendAndLog(res, message, info.description);
    }

    const fallbackCategory = getFallbackCategory(cleanMessage);
    if (fallbackCategory) {
      return sendAndLog(res, message, topicFallbacks[fallbackCategory]);
    }

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are a helpful assistant for the Ratha Yatra Festival.
Answer this user question about the festival: "${message}".
If it is not about Ratha Yatra or Lord Jagannath, politely guide them back to the festival topic.
Responses must be short, concise, and straight to the point.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reply = response.text();

        return sendAndLog(res, message, reply);
      } catch (geminiError) {
        console.error('Gemini API Error:', geminiError);
      }
    }

    const fallbackReply = "I can help with Ratha Yatra, Lord Jagannath, rituals, chariots, festival schedule, and travel to Puri. Try asking: What are the three chariots?";

    return sendAndLog(res, message, fallbackReply);
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ reply: 'Sorry, I encountered a technical issue. Please try again later.' });
  }
};
