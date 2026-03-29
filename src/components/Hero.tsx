import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Magnetic } from './ui/Magnetic';
import { FloatingElement } from './ui/FloatingElement';

const Hero = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacityContent = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={container} className="relative text-white overflow-hidden h-screen flex items-center">
      {/* Background Video - Full screen with dark overlay and Parallax */}
      <motion.div style={{ y: yBackground }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="videoplayback (1).mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        
        {/* Modern Multi-layer Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
      </motion.div>

      {/* Content - Centered text and buttons */}
      <motion.div 
        style={{ y: yContent, opacity: opacityContent }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full"
      >
        <FloatingElement duration={5} yOffset={10} className="max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-festival-gold/20 border border-festival-gold/30 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-festival-gold animate-pulse"></span>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-festival-gold">Divine Experience</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-none mb-6 tracking-tighter italic"
          >
            Divine <br />
            <span className="text-festival-gold not-italic relative inline-block">
              Ratha Yatra
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                className="absolute bottom-2 left-0 h-2 bg-festival-red opacity-50 -z-10"
              />
            </span> <br />
            Verse
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
            className="text-lg md:text-xl mb-10 text-white/80 leading-relaxed max-w-xl"
          >
            Immerse yourself in the sacred journey of Lord Jagannath. Your complete digital companion for the world's most magnificent chariot festival.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            className="flex flex-col sm:flex-row gap-6 items-start sm:items-center"
          >
            <Magnetic strength={0.4}>
              <Link
                to="/rituals"
                className="group relative px-8 py-4 bg-festival-red text-white font-black rounded-2xl shadow-xl shadow-festival-red/20 transition-all hover:scale-105 active:scale-95 overflow-hidden block"
              >
                <span className="relative z-10 uppercase tracking-widest text-sm">Explore Rituals</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </Link>
            </Magnetic>
            
            <Magnetic strength={0.2}>
              <a
                href="#live-stream"
                className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black rounded-2xl shadow-xl transition-all hover:bg-white/20 hover:shadow-white/10 active:scale-95"
              >
                <div className="p-1.5 bg-festival-gold rounded-full group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-white text-white" />
                </div>
                <span className="uppercase tracking-widest text-sm">Watch Live</span>
              </a>
            </Magnetic>
          </motion.div>
        </FloatingElement>
      </motion.div>
      
      {/* Bottom info bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, type: "spring" }}
        style={{ y: yContent, opacity: opacityContent }}
        className="absolute bottom-10 left-0 right-0 z-10 hidden md:block"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 text-white/50 text-[10px] font-bold uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <span className="text-festival-gold">01</span> Puri, Odisha
            </div>
            <div className="w-12 h-[1px] bg-white/20"></div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <span className="text-festival-gold">02</span> Annual Festival
            </div>
            <div className="w-12 h-[1px] bg-white/20"></div>
            <div className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
              <span className="text-festival-gold">03</span> Millions of Devotees
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;