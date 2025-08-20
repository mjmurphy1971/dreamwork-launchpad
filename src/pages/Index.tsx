import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import VlogSection from "@/components/VlogSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import stillnessPracticeHero from "@/assets/stillness-practice-hero.jpg";
import dreamJournalBg from "@/assets/dream-journal-bg.jpg";
import meditationToolBg from "@/assets/meditation-tool-bg.jpg";
import audioSessionsBg from "@/assets/audio-sessions-bg.jpg";

const Index = () => {
  console.log('Index component rendering');
  
  const homePageSchema = {
    "@type": "WebPage",
    "name": "The Dream Work - Meditation & Mindfulness Resource",
    "description": "Comprehensive meditation and mindfulness resource with guided practices, dream journaling, wellness tools, and educational content for spiritual growth.",
    "mainEntity": {
      "@type": "WebSite",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://www.thedreamwork.space/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Meditation",
        "description": "Guided meditation practices for mindfulness and spiritual growth"
      },
      {
        "@type": "Thing", 
        "name": "Mindfulness",
        "description": "Awareness-based practices for present-moment consciousness"
      },
      {
        "@type": "Thing",
        "name": "Dream Work",
        "description": "Dream journaling and subconscious exploration techniques"
      },
      {
        "@type": "Thing",
        "name": "Natural Healing",
        "description": "Holistic wellness approaches and alternative healing practices"
      }
    ],
    "hasPart": [
      {
        "@type": "WebPageElement",
        "name": "Interactive Wellness Tools",
        "description": "Practice tracker, guided audio sessions, and dream journal tools"
      },
      {
        "@type": "WebPageElement",
        "name": "Educational Content",
        "description": "Blog posts and video content about meditation and mindfulness"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Meditation & Mindfulness Resource"
        description="Discover guided meditation practices, mindfulness techniques, dream journaling tools, and holistic wellness resources. Transform your spiritual journey with The Dream Work."
        keywords="meditation, mindfulness, guided meditation, dream journal, spiritual wellness, consciousness, natural healing, relaxation techniques"
        schemaType="WebPage"
        schemaData={homePageSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space/" }
        ]}
      />
      <Header />
      <main>
        <Hero />
        
        {/* Welcome Video Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Welcome Video */}
                <div className="bg-card backdrop-blur-sm rounded-lg p-6 border border-border shadow-card">
                  <h2 className="text-xl font-heading font-semibold text-foreground mb-4 text-center">
                    Welcome to The Dream Work
                  </h2>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src="https://www.youtube.com/embed/tOp-gbnyj3w"
                      title="Welcome to The Dream Work"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
                
                {/* Mindfulness Video */}
                <div className="bg-card backdrop-blur-sm rounded-lg p-6 border border-border shadow-card">
                  <h2 className="text-xl font-heading font-semibold text-foreground mb-4 text-center">
                    Mindfulness Practice
                  </h2>
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <iframe
                      src="https://www.youtube.com/embed/kO5I0p3IuiQ"
                      title="Mindfulness Practice"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Wellness Tools Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold gradient-text mb-4">
                Interactive Wellness Tools
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our guided practices, track your journey, and dive deep into self-discovery
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Practice Tracker */}
              <div 
                className="relative overflow-hidden rounded-lg bg-card border border-border shadow-card hover:shadow-card-hover transition-gentle group cursor-pointer"
                onClick={() => window.location.href = '/weekly-stillness'}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                  style={{ backgroundImage: `url(${stillnessPracticeHero})` }}
                />
                <div className="relative z-10 p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧘‍♀️</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    Practice Tracker
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Track gentle rituals, build mindful habits, and cultivate inner peace with our interactive tracker.
                  </p>
                  <div className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold group-hover:bg-primary/90 transition-gentle">
                    Start Tracking
                  </div>
                </div>
              </div>

              {/* Guided Audio Sessions */}
              <div 
                className="relative overflow-hidden rounded-lg bg-card border border-border shadow-card hover:shadow-card-hover transition-gentle group cursor-pointer"
                onClick={() => window.location.href = '/meditation'}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                  style={{ backgroundImage: `url(${audioSessionsBg})` }}
                />
                <div className="relative z-10 p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎧</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    Guided Audio Sessions
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    AI-generated meditation sessions for anxiety relief, self-love, sleep, and daily intention setting.
                  </p>
                  <div className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold group-hover:bg-primary/90 transition-gentle">
                    Listen Now
                  </div>
                </div>
              </div>

              {/* Dream Journal */}
              <div 
                className="relative overflow-hidden rounded-lg bg-card border border-border shadow-card hover:shadow-card-hover transition-gentle group cursor-pointer"
                onClick={() => window.location.href = '/dream-journal'}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
                  style={{ backgroundImage: `url(${dreamJournalBg})` }}
                />
                <div className="relative z-10 p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌙</span>
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                    Dream Journal
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Capture, explore, and track your dreams. Discover patterns, symbols, and insights from your subconscious.
                  </p>
                  <div className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold group-hover:bg-primary/90 transition-gentle">
                    Begin Journaling
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <BlogGrid />
        <VlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;