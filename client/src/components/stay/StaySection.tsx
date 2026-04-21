import React from 'react';
import StayCard from './StayCard';

interface StaySectionProps {
  title: string;
  subtitle?: string;
  places: any[];
}

const StaySection: React.FC<StaySectionProps> = ({ title, subtitle, places }) => {
  return (
    <section className="stay-section-wrapper py-20 px-4 md:px-8 border-b border-festival-cream/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-festival-red mb-4 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 font-medium leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          <div className="hidden md:block">
            <div className="h-0.5 w-32 bg-festival-gold/30"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {places.map((place, index) => (
            <StayCard key={`${place.name}-${index}`} place={place} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StaySection;
