import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: 'Temple Rituals', path: '/rituals' },
      { name: 'Live Stream', path: '/#live-stream' },
      { name: 'Crowd Tracker', path: '/' },
      { name: 'Attractions', path: '/attractions' },
    ],
    travel: [
      { name: 'How to Reach', path: '/travel' },
      { name: 'Local Transport', path: '/travel' },
      { name: 'Accommodation', path: '/stay' },
      { name: 'Food Guide', path: '/food' },
    ],
    support: [
      { name: 'Emergency SOS', path: '/sos' },
      { name: 'Help Line', path: '/contact' },
      { name: 'FAQs', path: '/chat' },
      { name: 'Chatbot', path: '/chat' },
    ]
  };

  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://facebook.com', name: 'Facebook' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com', name: 'Instagram' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com', name: 'Twitter' },
    { icon: <Youtube size={20} />, href: 'https://youtube.com', name: 'Youtube' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-white/5 relative overflow-hidden">
      {/* Decorative Ornaments */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-festival-gold/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <Logo size="lg" className="brightness-125" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Your comprehensive digital gateway to the spiritual wonders of the Jagannath Ratha Yatra. Experience the divine heritage, tradition, and devotion from anywhere in the world.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 transition-all hover:bg-festival-red hover:text-white hover:-translate-y-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Explore</h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 text-sm hover:text-festival-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-festival-gold scale-0 group-hover:scale-100 transition-transform"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Travel</h4>
            <ul className="space-y-4">
              {footerLinks.travel.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 text-sm hover:text-festival-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-festival-gold scale-0 group-hover:scale-100 transition-transform"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Support</h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-400 text-sm hover:text-festival-gold transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-festival-gold scale-0 group-hover:scale-100 transition-transform"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-6">Connect</h4>
            <div className="space-y-4">
              <a href="tel:+918260013234" className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-festival-red/30 transition-all group">
                <div className="text-[10px] font-bold text-festival-gold uppercase tracking-widest mb-1">Help Desk</div>
                <div className="text-white font-black group-hover:text-festival-red transition-colors">+91 8260013234</div>
              </a>
              <a href="mailto:info@rathayatraverse.com" className="block p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-festival-red/30 transition-all group">
                <div className="text-[10px] font-bold text-festival-gold uppercase tracking-widest mb-1">Email Us</div>
                <div className="text-white font-black truncate group-hover:text-festival-red transition-colors">info@puri.com</div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
            &copy; {currentYear} RathaYatraVerse. Built with devotion for Jagannath Culture.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
