import React from 'react';
import { MapPin, IndianRupee, ExternalLink, ArrowRight } from 'lucide-react';

interface StayCardProps {
  place: {
    name: string;
    image: string | string[];
    description: string;
    address: string;
    price?: string;
    bookingLink?: string;
    mapLink?: string;
  };
}

const StayCard: React.FC<StayCardProps> = ({ place }) => {
  const displayImage = Array.isArray(place.image) ? place.image[0] : place.image;

  return (
    <div className="stay-card group bg-white border border-gray-100 rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:translate-y-[-10px] flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={displayImage.startsWith('http') ? displayImage : `/${displayImage}`} 
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        <div className="absolute bottom-4 left-6 z-10">
          <h3 className="text-white font-serif text-xl font-bold drop-shadow-md">{place.name}</h3>
        </div>
        {place.price && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-festival-gold px-3 py-1.5 rounded-full text-festival-deep text-xs font-black shadow-lg flex items-center gap-1 uppercase tracking-tighter">
              <IndianRupee size={12} /> {place.price.replace(/[^0-9]/g, '') || 'Best Value'}
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start gap-2 mb-4 group/map">
          {place.mapLink ? (
            <a 
              href={place.mapLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-0.5 text-festival-red transition-transform group-hover/map:scale-110"
            >
              <MapPin size={16} />
            </a>
          ) : (
            <MapPin size={16} className="mt-0.5 text-gray-400" />
          )}
          <span className="text-gray-500 text-sm font-medium leading-snug">{place.address}</span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-8 line-clamp-3">
          {place.description}
        </p>

        <div className="mt-auto flex items-center gap-3">
          {place.bookingLink ? (
            <a 
              href={place.bookingLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 bg-festival-red text-white text-center py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all hover:bg-red-700 hover:shadow-lg flex items-center justify-center gap-2 group/btn"
            >
              {place.bookingLink.startsWith('tel:') ? 'Call Now' : 'Book Direct'}
              <ExternalLink size={14} className="transition-transform group-hover/btn:translate-y-[-2px] group-hover/btn:translate-x-[2px]" />
            </a>
          ) : (
            <div className="flex-1 bg-gray-100 text-gray-400 text-center py-3 rounded-2xl text-xs font-black uppercase tracking-widest italic cursor-not-allowed">
              Enquire Locally
            </div>
          )}
          {place.mapLink && (
            <a 
              href={place.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-festival-cream text-festival-red rounded-2xl transition-all hover:bg-festival-cream hover:border-festival-red/20"
              title="View on Map"
            >
              <ArrowRight size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default StayCard;
