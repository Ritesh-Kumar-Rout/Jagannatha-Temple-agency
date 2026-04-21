import React from 'react';
import { X, MapPin, Clock, Info, History, Navigation } from 'lucide-react';

interface AttractionModalProps {
  attraction: {
    title: string;
    details: string;
    history: string;
    image: string;
    distance: string;
    visitingHours: string;
    mapLink: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

const AttractionModal: React.FC<AttractionModalProps> = ({ attraction, isOpen, onClose }) => {
  if (!isOpen || !attraction) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-festival-deep/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#fffbf0] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all backdrop-blur-md"
        >
          <X size={24} />
        </button>

        {/* Left Side: Image */}
        <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden">
          <img 
            src={`/${attraction.image}`} 
            alt={attraction.title} 
            className="w-full h-full object-cover animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-4 drop-shadow-lg leading-tight">
              {attraction.title}
            </h2>
            <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest bg-festival-gold/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 inline-flex">
              <MapPin size={14} /> {attraction.distance}
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="md:w-7/12 p-8 md:p-14 overflow-y-auto custom-scrollbar">
          <div className="space-y-10">
            {/* Short Info Section */}
            <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-festival-cream">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-festival-red/5 text-festival-red rounded-2xl">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Visiting Hours</p>
                  <p className="text-sm font-bold text-gray-800">{attraction.visitingHours}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-festival-gold/10 text-festival-gold rounded-2xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter">Location</p>
                  <p className="text-sm font-bold text-gray-800">{attraction.distance}</p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-festival-red" size={24} />
                <h3 className="text-xl font-serif font-black text-gray-900 border-b-2 border-festival-gold/30 pb-1">Significance</h3>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium first-letter:text-5xl first-letter:font-serif first-letter:font-black first-letter:text-festival-red first-letter:mr-3 first-letter:float-left">
                {attraction.details}
              </p>
            </section>

            {/* History Section */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <History className="text-festival-gold" size={24} />
                <h3 className="text-xl font-serif font-black text-gray-900 border-b-2 border-festival-gold/30 pb-1">Glimpse into History</h3>
              </div>
              <div className="p-8 bg-festival-red/[0.03] rounded-[2rem] border-l-4 border-festival-red italic">
                <p className="text-gray-600 leading-relaxed font-medium">
                  "{attraction.history}"
                </p>
              </div>
            </section>

            {/* Action Button */}
            <div className="pt-6">
              <a 
                href={attraction.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-4 bg-festival-red text-white py-6 rounded-[2rem] text-sm font-black uppercase tracking-[0.2em] hover:bg-red-700 transition-all shadow-xl hover:shadow-2xl hover:translate-y-[-4px]"
              >
                <Navigation size={20} className="animate-pulse" />
                Find Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}} />
    </div>
  );
};

export default AttractionModal;
