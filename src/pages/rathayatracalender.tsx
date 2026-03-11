import React, { useEffect, useState } from 'react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import './foldingCalendar.css';
import Layout from '../components/Layout';

interface FestivalDate {
  name: string;
  date: Date;
  description?: string;
  significance?: string;
  traditions?: string[];
}

const festivalDates: FestivalDate[] = [
  { 
    name: 'Snana Purnima', 
    date: new Date(2025, 5, 11),
    description: 'Annual bathing ceremony of the deities',
    significance: 'Purification ritual before the Rath Yatra',
    traditions: [
      'Deities bathed with 108 pots of water',
      'Special herbal preparations used',
      'Deities dressed in Gajanana (elephant) attire'
    ]
  },
  { 
    name: 'Rath Yatra', 
    date: new Date(2025, 5, 27),
    description: 'Grand chariot festival of Lord Jagannath',
    significance: 'Journey of the deities to Gundicha Temple',
    traditions: [
      'Three massive chariots pulled by devotees',
      'Millions gather for the procession',
      'Deities remain at Gundicha Temple for 9 days'
    ]
  },
  { 
    name: 'Bahuda Yatra', 
    date: new Date(2025, 6, 5),
    description: 'Return journey of the chariots',
    significance: 'Homecoming of the deities',
    traditions: [
      'Similar procession as Rath Yatra',
      'Special stop at Mausi Maa Temple',
      'Offering of Poda Pitha (burnt offering)'
    ]
  },
  { 
    name: 'Suna Besha', 
    date: new Date(2025, 6, 6),
    description: 'Golden attire of the deities',
    significance: 'Display of divine opulence',
    traditions: [
      'Deities adorned with gold ornaments',
      'Over 200kg of gold used',
      'Special evening darshan for devotees'
    ]
  },
  { 
    name: 'Adhara Pana', 
    date: new Date(2025, 6, 7),
    description: 'Offering of sweet drinks to the deities',
    significance: 'Final offering before return to main temple',
    traditions: [
      'Large pots of sweet drink offered',
      'Pots broken after offering',
      'Symbolic gesture of completion'
    ]
  },
  { 
    name: 'Niladri Bije', 
    date: new Date(2025, 6, 8),
    description: 'Return to the main temple',
    significance: 'Conclusion of Rath Yatra festivities',
    traditions: [
      'Deities return to sanctum sanctorum',
      'Lord Jagannath offers rasagulla to Lakshmi',
      'Special rituals mark the reunion'
    ]
  },
];

interface CalendarProps {
  month: number;
  year: number;
  onDayClick?: (day: Date) => void;
  selectedDay?: Date | null;
}

const Calendar: React.FC<CalendarProps> = ({ month, year, onDayClick, selectedDay }) => {
  const days = eachDayOfInterval({
    start: startOfMonth(new Date(year, month)),
    end: endOfMonth(new Date(year, month)),
  });

  return (
    <div className="calendar p-4 bg-white/90 shadow-xl rounded-2xl backdrop-blur-sm border border-orange-100">
      <h3 className="text-xl font-bold mb-4 text-orange-800 text-center font-serif">
        {format(new Date(year, month), 'MMMM yyyy')}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center p-1 text-xs font-medium text-orange-600 font-serif">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const isFestival = festivalDates.some((festival) => isSameDay(festival.date, day));
          const isSelected = selectedDay && isSameDay(selectedDay, day);
          const isToday = isSameDay(day, new Date());
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDayClick && onDayClick(day)}
              className={`text-center p-1 rounded-full text-sm transition-all duration-300 h-10 w-10 flex items-center justify-center mx-auto ${
                isSelected 
                  ? 'bg-orange-600 text-white scale-110 shadow-lg ring-2 ring-orange-300' 
                  : isFestival 
                    ? 'bg-yellow-400 font-semibold text-yellow-900 hover:bg-yellow-500 shadow-md' 
                    : isToday
                      ? 'bg-orange-100 text-orange-800 font-bold ring-1 ring-orange-300'
                      : 'bg-white text-gray-700 hover:bg-orange-50 border border-orange-50'
              } ${
                day.getDate() === 1 ? 'col-start-' + (day.getDay() + 1) : ''
              }`}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const FestivalCalendar: React.FC = () => {
  const [folding, setFolding] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedFestival, setSelectedFestival] = useState<FestivalDate | null>(null);
  const [isAutoFolding, setIsAutoFolding] = useState<boolean>(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoFolding) {
      interval = setInterval(() => {
        setFolding((prev) => !prev);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoFolding]);

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    const festival = festivalDates.find(f => isSameDay(f.date, day));
    setSelectedFestival(festival || null);
    setIsAutoFolding(false);
    setTimeout(() => setIsAutoFolding(true), 15000);
  };

  const handleFestivalClick = (festival: FestivalDate) => {
    setSelectedFestival(festival);
    setSelectedDay(festival.date);
    setIsAutoFolding(false);
    setTimeout(() => setIsAutoFolding(true), 15000);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-orange-900 mb-2 font-serif">
              Jagannath Puri Festival Calendar 2025
            </h1>
            <p className="text-orange-700 max-w-2xl mx-auto">
              Explore the sacred festivals of Lord Jagannath with dates, descriptions, and traditions
            </p>
          </div>
          
          <div className="perspective-1000 mb-12">
            <div 
              className={`folding-wrapper dramatic-fold ${folding ? 'fold-open' : 'fold-close'}`}
              onClick={() => setFolding(!folding)}
            >
              <div className="calendar-card transform-style-preserve-3d transition-transform duration-1000 ease-[cubic-bezier(0.68,-0.55,0.27,1.55)]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 backface-hidden p-4">
                  <Calendar 
                    month={5} 
                    year={2025} 
                    onDayClick={handleDayClick}
                    selectedDay={selectedDay}
                  />
                  <Calendar 
                    month={6} 
                    year={2025} 
                    onDayClick={handleDayClick}
                    selectedDay={selectedDay}
                  />
                </div>
              </div>
            </div>
          </div>

          {selectedFestival && (
            <div className="mt-8 bg-white/90 p-6 rounded-2xl shadow-xl backdrop-blur-sm animate-fadeIn border border-orange-100 mb-12">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-orange-600 text-white p-3 rounded-lg text-center min-w-20">
                      <div className="text-2xl font-bold">{format(selectedFestival.date, 'd')}</div>
                      <div className="text-xs uppercase">{format(selectedFestival.date, 'MMM')}</div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-orange-800 font-serif">
                        {selectedFestival.name}
                      </h3>
                      <p className="text-orange-600">{format(selectedFestival.date, 'EEEE, MMMM d, yyyy')}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    {selectedFestival.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-orange-800 mb-2 font-serif">Significance</h4>
                    <p className="text-gray-700">{selectedFestival.significance}</p>
                  </div>
                </div>
                
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-orange-800 mb-4 font-serif">Traditions & Rituals</h4>
                  <ul className="space-y-3">
                    {selectedFestival.traditions?.map((tradition, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-orange-100 text-orange-600 p-1 rounded-full mt-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-gray-700">{tradition}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12">
            <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center font-serif">
              Festival Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {festivalDates.map((festival) => (
                <div 
                  key={festival.name} 
                  className={`bg-white/90 p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border ${
                    selectedFestival?.name === festival.name 
                      ? 'border-orange-500 scale-[1.02] ring-2 ring-orange-200' 
                      : 'border-orange-100'
                  }`}
                  onClick={() => handleFestivalClick(festival)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-orange-100 text-orange-700 p-2 rounded-lg text-center min-w-12">
                      <div className="text-lg font-bold">{format(festival.date, 'd')}</div>
                      <div className="text-xs">{format(festival.date, 'MMM')}</div>
                    </div>
                    <h4 className="text-xl font-bold text-orange-800 font-serif">{festival.name}</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{festival.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                      {format(festival.date, 'EEEE')}
                    </span>
                    <button className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center">
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 text-center text-orange-700 text-sm">
            <p>Jai Jagannath! May Lord Jagannath bless you with happiness and prosperity.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FestivalCalendar;