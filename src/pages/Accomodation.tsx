// import React from 'react';
import React, { useState } from 'react';
import './Accomodation.css';
import Layout from '../components/Layout';
import { MapPin, IndianRupee, ExternalLink, Star, Shield, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface Place {
  name: string;
  image: string;
  description: string;
  address: string;
  price?: string;
  bookingLink?: string;
}
interface Place {
  name: string;
  image: string | string[];
  description: string;
  address: string;
  price?: string;
  bookingLink?: string;
  mapLink?: string; // Add this new property
}

const mathas: Place[] = [
  {
    name: 'Gobardhan Matha',
    image: ["Accomodation image/govardhan-math.webp"],
    address: 'Swargadwar, Puri, Odisha',
    description: 'Established by Adi Shankaracharya, plays a pivotal role in the rituals of the Jagannath Temple.',
    mapLink: 'https://maps.app.goo.gl/bBNq5iZc97JFZ3cd9'
  },
  {
    name: 'Radha Bhallava Matha',
    address: 'in front of Lion\'s Gate (Singha Dwara), Jagannath Temple, Puri, Odisha',
    description: 'Founded by Saint Ramanuja, supplies floral decorations and offerings for temple rituals.',
    image: ['Accomodation image/radhaballav.jpg'],
    mapLink: 'https://maps.app.goo.gl/PqsfdUThDQQxqRN39'
  },
  {
    name: 'Raghaba Das Matha',
    address: 'Southern Gate of Jagannath Temple, Puri, Odisha',
    description: "Provides 'tahia' (decorative headgear) during major festivals and contributes to temple rituals.",
    image: 'Accomodation image/raghav das.jpg',
    mapLink: 'https://www.google.com/maps/place/Raghaba+Das+Matha/@19.8049,85.8162,17z/'
  },
  {
    name: 'Bada Chhata Matha',
    address: 'Near Lion\'s Gate, Jagannath Temple, Puri, Odisha',
    description: "Performs kirtans during rituals and offers 'Padma Bhesha' (lotus attire) on specific days.",
    image: 'Accomodation image/Bada_chata_matha.jpeg',
    mapLink: 'https://maps.app.goo.gl/2tjUmmxHgX4kxoTA6'
  },
  {
    name: 'Jagannath Ballav Matha',
    address: 'Grand Road (Bada Danda), Puri, Odisha',
    description: 'Known as the pleasure garden of Lord Jagannath, supplies floral ornaments during festivals.',
    image: 'Accomodation image/jagganth ballav.jpg',
    mapLink: 'https://maps.app.goo.gl/Frg5Qxh1NjMCXeUd6'
  },
];

const hotelsNearTemple: Place[] = [
  {
    name: 'Hotel Lee Garden',
    address: 'Grand Road, Near Jagannath Temple, Puri, Odisha 752001',
    description: 'Heritage-style hotel with traditional decor and proximity to the temple.',
    bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=200901191214435688',
    image: 'Accomodation image/hotel lee garden.jpeg',
    mapLink: 'https://maps.app.goo.gl/f1rE4FqczBwLa6Yv7'
  },
  {
    name: 'Hotel Shree Hari Grand',
    address: 'Grand Road, Near Jagannath Temple, Puri, Odisha',
    description: 'Clean rooms within walking distance to the temple, suitable for families and pilgrims.',
    bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=201602181241534172',
    image: 'Accomodation image/hotel-shree-hari.jpg',
    mapLink: 'https://maps.app.goo.gl/AtQxJ67gXJG1jEsC8'
  },
  {
    name: 'Hotel Niladri',
    address: 'Sea Beach Road, Puri, Odisha 752001',
    description: 'Located near Swargadwar Beach, offering sea views and temple proximity.',
    bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=20111214173619910',
    image: 'Accomodation image/niladri.webp',
    mapLink: 'https://maps.app.goo.gl/nQLeXkSBW89CcCbC7'
  },
  {
    name: 'Hotel Sonar Bangla',
    address: 'Sea Beach Road, Puri, Odisha 752001',
    description: 'Comfortable accommodations with sea views and temple access.',
    bookingLink: 'https://www.hotelsonarbangla.com/projects/puri/',
    image: 'Accomodation image/sonar bangala.webp',
    mapLink: 'https://maps.app.goo.gl/SthUeSE34bPRwiBS8'
  },
  {
    name: 'Hotel Paradise',
    address: 'Bada Danda Road, Balagandi, Nilachakra Nagar, Puri, Odisha 752001',
    description: 'On Grand Road, offering easy access to Jagannath Temple.',
    bookingLink: 'http://tripadvisor.in/Hotel_Review-g503703-d1179336-Reviews-Paradise_Hotel-Puri_Puri_District_Odisha.html',
    image: 'Accomodation image/paradise-hotel.avif',
    mapLink: 'https://maps.app.goo.gl/vhNihNzWyHN9Qke46'
  },
];

const hotelsNearBeach: Place[] = [
  {
    name: 'Mayfair Heritage',
    address: 'Chakratirth Road, Puri, Odisha 752002',
    description: 'Luxurious beachfront property with premium amenities and sea views.',
    bookingLink: 'https://www.mayfairhotels.com/',
    image: 'Accomodation image/mayafair puri.jpg',
    mapLink: 'https://maps.app.goo.gl/dpLjQLsgyFHMMA1r9'
  },
  {
    name: 'Purushotam Bhakta Nivas',
    address: 'Near Old Jail, Jagannath Puri - 752001',
    description: 'Located at a distance of 1.3 km from Gundicha Temple. Purshottam Bhakta Niwas in Puri offers two and three bedded AC rooms. Meals and parking spaces for vehicles are available here.',
    bookingLink: 'https://stayatpurijagannatha.in/bhaktanivas/hotel/purushottam-bhakta-nivas-17',
    image: 'Accomodation image/PURUSHOTTAM-BHAKTA.jpg',
    mapLink: 'https://maps.app.goo.gl/kcjDrq2Feb3heNJa7'
  },
  {
    name: 'Hotel Sagar Kanya',
    address: 'New Marine Drive Road, Puri, Odisha 752001',
    description: 'Sea-facing rooms with modern amenities and beach access.',
    bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=201601221848581905',
    image: 'Accomodation image/Hotel sagar kanya.jpg',
    mapLink: 'https://maps.app.goo.gl/o9GGLF29hum8ja4F6'
  },
  {
    name: 'Hotel Golden Palace',
    address: 'New Marine Drive Road, Puri, Odisha 752001',
    description: 'Comfortable accommodations with panoramic sea views.',
    bookingLink: 'https://hotelgoldenpalacepuri.in/',
    image: 'Accomodation image/golden palace.jpg',
    mapLink: 'https://maps.app.goo.gl/E1TzV8nz6GUgsyJD9'
  },
  {
    name: 'Hotel Shree Jagannath',
    address: 'New Marine Drive Rd, Puri, Odisha 752001',
    description: 'Affordable hotel near the beach with essential amenities.',
    bookingLink: 'https://www.goibibo.com/hotels/hotel-details/?checkin=20250425&checkout=20250426&roomString=1-2-0&searchText=HOTEL%20SHREE%20JAGANNATH%20(SEA%20FACING)&locusId=CTXPR&locusType=city&cityCode=CTXPR&cc=IN&_uCurrency=INR&giHotelId=1123670571102621686&mmtId=201809221027357980&topHtlId=201809221027357980&sType=hotel ',
    image: 'Accomodation image/sre jagannath.avif',
    mapLink: 'https://maps.app.goo.gl/erGBJnmLs7PBJLS29'
  },
];

const PlaceCard: React.FC<{ place: Place }> = ({ place }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
        isExpanded ? 'transform scale-[1.02]' : 'hover:scale-[1.02]'
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="h-48 overflow-hidden relative">
        {Array.isArray(place.image) ? (
          <img
            src={place.image[0]}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        ) : (
          <img
            src={place.image}
            alt={place.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{place.name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center text-gray-600">
            {/* Make MapPin icon clickable with Google Maps link */}
            {place.mapLink ? (
              <a
                href={place.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <MapPin className="text-blue-500 mr-2 hover:text-blue-700" size={16} />
              </a>
            ) : (
              <MapPin className="text-blue-300 mr-2" size={16} />
            )}
            <span>{place.address}</span>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        <div 
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-gray-600 mb-4">{place.description}</p>

          {place.price && (
            <div className="flex items-center mb-4">
              <IndianRupee className="text-green-500 mr-2" size={16} />
              <span className="text-gray-700 font-medium">{place.price}</span>
            </div>
          )}

          {place.bookingLink && (
            <a
              href={place.bookingLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
              onClick={(e) => e.stopPropagation()}
            >
              {place.bookingLink.startsWith('tel:') ? 'Call Now' : 'Book Now'}
              <ExternalLink className="ml-2" size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; places: Place[] }> = ({ title, places }) => (
  <section className="min-h-screen bg-gradient-to-br from-blue-200 to-pink-200 py-12 px-6">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {places.map((place, index) => (
          <PlaceCard key={`${place.name}-${index}`} place={place} />
        ))}
      </div>
    </div>
  </section>
);

const PlatformCard: React.FC<{
  title: string;
  features: string[];
  link: string;
  logo: string;
  badge: string;
  badgeColor: string;
}> = ({ title, features, link, logo, badge, badgeColor }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
    <div className="p-6 pb-0">
      <div className="flex justify-between items-start mb-4">
        <img src={logo} alt={title} className="h-10 object-contain" />
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${badgeColor}`}>
          {badge}
        </span>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="mt-auto p-6 pt-0">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <span>{title === 'StayAtPuriJagannath' ? 'Book Direct' : 'View Deals'}</span>
        <ExternalLink className="ml-2" size={16} />
      </a>
    </div>
  </div>
);

const BookingOptionsSection: React.FC = () => (
  <section className="min-h-screen bg-gradient-to-br from-blue-300 to-pink-300 py-12 px-6">
    <div className="booking-platforms-section">
      <div className="section-header">
        <h1 className="section-title">Book Your Stay Through Trusted Partners</h1>
        <p className="section-subtitle">Get the best rates and exclusive deals from our official partners</p>
      </div>

      <div className="platforms-grid">
        <div className="platform-card make-my-trip">
          <div className="platform-header">
            <div className="platform-badge">Most Popular</div>
            <img 
              src="Accomodation image/Makemytrip_logo.svg.png" 
              alt="MakeMyTrip" 
              className="platform-logo"
            />
          </div>
          <div className="platform-content">
            <h3>MakeMyTrip</h3>
            <ul className="platform-features">
              <li>✓ Best price guarantee</li>
              <li>✓ Instant confirmation</li>
              <li>✓ 24/7 customer support</li>
              <li>✓ Free cancellation options</li>
            </ul>
          </div>
          <a 
            href="https://www.makemytrip.com/hotels/puri-hotels.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="platform-cta"
          >
            <span>View Deals</span>
            <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="platform-card booking-com">
          <div className="platform-header">
            <div className="platform-badge">Global Leader</div>
            <img 
              src="Accomodation image/images.png" 
              alt="Booking.com" 
              className="platform-logo"
            />
          </div>
          <div className="platform-content">
            <h3>Booking.com</h3>
            <ul className="platform-features">
              <li>✓ Millions of verified reviews</li>
              <li>✓ Free cancellation on most rooms</li>
              <li>✓ Genius loyalty program</li>
              <li>✓ Mobile-friendly booking</li>
            </ul>
          </div>
          <a 
            href="https://www.booking.com/city/in/puri.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="platform-cta"
          >
            <span>Explore Options</span>
            <ExternalLink size={16} />
          </a>
        </div>
        
        <div className="platform-card jagannath-stay">
          <div className="platform-header">
            <div className="platform-badge">Official Partner</div>
            <img 
              src="Accomodation image/purilogo.png" 
              alt="Stay at Puri Jagannath" 
              className="platform-logo"
            />
          </div>
          <div className="platform-content">
            <h3>StayAtPuriJagannath</h3>
            <ul className="platform-features">
              <li>✓ Official temple accommodations</li>
              <li>✓ Pilgrim-friendly locations</li>
              <li>✓ Traditional Odia hospitality</li>
              <li>✓ Proximity to sacred sites</li>
            </ul>
          </div>
          <a 
            href="https://stayatpurijagannatha.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="platform-cta"
          >
            <span>Book Direct</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
      
      <div className="trust-badges">
        <div className="trust-item">
          <div className="trust-icon">🔒</div>
          <span>Secure Booking</span>
        </div>
        <div className="trust-item">
          <div className="trust-icon">👍</div>
          <span>Verified Partners</span>
        </div>
        <div className="trust-item">
          <div className="trust-icon">💯</div>
          <span>Best Price Guarantee</span>
        </div>
      </div>
    </div>
    </section>
  );



const HotelsNearJagannathTemple: React.FC = () => {
  return (
    <Layout>     
      <div className="relative">
        {/* Hero Section with Background Image */}
        <div className="relative h-96 overflow-hidden">
          {/* Background Image with overlay */}
          <div className="absolute inset-0">
            <img
              src="Accomodation image/temple777.jpg"
              alt="Puri Jagannath Temple"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Accommodation in Puri</h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Discover the perfect place to stay near Jagannath Temple and Puri Beach
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Section title="Hotels Near Jagannath Temple" places={hotelsNearTemple} />
        <Section title="Mathas Near Jagannath Temple" places={mathas} />

        <Section title="Hotels Near Puri Sea Beach" places={hotelsNearBeach} />
        <BookingOptionsSection />
      </div>
    </Layout>
  );
};
export default HotelsNearJagannathTemple;