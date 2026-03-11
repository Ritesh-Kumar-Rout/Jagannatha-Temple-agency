import Layout from '../components/Layout';
import React, { useState } from 'react';
import './Rituals.css';

const JagannathTempleRituals = () => {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const rituals = [
    {
      id: 1,
      title: "🕉 Daily Rituals at Jagannath Temple",
      emoji: "🕉",
      shortDesc: "The daily worship rituals of Lord Jagannath",
      details: "These are performed year-round, including during the Ratha Yatra season:\n\n" +
               "📦 Ritual Box: Daily Sevas\n" +
               "Dwara Phita – Opening of the temple doors early morning.\n\n" +
               "Mangala Arati – Morning prayer and aarti.\n\n" +
               "Mailam – Removal of previous day's flowers and clothes.\n\n" +
               "Abakasha – Ritual bath and brushing of deities' teeth.\n\n" +
               "Sakala Dhupa – Morning offering of cooked food.\n\n" +
               "Madhyanna Dhupa – Midday food offering.\n\n" +
               "Sandhya Dhupa – Evening aarti and offerings.\n\n" +
               "Badasinghara Dhupa – Nighttime offering with devotional songs and floral decoration.\n\n" +
               "Pahuda – Deities are put to rest; doors closed for the day.",
      image: "Balabhadra_Subhadra_Jagannath.jpg"
    },
    {
      id: 2,
      title: "💧 Snana Purnima Rituals",
      emoji: "💧",
      shortDesc: "The sacred bathing ceremony of the deities",
      details: "This marks the beginning of the Ratha Yatra cycle.\n\n" +
               "📦 Ritual Box: Snana Purnima\n" +
               "Jalabhishek – 108 pitchers of sacred water are poured on each deity (Jagannath, Balabhadra, Subhadra).\n\n" +
               "Snana Mandap Darshan – Public viewing of the deities during the bath.\n\n" +
               "Hati Besha – The deities appear in elephant attire after the bath.\n\n" +
               "Anasara Ghara – After bathing, the deities fall 'sick' and retreat into isolation.\n\n" +
               "Pati Dian (Secret Deity) – During this time, devotees worship a painted wooden representation of Jagannath (Pati Dian).",
      image: "Snana Purnima Rituals.jpg"
    },
    {
      id: 3,
      title: " Gundicha Yatra Rituals",
      emoji: "🛕",
      shortDesc: "The famous Rath Yatra festival rituals",
      details: "Celebrated on the Dwitiya Tithi of Ashadha Shukla Paksha.\n\n" +
               "📦 Ritual Box: Gundicha Yatra\n" +
               "Netrotsava – Day before Ratha Yatra, divine sight of the deity is restored.\n\n" +
               "Pahandi Bije – Grand procession of the deities from temple to chariots.\n\n" +
               "Chhera Pahanra – Gajapati King sweeps the chariots with a golden broom.\n\n" +
               "Ratha Pratistha – Installation of deities on their respective chariots.\n\n" +
               "Chariot Pulling – Devotees pull the chariots to Gundicha Temple, about 3 km away.\n\n" +
               "Devas stay at Gundicha – Deities rest here for 7 days in a peaceful and festive environment.",
      image: "Jagannath-Rath-Yatra-Puri-rituals.jpg"
    },
    {
      id: 4,
      title: " Bahuda Yatra",
      emoji: "",
      shortDesc: "The return journey of the deities",
      details: "The deities begin their journey back to the main temple.\n\n" +
               "📦 Ritual Box: Bahuda Yatra\n" +
               "Bahuda Pahandi – Procession of deities back to chariots from Gundicha Temple.\n\n" +
               "Bahuda Ratha Yatra – Chariots are pulled back to the main temple.\n\n" +
               "Mausi Maa Temple Stop – Deities stop at Mausi Maa Temple and offered Poda Pitha (a special rice cake).",
      image: "Happy Bahuda Jatra wishes in Odia 2022.jpg"
    },
    {
      id: 5,
      title: " Suna Besha",
      emoji: "",
      shortDesc: "The golden attire of the deities",
      details: "The deities are adorned in gold ornaments.\n\n" +
               "📦 Ritual Box: Suna Besha\n" +
               "Golden Attire – Deities are decorated with gold ornaments while still on the chariots.\n\n" +
               "Public Viewing – Devotees get darshan of the deities in this magnificent form.\n\n" +
               "Special Offerings – Special prayers and offerings are made during this time.",
      image: "Hotel sagar kanya.jpg"
    },
    {
      id: 6,
      title: " Adhara Pana",
      emoji: "",
      shortDesc: "The ceremonial offering of sweet drink",
      details: "The deities are offered a refreshing drink.\n\n" +
               "📦 Ritual Box: Adhara Pana\n" +
               "Sweet Offering – Deities are offered a sweet drink in giant earthen pots.\n\n" +
               "Symbolic Refreshment – Represents the deities being refreshed after their long journey.\n\n" +
               "Distribution – The remaining drink is distributed among devotees as prasad.",
      image: "Adhara pana.jpg"
    },
    {
      id: 7,
      title: " Niladri Bije",
      emoji: "",
      shortDesc: "The final return to the temple",
      details: "The conclusion of the Rath Yatra festival.\n\n" +
               "📦 Ritual Box: Niladri Bije\n" +
               "Lakshmi's Anger – Goddess Lakshmi closes the temple gate, upset for being left behind.\n\n" +
               "Jagannath's Plea – Lord Jagannath appeases her with gifts.\n\n" +
               "Re-entry – Deities are finally taken inside the temple, ending the Rath Yatra festival.",
      image: "niladri-bije.jpeg"
    }
  ];

  const handleCardClick = (id) => {
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  const openModal = (ritual) => {
    setModalContent(ritual);
    setShowModal(true);
  };

  return (
    <Layout>
      <div className="temple-app">
        {/* Hero Section */}
        <header className="hero">
          <div className="hero-overlay">
            <h1>Jagannath Temple Rituals</h1>
            <p>Discover the sacred traditions of Puri's famous temple</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="container">
          <div className="rituals-grid">
            {rituals.map((ritual) => (
              <div 
                key={ritual.id}
                className={`ritual-card ${expandedCardId === ritual.id ? 'expanded' : ''}`}
                onClick={() => handleCardClick(ritual.id)}
              >
                <div className="card-header">
                  <span className="emoji">{ritual.emoji}</span>
                  <h3>{ritual.title}</h3>
                </div>
                <p className="short-desc">{ritual.shortDesc}</p>
                
                {expandedCardId === ritual.id && (
                  <div className="card-details">
                    <p>{ritual.details}</p>
                    <button 
                      className="learn-more-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(ritual);
                      }}
                    >
                      View Images & Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </main>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
              <h2>{modalContent.title}</h2>
              <div className="modal-body">
                <div className="modal-image-container">
                  {modalContent.image ? (
                    <img 
                      src={modalContent.image} 
                      alt={modalContent.title} 
                      className="ritual-image"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "placeholder-image.jpg";
                      }}
                    />
                  ) : (
                    <div className="image-placeholder">
                      Image not available
                    </div>
                  )}
                </div>
                <div className="modal-text-content">
                  {modalContent.details.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
                <div className="timing-info">
                  <h4>Timings:</h4>
                  <p>5:00 AM - 12:00 AM (varies by ritual)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="app-footer">
          <p>© {new Date().getFullYear()} Jagannath Temple, Puri</p>
          <p>All rituals are subject to temple schedule</p>
        </footer>
      </div>
    </Layout>
  );
};

export default JagannathTempleRituals;