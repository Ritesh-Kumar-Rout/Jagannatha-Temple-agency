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

    // 1. Search Knowledge Base
    // Very simple keyword matching for this implementation
    const keywords = message.toLowerCase().split(' ');
    const info = await FestivalInfo.find({
      $or: [
        { title: { $regex: keywords.join('|'), $options: 'i' } },
        { description: { $regex: keywords.join('|'), $options: 'i' } }
      ]
    }).limit(1);

    let reply = '';

    if (info && info.length > 0) {
      reply = info[0].description;
    } else {
      // 2. Fallback to Gemini AI
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `You are a helpful assistant for the Ratha Yatra Festival. 
      Answer this user question about the festival: "${message}". 
      If it is not about Ratha Yatra or Lord Jagannath, politely guide them back to the festival topic. 
      Keep the response concise and respectful.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      reply = response.text();
    }

    // 3. Log the interaction
    await ChatLog.create({
      userMessage: message,
      botResponse: reply
    });

    res.json({ reply });
  } catch (error) {
    console.error('Chat Error:', error);
    res.status(500).json({ reply: 'Sorry, I encountered an error. Please try again later.' });
  }
};
