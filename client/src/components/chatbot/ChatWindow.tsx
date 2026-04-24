import React, { useState, useEffect, useRef } from 'react';
import { Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import QuickQuestions from './QuickQuestions';
import TypingIndicator from './TypingIndicator';
import { Magnetic } from '../ui/Magnetic';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Robust auto-scroll during typing animations using MutationObserver
  useEffect(() => {
    const container = messagesEndRef.current?.parentElement;
    if (!container) return;

    const observer = new MutationObserver(() => {
      // Use auto behavior for immediate snapping during continuous text typing
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    });

    observer.observe(container, { childList: true, subtree: true, characterData: true });
    
    return () => observer.disconnect();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = { userMessage: text, botResponse: "", isUser: true };
    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      const data = await response.json();
      
      // Artificial delay to simulate thinking
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setMessages(prev => [...prev, { userMessage: "", botResponse: data.reply, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
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
    <div className="flex flex-col h-[500px] max-h-[80vh] w-[90vw] sm:w-[360px] bg-[#09151a]/90 backdrop-blur-2xl border border-festival-gold/20 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative">
      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-festival-red/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-festival-gold/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-festival-red/90 to-[#991b1b]/90 backdrop-blur-md p-5 border-b border-festival-gold/30 relative z-10 shadow-md">
        <div className="flex items-center space-x-4">
          <Magnetic strength={0.3}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-festival-gold shadow-[0_0_15px_rgba(252,211,77,0.4)]">
               <img src="/jagannath-wheel.png" alt="Jagannath" className="w-10 h-10 object-contain" onError={(e) => {
                 e.currentTarget.src = 'https://cdn-icons-png.flaticon.com/512/8118/8118357.png';
               }} />
            </div>
          </Magnetic>
          <div>
            <h3 className="text-white font-black text-lg leading-tight tracking-wide">Divine Assistant</h3>
            <span className="text-festival-gold text-[10px] uppercase font-bold tracking-[0.2em] flex items-center mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
              Online to Guide You
            </span>
          </div>
        </div>
        <Magnetic strength={0.2}>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="text-white w-6 h-6" />
          </button>
        </Magnetic>
      </div>

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto overscroll-contain p-5 scrollbar-thin scrollbar-thumb-festival-gold/20 scrollbar-track-transparent relative z-10"
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <AnimatePresence>
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} isUser={msg.isUser} />
          ))}
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-4"
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="relative z-10 bg-gradient-to-t from-[#09151a] to-transparent pt-4">
        <QuickQuestions onQuestionClick={handleSendMessage} />
      </div>

      {/* Input Area */}
      <div className="p-5 bg-black/40 backdrop-blur-md border-t border-festival-gold/10 relative z-10">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
          className="relative flex items-center bg-[#132830] border border-white/10 focus-within:border-festival-gold/50 rounded-2xl transition-all shadow-inner"
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about Ratha Yatra..."
            className="w-full bg-transparent text-white text-[15px] py-4 pl-5 pr-14 outline-none placeholder:text-gray-500 font-medium"
          />
          <div className="absolute right-2">
            <Magnetic strength={0.5}>
              <button 
                type="submit"
                disabled={!inputValue.trim()}
                className="p-3 text-festival-gold hover:text-white bg-festival-gold/10 hover:bg-festival-gold/30 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-festival-gold rounded-xl transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </Magnetic>
          </div>
        </form>
        <p className="text-[10px] text-gray-500 text-center mt-3 uppercase font-bold tracking-widest">Powered by Divine Wisdom</p>
      </div>
    </div>
  );
};

export default ChatWindow;
