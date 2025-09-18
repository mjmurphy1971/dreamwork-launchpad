import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { highlightSearchTerm, getSearchTermFromURL } from "@/utils/searchHighlight";
import { Helmet } from "react-helmet-async";

const About = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const searchTerm = getSearchTermFromURL();
    if (searchTerm) {
      // Delay highlighting to ensure content is rendered
      setTimeout(() => {
        highlightSearchTerm(searchTerm);
      }, 500);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! I'll get back to you soon.");
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>About Mary Murphy | The Dream Work - Meditation & Mindfulness Guide</title>
        <meta name="description" content="Meet Mary Murphy, founder of The Dream Work. Discover her journey with meditation and mindfulness, and learn about her vision for accessible spiritual wellness resources." />
        <meta name="keywords" content="Mary Murphy, meditation teacher, mindfulness instructor, spiritual guide, Dream Work founder, meditation resources, wellness coach" />
        <link rel="canonical" href="https://www.thedreamwork.space/about" />
        
        {/* Enhanced Person Schema for Mary Murphy */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mary Murphy",
              "jobTitle": "Meditation Teacher & Spiritual Wellness Guide",
              "description": "Founder of The Dream Work, dedicated to making meditation and mindfulness accessible to everyone through carefully curated resources and community-centered approach.",
              "url": "https://www.thedreamwork.space/about",
              "sameAs": [
                "https://www.thedreamwork.space",
                "https://www.instagram.com/thedreamworkspace",
                "https://www.facebook.com/thedreamworkspace"
              ],
              "knowsAbout": [
                "Meditation",
                "Mindfulness",
                "Spiritual Wellness",
                "Stress Management",
                "Breathing Techniques",
                "Dream Work",
                "Sound Healing",
                "Chakra Balancing"
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "Meditation Teacher Training",
                  "about": "Certified in various meditation and mindfulness techniques"
                }
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "The Dream Work",
                "url": "https://www.thedreamwork.space"
              },
              "image": "https://static.wixstatic.com/media/85c396_e4af73536b3344cc94a34cd0b403787f~mv2.jpg/v1/crop/x_22,y_0,w_720,h_778/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/marymurphy.jpg",
              "alumniOf": "Various Meditation and Mindfulness Training Programs",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Online",
                "addressCountry": "Global"
              }
            }
          `}
        </script>
      </Helmet>
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            About Mary Murphy
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Founder of The Dream Work
          </p>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Profile Image */}
            <div className="md:col-span-1">
              <Card className="overflow-hidden shadow-card border-0 bg-card">
                <CardContent className="p-0">
                  <img
                    src="https://static.wixstatic.com/media/85c396_e4af73536b3344cc94a34cd0b403787f~mv2.jpg/v1/crop/x_22,y_0,w_720,h_778/fill/w_226,h_246,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/marymurphy.jpg"
                    alt="Mary Murphy, founder of The Dream Work"
                    className="w-full h-auto object-cover"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="md:col-span-2 space-y-8">
              <Card className="shadow-card border-0 bg-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-heading font-bold gradient-text mb-4">
                    Creating a Space Where Inspiration Unfolds
                  </h2>
                  <p className="text-foreground leading-relaxed mb-6">
                    The Dream Work is more than just a phrase—it's the space where inspiration unfolds. It's where thoughts and ideas come alive, whether through meditation, quiet reflection, or simply moving through the rhythms of daily life. Here, I share my experiences with mindfulness and meditation, exploring both traditional and unconventional approaches to stillness and self-awareness.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-card border-0 bg-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-heading font-bold gradient-text mb-4">
                    My Vision for Meditation and Mindfulness Resources
                  </h2>
                  <p className="text-foreground leading-relaxed mb-6">
                    But this space isn't just about me—it's about all of us. I wanted it to be more than a personal blog. I envisioned a place where we can learn, share, and grow together, whether you're deeply immersed in these practices or just starting your meditation journey. Every day offers something new to discover, and that sense of learning and humility is what makes this path so beautiful.
                  </p>
                  <p className="text-foreground leading-relaxed">
                    As someone passionate about making meditation accessible to everyone, I've dedicated myself to curating the best mindfulness resources and meditation practices. Whether you're looking for guided meditations for beginners, techniques for anxiety relief, or simply want to explore different approaches to inner peace, you'll find carefully selected resources here.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* What You'll Discover Section */}
          <Card className="shadow-card border-0 bg-card mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-heading font-bold gradient-text mb-8 text-center">
                What You'll Discover at The Dream Work
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    Meditation Resources for Every Journey
                  </h3>
                  <p className="text-foreground leading-relaxed mb-6">
                    From breathing techniques and body awareness practices to loving-kindness meditation and mindfulness exercises, I share resources that have proven effective for both newcomers and experienced practitioners. Each meditation guide and technique is chosen for its accessibility and practical application in daily life.
                  </p>
                  
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    A Community-Centered Approach
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    This isn't just a collection of meditation resources—it's a collaborative space where wisdom, wellness, and connection flourish. I believe that the best learning happens when we share our experiences and support each other's growth, whether you're taking your first steps into meditation or deepening an established practice.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    Practical Mindfulness for Modern Life
                  </h3>
                  <p className="text-foreground leading-relaxed mb-6">
                    Understanding that we all lead busy lives, I focus on meditation practices and mindfulness techniques that integrate seamlessly into your daily routine. You'll find resources for quick stress relief, bedtime meditations, workplace mindfulness, and practices that require just a few minutes of your day.
                  </p>
                  
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    My Personal Journey with Meditation
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    My own path with meditation and mindfulness has been one of continuous discovery. Like many people, I began seeking these practices during a time when I needed tools for managing stress and finding inner calm. What I discovered was a rich world of techniques and approaches, each offering unique benefits and insights.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What Makes Us Different */}
          <Card className="shadow-card border-0 bg-card mb-12">
            <CardContent className="p-8">
              <h2 className="text-3xl font-heading font-bold gradient-text mb-8 text-center">
                What Makes The Dream Work Different
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                    Honest, Realistic Guidance
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    You won't find exaggerated promises or claims of instant transformation here. Instead, I provide honest insights about what meditation can realistically offer—reduced stress, improved focus, better emotional balance, and a deeper sense of connection to yourself and others.
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                    Beginner-Friendly Focus
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Every meditation resource and mindfulness practice I share is evaluated through the lens of accessibility. Can someone with no meditation experience understand and apply this technique? Does it provide clear, practical guidance?
                  </p>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                    Inclusive Approach
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The Dream Work welcomes people from all backgrounds and belief systems. Whether you're interested in meditation for stress relief, better sleep, improved concentration, or spiritual growth, you'll find resources that align with your goals.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="shadow-card border-0 bg-card">
            <CardContent className="p-8">
              <h2 className="text-3xl font-heading font-bold gradient-text mb-6 text-center">
                Let's Get in Touch
              </h2>
              
              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full"
                    placeholder="Share your thoughts or ask a question..."
                  />
                </div>
                
                <div className="text-center">
                  <Button type="submit" size="lg" className="bg-primary hover:bg-primary/90">
                    Send Message
                  </Button>
                </div>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-foreground leading-relaxed mb-4">
                  Welcome to The Dream Work.
                </p>
                <p className="text-muted-foreground">
                  I'm honored to be part of your meditation and mindfulness journey, and I look forward to discovering and sharing resources that support your path to greater well-being.
                </p>
                <p className="text-muted-foreground mt-4 font-script text-lg">
                  With gratitude and excitement for the journey ahead,<br />
                  Mary
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;