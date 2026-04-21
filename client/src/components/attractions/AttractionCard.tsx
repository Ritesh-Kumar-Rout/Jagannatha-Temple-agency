import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';

interface AttractionCardProps {
  attraction: {
    id: number;
    title: string;
    description: string;
    image: string;
    distance: string;
  };
  onClick: () => void;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="attraction-card group bg-white rounded-[2.5rem] border border-festival-cream/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer animate-in fade-in zoom-in-95"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`/${attraction.image}`} 
          alt={attraction.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="absolute top-6 right-6">
          <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-festival-red text-[10px] font-black uppercase tracking-widest shadow-xl border border-festival-cream flex items-center gap-2">
            <MapPin size={12} /> {attraction.distance.split(' ')[0]} {attraction.distance.includes('km') ? 'KM' : ''}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-black text-gray-900 mb-4 group-hover:text-festival-red transition-colors">
          {attraction.title}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3 italic">
          {attraction.description}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-festival-gold font-black text-[10px] uppercase tracking-widest">
            <Clock size={14} /> Open Daily
          </div>
          
          <button className="flex items-center gap-2 text-festival-red text-xs font-black uppercase tracking-widest group/btn">
            Explore More
            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Decorative Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-festival-saffron via-festival-red to-festival-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
    </div>
  );
};

export default AttractionCard;
