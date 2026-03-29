import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tilt3D } from './ui/Tilt3D';
import { FloatingElement } from './ui/FloatingElement';

const gates = [
  { id: 1, name: "Lion Gate (East)", status: "moderate" },
  { id: 2, name: "Horse Gate (South)", status: "low" },
  { id: 3, name: "Tiger Gate (West)", status: "high" },
  { id: 4, name: "Elephant Gate (North)", status: "low" }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "low":
      return "bg-festival-green";
    case "moderate":
      return "bg-festival-yellow";
    case "high":
      return "bg-festival-red";
    default:
      return "bg-gray-300";
  }
};

const getStatusWidth = (status: string) => {
  if (status === "low") return "30%";
  if (status === "moderate") return "65%";
  return "90%";
};

const CrowdTracker = () => {
  const [crowdData, setCrowdData] = useState(gates);
  
  // Simulating changing crowd data
  useEffect(() => {
    const interval = setInterval(() => {
      const statuses = ["low", "moderate", "high"];
      const updatedData = crowdData.map(gate => {
        // 30% chance to change status
        if (Math.random() > 0.7) {
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
          return { ...gate, status: newStatus };
        }
        return gate;
      });
      setCrowdData(updatedData);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [crowdData]);

  return (
    <section className="py-24 bg-gray-50/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="section-title inline-block">Live Crowd Status</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time crowd information at temple gates to help plan your visit.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {crowdData.map((gate, index) => (
            <motion.div
              key={gate.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="h-full"
            >
              <Tilt3D perspective={1000} maxRotation={8} className="h-full">
                <FloatingElement delay={index * 0.2} duration={4} yOffset={6} className="h-full">
                  <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border-t-8 border-festival-saffron h-full flex flex-col relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-black/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500"></div>
                    <h3 className="text-xl font-bold mb-4 z-10">{gate.name}</h3>
                    <div className="flex items-center mb-6 z-10">
                      <div className="mr-3 flex items-center justify-center">
                         {gate.status === 'high' ? (
                           <div className="w-3 h-3 rounded-full bg-festival-red animate-ping absolute"></div>
                         ) : null}
                         <div className={`h-3 w-3 rounded-full relative z-10 ${getStatusColor(gate.status)}`}></div>
                      </div>
                      <span className="capitalize font-medium text-gray-700">{gate.status} Crowd</span>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden z-10 mt-auto">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: getStatusWidth(gate.status) }}
                        transition={{ type: "spring", stiffness: 50, damping: 15 }}
                        className={`h-full rounded-full ${getStatusColor(gate.status)}`}
                      ></motion.div>
                    </div>
                    
                    <p className="mt-2 text-xs font-semibold text-gray-400 uppercase tracking-wider z-10">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </FloatingElement>
              </Tilt3D>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mt-16 text-center"
        >
          <FloatingElement yOffset={4}>
            <div className="inline-flex items-center space-x-6 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-md border border-gray-100">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-festival-green mr-3"></div>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600">Low</span>
              </div>
              <div className="w-px h-6 bg-gray-200"></div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-festival-yellow mr-3"></div>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600">Moderate</span>
              </div>
              <div className="w-px h-6 bg-gray-200"></div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-festival-red mr-3 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-600">High</span>
              </div>
            </div>
          </FloatingElement>
        </motion.div>
      </div>
    </section>
  );
};

export default CrowdTracker;
