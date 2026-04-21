import React from 'react';
import { ShieldAlert } from 'lucide-react';

const SosHero: React.FC = () => {
  return (
    <div className="sos-hero relative h-[45vh] min-h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background with Theme Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-festival-red/90 mix-blend-multiply z-10"></div>
        <img 
          src="/jagannath-temple.jpeg" 
          alt="Safety in Puri" 
          className="w-full h-full object-cover grayscale brightness-[0.3] scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fffbf0] z-20"></div>
      </div>

      <div className="relative z-30 text-center px-4 max-w-5xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-top-8 duration-1000">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/20 border border-white/30 mb-8 backdrop-blur-md">
          <ShieldAlert size={16} className="text-white animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-[0.4em] text-white">Safety Dashboard</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-black text-white mb-8 leading-tight tracking-tight drop-shadow-2xl">
          Safe Journey <span className="text-festival-gold italic">in Puri</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium drop-shadow-lg">
          Immediate assistance and emergency support at your fingertips. Your peace of mind is our divine priority.
        </p>

        <div className="mt-12 flex items-center gap-4">
          <div className="h-0.5 w-12 bg-festival-gold"></div>
          <span className="text-festival-gold font-serif text-lg italic">Always Available</span>
          <div className="h-0.5 w-12 bg-festival-gold"></div>
        </div>
      </div>
    </div>
  );
};

export default SosHero;
