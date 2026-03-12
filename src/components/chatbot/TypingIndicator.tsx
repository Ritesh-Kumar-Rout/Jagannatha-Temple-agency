import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-[#1A2E35] text-white border border-[#2A3E45] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
        <div className="flex space-x-1">
          <div className="w-1.5 h-1.5 bg-festival-gold rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-1.5 h-1.5 bg-festival-gold rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-1.5 h-1.5 bg-festival-gold rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
