import React from 'react';
import Layout from '../components/Layout';
import { emergencyServices } from '../lib/data';
import SosHero from '../components/sos/SosHero';
import EmergencyHotline from '../components/sos/EmergencyHotline';
import SosDirectory from '../components/sos/SosDirectory';

const Sos: React.FC = () => {
  return (
    <Layout>
      <div className="sos-page-wrapper min-h-screen bg-[#fffbf0] relative overflow-x-hidden">
        {/* Immersive Hero Section */}
        <SosHero />

        {/* Primary SOS Action Dashboard */}
        <main className="relative z-10 pt-16">
          <EmergencyHotline />
          
          {/* Categorized Contact Directory */}
          <SosDirectory services={emergencyServices} />
        </main>

        {/* Decorative Bottom Section */}
        <section className="py-24 bg-festival-red/5 border-t border-festival-red/10 text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="w-24 h-24 bg-white rounded-full mx-auto mb-10 shadow-xl flex items-center justify-center border-4 border-festival-red/20 animate-float">
               <img src="/Accomodation image/purilogo.png" alt="Puri Police" className="w-14 h-14" />
            </div>
            <h2 className="text-3xl font-serif font-black text-festival-red mb-6 tracking-wider uppercase">Divine Guard & Mortal Vigil</h2>
            <p className="text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto italic">
              "Providing safety for the millions who come to seek the Lord's blessing. Our teams are stationed at every corner of the Grand Road to ensure a peaceful and secure festival experience."
            </p>
            <p className="mt-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
              Official Safety Guide • Ratha Yatra 2026
            </p>
          </div>
        </section>

        {/* Styling and Global Transitions */}
        <style dangerouslySetInnerHTML={{ __html: `
          .sos-page-wrapper::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B91C1C' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4v-4H4v4H0v2h4v4h2v-4h4v-2H6zm30 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            pointer-events: none;
            opacity: 0.6;
            z-index: 1;
          }

          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }

          .animate-float {
            animation: float 5s ease-in-out infinite;
          }

          /* Custom Scrollbar for better UX */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: #fffbf0;
          }
          ::-webkit-scrollbar-thumb {
            background: #e2e8f0;
            border-radius: 10px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: #cbd5e1;
          }
        `}} />
      </div>
    </Layout>
  );
};

export default Sos;