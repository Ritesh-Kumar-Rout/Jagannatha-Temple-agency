/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import './Accomodation.css';
import Layout from '../components/Layout';
import StayHero from '../components/stay/StayHero';
import StayCard from '../components/stay/StayCard';
import StaySection from '../components/stay/StaySection';
import BookingPartners from '../components/stay/BookingPartners';

const HotelsNearJagannathTemple: React.FC = () => {
  const [stays, setStays] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cms/public/stays')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStays(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stays", err);
        setLoading(false);
      });
  }, []);

  const hotelsNearTemple = stays.filter(s => s.category === 'hotelsNearTemple');
  const mathas = stays.filter(s => s.category === 'mathas');
  const hotelsNearBeach = stays.filter(s => s.category === 'hotelsNearBeach');

  return (
    <Layout>
      <div className="stay-page-container">
        {/* Immersive Hero Section */}
        <StayHero />

        <main className="stay-main-content">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-festival-red"></div>
            </div>
          ) : (
            <>
              {/* Hotels Near Temple Section */}
              <StaySection 
                title="Sacred Stays Near the Temple" 
                subtitle="Find peaceful and spiritually uplifting accommodations within walking distance of Lord Jagannath's abode."
                places={hotelsNearTemple} 
              />

              {/* Mathas Section */}
              <StaySection 
                title="Traditional Mathas" 
                subtitle="Experience ancient monastic hospitality and sacred traditions in the heart of Puri."
                places={mathas} 
              />

              {/* Beach Hotels Section */}
              <StaySection 
                title="Coastal Comfort by the Sea" 
                subtitle="Relax in premium sea-facing hotels near Puri's golden beach, blending spiritual vibes with coastal breeze."
                places={hotelsNearBeach} 
              />
            </>
          )}

          {/* Booking Platforms / Partners Section */}
          <BookingPartners />
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stay-page-container {
          background-color: #fffbf0;
          min-height: 100vh;
        }
        .stay-main-content {
          position: relative;
          z-index: 1;
        }
        /* Subtle Temple Pattern Overlay */
        .stay-page-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B91C1C' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4v-4H4v4H0v2h4v4h2v-4h4v-2H6zm30 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        }
      `}} />
    </Layout>
  );
};

export default HotelsNearJagannathTemple;