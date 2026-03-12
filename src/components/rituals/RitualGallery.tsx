import React from 'react';

interface RitualGalleryProps {
  images: string[];
  title: string;
}

const RitualGallery: React.FC<RitualGalleryProps> = ({ images, title }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mb-12">
      <h4 className="text-festival-red font-serif text-xl mb-6 uppercase tracking-widest border-b border-festival-cream pb-2">Ritual Gallery</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative h-56 overflow-hidden rounded-2xl border border-gray-100 shadow-sm"
          >
            <img 
              src={`/${img}`} 
              alt={`${title} Gallery ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/placeholder.svg";
              }}
            />
            <div className="absolute inset-0 bg-festival-red/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur-sm text-festival-red text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">View Full</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RitualGallery;
