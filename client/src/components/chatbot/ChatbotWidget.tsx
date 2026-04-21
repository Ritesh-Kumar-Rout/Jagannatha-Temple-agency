 import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChatWindow from './ChatWindow';
import { Magnetic } from '../ui/Magnetic';
import { FloatingElement } from '../ui/FloatingElement';

const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-6 origin-bottom-right"
          >
            <FloatingElement duration={6} yOffset={5}>
              <ChatWindow onClose={() => setIsOpen(false)} />
            </FloatingElement>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <Magnetic strength={0.4}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-festival-red text-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(220,38,38,0.4)] hover:shadow-[0_15px_40px_rgba(220,38,38,0.6)] hover:bg-red-700 transition-all duration-300 border border-white/20 group relative"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-festival-gold/30 -z-10 group-hover:hidden duration-1000"></div>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-8 h-8" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
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
                <MessageCircle className="w-8 h-8 hidden fallback-icon" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </Magnetic>
    </div>
  );
};

export default ChatbotWidget;
