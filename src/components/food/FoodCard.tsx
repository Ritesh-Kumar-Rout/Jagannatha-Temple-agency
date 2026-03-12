import React from 'react';
import { ShoppingBag, ArrowRight, IndianRupee, MessageCircle } from 'lucide-react';

interface FoodCardProps {
  item: {
    name: string;
    description: string;
    image: string;
    price?: string;
    orderLink?: string;
  };
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const isWhatsApp = item.orderLink?.includes('wa.me');

  return (
    <div className="food-card group relative bg-white rounded-[2.5rem] border border-festival-cream/50 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full animate-in fade-in zoom-in-95">
      {/* Image Container with Zoom Effect */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={`/${item.image}`} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {item.price && (
          <div className="absolute top-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-all transform -translate-x-4 group-hover:translate-x-0">
            <span className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-festival-red text-sm font-black shadow-xl flex items-center gap-1.5 border border-festival-cream">
              <IndianRupee size={14} /> {item.price}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-serif font-black text-gray-900 mb-4 group-hover:text-festival-red transition-colors">
          {item.name}
        </h3>
        
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
          {item.description}
        </p>

        {/* Action Button */}
        <div className="mt-auto pt-4 flex items-center gap-3">
          {item.orderLink ? (
            <a 
              href={item.orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-between px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.15em] transition-all transform active:scale-95 group/btn shadow-md hover:shadow-xl
                ${isWhatsApp 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'bg-festival-red text-white hover:bg-red-700'}`}
            >
              <div className="flex items-center gap-2">
                {isWhatsApp ? <MessageCircle size={16} /> : <ShoppingBag size={16} />}
                <span>{isWhatsApp ? 'Order via WhatsApp' : 'Order Now'}</span>
              </div>
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1.5" />
            </a>
          ) : (
            <div className="flex-1 bg-gray-50 text-gray-400 py-4 px-6 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center italic border border-gray-100">
              Locally Available Only
            </div>
          )}
        </div>
      </div>

      {/* Subtle Bottom Pattern Overlay */}
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none group-hover:opacity-[0.08] transition-opacity">
        <img src="/Accomodation image/purilogo.png" alt="" className="w-full h-full rotate-[15deg] translate-x-4 translate-y-4" />
      </div>
    </div>
  );
};

export default FoodCard;
