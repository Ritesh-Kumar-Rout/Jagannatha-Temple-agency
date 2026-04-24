/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import AttractionHero from '../components/attractions/AttractionHero';
import AttractionCard from '../components/attractions/AttractionCard';
import AttractionModal from '../components/attractions/AttractionModal';

const PuriExcursions: React.FC = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [attractions, setAttractions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/public/attractions')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAttractions(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch attractions", err);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = (attraction: any) => {
    setSelectedAttraction(attraction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="attractions-page-wrapper min-h-screen bg-[#fffbf0] relative overflow-x-hidden">
        {/* Immersive Hero Section */}
        <AttractionHero />

        {/* Main Content Grid */}
        <main className="relative z-10 py-24 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl md:text-5xl font-serif font-black text-festival-red mb-6 tracking-tight">
              Explore the Treasures of Odisha
            </h2>
            <div className="h-1 w-24 bg-festival-gold/40 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Venture beyond the grand road to discover ancient marvels, golden beaches, and the soul-stirring heritage of Lord Jagannath's land.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 min-h-[300px]">
            {loading ? (
              <div className="col-span-full flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-festival-red"></div>
              </div>
            ) : attractions.length > 0 ? (
              attractions.map((attraction) => (
                <AttractionCard 
                  key={attraction._id || attraction.id} 
                  attraction={attraction} 
                  onClick={() => handleOpenModal(attraction)}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                No attractions available. Add them from the admin panel.
              </div>
            )}
          </div>
        </main>

        {/* Attraction Detail Modal */}
        <AttractionModal 
          attraction={selectedAttraction}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />

        {/* Decorative Background Texture */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="temple-pattern-bg" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M50 10 L60 40 L40 40 Z M50 5 L55 20 L45 20 Z" fill="none" stroke="#B91C1C" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#temple-pattern-bg)" />
          </svg>
        </div>

        {/* Global Styles & Animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          .attractions-page-wrapper::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B91C1C' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4v-4H4v4H0v2h4v4h2v-4h4v-2H6zm30 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            pointer-events: none;
            opacity: 0.5;
            z-index: 1;
          }

          @keyframes pulse-slow {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 15s ease-in-out infinite;
          }
        `}} />
      </div>
    </Layout>
  );
};

export default PuriExcursions;