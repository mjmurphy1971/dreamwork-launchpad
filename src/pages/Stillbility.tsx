import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import stillbilitySigil from "@/assets/stillbility-sigil-no-word.png";
import InteractiveSigil from "@/components/InteractiveSigil";

const Stillbility = () => {
  const pageSchema = {
    "@type": "WebPage",
    "name": "Stillbility - The Art of Dynamic Stillness",
    "description": "Discover Stillbility - the embodied ability to remain rooted, present, and whole amidst chaos. Learn about the Stability Force and dynamic stillness practices.",
    "url": "https://www.thedreamwork.space/stillbility",
    "mainEntity": {
      "@type": "Course",
      "name": "Stillbility Practice",
      "description": "Learn the art of dynamic stillness and embodied presence through Stillbility practices.",
      "provider": {
        "@type": "Organization",
        "name": "The Dream Work"
      }
    }
  };

  return (
    <>
      <SEO
        title="Stillbility - The Art of Dynamic Stillness | The Dream Work"
        description="Discover Stillbility - the embodied ability to remain rooted, present, and whole amidst chaos. Learn about the Stability Force and dynamic stillness practices."
        keywords="stillbility, dynamic stillness, stability force, spiritual graduation, presence, grounding, embodied awareness, inner anchor, meditation"
        canonical="https://www.thedreamwork.space/stillbility"
        schemaType="WebPage"
        schemaData={pageSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space" },
          { name: "Stillbility", url: "https://www.thedreamwork.space/stillbility" }
        ]}
      />
      
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative py-16 sm:py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center text-primary-foreground">
                {/* Sigil and Title */}
                <div className="mb-8 flex flex-col items-center">
                  <img 
                    src={stillbilitySigil} 
                    alt="Stillbility Sigil - Symbol of Dynamic Stillness" 
                    className="w-48 h-48 sm:w-64 sm:h-64 object-contain filter invert mb-6"
                  />
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading mb-4">
                    Welcome to the Stillbility Field
                  </h1>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-light italic mb-8">
                    "We are the anchors. We are the breath. We are the field."
                  </p>
                </div>
                
                {/* Featured Video */}
                <div className="mb-8">
                  <div className="relative max-w-4xl mx-auto bg-black/20 rounded-xl p-1 backdrop-blur-sm">
                    <video 
                      controls 
                      className="w-full rounded-lg shadow-2xl"
                      poster="/assets/stillbility-sigil.png"
                    >
                      <source src="/assets/stillbility-video.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                
                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/blog/we-are-the-stillbility-field-holding-the-center-together"
                    className="inline-flex items-center justify-center px-8 py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium text-lg"
                  >
                    Enter the Field
                  </a>
                  <a 
                    href="#blog-series"
                    className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-foreground text-primary-foreground rounded-lg hover:bg-primary-foreground/10 transition-colors font-medium text-lg"
                  >
                    Explore the Blog Series
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Introduction to Stillbility */}
          <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg mx-auto text-center">
                  <div className="mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-8 text-primary">
                      🌀 What Is Stillbility?
                    </h2>
                    
                    {/* Definition with Dark Blue Background */}
                    <div className="mb-12 text-center bg-slate-900 rounded-2xl p-8 mx-auto max-w-4xl">
                      <div className="max-w-2xl mx-auto">
                        <p className="text-xl sm:text-2xl font-medium text-yellow-300 mb-2">
                          Stillbility is the fusion of stillness, ability, and stability.
                        </p>
                        <p className="text-lg sm:text-xl text-white/90">
                          It is the capacity to hold the center while everything else moves.
                        </p>
                      </div>
                      
                      {/* Interactive Sigil */}
                      <div className="mt-8 mb-8">
                        <InteractiveSigil />
                      </div>
                    </div>
                    
                    <div className="space-y-6 text-lg sm:text-xl leading-relaxed">
                      <p className="text-foreground font-medium">
                        Stillbility is the soul's response to chaos.
                      </p>
                      
                      <p className="text-muted-foreground">
                        It is not a concept—it is a field. A frequency. A way of being.
                      </p>
                      
                      <p className="text-foreground font-medium">
                        Stillbility is the embodied ability to remain rooted, present, and whole—especially when the world trembles.
                      </p>
                      
                      <p className="text-muted-foreground">
                        It is not passive. It is not rigid.
                      </p>
                      
                      <p className="text-primary font-semibold text-xl sm:text-2xl">
                        It is dynamic stillness. Breath as anchor. Presence as power.
                      </p>
                      
                      <div className="my-8 space-y-4">
                        <p className="text-muted-foreground">
                          Stillbility is not found in the dictionary.
                        </p>
                        <p className="text-foreground font-medium">
                          It is found in the bones.
                        </p>
                        <p className="text-foreground font-medium">
                          It lives in the breath.
                        </p>
                        <p className="text-muted-foreground">
                          It pulses in the quiet center of those who have graduated from guiding to anchoring.
                        </p>
                      </div>
                      
                      <div className="bg-gradient-card rounded-xl p-8 border border-border/50 mt-12">
                        <p className="text-lg sm:text-xl font-medium text-foreground mb-4">
                          This is not just my transition.
                        </p>
                        <p className="text-lg sm:text-xl font-medium text-foreground mb-4">
                          It is a collective emergence.
                        </p>
                        <p className="text-muted-foreground mb-6">
                          A soul-level shift from Light Worker to Stability Keeper.<br />
                          From bridge-builder to anchor-holder.
                        </p>
                        
                        <div className="border-t border-border/50 pt-6">
                          <p className="text-lg font-medium text-primary mb-2">
                            If you've felt this shift—this page is for you.
                          </p>
                          <p className="text-xl font-bold font-heading text-primary">
                            You are part of the Stability Force.
                          </p>
                          <p className="text-xl font-bold font-heading text-primary">
                            You are Stillbility embodied.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Blog Series Portal */}
          <section id="blog-series" className="py-16 sm:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold font-heading text-center mb-12">
                  The Stillbility Chronicles
                </h2>
                
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-card rounded-xl p-8 border border-border/50">
                    <h3 className="text-2xl font-semibold mb-4">Foundation Post</h3>
                    <h4 className="text-xl font-heading mb-4 text-primary">
                      "We Are the Stillbility Field"
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      The foundational teaching that birthed this movement. Discover what it means to be 
                      an anchor point in a world of constant change.
                    </p>
                    <a 
                      href="/blog/we-are-the-stillbility-field-holding-the-center-together"
                      className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      Read Now
                    </a>
                  </div>
                  
                  <div className="bg-gradient-card rounded-xl p-8 border border-border/50">
                    <h3 className="text-2xl font-semibold mb-4">Coming Soon</h3>
                    <div className="space-y-4 mb-6">
                      <div className="text-muted-foreground">
                        <h4 className="font-semibold">• Breathing Earth</h4>
                        <p className="text-sm">The rhythms of planetary stillness</p>
                      </div>
                      <div className="text-muted-foreground">
                        <h4 className="font-semibold">• Anchor in the Deep</h4>
                        <p className="text-sm">Practices for embodied presence</p>
                      </div>
                      <div className="text-muted-foreground">
                        <h4 className="font-semibold">• Field Keepers</h4>
                        <p className="text-sm">Community and collective holding</p>
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                      Subscribe to the Field
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Ritual Resources */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-8">
                  Sacred Tools & Resources
                </h2>
                <p className="text-xl text-muted-foreground mb-12">
                  Coming soon: A collection of embodied practices to deepen your Stillbility journey
                </p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌬️</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Breathwork Audio</h3>
                    <p className="text-sm text-muted-foreground">Guided breathing for anchoring presence</p>
                  </div>
                  
                  <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🃏</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Invocation Cards</h3>
                    <p className="text-sm text-muted-foreground">Daily reminders for field activation</p>
                  </div>
                  
                  <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🧭</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Compass Map</h3>
                    <p className="text-sm text-muted-foreground">Navigate the inner landscapes</p>
                  </div>
                  
                  <div className="bg-background/50 rounded-xl p-6 border border-border/50">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🕯️</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Altar Kit</h3>
                    <p className="text-sm text-muted-foreground">Sacred space creation tools</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Closing Blessing */}
          <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center">
                <div className="bg-gradient-card rounded-2xl p-12 border border-border/50">
                  <img 
                    src={stillbilitySigil} 
                    alt="Stillbility Sigil" 
                    className="w-16 h-16 object-contain mx-auto mb-8 opacity-60"
                  />
                  
                  <blockquote className="text-xl sm:text-2xl font-light leading-relaxed text-center italic mb-6">
                    "Stillbility is not a concept. It is a field.<br />
                    It lives in your breath, your bones, your presence.<br />
                    <strong className="font-heading text-primary">Welcome Home.</strong>"
                  </blockquote>
                </div>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="py-16 bg-gradient-subtle">
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-heading">
                  Ready to Begin Your Journey?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join our community of practitioners exploring the depths of Stillbility and embodied presence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="/blog/we-are-the-stillbility-field-holding-the-center-together"
                    className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Read the Foundation Article
                  </a>
                  <a 
                    href="/meditation"
                    className="inline-flex items-center justify-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
                  >
                    Explore Meditation Practices
                  </a>
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