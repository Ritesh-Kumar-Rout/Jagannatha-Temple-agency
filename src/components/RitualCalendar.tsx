import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingElement } from './ui/FloatingElement';
import { Magnetic } from './ui/Magnetic';

// Sample ritual events data
const ritualEvents = [
  { 
    date: "2025-06-10", 
    title: "Snana Purnima", 
    description: "On this day, the idols of Lord Jagannath, Balabhadra, and Subhadra are brought out to the Snana Mandap and bathed with 108 pots of holy water drawn from the Golden Well. This ritual marks the beginning of the Ratha Yatra festival and is believed to be the ceremonial purification of the deities."
  },
  { 
    date: "2025-06-11", 
    title: "Anasara Begins", 
    description: "After Snana Purnima, the deities fall 'ill' and remain in seclusion for 15 days. This period, known as Anasara, restricts public darshan as they recover with the help of 'Phuluri oil' and secret rituals performed by the temple priests."
  },
  { 
    date: "2025-06-26", 
    title: "Netrotsava", 
    description: "The deities are 'healed' and their eyes are ceremonially repainted. This is the first public appearance (Nava Jaubana) of the Lords after Anasara. It’s considered highly auspicious to get darshan on this day."
  },
  { 
    date: "2025-06-27", 
    title: "Ratha Yatra Begins", 
    description: "The deities ride massive, beautifully decorated wooden chariots from the Jagannath Temple to the Gundicha Temple, symbolizing their annual visit to their aunt's place. Devotees pull the chariots through the Grand Road (Bada Danda)."
  },
  { 
    date: "2025-07-01", 
    title: "Hera Panchami", 
    description: "On the fifth day of the stay at Gundicha Temple, Goddess Lakshmi visits Lord Jagannath to express her displeasure for not being taken along. The ritual involves a symbolic act of jealousy and love."
  },
  { 
    date: "2025-07-05", 
    title: "Bahuda Yatra", 
    description: "The deities begin their return journey from Gundicha Temple to the Jagannath Temple in their respective chariots. This event attracts massive crowds and devotion as the Lords travel back home."
  },
  { 
    date: "2025-07-06", 
    title: "Suna Besha", 
    description: "After the return, Lord Jagannath and His siblings appear in golden attire (Suna Besha) while still on the chariots. This majestic sight of the Lords decorated in gold ornaments is considered one of the most divine darshans."
  },
  { 
    date: "2025-07-07", 
    title: "Niladri Bije", 
    description: "The deities finally return to the sanctum sanctorum of the Jagannath Temple. Goddess Lakshmi initially blocks the entrance, but Lord Jagannath placates her with Rasagolas — a ritual symbolizing love and reunion."
  }
];

const RitualCalendar = () => {
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  
  const nextEvent = () => {
    setCurrentEventIndex((prevIndex) => 
      prevIndex === ritualEvents.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevEvent = () => {
    setCurrentEventIndex((prevIndex) => 
      prevIndex === 0 ? ritualEvents.length - 1 : prevIndex - 1
    );
  };

  const currentEvent = ritualEvents[currentEventIndex];
  const formattedDate = new Date(currentEvent.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="py-24 bg-gradient-to-t from-white to-orange-50/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="section-title inline-block">Upcoming Rituals</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Mark your calendar for these important Ratha Yatra events.
          </p>
        </motion.div>
        
        <FloatingElement duration={5} yOffset={12}>
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.05)] p-8 md:p-12 max-w-4xl mx-auto relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-festival-saffron/10 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex justify-between items-center mb-10">
              <Magnetic strength={0.3}>
                <button 
                  onClick={prevEvent} 
                  className="p-3 md:p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all border border-gray-100"
                >
                  <ChevronLeft className="w-6 h-6 text-festival-red" />
                </button>
              </Magnetic>
              <div className="flex flex-col md:flex-row items-center text-festival-red bg-red-50/50 px-6 py-3 rounded-2xl">
                <Calendar className="w-5 h-5 md:mr-3 mb-2 md:mb-0" />
                <span className="text-xl font-bold tracking-wide">{formattedDate}</span>
              </div>
              <Magnetic strength={0.3}>
                <button 
                  onClick={nextEvent} 
                  className="p-3 md:p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all border border-gray-100"
                >
                  <ChevronRight className="w-6 h-6 text-festival-red" />
                </button>
              </Magnetic>
            </div>
            
            <div className="text-center py-6 relative overflow-hidden h-64 md:h-56 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentEvent.title}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <h3 className="text-3xl font-black text-festival-saffron mb-4">{currentEvent.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">{currentEvent.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="text-center mt-4">
              <Magnetic strength={0.2}>
                <Link 
                  to="/rituals" 
                  className="inline-block px-8 py-4 bg-festival-red text-white font-bold rounded-2xl shadow-xl shadow-festival-red/20 hover:scale-105 transition-all"
                >
                  View All Rituals
                </Link>
              </Magnetic>
            </div>
          </div>
        </FloatingElement>
      </div>
    </motion.section>
  );
};

export default RitualCalendar;
