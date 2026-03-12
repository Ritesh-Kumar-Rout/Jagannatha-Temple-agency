import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatWindow from './ChatWindow';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4">
          <ChatWindow onClose={() => setIsOpen(false)} />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-festival-red text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-festival-gold/30 group relative"
      >
        <div className="absolute inset-0 rounded-full animate-ping bg-festival-gold/20 -z-10 group-hover:hidden"></div>
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <img 
            src="/jagannath-wheel.png" 
            alt="Chat" 
            className="w-10 h-10 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const icon = e.currentTarget.parentElement?.querySelector('.fallback-icon');
              if (icon) (icon as HTMLElement).style.display = 'block';
            }}
          />
        )}
        {!isOpen && (
          <MessageCircle className="w-8 h-8 hidden fallback-icon" />
        )}
      </button>
    </div>
  );
};

export default ChatbotWidget;
