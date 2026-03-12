const YOUTUBE_VIDEO_URL = "https://www.youtube.com/live/_pplsMPNVmQ?si=6uxDBBF6W7mhlcBR";

const LiveStream = () => {
  const isStreamAvailable = !!YOUTUBE_VIDEO_URL;

  return (
    <div id="live-stream" className="scroll-mt-24">
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title inline-block">Live Stream</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Watch the Ratha Yatra procession and temple events live.
            </p>
          </div>

          <div className="bg-black rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <div className="aspect-w-16 aspect-h-9 bg-gray-800">
              <div className="w-full h-0 pb-[56.25%] relative">
                {isStreamAvailable ? (
                  <iframe
                    width="100%"
                    height="500"
                    src="https://www.youtube.com/embed/_pplsMPNVmQ?si=6uxDBBF6W7mhlcBR"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="text-white text-center p-6">
                      <div className="w-16 h-16 mx-auto mb-4 border-4 border-t-festival-saffron rounded-full animate-spin"></div>
                      <h3 className="text-xl font-medium mb-2">Live Stream Coming Soon</h3>
                      <p className="text-gray-400">Check back during the festival for live coverage</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-gray-900 text-white p-4">
              <h3 className="text-lg font-medium">Ratha Yatra 2025 - Live from Puri</h3>
              <div className="flex items-center text-sm text-gray-400 mt-1">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  {isStreamAvailable ? "Live" : "Offline"}
                </span>
                <span className="mx-3">|</span>
                <span>Viewers: 0</span>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default LiveStream;
