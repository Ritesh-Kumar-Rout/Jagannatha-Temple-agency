/* eslint-disable @typescript-eslint/no-explicit-any */
import Layout from '../components/Layout';
import React, { useState, useEffect } from 'react';
import { Flower2, Loader2 } from 'lucide-react';
import './Rituals.css';
import RitualCard from '../components/rituals/RitualCard';
import RitualDetailsModal from '../components/rituals/RitualDetailsModal';

const JagannathTempleRituals = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeRitual, setActiveRitual] = useState<any>(null);
  const [rituals, setRituals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/public/rituals')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setRituals(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch rituals", err);
        setLoading(false);
      });
  }, []);

  const handleOpenRitual = (ritual: any) => {
    setActiveRitual(ritual);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Layout>
      <div className="rituals-page">
        {/* Immersive Hero Section */}
        <header className="rituals-hero">
          <div className="hero-content">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festival-gold/10 border border-festival-gold/20 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-festival-gold animate-pulse"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-festival-gold">Divine Traditions</span>
            </div>
            <h1 className="drop-shadow-2xl">Sacred Rituals</h1>
            <p className="drop-shadow-md">
              Explore the divine ceremonies and traditions of Lord Jagannath's grand festival, carried out with devotion for centuries.
            </p>
          </div>
        </header>

        {/* Section Header with Ornament */}
        <div className="rituals-section-header">
          <div className="ritual-ornament">
            <div className="ornament-line"></div>
            <Flower2 className="ornament-icon animate-spin-slow" size={24} />
            <div className="ornament-line right"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-serif text-festival-red mb-4 uppercase tracking-[0.2em]">
            Ancient Observances
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            From daily sevas to grand annual ceremonies, witness the intricate details of temple worship that have remained unchanged for generations.
          </p>
        </div>

        {/* Modern Grid Layout with Components */}
        <main className="rituals-grid-wrapper min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-full pt-20">
              <Loader2 className="w-8 h-8 text-festival-red animate-spin" />
            </div>
          ) : (
            <div className="rituals-grid animate-in fade-in slide-in-from-bottom-5 duration-700">
              {rituals.map((ritual) => (
                <RitualCard 
                  key={ritual._id || ritual.id} 
                  ritual={ritual} 
                  onClick={handleOpenRitual} 
                />
              ))}
              {rituals.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">
                  No rituals available. Add them from the admin panel.
                </div>
              )}
            </div>
          )}
        </main>

        {/* Enhanced Ritual Details Modal */}
        {showModal && activeRitual && (
          <RitualDetailsModal 
            ritual={activeRitual} 
            onClose={handleCloseModal} 
          />
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #fdfaf3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 0, 0.2);
          border-radius: 10px;
          border: 2px solid #fdfaf3;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 0, 0.4);
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </Layout>
  );
};

export default JagannathTempleRituals;