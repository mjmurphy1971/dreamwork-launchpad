import React from 'react';

const SuperSevenMeditation = () => {
  return (
    <section className="py-20 bg-gradient-subtle" id="super-seven">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading text-primary mb-6">
              🎥 Super Seven Meditation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Seven minutes to raise your vibration to 5D consciousness and join the global field of anchored presence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Video placeholder */}
            <div className="relative">
              <div className="bg-cosmic rounded-2xl p-8 aspect-video flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-spectrum opacity-20"></div>
                <div className="text-center text-cosmic-foreground relative z-10">
                  <div className="text-6xl mb-4">🧘‍♀️</div>
                  <div className="text-2xl font-heading mb-2">Coming Soon</div>
                  <div className="text-sm opacity-80">7-Minute Guided Practice</div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-accent/20 rounded-full animate-float"></div>
              <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-violet/30 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-teal/40 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
            </div>

            {/* Right side - Information */}
            <div className="space-y-8">
              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h3 className="text-2xl font-heading text-primary mb-4">
                  🌟 What to Expect
                </h3>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong className="text-foreground">Minutes 1-2:</strong> Grounding and centering breath</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-violet rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong className="text-foreground">Minutes 3-4:</strong> Heart expansion and connection</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong className="text-foreground">Minutes 5-6:</strong> Field activation and anchoring</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p><strong className="text-foreground">Minute 7:</strong> Integration and blessing</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-card">
                <h3 className="text-2xl font-heading text-primary mb-4">
                  🧭 How to Prepare
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>• Find a quiet space where you won't be disturbed</p>
                  <p>• Sit comfortably with your spine naturally straight</p>
                  <p>• Have water nearby for after the practice</p>
                  <p>• Set intention to anchor light for the collective</p>
                  <p>• Allow yourself to receive whatever wants to come through</p>
                </div>
              </div>

              <div className="bg-gradient-card rounded-2xl p-8 border border-border/50">
                <div className="text-center">
                  <h3 className="text-xl font-heading text-primary mb-4">
                    Ready to Join the Global Practice?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Be notified when the Super Seven Meditation is released
                  </p>
                  <button className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                    Notify Me When Available
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuperSevenMeditation;