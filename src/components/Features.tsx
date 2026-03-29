import { MapPin, Hotel, Calendar, Video, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tilt3D } from './ui/Tilt3D';
import { FloatingElement } from './ui/FloatingElement';

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
    <section className="py-20 bg-gradient-to-br from-[#fff7f0] via-[#f9f0ff] to-[#ffffff] text-gray-800 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, type: "spring" }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-extrabold text-[#D97706] inline-block">Explore RathaYatraVerse</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Dive into a serene and immersive Ratha Yatra journey — all in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const isAnchor = feature.link?.startsWith('#');
            const CardContent = (
              <Tilt3D perspective={1500} maxRotation={10} className="h-full">
                <FloatingElement delay={index * 0.2} duration={4 + (index % 3)} yOffset={8} className="h-full">
                  <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] hover:bg-white/80 transition-all duration-500 group h-full flex flex-col items-start relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-gradient-to-br from-purple-200/40 to-orange-200/40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="mb-6 p-4 bg-white/80 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-[#7c3aed] group-hover:text-[#D97706] transition-colors relative z-10">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed relative z-10">{feature.description}</p>
                  </div>
                </FloatingElement>
              </Tilt3D>
            );

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 100 }}
                className="h-full"
              >
                {isAnchor ? (
                  <a href={feature.link} className="hover:no-underline block h-full">
                    {CardContent}
                  </a>
                ) : (
                  <Link to={feature.link} className="hover:no-underline block h-full">
                    {CardContent}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
