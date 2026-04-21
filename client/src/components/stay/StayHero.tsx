import React from 'react';

const StayHero: React.FC = () => {
  return (
    <div className="stay-hero relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background with Theme Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/Accomodation image/temple777.jpg" 
          alt="Puri Stay" 
          className="w-full h-full object-cover grayscale-[20%] brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-festival-deep/40 via-transparent to-festival-deep/60"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-in fade-in slide-in-from-top-10 duration-1000">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festival-gold/10 border border-festival-gold/20 mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-festival-gold animate-pulse"></span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-festival-gold">Divine Stay</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-black text-white mb-6 uppercase tracking-wider drop-shadow-2xl">
          Stay in Comfort During <span className="text-festival-gold">Ratha Yatra</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light drop-shadow-lg">
          Find the best accommodations near Puri to experience the divine festival of Lord Jagannath with peace and comfort.
        </p>
      </div>
    </div>
  );
};

export default StayHero;
