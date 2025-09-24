import React from 'react';

const SeraphimSection = () => {
  return (
    <section className="py-20 bg-gradient-cosmic">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading text-cosmic-foreground mb-6">
              👼 The Seraphim Teachings
            </h2>
            <p className="text-xl text-cosmic-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Sacred wisdom from the six-winged ones who surround the throne of divine presence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Teaching content */}
            <div className="space-y-8">
              <div className="bg-cosmic-foreground/5 rounded-2xl p-8 backdrop-blur-sm border border-cosmic-foreground/10">
                <h3 className="text-2xl font-heading text-cosmic-foreground mb-4">
                  The Sacred Observers
                </h3>
                <p className="text-cosmic-foreground/80 mb-4 leading-relaxed">
                  The Seraphim are beings of pure presence, with eyes all around and six wings that serve sacred purpose. They teach us the art of conscious observation without attachment.
                </p>
                <div className="space-y-3 text-cosmic-foreground/70">
                  <p>🪶 <strong>Two wings to cover the face</strong> - Humility before the divine</p>
                  <p>🪶 <strong>Two wings to cover the feet</strong> - Grounding in sacred service</p>
                  <p>🪶 <strong>Two wings to fly</strong> - Movement between realms of consciousness</p>
                </div>
              </div>

              <div className="bg-cosmic-foreground/5 rounded-2xl p-8 backdrop-blur-sm border border-cosmic-foreground/10">
                <h3 className="text-2xl font-heading text-cosmic-foreground mb-4">
                  Energetic Protocols
                </h3>
                <blockquote className="text-lg italic text-cosmic-foreground/90 mb-4 border-l-4 border-accent pl-6">
                  "Let energy flow around you, through you—but do not become it."
                </blockquote>
                <p className="text-cosmic-foreground/80 leading-relaxed">
                  The Seraphim teach us to be conduits of divine energy while maintaining our center, our stillness, our sovereign presence.
                </p>
              </div>
            </div>

            {/* Right side - Visual representation */}
            <div className="relative">
              <div className="bg-gradient-spectrum rounded-full w-80 h-80 mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-cosmic/60 rounded-full flex items-center justify-center">
                  <div className="text-center text-cosmic-foreground">
                    <div className="text-6xl mb-4">👁️</div>
                    <div className="text-sm font-heading tracking-widest">SACRED OBSERVATION</div>
                  </div>
                </div>
                
                {/* Wing symbols around the circle */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-2xl animate-float">🪶</div>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl animate-float" style={{animationDelay: '1s'}}>🪶</div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-2xl animate-float" style={{animationDelay: '2s'}}>🪶</div>
                <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 text-2xl animate-float" style={{animationDelay: '0.5s'}}>🪶</div>
                <div className="absolute top-1/4 -right-2 transform -translate-y-1/2 text-2xl animate-float" style={{animationDelay: '1.5s'}}>🪶</div>
                <div className="absolute top-3/4 -left-2 transform -translate-y-1/2 text-2xl animate-float" style={{animationDelay: '2.5s'}}>🪶</div>
              </div>
            </div>
          </div>

          {/* Call to practice */}
          <div className="mt-16 text-center">
            <div className="bg-cosmic-foreground/5 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm border border-cosmic-foreground/10">
              <h3 className="text-2xl font-heading text-cosmic-foreground mb-4">
                Practice Sacred Observation
              </h3>
              <p className="text-cosmic-foreground/80 mb-6 leading-relaxed">
                Begin your journey with the Seraphim by learning to witness without attachment, to observe without becoming consumed.
              </p>
              <button className="inline-flex items-center justify-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium">
                Begin Seraphim Practice
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeraphimSection;