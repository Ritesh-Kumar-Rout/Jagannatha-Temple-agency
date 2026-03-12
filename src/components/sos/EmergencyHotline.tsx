import React, { useState } from 'react';
import { Phone, MapPin, ShieldCheck, AlertTriangle } from 'lucide-react';

const EmergencyHotline: React.FC = () => {
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShareLocation = () => {
    setIsSharing(true);
    setTimeout(() => {
      setIsSharing(false);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 5000);
    }, 3000);
  };

  return (
    <div className="emergency-hotline-container p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        
        {/* Primary SOS Action Card */}
        <div className="relative group bg-white rounded-[3rem] border border-festival-red/20 shadow-xl overflow-hidden p-10 flex flex-col items-center text-center transition-all hover:shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-2 bg-festival-red"></div>
          
          <div className="relative mb-10 mt-4">
            {/* Pulsing Rings */}
            <div className="absolute inset-0 m-auto w-40 h-40 rounded-full bg-festival-red/20 animate-ping"></div>
            <div className="absolute inset-0 m-auto w-44 h-44 rounded-full bg-festival-red/10 animate-pulse delay-75"></div>
            
            <a 
              href="tel:112"
              className="relative z-10 flex items-center justify-center w-40 h-40 bg-festival-red hover:bg-red-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-[10px] border-[#fffbf0]"
            >
              <div className="flex flex-col items-center">
                <span className="text-5xl font-black mb-1 tracking-tighter">112</span>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] opacity-80">Tap to Call</span>
              </div>
            </a>
          </div>

          <h2 className="text-3xl font-serif font-black text-gray-900 mb-4">Emergency Hotline</h2>
          <p className="text-gray-500 font-medium mb-10 max-w-sm">
            Immediate connection to the state-wide emergency response system for Police, Fire, and Medical assistance.
          </p>

          <button 
            onClick={handleShareLocation}
            disabled={isSharing}
            className={`w-full max-w-xs py-5 px-8 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95
              ${isSharing 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#fffbf0] border-2 border-festival-red text-festival-red hover:bg-festival-red hover:text-white'}`}
          >
            {isSharing ? (
              <>
                <div className="w-5 h-5 border-2 border-festival-red/30 border-t-festival-red rounded-full animate-spin"></div>
                Initializing GPS...
              </>
            ) : (
              <>
                <MapPin size={18} />
                Share My Location
              </>
            )}
          </button>

          {shareSuccess && (
            <div className="absolute bottom-6 left-10 right-10 flex items-center justify-center gap-2 p-3 bg-green-50 text-green-600 rounded-2xl text-xs font-bold border border-green-100 animate-in fade-in slide-in-from-bottom-2">
              <ShieldCheck size={16} />
              Live GPS Coordinates Shared with Authorities
            </div>
          )}
        </div>

        {/* Safety Tips & Live Info */}
        <div className="flex flex-col gap-6">
          <div className="bg-festival-red rounded-[2.5rem] p-10 text-white relative overflow-hidden flex-grow shadow-xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <AlertTriangle size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-white/20 rounded-2xl">
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-serif font-black tracking-wide">Puri Safe Guide</h3>
              </div>
              
              <ul className="space-y-6">
                {[
                  "Stay updated with live crowd tracking on our Home page.",
                  "Identify the nearest designated medical camps (Pink Flags).",
                  "Keep your ID and emergency contact card with you.",
                  "In case of separation, proceed to the Child Help Desk (Grand Road)."
                ].map((tip, idx) => (
                  <li key={idx} className="flex gap-4 items-start text-white/90 font-medium">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black">
                      {idx + 1}
                    </span>
                    <p className="text-sm leading-relaxed">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-festival-cream p-8 shadow-lg flex items-center justify-between group hover:border-festival-red transition-colors cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-festival-gold/10 text-festival-gold rounded-3xl group-hover:bg-festival-red group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif font-black text-gray-900">Temple Admin</h4>
                <p className="text-sm text-gray-500 font-medium">For non-emergency assistance</p>
              </div>
            </div>
            <a href="tel:+916752222002" className="text-2xl font-black text-gray-900 hover:text-festival-red transition-colors">
              +91 6752 222002
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmergencyHotline;
