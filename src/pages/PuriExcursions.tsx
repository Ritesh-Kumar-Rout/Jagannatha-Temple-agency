// pages/PuriExcursions.js (or components/PuriExcursions.js)

import { useState } from 'react';
import Layout from '../components/Layout'; // Adjust path if necessary

// --- Data Section ---
// You can keep the same data, or modify/filter it for this specific page.
// For maintainability, consider moving this array to a separate data file
// and importing it here and in Attractions.js if the data is identical.
const attractions = [
    {
    id: 1,
    title: "Jagannath Temple",
    description: "The Shree Jagannath Temple is one of India's most revered and ancient Vishnu temples, forming a crucial part of the Char Dham pilgrimage sites considered sacred by Hindus. Dedicated to Lord Jagannath, a unique form of Lord Vishnu, alongside his elder brother Lord Balabhadra and sister Goddess Subhadra, the temple complex is an architectural marvel and a pulsating center of faith. Its towering main structure, built in the Kalinga architectural style with intricate carvings and a distinctive curvilinear spire (Vimana), dominates the Puri skyline. The temple complex houses numerous smaller shrines, mandapas (halls), and the world's largest kitchen, known for preparing the 'Mahaprasad' – sacred food offered to the deities and then distributed to devotees, considered highly auspicious. The temple is famous for its annual Rath Yatra (Chariot Festival), where the deities are paraded on massive, elaborately decorated chariots, drawing millions of pilgrims worldwide. Strict entry rules apply, traditionally allowing only Hindus of Indian origin inside the main temple premises.",
    history: "Originally constructed in the 12th century by King Anantavarman Chodaganga Deva of the Eastern Ganga dynasty, the temple has undergone several renovations and additions over the centuries. It holds immense historical and cultural significance, deeply intertwined with the identity and traditions of Odisha. The unique wooden idols (Daru Brahma) are ceremoniously replaced in a ritual called Nabakalebara, occurring roughly every 12 to 19 years.",
    image: "jagannath-temple.jpeg",
    distance: "0 km (Central point of Puri)",
    visitingHours: "5:00 AM - 10:00 PM (Timings can vary, check locally; non-Hindus generally not permitted inside)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Jagannath+Temple+Puri"
    },
    {
    id: 2,
    title: "Puri Beach",
    description: "Stretching along the Bay of Bengal, Puri Beach is renowned for its long stretch of golden sands, gentle waves, and spiritual ambiance. It holds a special place for pilgrims who often take a purifying dip in the sea before visiting the Jagannath Temple. The beach offers spectacular sunrise and sunset views, creating a serene atmosphere for contemplation and relaxation. It's also a vibrant hub of activity, bustling with local fishermen, snack vendors offering local delicacies, and tourists enjoying camel or horse rides. Puri Beach is famous for the internationally acclaimed sand artist Sudarsan Pattnaik, whose intricate sand sculptures often adorn the shore. The beach hosts the annual Puri Beach Festival and various sand art events, attracting artists and visitors globally. Its proximity to Swargadwar, the sacred cremation ground, adds to its spiritual significance.",
    history: "Historically, the beach has been an integral part of Puri's religious life, considered sacred ground. It has gained prominence over the years as a major tourist attraction and a venue for cultural events, particularly known for fostering the unique art form of sand sculpture.",
    image: "sunrise-from-puri-beach.jpg",
    distance: "1.5 km from Jagannath Temple",
    visitingHours: "Open 24 hours (Best visited during daylight hours for activities)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Puri+Beach"
    },
    {
    id: 3,
    title: "Konark Sun Temple",
    description: "A UNESCO World Heritage Site, the Konark Sun Temple is an architectural masterpiece dedicated to the Sun God, Surya. Designed in the 13th century as a colossal chariot for the Sun God, it features 24 intricately carved stone wheels (representing the hours of the day) and is drawn by seven mighty horses (representing the days of the week). Built from Khondalite rock, the temple is famed for its elaborate carvings depicting mythological figures, celestial beings, scenes of courtly life, hunting, and intricate floral and geometric patterns, including some erotic sculptures reminiscent of Khajuraho. Though largely in ruins today, its grandeur and artistic brilliance remain awe-inspiring. The main sanctum tower collapsed centuries ago, but the surviving Jagamohana (audience hall) and Natamandira (dance hall) showcase the pinnacle of Kalinga architecture. It stands as a testament to the artistic and engineering skills of its time.",
    history: "Constructed in the mid-13th century by King Narasimhadeva I of the Eastern Ganga dynasty to commemorate his victory over Muslim invaders. Various theories exist regarding its collapse, including structural defects, invasions, or the removal of a supposed loadstone that affected coastal navigation. It remains one of India's most iconic monuments.",
    image: "konark_temp.jpg",
    distance: "35 km from Puri",
    visitingHours: "6:00 AM - 8:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Konark+Sun+Temple"
    },
    {
    id: 4,
    title: "Chilika Lake",
    description: "Asia’s largest brackish water lagoon, Chilika Lake is a vast expanse of shimmering water separated from the Bay of Bengal by a narrow sand-bar. This unique ecosystem teems with biodiversity, making it a paradise for nature lovers and bird watchers. Designated as a wetland of international importance under the Ramsar Convention, it serves as a crucial habitat for a wide array of resident and migratory birds, especially during winter when species arrive from as far as Siberia, Russia, and Central Asia. The Nalabana Bird Sanctuary, situated within the lake, is a prime birding spot. Chilika is also famous for being one of the only two lagoons in the world where the endangered Irrawaddy dolphins can be sighted, primarily near Satapada. Visitors can enjoy boat trips to spot dolphins, visit the Kalijai Temple located on an island within the lake (dedicated to Goddess Kalijai and associated with local legends), and observe the traditional fishing practices of the local communities.",
    history: "Chilika Lake has significant ecological, economic, and cultural importance for Odisha. Its formation is linked to geological changes over millennia. It supports the livelihood of thousands of fisherfolk and plays a vital role in the region's environmental balance.",
    image: "Kalijai-Island-Temple.png",
    distance: "Approx 50-60 km from Puri (depending on entry point like Satapada)",
    visitingHours: "Boating typically 6:00 AM - 5:00 PM (Best bird watching Nov-Feb)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Chilika+Lake" // Note: Link might point to a specific area like Satapada
    },
    {
    id: 5,
    title: "Raghurajpur Heritage Village",
    description: "Just a short drive from Puri, Raghurajpur is a unique crafts village where every household is engaged in traditional Odishan art forms. It is most famous for Pattachitra painting, an ancient art form characterized by intricate details, mythological narratives, and vibrant natural colours painted on treated cloth (Patta). Visitors can walk through the village lanes, entering homes that double as studios, watching artists meticulously create masterpieces. Besides Pattachitra, artisans excel in palm leaf engraving (Tala Pattachitra), stone carving, wood carving, papier-mâché toys, and mask making. The village is also credited as the birthplace of the Gotipua folk dance, the precursor to the classical Odissi dance form. Visiting Raghurajpur offers an immersive cultural experience, allowing direct interaction with the artists, understanding their creative process, and purchasing authentic handicrafts directly from the source.",
    history: "This village has maintained its artistic traditions for generations, playing a crucial role in preserving Odisha's rich cultural heritage. It gained recognition as Odisha's first heritage crafts village, dedicated to promoting and sustaining these invaluable art forms.",
    image: "The best day in Odisha by exploring Art and Artists of Raghurajpur village near Puri-36.jpg",
    distance: "14 km from Puri",
    visitingHours: "Generally 9:00 AM - 6:00 PM (as artists work in their homes)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Raghurajpur+Heritage+Village"
    },
    {
    id: 6,
    title: "Alarnath Temple",
    description: "Located in Brahmagiri, the Alarnath Temple is dedicated to Lord Vishnu and gains immense significance during the 'Anavasara' period of Lord Jagannath. Anavasara is the two-week period preceding the Rath Yatra when Lord Jagannath is believed to be 'unwell' and stays in seclusion, with the main Jagannath Temple closed for public darshan. During this time, devotees flock to Alarnath Temple, believing that Lord Jagannath manifests here as Alarnath Dev. It is said that the great saint Chaitanya Mahaprabhu spent this period here in deep devotion, meditating before the image of the four-armed Lord Vishnu. The temple has a serene atmosphere, and devotees offer 'Kheer' (rice pudding) as bhog to the deity, which is considered highly sacred.",
    history: "The temple and its association with the Anavasara period are steeped in legend and tradition, particularly linked to Sri Chaitanya's visit in the 16th century. It serves as a vital alternative pilgrimage site during the temporary closure of the main Jagannath Temple.",
    image: "maxresdefault.jpg",
    distance: "24 km from Puri",
    visitingHours: "6:00 AM - 9:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Alarnath+Temple"
    },
    {
    id: 7,
    title: "Gundicha Temple",
    description: "Often referred to as the 'Garden House' of Lord Jagannath, the Gundicha Temple holds paramount importance during the annual Rath Yatra festival. Located about 3 km from the main Jagannath Temple, this is the destination where Lord Jagannath, Lord Balabhadra, and Devi Subhadra travel on their magnificent chariots and reside for nine days during the festival. The temple is set within a walled compound with a garden and features a distinct Kalinga architectural style, though simpler than the main Jagannath Temple. It is believed to be the abode of Goddess Gundicha, the queen of King Indradyumna (the legendary builder of the first Jagannath Temple), often considered the aunt of the deities. During the Rath Yatra, the temple premises are filled with fervent devotion as devotees throng to have darshan of the deities in this alternate setting. For the rest of the year, the temple remains accessible but relatively quiet.",
    history: "The temple is intrinsically linked to the Rath Yatra tradition, one of the oldest and largest chariot festivals in the world. Its history is tied to the legends surrounding King Indradyumna and the establishment of the Jagannath cult in Puri.",
    image: "gundicha.avif",
    distance: "3 km from Jagannath Temple",
    visitingHours: "6:00 AM - 8:00 PM (Can vary, especially during Rath Yatra)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Gundicha+Temple"
    },
    {
    id: 8,
    title: "Markandeshwar Temple",
    description: "One of the ancient Shiva temples in Puri, the Markandeshwar Temple is situated near the Markandeya Tank, close to the Swargadwar area. It holds significant religious importance, particularly linked to the sage Markandeya. According to Puranic legends, this is the place where sage Markandeya prayed to Lord Shiva and was saved from the God of Death, Yama, gaining the boon of immortality. The temple architecture reflects traditional Odia style. Devotees visit the temple to seek blessings for longevity and well-being. Its location near the sacred cremation ground and the holy tank adds to its spiritual aura. It's considered one of the Pancha Tirtha (five sacred bathing spots) of Puri.",
    history: "Believed to be one of the oldest temples in Puri, dating back centuries. Its history is primarily derived from Puranic scriptures recounting the tale of sage Markandeya's devotion to Lord Shiva.",
    image: "markanda-temple.jpg",
    distance: "2 km from Jagannath Temple",
    visitingHours: "5:00 AM - 9:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Markandeshwar+Temple+Puri"
    },
    {
    id: 9,
    title: "Narendra Tank (Narendra Pokhari)",
    description: "Narendra Tank is one of the largest and most sacred tanks in Odisha, located near the Jagannath Temple. It plays a central role in the famous Chandan Yatra (Sandalwood Festival) of Lord Jagannath, which takes place annually for 42 days during the summer months. During this festival, the representative deities of Lord Jagannath (Madanmohan), along with other deities, are taken in ceremonial processions to the tank. They enjoy boat rides in intricately decorated boats (Chapa Khela) in the cool waters of the tank, smeared with sandalwood paste to provide relief from the heat. In the middle of the tank stands a small island temple connected by a bridge. The tank is surrounded by steps (ghats) and smaller shrines, creating a serene and holy environment.",
    history: "The tank was constructed in the 15th century by Narendra Dev, the brother of Gajapati King Kapilendra Dev. It was built to facilitate the Chandan Yatra rituals and remains an integral part of the Jagannath temple traditions.",
    image: "maxresdefault (1).jpg",
    distance: "2.5 km from Jagannath Temple",
    visitingHours: "6:00 AM - 7:00 PM (Especially vibrant during Chandan Yatra)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Narendra+Tank+Puri"
    },
    {
    id: 10,
    title: "Swargadwar",
    description: "Meaning 'Gateway to Heaven', Swargadwar is the sacred cremation ground located along the Puri beachfront. Hindus believe that being cremated here grants direct liberation (moksha) or ensures entry into heaven, owing to its association with Lord Jagannath and its perceived sanctity. The area often has multiple funeral pyres burning simultaneously, creating a poignant atmosphere juxtaposed against the lively beach nearby. Despite its solemn purpose, it is considered a highly auspicious place, and many pilgrims visit to witness the rituals or simply absorb the profound spiritual energy. Its significance is deeply embedded in Hindu eschatology and the religious fabric of Puri.",
    history: "Its sacred status is ancient, tied to numerous legends and the belief in Puri as one of the holiest cities in India. It has served as the primary cremation site for centuries, attracting people from across the country who wish for their final rites to be performed here.",
    image: "swargadwara.jpeg",
    distance: "1 km from Jagannath Temple",
    visitingHours: "Open 24 hours (Activity depends on cremation schedules)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Swargadwar+Puri"
    },
    {
    id: 11,
    title: "Loknath Temple",
    description: "The Loknath Temple is a significant shrine dedicated to Lord Shiva, located slightly away from the main Jagannath Temple area. A unique feature of this temple is that the Shiva Linga remains submerged under water in the sanctum sanctorum throughout the year. According to legend, Lord Rama installed this Linga here on his way to Lanka. It is believed that the water covering the Linga has medicinal properties. Once a year, on the night of Pankoddhar Ekadashi (before Shivaratri), all the water is bailed out, allowing devotees to have a direct darshan of the Linga for that one day. This event attracts large crowds who come to witness the ritual and seek blessings.",
    history: "The temple's origins are linked to the Ramayana period through local legends. It has been a revered site for Shaivites for centuries, particularly known for the unique phenomenon of the submerged Linga and the annual Pankoddhar Ekadashi ritual.",
    image: "lokanath-temple.png",
    distance: "3 km from Jagannath Temple",
    visitingHours: "6:00 AM - 9:00 PM (Darshan of Linga only on Pankoddhar Ekadashi)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Loknath+Temple+Puri"
    },
    {
    id: 12,
    title: "Baliharachandi Temple",
    description: "Situated on a picturesque stretch of sandy hill near the confluence of the Bhargavi River and the Bay of Bengal, the Baliharachandi Temple is dedicated to Goddess Harachandi. She is considered a form of Goddess Durga and is highly revered as a protector deity, especially by local fishermen and sailors who seek her blessings before venturing into the sea. The temple's location offers stunning panoramic views of the coastline and the river mouth. It is a peaceful spot, away from the hustle of Puri town, ideal for those seeking tranquility and a connection with nature alongside spiritual solace. The surrounding beach area is also popular for picnics.",
    history: "The temple is believed to be an ancient Shakti Peetha. Local traditions strongly associate the goddess with maritime protection, reflecting the region's historical dependence on the sea.",
    image: "Baliharachandi-Temple-Baliharachandi-Beach-puri2.webp",
    distance: "27 km from Puri",
    visitingHours: "6:00 AM - 8:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Baliharachandi+Temple"
    },
    {
    id: 13,
    title: "Pipili Village",
    description: "Pipili is a small town located on the highway between Puri and Bhubaneswar, famous worldwide for its vibrant and intricate appliqué work. Known locally as 'Chandua', this traditional craft involves stitching pieces of coloured cloth onto a base layer to create decorative patterns, often embellished with embroidery and mirror work. The main street of Pipili is lined with numerous shops showcasing a dazzling array of appliqué products, including large ceremonial umbrellas, canopies (used in religious processions and festivals, especially for decorating chariots during Rath Yatra), wall hangings, lampshades, cushion covers, bags, and garden umbrellas. The craftsmanship is characterized by bright colours and motifs depicting gods, goddesses, animals, birds, and flowers. It's a great place to witness this unique art form and purchase colourful souvenirs.",
    history: "The craft originated centuries ago primarily to serve the needs of temples, especially the Jagannath Temple, for creating banners, canopies, and coverings. Over time, it evolved into a wider decorative art form, supporting the livelihood of many artisan families in the village.",
    image: "pipili_village.jpg",
    distance: "36 km from Puri",
    visitingHours: "Shops generally open 8:00 AM - 8:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Pipili+Village"
    },
    {
    id: 14,
    title: "Satapada Dolphin Point (Chilika Lake)",
    description: "Satapada serves as the primary entry point on the Chilika Lake for boat trips specifically aimed at sighting the rare Irrawaddy dolphins. Located near the confluence where Chilika Lake meets the Bay of Bengal, this area offers a higher probability of encountering these gentle aquatic mammals in their natural habitat. Boat operators take tourists out into the lagoon, navigating towards areas frequented by the dolphins. While sightings are not guaranteed, the experience of cruising on the vast lake, observing the unique ecosystem, and seeing the sea mouth (Mohana) where the lake merges with the sea is rewarding in itself. Responsible eco-tourism practices are encouraged to minimize disturbance to the dolphins. Besides dolphins, visitors might also spot various birds and enjoy the scenic beauty of the lagoon.",
    history: "Satapada gained prominence as a tourist destination due to the relatively consistent presence of Irrawaddy dolphins, making Chilika one of the hotspots globally for observing this species. It's a hub for boat operations focused on dolphin watching and exploring this part of the lake.",
    image: "hq720.jpg",
    distance: "Approx 50 km from Puri",
    visitingHours: "Boating typically 6:00 AM - 5:00 PM (Best chances for dolphin sightings are usually morning or late afternoon)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Satapada"
    },
    {
    id: 15,
    title: "Ramachandi Temple",
    description: "Located scenically at the confluence of the Kushabhadra River and the Bay of Bengal, the Ramachandi Temple is dedicated to Goddess Ramachandi, considered the presiding deity of the Konark region. While the temple structure itself is relatively modest compared to Konark, its location is highly picturesque. There are various legends associated with the goddess; one popular belief is that she acted as a guardian deity for the Konark Sun Temple. Another story suggests she guided Kalapahad (a general known for temple destruction) away from Konark, thus saving it indirectly. The temple attracts local devotees, and the surrounding area, with its Casuarina plantations and tranquil beach, is a popular spot for picnics and recreation. The nearby Ramachandi Beach is also developing as a hub for water sports like surfing.",
    history: "The exact age is uncertain, but the deity Ramachandi is deeply ingrained in local folklore and considered an ancient protector goddess. Her legends are often intertwined with the history and fate of the nearby Konark Sun Temple.",
    image: "Maa_Ramachnadi_Temple.jpg",
    distance: "30 km from Puri (near Konark)",
    visitingHours: "6:00 AM - 7:00 PM",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Ramachandi+Temple"
    },
    {
    id: 16,
    title: "Bhubaneswar (Capital City)",
    description: "Known as the 'Temple City of India', Bhubaneswar is the capital of Odisha and serves as the administrative, economic, and cultural hub of the state. It forms part of the 'Golden Triangle' of Odisha tourism along with Puri and Konark. The city boasts a rich history dating back over 2000 years, evident in its hundreds of ancient temples showcasing the evolution of Kalinga architecture. Key temples include the magnificent Lingaraj Temple (dedicated to Lord Shiva, mainly accessible only to Hindus), the intricately carved Mukteshwar Temple, the Rajarani Temple (known for its sculptural beauty), and the Parasurameswara Temple. Beyond temples, Bhubaneswar is a modern city offering attractions like the Odisha State Museum, the Museum of Tribal Arts & Artifacts, the Nandankanan Zoological Park (famous for its white tigers and botanical garden), and the ancient Udayagiri & Khandagiri Caves on its outskirts. It serves as an excellent base for exploring the wider region.",
    history: "Bhubaneswar has been historically significant since the ancient Kalinga kingdom. It was chosen as the capital of Odisha in 1948, replacing Cuttack. The city's planning integrates its ancient heritage with modern infrastructure.",
    image: "hq720 (1).jpg",
    distance: "65 km from Puri",
    visitingHours: "City open 24 hours; specific attraction timings vary (e.g., Lingaraj Temple restricted entry)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Bhubaneswar"
    },
    {
    id: 17,
    title: "Museum of Tribal Arts & Artifacts (Bhubaneswar)",
    description: "Located in Bhubaneswar, this well-curated museum offers a fascinating insight into the rich and diverse cultures of Odisha's 62 distinct tribal communities. Officially known as the Odisha State Tribal Museum, it showcases the unique lifestyles, traditions, art, and craftsmanship of these indigenous groups. The exhibits are thoughtfully arranged and include authentic tribal dwellings recreated in the museum grounds, traditional attire and jewelry, intricate beadwork, musical instruments, hunting weapons, fishing gear, agricultural tools, household objects, terracotta items, and ritualistic artifacts. Detailed dioramas and displays provide context about their social customs, religious beliefs, and artistic expressions. It is considered one of the best tribal museums in India and provides an invaluable educational experience for understanding the state's diverse cultural tapestry.",
    history: "Established to preserve, document, and promote the cultural heritage of Odisha's tribal populations. The museum has expanded over the years and utilizes modern display techniques to engage visitors.",
    image: "odisha-tribal-museum.jpg",
    distance: "Approx 65 km from Puri (Located in Bhubaneswar)",
    visitingHours: "10:00 AM - 5:00 PM (Closed on Mondays and public holidays)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Museum+of+Tribal+Arts+and+Artifacts"
    },
    {
    id: 18,
    title: "Udayagiri & Khandagiri Caves (Bhubaneswar)",
    description: "Located on the outskirts of Bhubaneswar, Udayagiri (Hill of Sunrise) and Khandagiri (Broken Hill) are twin hills housing a complex of ancient rock-cut caves. These caves, dating back to the 1st century BCE, primarily served as residential retreats for Jain monks during the reign of King Kharavela of the Mahameghavahana dynasty. Udayagiri has more numerous and elaborate caves, including the famous Hathi Gumpha (Elephant Cave), which contains a significant inscription detailing King Kharavela's achievements. Rani Gumpha (Queen's Cave) in Udayagiri is a double-storied monastery adorned with intricate carvings depicting historical events, royal processions, and mythological scenes. Khandagiri caves, some of which were later occupied by Hindu ascetics, offer panoramic views of Bhubaneswar city from the summit, where a Jain temple also stands. These caves are important archaeological sites, showcasing early examples of rock-cut architecture and Jain art in India.",
    history: "Built primarily during the 1st century BCE under the patronage of King Kharavela, as evidenced by the Hathi Gumpha inscription. They represent a significant period of Jain influence in the region and stand as crucial historical monuments.",
    image: "Khandagari_and_Udaygiri_featured_image.jpg",
    distance: "Approx 68 km from Puri (Located near Bhubaneswar)",
    visitingHours: "9:00 AM - 6:00 PM (Sunrise to Sunset generally)",
    mapLink: "https://www.google.com/maps/dir/?api=1&destination=Udayagiri+and+Khandagiri+Caves"
    }
];


// --- Component Definition ---
// Renamed component from Attractions to PuriExcursions
const PuriExcursions = () => {
const [expandedId, setExpandedId] = useState(null);

const toggleExpand = (id) => {
setExpandedId((prevId) => (prevId === id ? null : id));
};

return (
<Layout>
  <section className="py-12 bg-gradient-to-b from-blue-100 via-cyan-50 to-white"> {/* Changed gradient colors */}
    <div className="container mx-auto px-4">
      {/* Modified Heading and Intro Text */}
      <h2 className="text-3xl font-bold text-center text-cyan-800 mb-4">
        Explore Excursions Around Puri
      </h2>
      <p className="text-center text-gray-600 mb-8">
        Venture beyond the main town to discover these fascinating destinations, rich in history and natural beauty.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* --- Filtering Example (Optional) --- */}
        {/* If you want this page to only show attractions further away, you could filter like this: */}
        {/* {attractions.filter(att => parseInt(att.distance) > 10).map((attraction) => ( */}

        {attractions.map((attraction) => (
          <div
            key={attraction.id}
            onClick={() => toggleExpand(attraction.id)}
            className="bg-white/80 backdrop-blur-md rounded-xl shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden border border-gray-300"
          >
            <img
              src={attraction.image} // Make sure image paths are correct relative to your project setup
              alt={attraction.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-center text-gray-800 mb-2">
                {attraction.title}
              </h3>

              {/* Always show short description if not expanded */}
              {expandedId !== attraction.id && (
                 <p className="text-sm text-gray-600 text-center italic truncate">
                     {attraction.description.split('.')[0] + '.'} {/* Show first sentence */}
                 </p>
              )}

              {expandedId === attraction.id && (
                <div className="text-sm text-gray-700 mt-4 space-y-2">
                  <p className="leading-relaxed">{attraction.description}</p>
                  <p className="italic leading-relaxed">{attraction.history}</p>
                  <p>
                    <strong>Distance:</strong> {attraction.distance}
                  </p>
                  <p>
                    <strong>Visiting Hours:</strong> {attraction.visitingHours}
                  </p>
                  <a
                    href={attraction.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline mt-2 inline-block font-medium"
                  >
                    📍 Get Directions on Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
</Layout>
);
};

// Updated export statement
export default PuriExcursions;