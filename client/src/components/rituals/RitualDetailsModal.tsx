import React, { useEffect } from 'react';
import { Star, X } from 'lucide-react';
import RitualGallery from './RitualGallery';
import RitualInfoSection from './RitualInfoSection';

interface RitualDetailsModalProps {
  ritual: {
    title: string;
    details: string;
    image: string;
    timing: string;
    location: string;
    significance: string;
    gallery: string[];
    fact: string;
  };
  onClose: () => void;
}

const RitualDetailsModal: React.FC<RitualDetailsModalProps> = ({ ritual, onClose }) => {
  // Lock body scroll when modal is open to prevent background scrolling
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div 
      className="modal-overlay fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={onClose}
      data-lenis-prevent="true"
    >
      <div 
        className="modal-content modal-content-premium relative bg-white w-full h-full md:w-[90%] md:h-[90%] md:max-w-5xl md:rounded-3xl border-festival-cream border-4 overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header/Close */}
        <button 
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/5 text-gray-800 hover:bg-festival-red hover:text-white transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        {/* Scrollable Body */}
        <div 
          className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12"
          data-lenis-prevent="true"
        >
          {/* Title Section */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-10 text-center md:text-left">
            <div className="p-4 bg-festival-gold/10 rounded-2xl">
              <Star className="text-festival-gold" size={32} />
            </div>
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-gray-900 leading-tight">
                {ritual.title}
              </h2>
              <div className="h-1.5 w-24 bg-festival-saffron mt-4 mx-auto md:mx-0 rounded-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Image & Main Details */}
            <div className="lg:col-span-12">
              <div className="relative rounded-3xl overflow-hidden mb-10 shadow-xl border border-gray-100">
                <img 
                  src={`/${ritual.image}`} 
                  alt={ritual.title}
                  className="w-full h-[400px] object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/placeholder.svg";
                  }}
                />
              </div>

              {/* Structured Info */}
              <RitualInfoSection 
                timing={ritual.timing}
                location={ritual.location}
                significance={ritual.significance}
                fact={ritual.fact}
              />

              {/* Full Description text */}
              <div className="modal-text-content space-y-6 text-gray-700 mb-12">
                <h4 className="text-festival-red font-serif text-xl uppercase tracking-widest mb-4 border-b border-festival-cream pb-2">Detailed Ritual Narrative</h4>
                {ritual.details.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-lg leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-festival-red first-letter:mr-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Gallery Section */}
              <RitualGallery images={ritual.gallery} title={ritual.title} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RitualDetailsModal;
