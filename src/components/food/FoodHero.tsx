import React from 'react';
import { Utensils } from 'lucide-react';

const FoodHero: React.FC = () => {
  return (
    <div className="food-hero relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background with Theme Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/food/puri temple.jpg" 
          alt="Puri Cuisine" 
          className="w-full h-full object-cover grayscale-[10%] brightness-[0.45] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fffbf0]"></div>
      </div>

      {/* Decorative SVG Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="temple-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="#FFD700" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#temple-grid)" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-festival-red/20 border border-festival-red/30 mb-8 backdrop-blur-md">
          <Utensils size={16} className="text-festival-gold" />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-festival-gold">Divine Flavors</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
          A Taste of <span className="text-festival-gold italic">Puri</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 max-w-2xl leading-relaxed font-medium drop-shadow-lg">
          Explore the sacred culinary heritage of Lord Jagannath's land, from temple Mahaprasad to world-famous Odia sweets.
        </p>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-0.5 w-12 bg-festival-gold"></div>
          <span className="text-festival-gold font-serif text-lg italic">Holy & Pure</span>
          <div className="h-0.5 w-12 bg-festival-gold"></div>
        </div>
      </div>
    </div>
  );
};

export default FoodHero;
