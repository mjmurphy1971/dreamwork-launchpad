import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import stillbilitySigil from "@/assets/stillbility-sigil-no-word.png";

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
          {/* Hero Section with Video and Sigil */}
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
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-script">
                    Stillbility
                  </h1>
                </div>
                
                <p className="text-lg sm:text-xl lg:text-2xl mb-8 font-light max-w-3xl mx-auto">
                  The embodied ability to remain rooted, present, and whole amidst chaos—within and without.
                </p>
                
                {/* Featured Video */}
                <div className="mb-12">
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
              </div>
            </div>
          </section>

          {/* Content Section - Placeholder for user's content */}
          <section className="py-16 sm:py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <div className="prose prose-lg mx-auto text-center">
                  <p className="text-xl text-muted-foreground mb-8">
                    Welcome to the Stillbility chapter. This space is being prepared for the profound teachings and practices that await.
                  </p>
                  
                  <div className="bg-muted/50 rounded-xl p-8 border border-border/50">
                    <h2 className="text-2xl font-heading mb-4">Coming Soon</h2>
                    <p className="text-muted-foreground mb-6">
                      This page is ready for your content, including:
                    </p>
                    <ul className="text-left text-muted-foreground space-y-2">
                      <li>• Detailed teachings on Stillbility practices</li>
                      <li>• Interactive exercises and meditations</li>
                      <li>• Community resources and support</li>
                      <li>• Personal journey insights and wisdom</li>
                    </ul>
                  </div>
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