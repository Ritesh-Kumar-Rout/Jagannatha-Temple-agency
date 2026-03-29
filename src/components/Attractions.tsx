import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt3D } from './ui/Tilt3D';
import { FloatingElement } from './ui/FloatingElement';

const attractions = [
  {
    id: 1,
    title: "Jagannath Temple",
    description:
      "The Jagannath Temple in Puri is one of the most sacred pilgrimage sites for Hindus, particularly followers of the Vaishnava tradition. This 12th-century architectural marvel is dedicated to Lord Jagannath, an incarnation of Lord Vishnu, along with his siblings Balabhadra and Subhadra. The temple is renowned for the annual Ratha Yatra, during which the deities are taken out in a grand procession. Apart from its spiritual significance, the temple’s Kalinga-style architecture, massive wooden chariots, and the mystery of the temple's flag and Sudarshan Chakra continue to attract thousands of devotees and tourists from around the world every day..",
    history:
      "Built in the 12th century by King Anantavarman Chodaganga Deva, this temple is one of the Char Dham pilgrimages.",
    image: "jagannath-temple.jpeg",
    distance: "0 km",
    visitingHours: "5:00 AM - 10:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Jagannath+Temple+Puri"
  },
  {
    id: 2,
    title: "Puri Beach",
    description:
      "Puri Beach is a serene and spiritual location where the sacred meets the scenic. This golden-sand beach along the Bay of Bengal is not only a place to relax but also a sacred site for ritual bathing by pilgrims visiting Jagannath Temple. The sunrises and sunsets here are a visual delight, and the rhythmic sound of waves provides a calming backdrop. Puri Beach also hosts annual sand art festivals, often showcasing mesmerizing sculptures by local and international artists. The beachside is bustling with local eateries and small shops, making it a lively yet peaceful spot to unwind during your trip.",
    history:
      "Puri Beach is known for its spiritual ambiance and is often visited by pilgrims and tourists alike.",
    image: "famous-beach-in-puri-1024x576.jpg",
    distance: "1.5 km",
    visitingHours: "Open 24 hours",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Puri+Beach"
  },
  {
    id: 3,
    title: "Konark Sun Temple",
    description:
      "The Konark Sun Temple is a UNESCO World Heritage Site and an architectural wonder of Odisha. Built in the 13th century, the temple is designed in the shape of a colossal chariot dedicated to the Sun God, Surya. Adorned with intricate carvings of deities, musicians, dancers, and mythical animals, it showcases the pinnacle of Kalinga architecture. The temple was once a functioning astronomical observatory and a center for sun worship. Though partially in ruins today, it continues to inspire awe and reverence among visitors. It’s a must-visit for history lovers, spiritual seekers, and architecture enthusiasts alike.",
    history:
      "Constructed in the 13th century by King Narasimhadeva I, it's shaped like a colossal chariot.",
    image: "konark_temp.jpg",
    distance: "35 km",
    visitingHours: "6:00 AM - 8:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Konark+Sun+Temple"
  },
  {
    id: 4,
    title: "Chilika Lake",
    description:
      "Chilika Lake is Asia's largest brackish water lagoon and a paradise for bird watchers and nature enthusiasts. Spanning over 1,100 square kilometers, it attracts hundreds of species of migratory birds every winter, including flamingos, herons, and pelicans. The lake is also home to the rare Irrawaddy dolphins. Boating through its calm waters offers views of tiny islands, fishing villages, and wildlife. Nalabana Island, within the lake, is a declared bird sanctuary. Whether you're here for photography, birdwatching, or just a peaceful retreat into nature, Chilika Lake offers a rejuvenating escape from the hustle of daily life.",
    history:
      "Chilika is a biodiversity hotspot and home to a wide variety of flora and fauna.",
    image: "Chilika Lake.png",
    distance: "60 km",
    visitingHours: "5:00 AM - 7:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Chilika+Lake"
  }
];

const Attractions = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAttraction, setSelectedAttraction] = useState<any>(null);

  const nextAttraction = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === attractions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevAttraction = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? attractions.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!selectedAttraction) {
        nextAttraction();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedAttraction]);

  const currentAttraction = attractions[currentIndex];

  return (
    <section className="py-24 bg-gradient-to-br from-pink-50/50 via-yellow-50/50 to-blue-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring" }}
          className="text-center mb-16"
        >
          <h2 className="section-title inline-block">Nearby Attractions</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            Explore these incredible places around Puri during your Ratha Yatra visit.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 1.5 }}
          className="relative max-w-5xl mx-auto"
        >
          <Tilt3D perspective={2000} maxRotation={5}>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl h-64 sm:h-80 md:h-[500px] cursor-pointer group" onClick={() => setSelectedAttraction(currentAttraction)}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentAttraction.id}
                  src={currentAttraction.image}
                  alt={currentAttraction.title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                <motion.h3 
                  key={`title-${currentAttraction.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl font-black mb-4"
                >
                  {currentAttraction.title}
                </motion.h3>
                <div className="flex flex-wrap gap-4 text-sm font-bold tracking-wider">
                  <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
                    {currentAttraction.distance} from Temple
                  </span>
                  <span className="bg-festival-red/80 backdrop-blur-md px-4 py-2 rounded-full border border-festival-red/50">
                    {currentAttraction.visitingHours}
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                <span className="bg-white/20 backdrop-blur-lg border border-white/50 text-white px-6 py-3 rounded-full font-bold tracking-widest uppercase text-sm">Click to View Details</span>
              </div>
            </div>
          </Tilt3D>

          <button
            onClick={(e) => { e.stopPropagation(); prevAttraction(); }}
            className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/50 backdrop-blur-xl shadow-xl hover:bg-white hover:scale-110 transition-all z-20 text-gray-800"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextAttraction(); }}
            className="absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/50 backdrop-blur-xl shadow-xl hover:bg-white hover:scale-110 transition-all z-20 text-gray-800"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex space-x-3">
            {attractions.map((_, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex ? 'w-8 h-2.5 bg-festival-red' : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </motion.div>

        <AnimatePresence>
          {selectedAttraction && (
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="mt-20 max-w-4xl mx-auto"
            >
              <FloatingElement duration={6} yOffset={10}>
                <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-festival-saffron via-festival-red to-festival-gold"></div>
                  <button 
                    onClick={() => setSelectedAttraction(null)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-gray-900">{selectedAttraction.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">{selectedAttraction.description}</p>
                  <div className="bg-gray-50/50 rounded-2xl p-6 mb-6">
                    <p className="text-gray-600 italic font-medium">✨ {selectedAttraction.history}</p>
                  </div>
                  <a
                    href={selectedAttraction.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                  >
                    <MapPin className="w-5 h-5" />
                    Get Directions on Maps
                  </a>
                </div>
              </FloatingElement>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Attractions;