const { GoogleGenerativeAI } = require('@google/generative-ai');
const FestivalInfo = require('../models/FestivalInfo');
const ChatLog = require('../models/ChatLog');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ reply: 'Please provide a message.' });
    }

    const cleanMessage = message.toLowerCase().trim();
    
    // 1. Basic Greeting & Cultural Layer
    const greetings = ['hi', 'hii', 'hello', 'hey', 'namaste', 'jai jagannath'];
    if (greetings.some(g => cleanMessage === g || cleanMessage.startsWith(g + ' '))) {
      return res.json({ 
        reply: "🙏 Jai Jagannath! I am the Ratha Yatra Assistant. I can tell you about the festival history, rituals, chariots, and travel information for Puri. How can I help you today?" 
      });
    }

    // 2. Refined Keyword Matching
    // We filter out common small words but keep important identifiers
    const messageWords = cleanMessage.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 3 || ['ratha', 'puri', 'god'].includes(w));
    
    let info = null;
    if (messageWords.length > 0) {
      // Check for specific intent-based matches first
      const isTravelIntent = cleanMessage.includes('reach') || cleanMessage.includes('travel') || cleanMessage.includes('train') || cleanMessage.includes('bus');
      
      if (isTravelIntent) {
        info = await FestivalInfo.findOne({ category: 'travel' });
      } else if (cleanMessage.includes('chariot')) {
        info = await FestivalInfo.findOne({ category: 'chariots' });
      } else if (cleanMessage.includes('ritual') || cleanMessage.includes('snana')) {
        info = await FestivalInfo.findOne({ category: 'rituals' });
      } else if (cleanMessage === 'puri' || cleanMessage.includes('about puri')) {
        // Specifically prioritize general history for "about puri" rather than travel
        info = await FestivalInfo.findOne({ category: 'history' });
      } else {
        // Broad keyword match
        info = await FestivalInfo.findOne({
          $or: [
            { title: { $regex: messageWords.join('|'), $options: 'i' } },
            { category: { $regex: messageWords.join('|'), $options: 'i' } }
          ]
        });
      }
    }

    if (info) {
      return res.json({ reply: info.description });
    }

    // 3. Fallback to Gemini AI if Key is present
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `You are a helpful assistant for the Ratha Yatra Festival. 
        Answer this user question about the festival: "${message}". 
        If it is not about Ratha Yatra or Lord Jagannath, politely guide them back to the festival topic. 
        CRITICAL RULES: Responses MUST be very short, concise, and straight to the point. Do NOT write long paragraphs. Use clear, small readable chunks.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const reply = response.text();

        // Log the interaction
        await ChatLog.create({ userMessage: message, botResponse: reply });
        return res.json({ reply });
      } catch (geminiError) {
        console.error('Gemini API Error:', geminiError);
      }
    }

    // 4. Helpful Local Fallback
    const fallbackReply = "🙏 I'm here to help with Ratha Yatra specifics! You can ask about the Three Chariots, the holy Snana Yatra rituals, or the history of Lord Jagannath. What would you like to know more about?";
    
    await ChatLog.create({ userMessage: message, botResponse: fallbackReply });
    res.json({ reply: fallbackReply });

  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ reply: 'Sorry, I encountered a divine technical glitch. Please try again later.' });
  }
};
