import React from 'react';
import { cn } from "@/lib/utils";
import { motion } from 'framer-motion';

interface ChatMessageProps {
  message: {
    userMessage: string;
    botResponse: string;
    isBot?: boolean;
    text?: string;
  };
  isUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const fullText = isUser ? message.userMessage : (message.botResponse || message.text || "");
  const [displayedText, setDisplayedText] = React.useState(isUser ? fullText : "");
  const [isTyping, setIsTyping] = React.useState(!isUser);

  React.useEffect(() => {
    if (!isUser && fullText) {
      let currentText = "";
      let index = 0;
      const speed = 15; // ms per character

      const interval = setInterval(() => {
        if (index < fullText.length) {
          currentText += fullText[index];
          setDisplayedText(currentText);
          index++;
        } else {
          setIsTyping(false);
          clearInterval(interval);
        }
      }, speed);

      return () => clearInterval(interval);
    }
  }, [fullText, isUser]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "flex w-full mb-5",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] rounded-3xl px-5 py-3.5 text-[15px] shadow-md transition-all duration-300 relative",
          isUser
            ? "bg-gradient-to-br from-festival-saffron to-[#e8701a] text-white rounded-br-sm shadow-[#e8701a]/20"
            : "bg-[#112a33]/80 backdrop-blur-md text-gray-100 border border-t-white/10 border-white/5 rounded-bl-sm shadow-black/20",
          !isUser && isTyping && "border-festival-gold/30 shadow-[0_0_15px_rgba(217,119,6,0.1)]"
        )}
      >
        <div className="leading-relaxed whitespace-pre-wrap">
          {displayedText}
          {!isUser && isTyping && (
            <span className="inline-block w-1.5 h-4 ml-1.5 bg-festival-gold/70 animate-pulse align-middle rounded-full"></span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
