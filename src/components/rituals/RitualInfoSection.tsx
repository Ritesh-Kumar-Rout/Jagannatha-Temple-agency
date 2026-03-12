import React from 'react';
import { Clock, MapPin, Sparkles, Lightbulb } from 'lucide-react';

interface RitualInfoSectionProps {
  timing: string;
  location: string;
  significance: string;
  fact: string;
}

const RitualInfoSection: React.FC<RitualInfoSectionProps> = ({ 
  timing, 
  location, 
  significance, 
  fact 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-festival-cream/10 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-3 text-festival-saffron">
          <Clock size={20} />
          <h4 className="font-bold uppercase tracking-wider text-xs">Ritual Timing</h4>
        </div>
        <p className="text-gray-900 font-semibold">{timing}</p>
      </div>

      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-festival-cream/10 transition-colors shadow-sm">
        <div className="flex items-center gap-3 mb-3 text-blue-600">
          <MapPin size={20} />
          <h4 className="font-bold uppercase tracking-wider text-xs">Location</h4>
        </div>
        <p className="text-gray-900 font-semibold">{location}</p>
      </div>

      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-festival-cream/10 transition-colors shadow-sm md:col-span-2">
        <div className="flex items-center gap-3 mb-3 text-festival-red">
          <Sparkles size={20} />
          <h4 className="font-bold uppercase tracking-wider text-xs">Spiritual Significance</h4>
        </div>
        <p className="text-gray-700 leading-relaxed italic border-l-4 border-festival-gold pl-4 bg-white py-4 rounded-r-xl">
          "{significance}"
        </p>
      </div>

      <div className="p-6 bg-festival-cream/30 rounded-2xl border border-festival-cream transition-colors md:col-span-2 shadow-inner">
        <div className="flex items-center gap-3 mb-3 text-festival-saffron">
          <Lightbulb size={24} />
          <h4 className="font-bold uppercase tracking-wider text-xs">Did You Know?</h4>
        </div>
        <p className="text-gray-800 text-sm leading-relaxed font-medium">
          {fact}
        </p>
      </div>
    </div>
  );
};

export default RitualInfoSection;
