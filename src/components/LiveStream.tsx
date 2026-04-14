import { motion } from 'framer-motion';
import { FloatingElement } from './ui/FloatingElement';

const YOUTUBE_VIDEO_URL = "https://www.youtube.com/live/_pplsMPNVmQ?si=6uxDBBF6W7mhlcBR";

const LiveStream = () => {
  const isStreamAvailable = !!YOUTUBE_VIDEO_URL;

  return (
    <div id="live-stream" className="scroll-mt-24">
      <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
            className="text-center mb-16"
          >
            <h2 className="section-title inline-block">Live Stream</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Watch the Ratha Yatra procession and temple events live in high definition.
            </p>
          </motion.div>

          <FloatingElement duration={8} yOffset={8}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-black/90 backdrop-blur-xl rounded-3xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.3)] max-w-5xl mx-auto border border-white/10 relative"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-festival-saffron/20 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-festival-red/20 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2"></div>
              
              <div className="aspect-w-16 aspect-h-9 relative z-10">
                <div className="w-full h-0 pb-[56.25%] relative group">
                  {isStreamAvailable ? (
                    <iframe
                      width="100%"
                      height="100%"
                      className="absolute inset-0"
                      data-lenis-prevent="true"
                      src="https://www.youtube.com/embed/_pplsMPNVmQ?si=6uxDBBF6W7mhlcBR"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <div className="text-white text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-6 border-4 border-t-festival-saffron border-r-festival-red border-b-festival-gold border-l-transparent rounded-full animate-spin"></div>
                        <h3 className="text-2xl font-bold mb-3 tracking-wide">Live Stream Coming Soon</h3>
                        <p className="text-gray-400 font-medium">Check back during the festival for live multi-cam coverage</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="bg-gray-900/80 backdrop-blur-md text-white p-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                <div>
                  <h3 className="text-xl font-bold tracking-wide">Ratha Yatra 2025 - Live from Puri</h3>
                  <div className="flex items-center text-sm text-gray-400 mt-2 font-medium">
                    <span className="flex items-center">
                      <span className="w-2.5 h-2.5 bg-red-500 rounded-full mr-2 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                      {isStreamAvailable ? "Live Now" : "Currently Offline"}
                    </span>
                    <span className="mx-4 opacity-30">|</span>
                    <span className="tracking-wider">Viewers: {isStreamAvailable ? "1,245,392" : "0"}</span>
                  </div>
                </div>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-bold text-sm tracking-wider">
                  Share Stream
                </button>
              </div>
            </motion.div>
          </FloatingElement>
        </div>
      </section>
    </div>
  );
};

export default LiveStream;
