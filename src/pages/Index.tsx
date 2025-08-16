import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import VlogSection from "@/components/VlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  console.log('Index component rendering');
  return (
    <div className="min-h-screen">
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
        
        <BlogGrid />
        <VlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;