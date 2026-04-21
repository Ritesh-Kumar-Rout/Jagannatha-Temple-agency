require('dotenv').config();
const mongoose = require('mongoose');
const FestivalInfo = require('./models/FestivalInfo');

const seedData = [
  {
    title: "What is Ratha Yatra?",
    description: "Ratha Yatra is a major Hindu festival associated with Lord Jagannath held at Puri in the state of Odisha, India. It is the oldest Ratha Yatra taking place in India and the World, whose descriptions can be found in Brahma Purana, Padma Purana, and Skanda Purana and Kapila Samhita.",
    category: "history"
  },
  {
    title: "History of Lord Jagannath",
    description: "Lord Jagannath is considered an abstract form of Lord Vishnu or Lord Krishna. The deity is worshipped alongside his siblings, Lord Balabhadra and Devi Subhadra. The wooden idols are replaced every 12 to 19 years in a ceremony known as Nabakalebara.",
    category: "history"
  },
  {
    title: "Festival Schedule",
    description: "The Ratha Yatra begins on the second day of the bright fortnight of the Ashadha month. Key events include Snana Yatra (bathing festival), Netrotsava (eye festival), the Main Ratha Yatra, and Bahuda Yatra (return journey).",
    category: "schedule"
  },
  {
    title: "Chariot Details",
    description: "There are three main chariots: Nandighosa (for Lord Jagannath), Taladhwaja (for Lord Balabhadra), and Darpadalana (for Devi Subhadra). They are built fresh every year using specific types of wood.",
    category: "chariots"
  },
  {
    title: "Rituals (Snana Yatra)",
    description: "Snana Yatra is the bathing festival where the deities are brought out and bathed with 108 pitchers of water. Following this, the deities are believed to fall ill and are kept in seclusion for 15 days (Anasara).",
    category: "rituals"
  },
  {
    title: "Travel to Puri",
    description: "Puri is well-connected by rail to major cities in India. The nearest airport is Biju Patnaik International Airport in Bhubaneswar, about 60 km away. During Ratha Yatra, special trains and buses are operated.",
    category: "travel"
  }
];

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ratha_yatra_chatbot')
  .then(async () => {
    console.log('Connected to MongoDB for seeding...');
    await FestivalInfo.deleteMany({});
    await FestivalInfo.insertMany(seedData);
    console.log('Seeding successful!');
    process.exit();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    process.exit(1);
  });
