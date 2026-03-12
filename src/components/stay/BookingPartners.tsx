import React from 'react';
import { ExternalLink, ShieldCheck, Star, Heart } from 'lucide-react';

const partners = [
  {
    name: 'MakeMyTrip',
    logo: '/Accomodation image/Makemytrip_logo.svg.png',
    badge: 'Most Trusted',
    color: 'MMT',
    link: 'https://www.makemytrip.com/hotels/puri-hotels.html',
    features: ['Best Price Guarantee', '24/7 Support', 'Verified Hotels']
  },
  {
    name: 'Booking.com',
    logo: '/Accomodation image/images.png',
    badge: 'Global Range',
    color: 'Booking',
    link: 'https://www.booking.com/city/in/puri.html',
    features: ['Instant Confirmation', 'Free Cancellation', 'Recent Reviews']
  },
  {
    name: 'StayAtPuriJagannath',
    logo: '/Accomodation image/purilogo.png',
    badge: 'Official Partner',
    color: 'StayPuri',
    link: 'https://stayatpurijagannatha.in/',
    features: ['Direct Booking', 'Temple Managed', 'Pilgrim Services']
  }
];

const BookingPartners: React.FC = () => {
  return (
    <section className="booking-partners-section py-20 px-4 md:px-8 bg-festival-cream/10 relative overflow-hidden">
      {/* Decorative Ornament */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
        <img src="/Accomodation image/purilogo.png" alt="" className="w-96 grayscale" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 mb-6 uppercase tracking-wider">
            Book Through Trusted Partners
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium">
            Get exclusive rates and verified accommodations by booking through Lord Jagannath's official travel and stay partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, idx) => (
            <div 
              key={idx} 
              className="partner-card bg-white p-8 rounded-[40px] border border-festival-cream shadow-xl hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="h-12 w-24 flex items-center">
                  <img src={partner.logo} alt={partner.name} className="max-h-full max-w-full object-contain" />
                </div>
                <span className="bg-festival-gold/10 text-festival-gold px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-festival-gold/20">
                  {partner.badge}
                </span>
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-6 font-serif">{partner.name}</h3>
              
              <ul className="space-y-4 mb-10">
                {partner.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-festival-cream/30 flex items-center justify-center text-festival-red">
                      <ShieldCheck size={14} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <a 
                href={partner.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between w-full bg-gray-900 text-white p-5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all group-hover:bg-festival-red"
              >
                <span>Check Availability</span>
                <ExternalLink size={16} />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap justify-center gap-12 border-t border-festival-cream pt-12">
          <div className="flex items-center gap-3 text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">
            <Star size={16} className="text-festival-gold" /> Premium Standard
          </div>
          <div className="flex items-center gap-3 text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">
            <ShieldCheck size={16} className="text-festival-red" /> Secure Booking
          </div>
          <div className="flex items-center gap-3 text-gray-400 font-black uppercase tracking-[0.2em] text-[10px]">
            <Heart size={16} className="text-pink-400" /> Best Experience
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingPartners;
