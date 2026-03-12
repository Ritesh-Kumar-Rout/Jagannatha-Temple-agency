import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative text-white overflow-hidden h-screen flex items-center">
      {/* Background Video - Full screen with dark overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105" // Slight zoom to prevent any edge issues
        >
          <source src="videoplayback (1).mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        
        {/* Modern Multi-layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
      </div>

      {/* Content - Centered text and buttons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-festival-gold/20 border border-festival-gold/30 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-festival-gold animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-festival-gold">Divine Experience</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 italic">
            Divine <br />
            <span className="text-festival-gold not-italic">Ratha Yatra</span> <br />
            Verse
          </h1>
          
          <p className="text-lg md:text-xl mb-10 text-white/80 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Immerse yourself in the sacred journey of Lord Jagannath. Your complete digital companion for the world's most magnificent chariot festival.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link
              to="/rituals"
              className="group relative px-8 py-4 bg-festival-red text-white font-black rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95 overflow-hidden"
            >
              <span className="relative z-10 uppercase tracking-widest text-sm">Explore Rituals</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
            
            <a
              href="#live-stream"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl shadow-xl transition-all hover:bg-white/20 active:scale-95"
            >
              <div className="p-1.5 bg-festival-gold rounded-full group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="uppercase tracking-widest text-sm">Watch Live</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Bottom info bar */}
      <div className="absolute bottom-10 left-0 right-0 z-10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span className="text-festival-gold">01</span> Puri, Odisha
            </div>
            <div className="w-12 h-[1px] bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-festival-gold">02</span> Annual Festival
            </div>
            <div className="w-12 h-[1px] bg-white/20"></div>
            <div className="flex items-center gap-2">
              <span className="text-festival-gold">03</span> Millions of Devotees
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;