import React from 'react';
import { cn } from "@/lib/utils";

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
      const speed = 25; // ms per character

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
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm transition-all duration-300",
          isUser
            ? "bg-festival-saffron text-white rounded-br-none"
            : "bg-[#1A2E35] text-white border border-[#2A3E45] rounded-bl-none",
          !isUser && isTyping && "border-festival-gold/30 shadow-festival-gold/5"
        )}
      >
        <p className="leading-relaxed">
          {displayedText}
          {!isUser && isTyping && (
            <span className="inline-block w-1 h-4 ml-1 bg-festival-gold/40 animate-pulse align-middle"></span>
          )}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
