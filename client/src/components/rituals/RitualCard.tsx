import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';

interface RitualCardProps {
  ritual: {
    id: number;
    title: string;
    emoji: string;
    shortDesc: string;
    image: string;
  };
  onClick: (ritual: any) => void;
}

const RitualCard: React.FC<RitualCardProps> = ({ ritual, onClick }) => {
  return (
    <div 
      className="ritual-card-new group bg-white border border-gray-200 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:translate-y-[-8px] hover:border-festival-saffron/40 hover:bg-festival-cream/20 cursor-pointer flex flex-col h-full shadow-md hover:shadow-xl"
      onClick={() => onClick(ritual)}
    >
      <div className="card-image-box relative h-60 overflow-hidden">
        <img 
          src={`/${ritual.image}`} 
          alt={ritual.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-festival-red text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20 shadow-lg">
             {ritual.emoji} Sacred
          </span>
        </div>
      </div>

      <div className="card-body p-6 flex flex-col flex-grow">
        <div className="ritual-category text-festival-saffron text-[10px] font-black uppercase tracking-[0.2em] mb-3">Divine Ceremony</div>
        <h3 className="text-gray-900 font-serif text-xl font-bold mb-3 line-clamp-2 leading-snug group-hover:text-festival-red transition-colors">
          {ritual.title.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, '')}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
          {ritual.shortDesc}
        </p>
        
        <div className="card-footer mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="ritual-meta flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            <Clock size={12} className="text-festival-saffron" />
            Traditional
          </div>
          <button 
            className="view-details-btn group/btn bg-transparent border-2 border-festival-gold text-festival-gold px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all hover:bg-festival-gold hover:text-white flex items-center gap-2"
          >
            View Details
            <ChevronRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RitualCard;
