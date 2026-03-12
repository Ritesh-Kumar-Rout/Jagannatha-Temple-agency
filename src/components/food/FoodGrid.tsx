import React from 'react';
import FoodCard from './FoodCard';

interface FoodGridProps {
  categories: any[];
}

const FoodGrid: React.FC<FoodGridProps> = ({ categories }) => {
  return (
    <div className="food-grid-container relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto">
      {categories.map((cat, catIdx) => (
        <div key={catIdx} className="mb-24 last:mb-0">
          {/* Category Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 px-4">
            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-serif font-black text-festival-red mb-3 tracking-tight relative z-10">
                {cat.category}
              </h2>
              <div className="absolute -top-6 -left-8 text-festival-cream opacity-40 text-7xl font-serif select-none pointer-events-none z-0 italic">
                {String(catIdx + 1).padStart(2, '0')}
              </div>
              <div className="h-1 w-24 bg-festival-gold/40 rounded-full mt-2"></div>
            </div>
            
            <p className="text-gray-500 max-w-md font-medium text-sm leading-relaxed border-l-2 border-festival-cream pl-6">
              Handpicked delicacies from the streets and temples of Puri, reflecting centuries of tradition.
            </p>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
            {cat.items.map((item: any, itemIdx: number) => (
              <div key={itemIdx} className="h-full">
                <FoodCard item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodGrid;
