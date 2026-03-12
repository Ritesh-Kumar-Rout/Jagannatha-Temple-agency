
import { useState, useEffect } from 'react';

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title inline-block">Live Crowd Status</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Real-time crowd information at temple gates to help plan your visit.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {crowdData.map((gate) => (
            <div key={gate.id} className="bg-white rounded-lg shadow-md p-6 border-t-4 border-festival-saffron">
              <h3 className="text-xl font-semibold mb-3">{gate.name}</h3>
              <div className="flex items-center mb-4">
                <div className="mr-2 h-3 w-3">
                   {gate.status === 'high' ? (
                     <div className="pulse"></div>
                   ) : (
                     <div className={`h-3 w-3 rounded-full ${getStatusColor(gate.status)}`}></div>
                   )}
                </div>
                <span className="capitalize ml-2">{gate.status} crowd</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${getStatusColor(gate.status)}`} 
                  style={{ 
                    width: gate.status === "low" ? "30%" : gate.status === "moderate" ? "65%" : "90%" 
                  }}
                ></div>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <div className="inline-flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-festival-green mr-2"></div>
              <span className="text-sm">Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-festival-yellow mr-2"></div>
              <span className="text-sm">Moderate</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-festival-red mr-2"></div>
              <span className="text-sm">High</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrowdTracker;
