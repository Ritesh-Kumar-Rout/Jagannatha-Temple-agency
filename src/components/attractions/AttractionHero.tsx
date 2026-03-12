import React from 'react';
import { MapPin } from 'lucide-react';

const AttractionHero: React.FC = () => {
  return (
    <div className="attraction-hero relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background with Theme Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/konark_temp.jpg" 
          alt="Puri Attractions" 
          className="w-full h-full object-cover grayscale-[10%] brightness-[0.4] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#fffbf0]"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-festival-gold/20 border border-festival-gold/30 mb-8 backdrop-blur-md">
          <MapPin size={16} className="text-festival-gold" />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-festival-gold">Heritage & Discovery</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
          Discover <span className="text-festival-gold italic">Puri & Beyond</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-100 max-w-2xl leading-relaxed font-medium drop-shadow-lg">
          Venture beyond the main town to discover fascinating destinations rich in history, ancient architecture, and natural beauty.
        </p>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-0.5 w-12 bg-festival-gold"></div>
          <span className="text-festival-gold font-serif text-lg italic">Sacred Excursions</span>
          <div className="h-0.5 w-12 bg-festival-gold"></div>
        </div>
      </div>
    </div>
  );
};

export default AttractionHero;
