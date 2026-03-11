import React, { useState } from "react";
import Layout from '../components/Layout';
import { Phone, AlertTriangle, HeartPulse, Shield, User, Baby, Home } from 'lucide-react';

const Sos: React.FC = () => {
  const [showLocationMessage, setShowLocationMessage] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);

  const handleShareLocation = () => {
    setIsPulsing(true);
    setShowLocationMessage(true);
    setTimeout(() => {
      setShowLocationMessage(false);
      setIsPulsing(false);
    }, 3000);
  };

  const emergencyServices = [
    { label: "Ambulance", number: "108", icon: <HeartPulse className="w-6 h-6" />, color: "bg-red-100 text-red-600" },
    { label: "Fire", number: "101", icon: <AlertTriangle className="w-6 h-6" />, color: "bg-orange-100 text-orange-600" },
    { label: "Police", number: "100", icon: <Shield className="w-6 h-6" />, color: "bg-blue-100 text-blue-600" },
    { label: "Temple Helpline", number: "91-6752-222829", icon: <Home className="w-6 h-6" />, color: "bg-yellow-100 text-yellow-600" },
    { label: "Women's Helpline", number: "1091", icon: <User className="w-6 h-6" />, color: "bg-purple-100 text-purple-600" },
    { label: "Child Help", number: "1098", icon: <Baby className="w-6 h-6" />, color: "bg-pink-100 text-pink-600" },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Emergency pulse effect in background */}
        <div className={`absolute inset-0 bg-red-600 opacity-0 ${isPulsing ? 'animate-emergency-pulse' : ''}`}></div>
        
        {/* Floating emergency icons */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-white opacity-10"
              style={{
                fontSize: `${Math.random() * 30 + 20}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              <AlertTriangle className="w-8 h-8" />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="w-full max-w-4xl z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
              Jagannath Temple Emergency
            </h1>
            <p className="text-lg text-red-100 max-w-2xl mx-auto">
              Immediate assistance when you need it most
            </p>
          </div>

          {/* SOS Button */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative">
              {/* Pulsing rings */}
              <div className={`absolute inset-0 rounded-full bg-red-500 opacity-40 ${isPulsing ? 'animate-ping' : ''}`}></div>
              <div className={`absolute inset-0 rounded-full bg-red-500 opacity-20 ${isPulsing ? 'animate-ping' : ''}`} style={{ animationDelay: '0.5s' }}></div>
              
              {/* Main SOS button */}
              <a
                href="tel:911"
                className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40 bg-red-600 hover:bg-red-700 text-white text-4xl font-bold rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 border-4 border-white"
              >
                <div className="text-center">
                  <div className="text-3xl md:text-4xl">SOS</div>
                  <div className="text-xs md:text-sm font-normal mt-1">EMERGENCY</div>
                </div>
              </a>
            </div>

            {/* Location sharing */}
            <div className="mt-8 text-center">
              <button 
                onClick={handleShareLocation}
                className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-red-600 font-semibold py-3 px-6 rounded-full shadow-md transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                Share My Location
              </button>
              {showLocationMessage && (
                <div className="mt-3 bg-white text-green-600 font-medium py-2 px-4 rounded-lg shadow-md animate-fade-in">
                  Location shared with emergency responders!
                </div>
              )}
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center gap-2">
              <Phone className="w-6 h-6 text-red-600" />
              Emergency Contacts
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {emergencyServices.map((service, index) => (
                <a
                  key={index}
                  href={`tel:${service.number}`}
                  className={`flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105 ${service.color}`}
                >
                  <div className="p-3 rounded-full bg-white mb-3 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-center mb-1">{service.label}</h3>
                  <p className="text-lg font-extrabold">{service.number}</p>
                </a>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center text-sm text-gray-600">
              <p>For non-emergencies, contact temple administration at <a href="tel:+916752222002" className="text-blue-600 hover:underline">+91 6752 222002</a></p>
              <p className="mt-1">Available 24/7 for your safety and security</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes emergency-pulse {
          0% { opacity: 0; }
          50% { opacity: 0.2; }
          100% { opacity: 0; }
        }
        .animate-emergency-pulse {
          animation: emergency-pulse 1.5s ease-out;
        }
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Layout>
  );
};

export default Sos;