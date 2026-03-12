import React, { useState, useEffect, useRef } from 'react';
import { Send, X, MessageSquare } from 'lucide-react';
import ChatMessage from './ChatMessage';
import QuickQuestions from './QuickQuestions';
import TypingIndicator from './TypingIndicator';

interface Message {
  userMessage: string;
  botResponse: string;
  isUser: boolean;
}

const ChatWindow: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      userMessage: "",
      botResponse: "🙏 Jai Jagannath! Welcome to the Ratha Yatra Festival Assistant. Ask me anything about the festival, rituals, chariots, or travel information.",
      isUser: false
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = { userMessage: text, botResponse: "", isUser: true };
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { userMessage: "", botResponse: data.reply, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        userMessage: "", 
        botResponse: "Sorry, I'm having trouble connecting to the temple servers. Please try again later.", 
        isUser: false 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full max-w-[400px] bg-[#0B1D23] border border-festival-gold/20 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between bg-festival-red p-4 border-b border-festival-gold/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border-2 border-festival-gold shadow-lg">
             <img src="/jagannath-wheel.png" alt="Jagannath" className="w-8 h-8 object-contain" onError={(e) => {
               e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/8118/8118357.png';
             }} />
          </div>
          <div>
            <h3 className="text-white font-bold leading-none">Ratha Yatra Assistant</h3>
            <span className="text-festival-gold text-[10px] uppercase tracking-widest flex items-center mt-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
              Online to Guide You
            </span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 hover:bg-black/20 rounded-full transition-colors">
          <X className="text-white w-6 h-6" />
        </button>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-festival-gold/20 scrollbar-track-transparent"
      >
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} isUser={msg.isUser} />
        ))}
        {isLoading && <TypingIndicator />}
      </div>

      {/* Quick Questions */}
      <QuickQuestions onQuestionClick={handleSendMessage} />

      {/* Input Area */}
      <div className="p-4 bg-[#0F252D] border-t border-festival-gold/10">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about Ratha Yatra..."
            className="w-full bg-[#1A2E35] border border-[#2A3E45] focus:border-festival-gold/50 text-white text-sm rounded-xl py-3 pl-4 pr-12 outline-none transition-all placeholder:text-gray-500"
          />
          <button 
            type="submit"
            className="absolute right-2 p-2 text-festival-gold hover:text-festival-saffron transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
        <p className="text-[10px] text-gray-500 text-center mt-2 uppercase tracking-tighter">Powered by Divine Wisdom</p>
      </div>
    </div>
  );
};

export default ChatWindow;
