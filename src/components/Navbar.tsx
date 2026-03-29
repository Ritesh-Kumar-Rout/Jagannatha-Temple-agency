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

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-2xl shadow-black/5 py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Magnetic strength={0.1}>
            <Link to="/" className="flex items-center block">
              <Logo 
                size="md" 
                className={!scrolled && location.pathname === "/" ? "brightness-200" : ""} 
              />
            </Link>
          </Magnetic>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isSOS = link.name === "SOS";
              const active = isActive(link.path);
              
              return (
                <Magnetic key={link.name} strength={0.2}>
                  <Link
                    to={link.path}
                    className={`block px-3 py-2 rounded-xl text-sm font-bold transition-all duration-300 uppercase tracking-wider ${
                      isSOS
                        ? "bg-festival-red text-white hover:bg-red-700 shadow-lg shadow-festival-red/20 hover:shadow-festival-red/40 ml-4"
                        : active
                        ? scrolled ? "text-festival-red bg-festival-red/5" : "text-festival-gold border-b-2 border-festival-gold rounded-none"
                        : scrolled ? "text-gray-700 hover:text-festival-red hover:bg-gray-50 border-b-2 border-transparent" : "text-white/90 hover:text-festival-gold hover:bg-white/10 border-b-2 border-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <Magnetic strength={0.3}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-xl transition-colors ${scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="xl:hidden fixed inset-0 top-[72px] bg-white/90 backdrop-blur-2xl z-40 border-t border-gray-100"
          >
            <div className="px-4 pt-4 pb-12 space-y-2 h-full overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, type: "spring", stiffness: 200, damping: 20 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-6 py-4 rounded-2xl text-lg font-black transition-all ${
                      link.name === "SOS"
                        ? "bg-festival-red text-white text-center mt-6 shadow-xl shadow-festival-red/20"
                        : isActive(link.path)
                        ? "bg-festival-red/5 text-festival-red border-l-8 border-festival-red pl-4"
                        : "text-gray-800 hover:bg-gray-50 border-l-8 border-transparent"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;