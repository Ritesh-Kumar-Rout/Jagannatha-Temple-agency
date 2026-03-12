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
  const text = isUser ? message.userMessage : (message.botResponse || message.text);

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm",
          isUser
            ? "bg-festival-saffron text-white rounded-br-none"
            : "bg-[#1A2E35] text-white border border-[#2A3E45] rounded-bl-none"
        )}
      >
        <p className="leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
