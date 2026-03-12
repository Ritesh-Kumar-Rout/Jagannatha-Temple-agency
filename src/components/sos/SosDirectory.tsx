import React from 'react';
import { Phone, HeartPulse, Flame, Shield, User, Baby, Landmark, ArrowRight } from 'lucide-react';

interface SosDirectoryProps {
  services: any[];
}

const SosDirectory: React.FC<SosDirectoryProps> = ({ services }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse size={24} />;
      case 'Flame': return <Flame size={24} />;
      case 'Shield': return <Shield size={24} />;
      case 'Palace': return <Landmark size={24} />;
      case 'User': return <User size={24} />;
      case 'Baby': return <Baby size={24} />;
      default: return <Phone size={24} />;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'medical': return 'text-red-600 bg-red-50 border-red-100 hover:bg-red-100';
      case 'fire': return 'text-orange-600 bg-orange-50 border-orange-100 hover:bg-orange-100';
      case 'police': return 'text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100';
      case 'temple': return 'text-festival-gold bg-yellow-50 border-yellow-100 hover:bg-yellow-100';
      default: return 'text-festival-red bg-festival-red/5 border-festival-red/10 hover:bg-festival-red/10';
    }
  };

  return (
    <div className="sos-directory py-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-festival-red mb-4 tracking-tight">
            Emergency Directory
          </h2>
          <div className="h-1 w-24 bg-festival-gold/40 rounded-full"></div>
        </div>
        <p className="text-gray-500 max-w-sm font-medium text-sm leading-relaxed border-l-2 border-festival-cream pl-6">
          A comprehensive database of specialized helplines and support services across Puri.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, idx) => (
          <a 
            key={idx}
            href={`tel:${service.number}`}
            className={`group p-8 rounded-[2rem] border transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-xl hover:translate-y-[-4px] animate-in fade-in slide-in-from-bottom-4
              ${getColorClass(service.type)}`}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="p-4 bg-white rounded-2xl shadow-sm">
                {getIcon(service.icon)}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <ArrowRight size={20} />
              </div>
            </div>

            <div className="mt-auto">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 block mb-1">
                {service.label}
              </span>
              <h3 className="text-3xl font-black mb-2 tracking-tight">
                {service.number}
              </h3>
              <p className="text-xs font-semibold opacity-60 italic">
                {service.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SosDirectory;
