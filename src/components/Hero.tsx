import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative text-white overflow-hidden h-screen">
      {/* Background Video - Full screen with dark overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="videoplayback (1).mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay for text readability */}
      </div>

      {/* Content - Centered text and buttons */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 h-full flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Welcome to RathaYatraVerse
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Your complete digital guide to the annual Ratha Yatra festival in Puri, Odisha.<br />
            Experience the divine journey of Lord Jagannath.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/rituals" 
              className="px-8 py-3 bg-white text-pink-600 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              Explore Rituals
            </Link>
            {/* <Link 
              to="/#live-stream" 
              
              className="px-8 py-3 bg-yellow-400 text-white font-medium rounded-lg shadow-lg hover:bg-yellow-500 transition-colors"
            >
              
              Watch Live
            </Link> */}
            <a href="#live-stream" className="nav-link" className="px-8 py-3 bg-yellow-400 text-white font-medium rounded-lg shadow-lg hover:bg-yellow-500 transition-colors"
              >
              Watch Live
              </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;