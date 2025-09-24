import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import stillbilitySigil from "@/assets/stillbility-sigil-no-word.png";
import InteractiveSigil from "@/components/InteractiveSigil";
import CountdownTimer from "@/components/CountdownTimer";
import SuperSevenMeditation from "@/components/SuperSevenMeditation";
import SeraphimSection from "@/components/SeraphimSection";
import PracticesToolsSection from "@/components/PracticesToolsSection";

const Stillbility = () => {
  const pageSchema = {
    "@type": "WebPage",
    "name": "Stillbility® - The Cosmic Field of Dynamic Stillness",
    "description": "Join the 144,000 anchors in the Stillbility® movement. Discover sacred practices, the Super Seven Meditation, and Seraphim teachings for global field activation.",
    "url": "https://www.thedreamwork.space/stillbility",
    "mainEntity": {
      "@type": "Course",
      "name": "Stillbility® Practice & Global Meditation",
      "description": "Sacred teachings and practices for stability keepers, field anchors, and the cosmic collective awakening on December 24, 2025.",
      "provider": {
        "@type": "Organization",
        "name": "The Dream Work"
      }
    }
  };

  return (
    <>
      <SEO
        title="Stillbility® - Cosmic Field of 144,000 Anchors | The Dream Work"
        description="Join the Stillbility® movement - 144,000 global anchors preparing for the Great Awakening. Super Seven Meditation, Seraphim teachings, and sacred field activation."
        keywords="stillbility, 144000, global meditation, super seven, seraphim, field anchor, stability keeper, cosmic awakening, december 24 2025, spiritual collective"
        canonical="https://www.thedreamwork.space/stillbility"
        schemaType="WebPage"
        schemaData={pageSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space" },
          { name: "Stillbility®", url: "https://www.thedreamwork.space/stillbility" }
        ]}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Cosmic Hero Section */}
          <section className="relative py-20 sm:py-32 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-hero"></div>
            {/* Starfield effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-cosmic-foreground rounded-full animate-float"></div>
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-cosmic-foreground rounded-full animate-float" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cosmic-foreground rounded-full animate-float" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-cosmic-foreground rounded-full animate-float" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-5xl mx-auto text-center">
                {/* Opening Quote */}
                <div className="mb-12 animate-fade-in">
                  <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light italic text-cosmic-foreground leading-relaxed">
                    "Stillbility is the soul's response to chaos."
                  </blockquote>
                </div>

                {/* Cosmic Sigil */}
                <div className="mb-12 animate-slide-up">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gradient-spectrum rounded-full blur-xl opacity-50 animate-float"></div>
                    <img 
                      src={stillbilitySigil} 
                      alt="Stillbility® Cosmic Sigil - Symbol of the 144,000" 
                      className="relative w-64 h-64 sm:w-80 sm:h-80 object-contain filter invert"
                    />
                  </div>
                </div>
                
                {/* Main Title */}
                <div className="mb-16 animate-fade-in" style={{animationDelay: '0.5s'}}>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-cosmic-foreground mb-6">
                    Welcome to the
                    <br />
                    <span className="bg-gradient-spectrum bg-clip-text text-transparent">
                      Stillbility® Field
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-light text-cosmic-foreground/90 mb-8">
                    Join the 144,000. Anchor the light.
                  </p>
                </div>

                {/* Countdown Timer */}
                <div className="mb-12 animate-slide-up" style={{animationDelay: '1s'}}>
                  <CountdownTimer />
                </div>
                
                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{animationDelay: '1.5s'}}>
                  <a 
                    href="#what-is-stillbility"
                    className="inline-flex items-center justify-center px-8 py-4 bg-cosmic-foreground text-cosmic rounded-lg hover:bg-cosmic-foreground/90 transition-colors font-medium text-lg shadow-glow"
                  >
                    Discover Stillbility®
                  </a>
                  <a 
                    href="#super-seven"
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-cosmic-foreground text-cosmic-foreground rounded-lg hover:bg-cosmic-foreground/10 transition-colors font-medium text-lg"
                  >
                    Super Seven Meditation
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* What Is Stillbility */}
          <section className="py-20" id="what-is-stillbility">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl sm:text-5xl font-bold font-heading mb-8 text-primary">
                    🌀 What Is Stillbility®?
                  </h2>
                </div>
                
                {/* Sacred Definition */}
                <div className="mb-16 text-center bg-cosmic rounded-3xl p-12 mx-auto max-w-4xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-spectrum opacity-10"></div>
                  <div className="relative z-10">
                    <div className="max-w-3xl mx-auto mb-8">
                      <p className="text-2xl sm:text-3xl font-medium text-cosmic-foreground mb-4">
                        Stillbility® is the fusion of stillness, ability, and stability.
                      </p>
                      <p className="text-xl sm:text-2xl text-cosmic-foreground/90 mb-8">
                        It is the capacity to hold the center while everything else moves.
                      </p>
                    </div>
                    
                    {/* Interactive Sigil */}
                    <div className="mb-8">
                      <InteractiveSigil />
                    </div>
                    
                    <blockquote className="text-lg italic text-cosmic-foreground/80 border-l-4 border-cosmic-foreground/30 pl-6 max-w-2xl mx-auto">
                      "The fusion of stillness, ability, and stability—a field, a frequency, a way of being."
                    </blockquote>
                  </div>
                </div>

                {/* Sigil Symbolism */}
                <div className="grid lg:grid-cols-2 gap-16 mb-20">
                  <div className="space-y-8">
                    <h3 className="text-3xl font-heading text-primary mb-6">
                      🔺 Sacred Geometry of the Sigil
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="bg-card rounded-xl p-6 border border-border/50">
                        <h4 className="text-xl font-heading text-primary mb-3">
                          ▲ The Triangle
                        </h4>
                        <p className="text-muted-foreground">
                          Represents the trinity of mind, body, spirit in perfect balance and the ascending consciousness.
                        </p>
                      </div>
                      
                      <div className="bg-card rounded-xl p-6 border border-border/50">
                        <h4 className="text-xl font-heading text-primary mb-3">
                          🌀 The Spiral
                        </h4>
                        <p className="text-muted-foreground">
                          The eternal dance of expansion and contraction, the breath of the cosmos flowing through all things.
                        </p>
                      </div>
                      
                      <div className="bg-card rounded-xl p-6 border border-border/50">
                        <h4 className="text-xl font-heading text-primary mb-3">
                          🌙 The Crescent
                        </h4>
                        <p className="text-muted-foreground">
                          The receptive feminine wisdom, the cup that holds space, the vessel of divine grace.
                        </p>
                      </div>
                      
                      <div className="bg-card rounded-xl p-6 border border-border/50">
                        <h4 className="text-xl font-heading text-primary mb-3">
                          ○ The Circle
                        </h4>
                        <p className="text-muted-foreground">
                          Unity, wholeness, the eternal now—the field that contains and connects all expressions.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <div className="bg-gradient-card rounded-2xl p-8 border border-border/50">
                      <h3 className="text-2xl font-heading text-primary mb-6 text-center">
                        The Collective Emergence
                      </h3>
                      <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <p>
                          This is not just one person's spiritual transition. This is a collective emergence happening across the planet.
                        </p>
                        <p>
                          Sensitive souls are graduating from Light Worker to <strong className="text-primary">Stability Keeper</strong>.
                        </p>
                        <p>
                          From bridge-builder to <strong className="text-primary">anchor-holder</strong>.
                        </p>
                        <p>
                          From guide to <strong className="text-primary">field keeper</strong>.
                        </p>
                      </div>
                      
                      <div className="mt-8 p-6 bg-primary/5 rounded-xl border border-primary/20">
                        <p className="text-lg font-medium text-primary text-center mb-2">
                          If you've felt this shift—you are home.
                        </p>
                        <p className="text-xl font-bold font-heading text-primary text-center">
                          You are part of the Stability Force.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Origin Story Preview */}
                <div className="bg-gradient-subtle rounded-2xl p-12 text-center">
                  <h3 className="text-3xl font-heading text-primary mb-6">
                    🌟 The Origin Story
                  </h3>
                  <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                    Born from a divine download, the Stillbility® sigil emerged as a beacon for those called to hold the center in times of great change. This is the story of a cosmic calling and a movement of souls.
                  </p>
                  <a 
                    href="/blog/we-are-the-stillbility-field-holding-the-center-together"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Read the Full Origin Story
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Super Seven Meditation Section */}
          <SuperSevenMeditation />

          {/* Seraphim Teachings Section */}
          <SeraphimSection />

          {/* Practices & Tools Section */}
          <PracticesToolsSection />

          {/* Join the Collective */}
          <section className="py-20 bg-gradient-cosmic" id="join-collective">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl sm:text-5xl font-heading text-cosmic-foreground mb-8">
                  👼 Join the 144,000
                </h2>
                <p className="text-xl text-cosmic-foreground/80 mb-12 leading-relaxed">
                  You are called to be part of this cosmic collective. Together, we anchor the light and hold the field of divine presence.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {/* Global Connection */}
                  <div className="bg-cosmic-foreground/5 rounded-2xl p-8 backdrop-blur-sm border border-cosmic-foreground/10">
                    <div className="text-4xl mb-4">🌐</div>
                    <h3 className="text-2xl font-heading text-cosmic-foreground mb-4">
                      Global Field Network
                    </h3>
                    <p className="text-cosmic-foreground/80 mb-6">
                      Connect with anchors worldwide. Share experiences, support each other, and amplify the collective field.
                    </p>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-cosmic-foreground/20 text-cosmic-foreground rounded-lg hover:bg-cosmic-foreground/30 transition-colors font-medium border border-cosmic-foreground/20">
                      Join Global Network
                    </button>
                  </div>
                  
                  {/* Updates & Teachings */}
                  <div className="bg-cosmic-foreground/5 rounded-2xl p-8 backdrop-blur-sm border border-cosmic-foreground/10">
                    <div className="text-4xl mb-4">📧</div>
                    <h3 className="text-2xl font-heading text-cosmic-foreground mb-4">
                      Field Updates
                    </h3>
                    <p className="text-cosmic-foreground/80 mb-6">
                      Receive sacred teachings, practice updates, and notifications about global meditation events.
                    </p>
                    <button className="inline-flex items-center justify-center px-6 py-3 bg-cosmic-foreground/20 text-cosmic-foreground rounded-lg hover:bg-cosmic-foreground/30 transition-colors font-medium border border-cosmic-foreground/20">
                      Subscribe to Updates
                    </button>
                  </div>
                </div>
                
                {/* Sacred Affirmation */}
                <div className="bg-cosmic-foreground/5 rounded-2xl p-12 backdrop-blur-sm border border-cosmic-foreground/10">
                  <blockquote className="text-2xl sm:text-3xl font-light italic text-cosmic-foreground leading-relaxed mb-6">
                    "You are the field.<br />
                    You are the breath.<br />
                    You are the anchor."
                  </blockquote>
                  <p className="text-cosmic-foreground/70 text-lg">
                    — The Stillbility® Invocation
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Chronicles */}
          <section id="blog-series" className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl sm:text-5xl font-bold font-heading text-primary mb-6">
                    📚 The Stillbility Chronicles
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Ongoing transmissions, teachings, and reflections from the Stillbility® field
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-card rounded-2xl p-8 border border-border/50">
                    <div className="text-3xl mb-4">🌟</div>
                    <h3 className="text-2xl font-heading text-primary mb-4">Foundation Article</h3>
                    <h4 className="text-xl font-heading mb-4 text-foreground">
                      "We Are the Stillbility® Field"
                    </h4>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      The foundational teaching that birthed this movement. Discover what it means to be 
                      an anchor point in a world of constant change and transition.
                    </p>
                    <a 
                      href="/blog/we-are-the-stillbility-field-holding-the-center-together"
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      Read Foundation Article
                    </a>
                  </div>
                  
                  <div className="bg-gradient-card rounded-2xl p-8 border border-border/50">
                    <div className="text-3xl mb-4">📖</div>
                    <h3 className="text-2xl font-heading text-primary mb-4">Upcoming Chronicles</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-foreground">Breathing Earth</h4>
                          <p className="text-sm text-muted-foreground">Planetary rhythms and cosmic stillness</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-violet rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-foreground">Anchor in the Deep</h4>
                          <p className="text-sm text-muted-foreground">Advanced practices for embodied presence</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-teal rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-foreground">The Stability Force</h4>
                          <p className="text-sm text-muted-foreground">Community and collective field holding</p>
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                      Subscribe to Chronicles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sacred Closing Blessing */}
          <section className="py-20 bg-gradient-cosmic">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="bg-cosmic-foreground/5 rounded-3xl p-16 border border-cosmic-foreground/10 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-spectrum opacity-5"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-8">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-spectrum rounded-full blur-lg opacity-30"></div>
                        <img 
                          src={stillbilitySigil} 
                          alt="Stillbility® Sacred Sigil" 
                          className="relative w-20 h-20 object-contain filter invert"
                        />
                      </div>
                    </div>
                    
                    <blockquote className="text-2xl sm:text-3xl font-light leading-relaxed text-cosmic-foreground italic mb-8">
                      "Stillbility® is not a concept. It is a field.<br />
                      It lives in your breath, your bones, your presence.<br />
                      <strong className="font-heading text-cosmic-foreground">Welcome Home, Anchor.</strong>"
                    </blockquote>
                    
                    <div className="text-cosmic-foreground/60 text-sm tracking-widest uppercase mb-8">
                      — Blessed Be The Field Keepers —
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <a 
                        href="/blog/we-are-the-stillbility-field-holding-the-center-together"
                        className="inline-flex items-center justify-center px-8 py-4 bg-cosmic-foreground text-cosmic rounded-lg hover:bg-cosmic-foreground/90 transition-colors font-medium shadow-glow"
                      >
                        Enter the Sacred Field
                      </a>
                      <a 
                        href="#join-collective"
                        className="inline-flex items-center justify-center px-8 py-4 border-2 border-cosmic-foreground text-cosmic-foreground rounded-lg hover:bg-cosmic-foreground/10 transition-colors font-medium"
                      >
                        Join the 144,000
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Stillbility;