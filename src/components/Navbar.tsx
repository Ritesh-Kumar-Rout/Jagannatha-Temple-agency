import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Rituals", path: "/rituals" },
  { name: "Stay", path: "/stay" },
  { name: "Travel", path: "/travel" },
  { name: "Food", path: "/food" },
  { name: "Attractions", path: "/attractions" },
  { name: "Chatbot", path: "/chat" },
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
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <Logo 
              size="md" 
              className={!scrolled && location.pathname === "/" ? "brightness-200" : ""} 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-2">
            {navLinks.map((link) => {
              const isSOS = link.name === "SOS";
              const active = isActive(link.path);
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-xl text-sm font-bold transition-all duration-200 uppercase tracking-wider ${
                    isSOS
                      ? "bg-festival-red text-white hover:bg-red-700 shadow-md ml-4"
                      : active
                      ? scrolled ? "text-festival-red bg-festival-red/5" : "text-festival-gold border-b-2 border-festival-gold rounded-none"
                      : scrolled ? "text-gray-700 hover:text-festival-red hover:bg-gray-50" : "text-white/90 hover:text-festival-gold hover:bg-white/10"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-colors ${scrolled ? "text-gray-900 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="xl:hidden fixed inset-0 top-[72px] bg-white z-40 animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="px-4 pt-4 pb-12 space-y-2 h-full overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-6 py-4 rounded-2xl text-lg font-black transition-all ${
                  link.name === "SOS"
                    ? "bg-festival-red text-white text-center mt-6 shadow-xl"
                    : isActive(link.path)
                    ? "bg-festival-red/5 text-festival-red border-l-8 border-festival-red pl-4"
                    : "text-gray-800 hover:bg-gray-50 border-l-8 border-transparent"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;