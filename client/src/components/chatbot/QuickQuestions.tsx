import React from 'react';

interface QuickQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const QuickQuestions: React.FC<QuickQuestionsProps> = ({ onQuestionClick }) => {
  const questions = [
    "Ratha Yatra History",
    "Festival Schedule",
    "Chariot Information",
    "About Lord Jagannath",
    "Travel to Puri",
    "Festival Rituals"
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4 px-2">
      {questions.map((q, index) => (
        <button
          key={index}
          onClick={() => onQuestionClick(q)}
          className="text-xs bg-transparent border border-festival-gold/50 text-festival-gold hover:bg-festival-gold hover:text-black transition-all duration-300 px-3 py-1.5 rounded-full"
        >
          {q}
        </button>
      ))}
    </div>
  );
};

export default QuickQuestions;
