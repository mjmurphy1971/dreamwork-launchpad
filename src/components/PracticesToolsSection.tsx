import React from 'react';

const PracticesToolsSection = () => {
  const tools = [
    {
      title: "Breath Rituals",
      description: "Sacred breathing practices for daily anchoring",
      icon: "🌬️",
      status: "Available Soon",
      color: "bg-accent/10 border-accent/20"
    },
    {
      title: "Stability Coaching",
      description: "Personalized guidance for your anchoring journey",
      icon: "🧭",
      status: "In Development",
      color: "bg-violet/10 border-violet/20"
    },
    {
      title: "Oracle Deck",
      description: "Daily messages from the Stillbility field",
      icon: "🃏",
      status: "Coming 2025",
      color: "bg-teal/10 border-teal/20"
    },
    {
      title: "Guidebook",
      description: "Comprehensive manual for field keepers",
      icon: "📖",
      status: "Available Soon",
      color: "bg-primary/10 border-primary/20"
    },
    {
      title: "Companion App",
      description: "Mobile support for your practice",
      icon: "📱",
      status: "Future Release",
      color: "bg-cosmic/10 border-cosmic/20"
    },
    {
      title: "Community Hub",
      description: "Connect with other anchors worldwide",
      icon: "🌐",
      status: "Beta Testing",
      color: "bg-accent/10 border-accent/20"
    }
  ];

  return (
    <section className="py-20" id="practices-tools">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-heading text-primary mb-6">
              🧘‍♀️ Practices & Sacred Tools
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A growing collection of resources to support your daily anchoring and field-keeping practice
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {tools.map((tool, index) => (
              <div key={index} className={`${tool.color} rounded-2xl p-8 border backdrop-blur-sm hover:scale-105 transition-transform duration-300`}>
                <div className="text-center">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <h3 className="text-xl font-heading text-foreground mb-3">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {tool.description}
                  </p>
                  <div className="inline-flex items-center px-3 py-1 bg-background/50 rounded-full text-sm text-muted-foreground">
                    {tool.status}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Connection to Dreamwork ecosystem */}
          <div className="bg-gradient-card rounded-2xl p-12 border border-border/50 text-center">
            <h3 className="text-3xl font-heading text-primary mb-6">
              🔗 Connected to The Dream Work Ecosystem
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Stillbility® is a sacred branch of The Dream Work, offering specialized tools for stability keepers and field anchors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/meditation"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Explore Meditation Tools
              </a>
              <a 
                href="/dream-journal"
                className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
              >
                Visit Dream Journal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticesToolsSection;