import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';

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
  const [selectedAttraction, setSelectedAttraction] = useState(null);

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
      nextAttraction();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentAttraction = attractions[currentIndex];

  return (

      <section className="py-16 bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100 transition-all duration-1000 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title inline-block">Nearby Attractions</h2>
            <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
              Explore these incredible places around Puri during your Ratha Yatra visit.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl shadow-xl max-w-5xl mx-auto">
            <div
              className="relative h-96 cursor-pointer"
              onClick={() => setSelectedAttraction(currentAttraction)}
            >
              <img
                src={currentAttraction.image}
                alt={currentAttraction.title}
                className="w-full h-full object-cover"
                key={currentAttraction.id}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-2xl"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">
                  {currentAttraction.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="bg-festival-saffron px-3 py-1 rounded-full">
                    {currentAttraction.distance} from Jagannath Temple
                  </span>
                  <span className="bg-festival-red px-3 py-1 rounded-full">
                    Visiting hours: {currentAttraction.visitingHours}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={prevAttraction}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={nextAttraction}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {attractions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    index === currentIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Detailed Info Box */}
          {selectedAttraction && (
            <div className="mt-10 bg-white/80 backdrop-blur-md rounded-xl shadow p-6 max-w-4xl mx-auto border border-gray-300">
              <h3 className="text-2xl font-bold mb-2">{selectedAttraction.title}</h3>
              <p className="text-gray-700 mb-3">{selectedAttraction.description}</p>
              <p className="text-gray-600 italic mb-4">{selectedAttraction.history}</p>
              <a
                href={selectedAttraction.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-blue-600 font-semibold hover:underline"
              >
                📍 Get Directions on Google Maps
              </a>
            </div>
          )}
        </div>
      </section>
    
  );
};

export default Attractions;