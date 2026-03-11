
import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title inline-block">Upcoming Rituals</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Mark your calendar for these important Ratha Yatra events.
          </p>
        </div>
        
        <div className="bg-gray-50 rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={prevEvent} 
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
              <ChevronLeft className="w-6 h-6 text-festival-red" />
            </button>
            <div className="flex items-center text-festival-red">
              <Calendar className="w-6 h-6 mr-2" />
              <span className="text-lg font-medium">{formattedDate}</span>
            </div>
            <button 
              onClick={nextEvent} 
              className="p-2 rounded-full bg-white shadow hover:bg-gray-100"
            >
              <ChevronRight className="w-6 h-6 text-festival-red" />
            </button>
          </div>
          
          <div className="text-center py-6">
            <h3 className="text-2xl font-bold text-festival-saffron mb-3">{currentEvent.title}</h3>
            <p className="text-gray-600 mb-6">{currentEvent.description}</p>
            <Link 
              to="/rituals" 
              className="px-6 py-2 bg-festival-red text-white rounded-lg shadow hover:bg-red-700 transition-colors"
            >
              View All Rituals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RitualCalendar;
