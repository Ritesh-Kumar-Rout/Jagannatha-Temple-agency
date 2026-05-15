import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import { Magnetic } from "./ui/Magnetic";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Rituals", path: "/rituals" },
  { name: "Stay", path: "/stay" },
  { name: "Travel", path: "/travel" },
  { name: "Food", path: "/food" },
  { name: "Attractions", path: "/attractions" },
  { name: "SOS", path: "/sos" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg py-2" 
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Magnetic strength={0.1}>
              <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
                <Logo 
                  size="md" 
                  className={`transition-all duration-300 ${!scrolled && location.pathname === "/" ? "brightness-200" : "brightness-100"}`} 
                />
              </Link>
            </Magnetic>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isSOS = link.name === "SOS";
                const active = isActive(link.path);
                
                return (
                  <Magnetic key={link.name} strength={0.2}>
                    <Link
                      to={link.path}
                      className={`px-3 py-2 rounded-xl text-[13px] xl:text-sm font-bold transition-all duration-300 uppercase tracking-wider ${
                        isSOS
                          ? "bg-festival-red text-white hover:bg-red-700 shadow-lg shadow-festival-red/20 hover:shadow-festival-red/40 ml-4 px-6"
                          : active
                          ? scrolled ? "text-festival-red bg-festival-red/5" : "text-festival-gold border-b-2 border-festival-gold rounded-none"
                          : scrolled ? "text-gray-700 hover:text-festival-red hover:bg-gray-50" : "text-white/90 hover:text-festival-gold hover:bg-white/10"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </Magnetic>
                );
              })}
            </div>

            {/* Mobile/Tablet Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              {/* Quick SOS for Mobile */}
              {!isOpen && (
                <Link 
                  to="/sos" 
                  className="bg-festival-red text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-festival-red/30 animate-pulse"
                >
                  SOS
                </Link>
              )}
              
              <Magnetic strength={0.3}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-xl transition-all duration-300 z-[100] relative ${
                    isOpen 
                      ? "text-gray-900 bg-gray-100" 
                      : scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"
                  }`}
                  aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Navigation Overlay - MOVED OUTSIDE motion.nav */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80] lg:hidden"
            />
            
            {/* Menu Panel */}
            <motion.div 
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[90] shadow-2xl flex flex-col"
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <Logo size="md" />
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl bg-gray-50 text-gray-900 hover:bg-gray-100 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-grow space-y-2 overflow-y-auto custom-scrollbar pr-2">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-6 py-4 rounded-2xl text-lg font-bold transition-all ${
                          link.name === "SOS"
                            ? "bg-festival-red text-white text-center mt-6 shadow-xl shadow-festival-red/20 ring-4 ring-festival-red/10"
                            : isActive(link.path)
                            ? "bg-festival-red/5 text-festival-red border-l-4 border-festival-red pl-5"
                            : "text-gray-700 hover:bg-gray-50 border-l-4 border-transparent"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-auto pt-8 border-t border-gray-100">
                  <div className="flex justify-center gap-4 mb-6">
                    {/* Placeholder for social links or secondary links if needed */}
                  </div>
                  <p className="text-gray-400 text-xs text-center font-medium uppercase tracking-widest">
                    © 2026 Jagannatha Temple Agency
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;