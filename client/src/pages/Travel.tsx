/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from '../components/Layout';
import {
  Train, BusFront, Plane, MapPin, ChevronRight, Clock,
  Hotel, Luggage, Users, Sun
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Travel = () => {
  const [userLocation, setUserLocation] = useState('');
  const [activeTab, setActiveTab] = useState('transport');
  const [selectedOption, setSelectedOption] = useState<Record<string, any> | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [transportOptions, setTransportOptions] = useState<Record<string, any>[]>([]);
  const [loading, setLoading] = useState(true);

  const getCurrentLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const address = data.display_name || `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
              setUserLocation(address);
              setIsLocating(false);
            })
            .catch(() => {
              setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              setIsLocating(false);
            });
        },
        () => {
          setUserLocation('New Delhi, India');
          setIsLocating(false);
        }
      );
    } else {
      setUserLocation('New Delhi, India');
      setIsLocating(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
    
    // Fetch dynamic travel options
    fetch('/api/cms/public/travels')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTransportOptions(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch travels", err);
        setLoading(false);
      });
  }, []);

  const travelEssentials = [
    {
      icon: <Hotel className="w-6 h-6" />,
      title: "Accommodation",
      description: "Temple guest houses to luxury hotels near sea beach",
      link: "#"
    },
    {
      icon: <Luggage className="w-6 h-6" />,
      title: "Packing Guide",
      description: "What to bring for your spiritual journey",
      link: "#"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Tour Guides",
      description: "Certified temple guides and tour packages",
      link: "#"
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Weather",
      description: "Best seasons to visit and what to expect",
      link: "#"
    }
  ];

  const generateRouteLink = () => {
    return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(userLocation)}&destination=Puri,+Odisha&travelmode=driving`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-5 md:px-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/3 w-48 h-48 bg-yellow-300 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Journey to <span className="text-yellow-300">Puri</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Your complete guide to reaching the sacred Jagannath Temple
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setActiveTab('transport')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'transport' ? 'bg-white text-indigo-600 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
              >
                Transportation
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`px-6 py-3 rounded-full font-medium transition-all ${activeTab === 'tips' ? 'bg-white text-indigo-600 shadow-lg' : 'bg-white/10 hover:bg-white/20'}`}
              >
                Travel Tips
              </button>
            </div>
          </div>
        </div>

        <div className="py-12 px-5 md:px-20 max-w-7xl mx-auto">
          {activeTab === 'transport' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 min-h-[200px]">
                {loading ? (
                  <div className="col-span-full flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                  </div>
                ) : transportOptions.length > 0 ? (
                  transportOptions.map((option) => (
                    <div
                      key={option._id || option.id}
                      className={`relative overflow-hidden group rounded-2xl shadow-xl bg-white transition-all duration-300 hover:shadow-2xl ${selectedOption === (option._id || option.id) ? 'ring-4 ring-indigo-400 scale-[1.02]' : ''}`}
                      onClick={() => setSelectedOption(selectedOption === (option._id || option.id) ? null : (option._id || option.id))}
                    >
                      <div className={`absolute inset-x-0 top-0 h-2 bg-gradient-to-r ${option.transport_type === 'train' ? 'from-indigo-500 to-blue-600' : option.transport_type === 'flight' ? 'from-purple-500 to-fuchsia-600' : 'from-green-500 to-teal-600'}`}></div>
                      <div className="p-6">
                        <div className="flex items-center mb-5">
                          <div className={`p-3 rounded-lg bg-gradient-to-br ${option.transport_type === 'train' ? 'from-indigo-500 to-blue-600' : option.transport_type === 'flight' ? 'from-purple-500 to-fuchsia-600' : 'from-green-500 to-teal-600'} text-white mr-4`}>
                            {option.transport_type === 'train' ? <Train className="w-10 h-10" /> : option.transport_type === 'flight' ? <Plane className="w-10 h-10" /> : <BusFront className="w-10 h-10" />}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800">{option.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6">{option.description}</p>
                        
                        {selectedOption === (option._id || option.id) && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                              Details
                            </h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex">
                                <span className="text-indigo-500 mr-2">•</span>
                                Timing: {option.timing}
                              </li>
                              <li className="flex">
                                <span className="text-indigo-500 mr-2">•</span>
                                Price: {option.price}
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-500 py-10">
                    No travel options available. Add them from the admin panel.
                  </div>
                )}
              </div>

              {/* Route Planner */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-8 md:p-12">
                    <h3 className="text-2xl font-bold mb-4">Personalized Route Planner</h3>
                    <p className="mb-6">Get customized directions from your current location to Puri</p>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-yellow-300" />
                      <span>Puri, Odisha 752002</span>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 md:p-12">
                    <label className="block text-gray-700 mb-2">Your Location</label>
                    <div className="flex gap-2 mb-4">
                      <input
                        type="text"
                        value={userLocation}
                        onChange={(e) => setUserLocation(e.target.value)}
                        placeholder="City, address or landmark..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                      />
                      <button
                        onClick={getCurrentLocation}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                      >
                        {isLocating ? 'Locating...' : 'Use GPS'}
                      </button>
                    </div>
                    <a
                      href={generateRouteLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
                    >
                      Get Directions to Puri
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'tips' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {travelEssentials.map((item, index) => (
                <div key={index} className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition">
                  <div className="mb-4 text-indigo-600">{item.icon}</div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Travel;
