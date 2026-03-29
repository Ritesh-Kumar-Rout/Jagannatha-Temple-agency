import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading time for dramatic presentation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#09151a]"
        >
          {/* Uiverse.io loading animation */}
          <div className="uiverse-wrapper mb-8">
            <div className="uiverse-circle !bg-festival-gold"></div>
            <div className="uiverse-circle !bg-festival-saffron"></div>
            <div className="uiverse-circle !bg-festival-red"></div>
            <div className="uiverse-shadow"></div>
            <div className="uiverse-shadow"></div>
            <div className="uiverse-shadow"></div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-festival-gold/60 font-black tracking-[0.3em] uppercase text-xs"
          >
            Entering RathaYatraVerse...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
