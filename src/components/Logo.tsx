import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`flex items-center gap-3 transition-opacity hover:opacity-90 ${className}`}>
      {/* Professional SVG Nila Chakra / Chariot Wheel */}
      <svg 
        viewBox="0 0 100 100" 
        className={`${sizeClasses[size]} drop-shadow-sm`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Glow / Halo */}
        <circle cx="50" cy="50" r="48" className="fill-festival-gold/10" />
        
        {/* Main Wheel Frame */}
        <circle cx="50" cy="50" r="40" className="stroke-festival-gold" strokeWidth="6" />
        <circle cx="50" cy="50" r="34" className="stroke-festival-red" strokeWidth="2" />
        <circle cx="50" cy="50" r="10" className="stroke-festival-gold" strokeWidth="4" />
        
        {/* Core Detail */}
        <circle cx="50" cy="50" r="4" className="fill-festival-red" />

        {/* 8 Sacred Spokes */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 34 * Math.cos((i * 45 * Math.PI) / 180)}
            y2={50 + 34 * Math.sin((i * 45 * Math.PI) / 180)}
            className="stroke-festival-gold"
            strokeWidth="5"
            strokeLinecap="round"
          />
        ))}
        
        {/* Secondary Decorative Spokes */}
        {[...Array(8)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={50 + 25 * Math.cos(((i * 45 + 22.5) * Math.PI) / 180)}
            y2={50 + 25 * Math.sin(((i * 45 + 22.5) * Math.PI) / 180)}
            className="stroke-festival-red/60"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-xl md:text-2xl font-black tracking-tighter text-current flex items-center">
            Puri<span className="text-festival-red">Yatra</span>
          </span>
          <div className="flex items-center gap-1">
            <div className="h-[1px] w-2 bg-festival-gold"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-festival-gold">
              Verse
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
