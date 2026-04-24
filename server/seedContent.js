require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import Models
const Ritual = require('./models/Ritual');
const Stay = require('./models/Stay');
const Travel = require('./models/Travel');
const Food = require('./models/Food');
const Attraction = require('./models/Attraction');
const Event = require('./models/Event');

// A function to extract data from data.ts
// We'll just execute a quick regex/eval script for the data since it's just raw JS objects
const seedContent = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ratha_yatra_chatbot');
    console.log('MongoDB connected for content seeding.');

    // Clear existing data
    await Ritual.deleteMany({});
    await Stay.deleteMany({});
    await Travel.deleteMany({});
    await Food.deleteMany({});
    await Attraction.deleteMany({});
    await Event.deleteMany({});

    console.log('Collections cleared.');

    // RITUALS
    const ritualsData = [
      {
        title: "🕉 Daily Rituals at Jagannath Temple",
        emoji: "🕉",
        shortDesc: "The daily worship rituals of Lord Jagannath",
        timing: "Early Morning (5:00 AM) to Late Night (11:00 PM)",
        location: "Main Temple (Garbha Griha), Puri",
        significance: "Maintains the divine presence and rhythm of the universe through continuous sevas.",
        fact: "The temple kitchen is the world's largest, where food is cooked in earthen pots stacked seven at a time, and the top pot always cooks first!",
        gallery: ["Balabhadra_Subhadra_Jagannath.jpg", "jagannath-temple.jpeg"],
        details: "These are performed year-round, including during the Ratha Yatra season:\n\n📦 Ritual Box: Daily Sevas\nDwara Phita – Opening of the temple doors early morning.\n\nMangala Arati – Morning prayer and aarti.\n\nMailam – Removal of previous day's flowers and clothes.\n\nAbakasha – Ritual bath and brushing of deities' teeth.\n\nSakala Dhupa – Morning offering of cooked food.\n\nMadhyanna Dhupa – Midday food offering.\n\nSandhya Dhupa – Evening aarti and offerings.\n\nBadasinghara Dhupa – Nighttime offering with devotional songs and floral decoration.\n\nPahuda – Deities are put to rest; doors closed for the day.",
        image: "Balabhadra_Subhadra_Jagannath.jpg"
      },
      {
        title: "💧 Snana Purnima Rituals",
        emoji: "💧",
        shortDesc: "The sacred bathing ceremony of the deities",
        timing: "Full Moon Day of Jyestha (May-June)",
        location: "Snana Mandap (Bathing Platform), Puri Temple",
        significance: "The ritual bath that cools the Lord before the summer heat, often leading to a 'fever' retreat.",
        fact: "The water used for the bath is drawn from a special well called 'Suna Kua' which is opened only once a year for this purpose.",
        gallery: ["Snana Purnima Rituals.jpg", "jagannath-temple.jpeg"],
        details: "This marks the beginning of the Ratha Yatra cycle.\n\n📦 Ritual Box: Snana Purnima\nJalabhishek – 108 pitchers of sacred water are poured on each deity (Jagannath, Balabhadra, Subhadra).\n\nSnana Mandap Darshan – Public viewing of the deities during the bath.\n\nHati Besha – The deities appear in elephant attire after the bath.\n\nAnasara Ghara – After bathing, the deities fall 'sick' and retreat into isolation.\n\nPati Dian (Secret Deity) – During this time, devotees worship a painted wooden representation of Jagannath (Pati Dian).",
        image: "Snana Purnima Rituals.jpg"
      },
      {
        title: " Gundicha Yatra Rituals",
        emoji: "🛕",
        shortDesc: "The famous Rath Yatra festival rituals",
        timing: "Ashadha Shukla Dwitiya (June-July)",
        location: "Grand Road (Bada Danda), from Lions Gate to Gundicha Temple",
        significance: "The journey of the siblings to their birthplace, symbolizing the Lord's longing for His devotees and home.",
        fact: "Despite the chariots weighing hundreds of tons, they are pulled entirely by hand by millions of devotees without any mechanical aid.",
        gallery: ["Jagannath-Rath-Yatra-Puri-rituals.jpg", "gundicha.avif"],
        details: "Celebrated on the Dwitiya Tithi of Ashadha Shukla Paksha.\n\n📦 Ritual Box: Gundicha Yatra\nNetrotsava – Day before Ratha Yatra, divine sight of the deity is restored.\n\nPahandi Bije – Grand procession of the deities from temple to chariots.\n\nChhera Pahanra – Gajapati King sweeps the chariots with a golden broom.\n\nRatha Pratistha – Installation of deities on their respective chariots.\n\nChariot Pulling – Devotees pull the chariots to Gundicha Temple, about 3 km away.\n\nDevas stay at Gundicha – Deities rest here for 7 days in a peaceful and festive environment.",
        image: "Jagannath-Rath-Yatra-Puri-rituals.jpg"
      },
      {
        title: " Bahuda Yatra",
        emoji: "",
        shortDesc: "The return journey of the deities",
        timing: "9 days after Gundicha Yatra",
        location: "From Gundicha Temple back to Main Temple",
        significance: "Symbolizes the conclusion of the visit and the return of the Lord to His primary abode.",
        fact: "During the return journey, the deities stop at their aunt's house (Mausi Maa Temple) for a special rice cake called Poda Pitha.",
        gallery: ["Happy Bahuda Jatra wishes in Odia 2022.jpg", "maxresdefault.jpg"],
        details: "The deities begin their journey back to the main temple.\n\n📦 Ritual Box: Bahuda Yatra\nBahuda Pahandi – Procession of deities back to chariots from Gundicha Temple.\n\nBahuda Ratha Yatra – Chariots are pulled back to the main temple.\n\nMausi Maa Temple Stop – Deities stop at Mausi Maa Temple and offered Poda Pitha (a special rice cake).",
        image: "Happy Bahuda Jatra wishes in Odia 2022.jpg"
      },
      {
        title: " Suna Besha",
        emoji: "",
        shortDesc: "The golden attire of the deities",
        timing: "Day after Bahuda Yatra",
        location: "Chariots in front of Lion's Gate",
        significance: "A display of the supreme majesty and cosmic wealth of Lord Jagannath.",
        fact: "Over 200 kilograms of gold ornaments are used to decorate the three deities during Suna Besha while they are still on their chariots.",
        gallery: ["Hotel sagar kanya.jpg", "maxresdefault.jpg"],
        details: "The deities are adorned in gold ornaments.\n\n📦 Ritual Box: Suna Besha\nGolden Attire – Deities are decorated with gold ornaments while still on the chariots.\n\nPublic Viewing – Devotees get darshan of the deities in this magnificent form.\n\nSpecial Offerings – Special prayers and offerings are made during this time.",
        image: "Hotel sagar kanya.jpg"
      },
      {
        title: " Adhara Pana",
        emoji: "",
        shortDesc: "The ceremonial offering of sweet drink",
        timing: "Day after Suna Besha",
        location: "On the Chariots (Grand Road)",
        significance: "Offering refreshment to the restless spirits and deities after the long festival journey.",
        fact: "The massive earthen pots containing the drink are deliberately broken after the offering so that spirits (Parswa Devatas) can consume them.",
        gallery: ["Adhara pana.jpg", "maxresdefault.jpg"],
        details: "The deities are offered a refreshing drink.\n\n📦 Ritual Box: Adhara Pana\nSweet Offering – Deities are offered a sweet drink in giant earthen pots.\n\nSymbolic Refreshment – Represents the deities being refreshed after their long journey.\n\nDistribution – The remaining drink is distributed among devotees as prasad.",
        image: "Adhara pana.jpg"
      },
      {
        title: " Niladri Bije",
        emoji: "",
        shortDesc: "The final return to the temple",
        timing: "Final day of Ratha Yatra Festival",
        location: "Main Temple Entrance",
        significance: "The reconciliation between Lord Jagannath and Goddess Lakshmi, ending the grand festival.",
        fact: "This day is celebrated as Rasagola Dibasa, markng the tradition where Lord Jagannath offers rasagolas to appease Goddess Lakshmi's anger.",
        gallery: ["niladri-bije.jpeg", "jagannath-temple.jpeg"],
        details: "The conclusion of the Rath Yatra festival.\n\n📦 Ritual Box: Niladri Bije\nLakshmi's Anger – Goddess Lakshmi closes the temple gate, upset for being left behind.\n\nJagannath's Plea – Lord Jagannath appeases her with gifts.\n\nRe-entry – Deities are finally taken inside the temple, ending the Rath Yatra festival.",
        image: "niladri-bije.jpeg"
      }
    ];

    await Ritual.insertMany(ritualsData);
    console.log('Rituals seeded.');

    // STAYS
    const mathas = [
      { name: 'Gobardhan Matha', image: 'Accomodation image/govardhan-math.webp', address: 'Swargadwar, Puri, Odisha', description: 'Established by Adi Shankaracharya, plays a pivotal role in the rituals of the Jagannath Temple.', mapLink: 'https://maps.app.goo.gl/bBNq5iZc97JFZ3cd9', category: 'mathas' },
      { name: 'Radha Bhallava Matha', address: 'in front of Lion\'s Gate (Singha Dwara), Jagannath Temple, Puri, Odisha', description: 'Founded by Saint Ramanuja, supplies floral decorations and offerings for temple rituals.', image: 'Accomodation image/radhaballav.jpg', mapLink: 'https://maps.app.goo.gl/PqsfdUThDQQxqRN39', category: 'mathas' },
      { name: 'Raghaba Das Matha', address: 'Southern Gate of Jagannath Temple, Puri, Odisha', description: "Provides 'tahia' (decorative headgear) during major festivals and contributes to temple rituals.", image: 'Accomodation image/raghav das.jpg', mapLink: 'https://www.google.com/maps/place/Raghaba+Das+Matha/@19.8049,85.8162,17z/', category: 'mathas' },
      { name: 'Bada Chhata Matha', address: 'Near Lion\'s Gate, Jagannath Temple, Puri, Odisha', description: "Performs kirtans during rituals and offers 'Padma Bhesha' (lotus attire) on specific days.", image: 'Accomodation image/Bada_chata_matha.jpeg', mapLink: 'https://maps.app.goo.gl/2tjUmmxHgX4kxoTA6', category: 'mathas' },
      { name: 'Jagannath Ballav Matha', address: 'Grand Road (Bada Danda), Puri, Odisha', description: 'Known as the pleasure garden of Lord Jagannath, supplies floral ornaments during festivals.', image: 'Accomodation image/jagganth ballav.jpg', mapLink: 'https://maps.app.goo.gl/Frg5Qxh1NjMCXeUd6', category: 'mathas' }
    ];
    
    const hotelsNearTemple = [
      { name: 'Hotel Lee Garden', address: 'Grand Road, Near Jagannath Temple, Puri, Odisha 752001', description: 'Heritage-style hotel with traditional decor and proximity to the temple.', bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=200901191214435688', image: 'Accomodation image/hotel lee garden.jpeg', mapLink: 'https://maps.app.goo.gl/f1rE4FqczBwLa6Yv7', category: 'hotelsNearTemple' },
      { name: 'Hotel Shree Hari Grand', address: 'Grand Road, Near Jagannath Temple, Puri, Odisha', description: 'Clean rooms within walking distance to the temple, suitable for families and pilgrims.', bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=201602181241534172', image: 'Accomodation image/hotel-shree-hari.jpg', mapLink: 'https://maps.app.goo.gl/AtQxJ67gXJG1jEsC8', category: 'hotelsNearTemple' },
      { name: 'Hotel Niladri', address: 'Sea Beach Road, Puri, Odisha 752001', description: 'Located near Swargadwar Beach, offering sea views and temple proximity.', bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=20111214173619910', image: 'Accomodation image/niladri.webp', mapLink: 'https://maps.app.goo.gl/nQLeXkSBW89CcCbC7', category: 'hotelsNearTemple' },
      { name: 'Hotel Sonar Bangla', address: 'Sea Beach Road, Puri, Odisha 752001', description: 'Comfortable accommodations with sea views and temple access.', bookingLink: 'https://www.hotelsonarbangla.com/projects/puri/', image: 'Accomodation image/sonar bangala.webp', mapLink: 'https://maps.app.goo.gl/SthUeSE34bPRwiBS8', category: 'hotelsNearTemple' },
      { name: 'Hotel Paradise', address: 'Bada Danda Road, Balagandi, Nilachakra Nagar, Puri, Odisha 752001', description: 'On Grand Road, offering easy access to Jagannath Temple.', bookingLink: 'http://tripadvisor.in/Hotel_Review-g503703-d1179336-Reviews-Paradise_Hotel-Puri_Puri_District_Odisha.html', image: 'Accomodation image/paradise-hotel.avif', mapLink: 'https://maps.app.goo.gl/vhNihNzWyHN9Qke46', category: 'hotelsNearTemple' }
    ];
    
    const hotelsNearBeach = [
      { name: 'Mayfair Heritage', address: 'Chakratirth Road, Puri, Odisha 752002', description: 'Luxurious beachfront property with premium amenities and sea views.', bookingLink: 'https://www.mayfairhotels.com/', image: 'Accomodation image/mayafair puri.jpg', mapLink: 'https://maps.app.goo.gl/dpLjQLsgyFHMMA1r9', category: 'hotelsNearBeach' },
      { name: 'Purushotam Bhakta Nivas', address: 'Near Old Jail, Jagannath Puri - 752001', description: 'Located at a distance of 1.3 km from Gundicha Temple. Purshottam Bhakta Niwas in Puri offers two and three bedded AC rooms. Meals and parking spaces for vehicles are available here.', bookingLink: 'https://stayatpurijagannatha.in/bhaktanivas/hotel/purushottam-bhakta-nivas-17', image: 'Accomodation image/PURUSHOTTAM-BHAKTA.jpg', mapLink: 'https://maps.app.goo.gl/kcjDrq2Feb3heNJa7', category: 'hotelsNearBeach' },
      { name: 'Hotel Sagar Kanya', address: 'New Marine Drive Road, Puri, Odisha 752001', description: 'Sea-facing rooms with modern amenities and beach access.', bookingLink: 'https://www.makemytrip.com/hotels/hotel-details/?hotelId=201601221848581905', image: 'Accomodation image/Hotel sagar kanya.jpg', mapLink: 'https://maps.app.goo.gl/o9GGLF29hum8ja4F6', category: 'hotelsNearBeach' },
      { name: 'Hotel Golden Palace', address: 'New Marine Drive Road, Puri, Odisha 752001', description: 'Comfortable accommodations with panoramic sea views.', bookingLink: 'https://hotelgoldenpalacepuri.in/', image: 'Accomodation image/golden palace.jpg', mapLink: 'https://maps.app.goo.gl/E1TzV8nz6GUgsyJD9', category: 'hotelsNearBeach' },
      { name: 'Hotel Shree Jagannath', address: 'New Marine Drive Rd, Puri, Odisha 752001', description: 'Affordable hotel near the beach with essential amenities.', bookingLink: 'https://www.goibibo.com/hotels/hotel-details/?checkin=20250425&checkout=20250426&roomString=1-2-0&searchText=HOTEL%20SHREE%20JAGANNATH%20(SEA%20FACING)&locusId=CTXPR&locusType=city&cityCode=CTXPR&cc=IN&_uCurrency=INR&giHotelId=1123670571102621686&mmtId=201809221027357980&topHtlId=201809221027357980&sType=hotel', image: 'Accomodation image/sre jagannath.avif', mapLink: 'https://maps.app.goo.gl/erGBJnmLs7PBJLS29', category: 'hotelsNearBeach' }
    ];

    await Stay.insertMany([...mathas, ...hotelsNearTemple, ...hotelsNearBeach]);
    console.log('Stays seeded.');

    // TRAVEL
    const travels = [
      { transport_type: 'flight', title: 'Biju Patnaik International Airport', description: 'Nearest airport located in Bhubaneswar.', timing: 'Always Open', price: 'Varies', image: 'transport/flight.jpg' },
      { transport_type: 'train', title: 'Puri Railway Station', description: 'Well connected to major cities across India.', timing: 'Always Open', price: 'Varies', image: 'transport/train.jpg' },
      { transport_type: 'bus', title: 'Puri Bus Stand', description: 'Frequent buses from Bhubaneswar and Cuttack.', timing: 'Always Open', price: 'Varies', image: 'transport/bus.jpg' }
    ];
    await Travel.insertMany(travels);
    console.log('Travels seeded.');

    // FOOD
    const foods = [
      { category: "Divine Mahaprasad", name: "Abadha (Mahaprasad Thali)", description: "The world's largest kitchen offering... rice, dal, besara, and more cooked in earthen pots.", image: "food/mahaprasada.webp", price: "150-300", orderLink: "tel:+916752222002" },
      { category: "Puri's Famous Sweets", name: 'Khaja', description: 'A crispy, layered sweet made from refined flour and sugar syrup, traditionally offered as Sukhila Prasad.', image: 'food/Puri Khajja.jpeg', price: "400/kg", orderLink: "https://wa.me/911234567890?text=I%20want%20to%20order%20Khaja" },
      { category: "Puri's Famous Sweets", name: 'Chhena Poda', description: "The burnt cheese dessert, made from caramelized cottage cheese, sugar, and nuts.", image: 'food/chenna-poda.jpg', price: "500/kg", orderLink: "https://wa.me/911234567890?text=I%20want%20to%20order%20Chhena%20Poda" },
      { category: "Puri's Famous Sweets", name: 'Rasabali', description: 'Deep-fried flattened chhena patties soaked in thickened, sweetened milk.', image: 'food/rasabali.jpg', price: "50/piece", orderLink: "https://wa.me/911234567890?text=I%20want%20to%20order%20Rasabali" },
      { category: "Puri's Famous Sweets", name: 'Rasagola', description: 'Soft, spongy balls made from chhena, cooked in light sugar syrup.', image: 'food/rasagola.jpg', price: "20/piece", orderLink: "https://wa.me/911234567890?text=I%20want%20to%20order%20Rasagola" },
      { category: "Authentic Odia Savory", name: "Dalma", description: "A nutritious lentil and vegetable stew, flavored with roasted cumin and dry chili.", image: "food/dalma.jpg", price: "120", orderLink: "https://wa.me/911234567890?text=I%20want%20to%20order%20Dalma" },
      { category: "Authentic Odia Savory", name: "Pakhala Bhata", description: "Cool fermented rice served with fried vegetables, badi chura, and saga bhaja.", image: "food/pakhala.jpg", price: "180", orderLink: "https://wa.me/911234567890?text=I%20want%20to%20order%20Pakhala" },
      { category: "Authentic Odia Savory", name: "Besara", description: "A mustard-based vegetable curry, distinctive to Odia cuisine.", image: "food/besara.jpg", price: "90", orderLink: "https://wa.me/911234567890?text=I%20want%20to%20order%20Besara" }
    ];
    await Food.insertMany(foods);
    console.log('Foods seeded.');

    // ATTRACTIONS
    const attractionsData = [
      { title: "Jagannath Temple", description: "The Shree Jagannath Temple is one of India's most revered and ancient Vishnu temples.", details: "The Shree Jagannath Temple is one of India's most revered and ancient Vishnu temples...", history: "Originally constructed in the 12th century...", image: "jagannath-temple.jpeg", distance: "0 km", visitingHours: "5:00 AM - 10:00 PM", mapLink: "https://www.google.com/maps/dir/?api=1&destination=Jagannath+Temple+Puri" },
      { title: "Puri Beach", description: "Stretching along the Bay of Bengal, Puri Beach is renowned for its golden sands.", details: "Stretching along the Bay of Bengal...", history: "Historically, the beach has been an integral part...", image: "sunrise-from-puri-beach.jpg", distance: "1.5 km", visitingHours: "Open 24 hours", mapLink: "https://www.google.com/maps/dir/?api=1&destination=Puri+Beach" },
      { title: "Konark Sun Temple", description: "A UNESCO World Heritage Site, the Konark Sun Temple is an architectural masterpiece.", details: "A UNESCO World Heritage Site...", history: "Constructed in the mid-13th century...", image: "konark_temp.jpg", distance: "35 km", visitingHours: "6:00 AM - 8:00 PM", mapLink: "https://www.google.com/maps/dir/?api=1&destination=Konark+Sun+Temple" },
      { title: "Chilika Lake", description: "Asia’s largest brackish water lagoon, a paradise for nature lovers.", details: "Asia’s largest brackish water lagoon...", history: "Chilika Lake has significant ecological...", image: "Kalijai-Island-Temple.png", distance: "50 km", visitingHours: "6:00 AM - 5:00 PM", mapLink: "https://www.google.com/maps/dir/?api=1&destination=Chilika+Lake" }
    ];
    await Attraction.insertMany(attractionsData);
    console.log('Attractions seeded.');

    // EVENTS (Calendar)
    const events = [
      { title: "Snana Yatra", date: new Date("2026-06-21"), description: "The bathing festival of the deities.", type: "festival" },
      { title: "Rath Yatra", date: new Date("2026-07-14"), description: "The Grand Chariot Festival.", type: "festival" },
      { title: "Bahuda Yatra", date: new Date("2026-07-22"), description: "Return journey of the deities.", type: "festival" }
    ];
    await Event.insertMany(events);
    console.log('Events seeded.');

    console.log('All content successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding content:', error);
    process.exit(1);
  }
};

seedContent();
