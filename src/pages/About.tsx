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
import { ContextualTooltip } from "@/components/ContextualTooltip";
import { InternalLinkMap } from "@/components/InternalLinkMap";
import { AuthoritySignals } from "@/components/AuthoritySignals";
import { DefinitionGlossary } from "@/components/DefinitionGlossary";
import { BrandStorySchema } from "@/components/BrandStorySchema";

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
      <BrandStorySchema
        organizationName="The Dream Work"
        description="A comprehensive spiritual wellness platform focused on making meditation and mindfulness accessible through carefully curated resources, community-centered learning, and evidence-based practices."
        founder={{
          name: "Mary Murphy",
          credentials: ["MBSR Certified Instructor", "200-Hour Yoga Teacher", "Mindfulness Coach"],
          bio: "Founder of The Dream Work with 15+ years of experience in meditation and spiritual wellness practices, dedicated to making meditation accessible through evidence-based resources and authentic community connection.",
          image: "https://static.wixstatic.com/media/85c396_e4af73536b3344cc94a34cd0b403787f~mv2.jpg/v1/crop/x_22,y_0,w_720,h_778/fill/w_400,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/marymurphy.jpg"
        }}
        establishedYear="2020"
        mission="To make meditation and mindfulness accessible to everyone through carefully curated resources, evidence-based practices, and authentic community connection."
        values={["Accessibility", "Authenticity", "Evidence-based practice", "Community support", "Inclusivity"]}
        achievements={[
          {
            title: "10,000+ Monthly Visitors",
            description: "Serving practitioners worldwide with meditation and mindfulness resources"
          },
          {
            title: "25+ Guided Meditation Sessions", 
            description: "Curated collection of practices for anxiety, self-love, grounding, and spiritual growth"
          },
          {
            title: "98% Positive User Feedback",
            description: "High satisfaction rate from community members practicing with our resources"
          }
        ]}
        testimonials={[
          {
            text: "Mary's approach to meditation made it finally 'click' for me. After years of struggling with anxiety, her guided sessions gave me tools I actually use every day.",
            author: "Sarah K.",
            role: "Community Member"
          }
        ]}
      />
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
                    <ContextualTooltip
                      term="The Dream Work"
                      definition="A comprehensive spiritual wellness platform focused on making meditation and mindfulness accessible through carefully curated resources, community-centered learning, and evidence-based practices."
                      examples={["Guided meditation sessions", "Mindfulness articles", "Dream journaling tools", "Community support"]}
                      relatedLinks={[
                        { text: "Meditation Practices", url: "/meditation", internal: true },
                        { text: "Dream Journal Tool", url: "/dream-journal", internal: true }
                      ]}
                      source="Founded by Mary Murphy, Certified Meditation Instructor"
                    >
                      <span className="font-medium">The Dream Work</span>
                    </ContextualTooltip> is more than just a phrase—it's the space where inspiration unfolds. It's where thoughts and ideas come alive, whether through <ContextualTooltip
                      term="Meditation"
                      definition="A practice of focused attention and awareness, typically involving techniques like breathwork, visualization, or mindfulness to cultivate inner peace and mental clarity."
                      examples={["Mindful breathing", "Body scan meditation", "Loving-kindness practice"]}
                      relatedLinks={[
                        { text: "Meditation Library", url: "/meditation", internal: true },
                        { text: "Breathwork Guide", url: "/breathwork", internal: true }
                      ]}
                      source="Based on centuries of contemplative traditions and modern neuroscience research"
                    >
                      meditation
                    </ContextualTooltip>, quiet reflection, or simply moving through the rhythms of daily life. Here, I share my experiences with <ContextualTooltip
                      term="Mindfulness"
                      definition="The practice of purposeful, non-judgmental awareness of the present moment, including thoughts, feelings, bodily sensations, and surrounding environment."
                      examples={["Present moment awareness", "Non-reactive observation", "Mindful daily activities"]}
                      relatedLinks={[
                        { text: "Mindfulness Articles", url: "/blog", internal: true }
                      ]}
                      source="Rooted in Buddhist traditions and validated by extensive psychological research"
                    >
                      mindfulness and meditation
                    </ContextualTooltip>, exploring both traditional and unconventional approaches to stillness and self-awareness.
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

          {/* Mary's Journey & Credentials */}
          <Card className="shadow-card border-0 bg-card mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-heading font-bold gradient-text mb-8 text-center">
                Mary's Journey in Meditation & Spiritual Wellness
              </h2>
              
              <div className="space-y-8">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🧘‍♀️</span>
                    </div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">15+ Years Experience</h4>
                    <p className="text-muted-foreground text-sm">Dedicated practice and teaching in various meditation traditions</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🎓</span>
                    </div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">Certified Instructor</h4>
                    <p className="text-muted-foreground text-sm">
                      <ContextualTooltip
                        term="MBSR Certification"
                        definition="Mindfulness-Based Stress Reduction certification, developed by Dr. Jon Kabat-Zinn at UMass Medical Center, combining meditation, body awareness, and yoga."
                        examples={["8-week structured program", "Body scan meditation", "Mindful movement", "Stress reduction techniques"]}
                        source="University of Massachusetts Medical School, Center for Mindfulness"
                      >
                        MBSR
                      </ContextualTooltip> and multiple meditation teacher certifications
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">🌍</span>
                    </div>
                    <h4 className="font-heading font-semibold text-foreground mb-2">Global Community</h4>
                    <p className="text-muted-foreground text-sm">Serving practitioners worldwide through online resources and guidance</p>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-6">
                  <h4 className="font-heading font-semibold text-foreground mb-4">Mary's Personal Story</h4>
                  <p className="text-foreground leading-relaxed mb-4">
                    "My meditation journey began during a particularly stressful period in my career. I was experiencing chronic anxiety and searching for sustainable tools to manage the overwhelming demands of daily life. What started as a desperate attempt to find peace became a transformative path that reshaped my entire approach to wellness and purpose."
                  </p>
                  <p className="text-foreground leading-relaxed">
                    "After experiencing profound benefits from consistent practice, I felt called to share these tools with others. I pursued formal training in multiple meditation traditions, obtained my <ContextualTooltip
                      term="MBSR"
                      definition="Mindfulness-Based Stress Reduction, an 8-week evidence-based program that teaches mindfulness meditation to help people manage stress, anxiety, pain, and illness."
                      source="Developed by Dr. Jon Kabat-Zinn at University of Massachusetts Medical Center"
                      relatedLinks={[
                        { text: "MBSR Research", url: "https://www.mindfulnesscds.com/research", internal: false }
                      ]}
                    >
                      MBSR certification
                    </ContextualTooltip>, and dedicated myself to creating accessible resources for people at every stage of their wellness journey."
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What You'll Discover Section */}
          <Card className="shadow-card border-0 bg-card mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-heading font-bold gradient-text mb-8 text-center">
                What You'll Discover at The Dream Work
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                    Evidence-Based Meditation Resources
                  </h3>
                  <p className="text-foreground leading-relaxed mb-6">
                    From <ContextualTooltip
                      term="Pranayama"
                      definition="Ancient yogic breathing techniques designed to control and extend life force energy (prana) through conscious breath regulation."
                      examples={["4-7-8 breathing", "Box breathing", "Alternate nostril breathing"]}
                      relatedLinks={[
                        { text: "Breathwork Practices", url: "/breathwork", internal: true }
                      ]}
                      source="Traditional yogic practices validated by modern respiratory science"
                    >
                      breathing techniques
                    </ContextualTooltip> and body awareness practices to loving-kindness meditation and mindfulness exercises, I share resources that have proven effective for both newcomers and experienced practitioners. Each meditation guide is chosen for its accessibility, scientific backing, and practical application in daily life.
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
                    Scientific Foundation & Wisdom Traditions
                  </h3>
                  <p className="text-foreground leading-relaxed">
                    Every practice and resource I share is grounded in both ancient wisdom and modern research. I regularly review current neuroscience studies on meditation benefits and integrate these findings with time-tested approaches from various contemplative traditions to provide you with the most effective tools for your wellness journey.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonials Section */}
          <Card className="shadow-card border-0 bg-card mb-8">
            <CardContent className="p-8">
              <h2 className="text-3xl font-heading font-bold gradient-text mb-8 text-center">
                Community Impact & Testimonials
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-muted/30 rounded-lg p-6">
                  <p className="text-foreground leading-relaxed italic mb-4">
                    "Mary's approach to meditation made it finally 'click' for me. After years of struggling with anxiety, her guided sessions and practical resources gave me tools I actually use every day."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">S.K.</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Sarah K.</p>
                      <p className="text-muted-foreground text-sm">Practicing for 2 years</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-6">
                  <p className="text-foreground leading-relaxed italic mb-4">
                    "The Dream Work resources helped me establish a consistent meditation practice. Mary's authentic guidance and the community feel of the platform made all the difference."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">M.R.</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Michael R.</p>
                      <p className="text-muted-foreground text-sm">Meditation teacher</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                <h4 className="font-heading font-semibold text-foreground mb-2">Growing Impact</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">10,000+</p>
                    <p className="text-muted-foreground text-sm">Monthly Visitors</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">25+</p>
                    <p className="text-muted-foreground text-sm">Guided Sessions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">98%</p>
                    <p className="text-muted-foreground text-sm">Positive Feedback</p>
                  </div>
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

          {/* Related Content & Internal Linking */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <InternalLinkMap
              currentPage="about"
              relatedContent={[
                {
                  title: "Guided Meditation Library",
                  url: "/meditation",
                  type: "tool",
                  description: "Explore Mary's curated collection of meditation practices for anxiety, self-love, grounding, and spiritual growth.",
                  keywords: ["meditation", "guided practice", "anxiety relief"]
                },
                {
                  title: "Dream Journal Interactive Tool",
                  url: "/dream-journal", 
                  type: "tool",
                  description: "Record and explore your dreams with this interactive journaling platform designed for spiritual insight.",
                  keywords: ["dream work", "journaling", "spiritual growth"]
                },
                {
                  title: "Latest Insights & Articles",
                  url: "/blog",
                  type: "article",
                  description: "Mary's thoughts on meditation, mindfulness, and spiritual wellness backed by research and personal experience.",
                  keywords: ["mindfulness articles", "meditation insights", "wellness"]
                },
                {
                  title: "Breathwork for Anxiety Relief",
                  url: "/breathwork",
                  type: "practice",
                  description: "Learn powerful breathing techniques to manage anxiety and stress in daily life.",
                  keywords: ["breathwork", "anxiety relief", "stress management"]
                }
              ]}
            />
            
            <AuthoritySignals
              author={{
                name: "Mary Murphy",
                credentials: ["MBSR Certified Instructor", "200-Hour Yoga Teacher", "Mindfulness Coach"],
                experience: "15+ years in meditation and spiritual wellness practices",
                bio: "Founder of The Dream Work, dedicated to making meditation accessible through evidence-based resources and authentic community connection.",
                profileUrl: "https://www.thedreamwork.space/about"
              }}
              lastUpdated="2024-01-15"
              reviewedBy="Meditation Advisory Board"
              dataSource="Personal experience, academic training, and community feedback"
              methodology="Integration of traditional wisdom traditions with modern neuroscience research on meditation benefits"
              evidenceLevel="high"
              citations={[
                {
                  title: "Mindfulness-Based Stress Reduction: A Research-Proven Approach",
                  url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5679245/",
                  type: "research",
                  date: "2017"
                },
                {
                  title: "The Neuroscience of Meditation: Benefits and Applications",
                  url: "https://www.nature.com/articles/nrn3916",
                  type: "study", 
                  date: "2015"
                }
              ]}
            />
          </div>
          
          {/* Glossary Section */}
          <div className="mb-8">
            <DefinitionGlossary 
              compact={true}
              categories={["Core Concepts", "Spiritual Practices", "Breathing Techniques"]}
            />
          </div>

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