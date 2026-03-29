import { useState, useEffect, useRef, ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnetic } from './ui/Magnetic';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show when scrolled down a bit AND scrolling UP
      if (currentScrollY > 300 && currentScrollY < lastScrollY.current) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-festival-red/30">
      <Navbar />
      <main className="flex-grow">{children}</main>
      
      <AnimatePresence>
        {showScrollTop && (
          <motion.div 
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-28 right-6 z-40 rounded-full"
          >
            <Magnetic strength={0.5}>
              <button
                onClick={scrollToTop}
                className="p-3 md:p-4 bg-festival-red text-white rounded-full shadow-2xl shadow-festival-red/30 hover:shadow-festival-red/50 hover:bg-red-700 transition-all border border-white/20"
                aria-label="Back to top"
              >
                <ArrowUp size={24} />
              </button>
            </Magnetic>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer />
    </div>
  );
};

export default Layout;
