import { MapPin, Hotel, Calendar, Video, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <MapPin className="w-10 h-10 text-festival-saffron" />,
    title: 'Travel Guide',
    description: 'Interactive maps and travel routes to Puri with real-time updates for trains, buses, and flights.',
    link: '/travel'
  },
  {
    icon: <Hotel className="w-10 h-10 text-festival-saffron" />,
    title: 'Accommodation',
    description: 'Find hotels, dharmashalas, and lodges near the temple with price filters and availability.',
    link: '/stay'
  },
  {
    icon: <Users className="w-10 h-10 text-festival-saffron" />,
    title: 'SOS',
    description: 'List of Emergency Contacts, All type of contacts Police,Fire,Temple Administration etc.',
    link: '/Sos'
  },
  {
    icon: <Clock className="w-10 h-10 text-festival-saffron" />,
    title: 'Temple Rituals',
    description: 'Daily rituals calendar with special Ratha Yatra ceremonies and their detailed descriptions.',
    link: '/rituals'
  },
  {
    icon: <Calendar className="w-10 h-10 text-festival-saffron" />,
    title: 'Ratha Yatra Calendar',
    description: 'Complete calendar of all rituals, processions, and key festival dates.',
    link: '/rathayatracalender'
  },
  {
    icon: <Video className="w-10 h-10 text-festival-saffron" />,
    title: 'Live Streaming',
    description: 'Watch live streaming of the Ratha Yatra procession and other major temple festivals.',
    link:'#live-stream'
  }
];

const Features = () => {
  
  return (

<section className="py-20 bg-gradient-to-br from-[#fff7f0] via-[#f9f0ff] to-[#ffffff] text-gray-800">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-14">
      <h2 className="text-4xl font-extrabold text-[#D97706]">Explore RathaYatraVerse</h2>
      <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
        Dive into a serene and immersive Ratha Yatra journey — all in one place.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {features.map((feature, index) => {
  const isAnchor = feature.link?.startsWith('#');
  return isAnchor ? (
    <a href={feature.link} key={index} className="hover:no-underline">
      <div className="bg-white border border-[#f5e8ff] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group">
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-[#7c3aed] group-hover:text-[#D97706] transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </a>
  ) : (
    <Link to={feature.link} key={index} className="hover:no-underline">
      <div className="bg-white border border-[#f5e8ff] rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 group">
        <div className="mb-4">{feature.icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-[#7c3aed] group-hover:text-[#D97706] transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </Link>
  );
})}
    </div>
  </div>
</section>
  );
};

export default Features;
