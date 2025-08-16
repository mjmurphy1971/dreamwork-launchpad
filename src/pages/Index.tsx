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
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-card">
                <h2 className="text-lg font-heading font-semibold text-foreground mb-3 text-center">
                  Welcome to The Dream Work
                </h2>
                <div className="aspect-video rounded-md overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/tOp-gbnyj3w"
                    title="Welcome to The Dream Work"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
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