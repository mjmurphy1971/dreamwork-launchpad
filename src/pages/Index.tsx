import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import VlogSection from "@/components/VlogSection";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SEOMonitor from "@/components/SEOMonitor";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import NewsletterSignup from "@/components/NewsletterSignup";
import { IndexabilityChecker } from "@/components/IndexabilityChecker";
import { ContextualTooltip } from "@/components/ContextualTooltip";
import { DefinitionGlossary } from "@/components/DefinitionGlossary";
import { InternalLinkMap } from "@/components/InternalLinkMap";
import { ConversationalAIOptimizer } from "@/components/ConversationalAIOptimizer";
import stillnessPracticeHero from "@/assets/stillness-practice-hero.jpg";
import dreamJournalBg from "@/assets/dream-journal-bg.jpg";
import meditationToolBg from "@/assets/meditation-tool-bg.jpg";
import audioSessionsBg from "@/assets/audio-sessions-bg.jpg";
import stillbilitySigil from "@/assets/stillbility-sigil-animated.png";

const Index = () => {
  console.log('Index component rendering');
  
  const homePageSchema = {
    "@type": "WebPage",
    "name": "The Dream Work - Meditation & Mindfulness Resource",
    "description": "Guided meditation, breathwork, dream journaling & spiritual wellness practices for inner peace and mindfulness community.",
    "url": "https://www.thedreamwork.space",
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
        title="The Dream Work - Meditation & Mindfulness for Inner Peace"
        description="Guided meditation, breathwork, dream journaling & spiritual wellness practices. Transform your daily life through mindfulness community."
        keywords="meditation, mindfulness, guided meditation, dream journal, spiritual wellness, consciousness, natural healing, relaxation techniques"
        canonical="https://www.thedreamwork.space"
        schemaType="WebPage"
        schemaData={homePageSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space" }
        ]}
      />
      <SEOMonitor 
        title="The Dream Work - Meditation & Mindfulness for Inner Peace"
        description="Guided meditation, breathwork, dream journaling & spiritual wellness practices. Transform your daily life through mindfulness community."
        canonical="https://www.thedreamwork.space"
        schema={homePageSchema}
        showMonitor={process.env.NODE_ENV === 'development'}
      />
      <PerformanceMonitor pageName="homepage" />
      <IndexabilityChecker pageTitle="Home - Meditation & Mindfulness Resource" />
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
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                    <iframe
                      src="https://www.youtube.com/embed/tOp-gbnyj3w"
                      title="Welcome to The Dream Work"
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ minHeight: '100%', minWidth: '100%' }}
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
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted relative">
                    <iframe
                      src="https://www.youtube.com/embed/kO5I0p3IuiQ"
                      title="Mindfulness Practice"
                      className="absolute inset-0 w-full h-full border-0"
                      style={{ minHeight: '100%', minWidth: '100%' }}
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
                  Explore our guided practices, track your journey, and dive deep into{' '}
                  <ContextualTooltip
                    term="Self-Discovery"
                    definition="The process of gaining insight into one's character, feelings, motives, and desires through introspection and mindful practices."
                    examples={["Dream journaling for subconscious exploration", "Meditation for inner awareness", "Mindful reflection on daily experiences"]}
                    relatedLinks={[
                      { text: "Dream Journal Tool", url: "/dream-journal", internal: true },
                      { text: "Meditation Practices", url: "/meditation", internal: true }
                    ]}
                  >
                    self-discovery
                  </ContextualTooltip>
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
                    Track gentle rituals, build{' '}
                    <ContextualTooltip
                      term="Mindful Habits"
                      definition="Intentional daily practices performed with conscious awareness to support mental wellbeing and spiritual growth."
                      examples={["Daily meditation practice", "Gratitude journaling", "Mindful breathing exercises"]}
                      relatedLinks={[
                        { text: "Practice Tracker", url: "/weekly-stillness", internal: true }
                      ]}
                    >
                      mindful habits
                    </ContextualTooltip>
                    , and cultivate inner peace with our interactive tracker.
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
                    <ContextualTooltip
                      term="AI-Generated Meditation"
                      definition="Personalized meditation sessions created using artificial intelligence to match individual needs, preferences, and current emotional states."
                      examples={["Anxiety relief sessions tailored to stress levels", "Sleep meditations based on time and environment", "Focus sessions adapted to work requirements"]}
                      relatedLinks={[
                        { text: "Guided Meditation Sessions", url: "/meditation", internal: true }
                      ]}
                    >
                      AI-generated meditation sessions
                    </ContextualTooltip>
                    {' '}for anxiety relief, self-love, sleep, and daily intention setting.
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
        
        {/* Stillbility Connection Section */}
        <section className="py-16 bg-gradient-subtle">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <img 
                  src={stillbilitySigil}
                  alt="Stillbility® Sigil - Sacred geometry for dynamic stillness"
                  className="w-32 h-32 mx-auto mb-6 drop-shadow-glow animate-pulse"
                />
                <h2 className="font-heading text-3xl md:text-4xl font-bold gradient-text mb-4">
                  Discover Stillbility®
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                  The sacred branch of The Dream Work. A cosmic field of dynamic stillness where 144,000 anchors 
                  prepare for collective emergence through specialized practices, Seraphim teachings, and the Super Seven Meditation.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
                <a 
                  href="/stillbility"
                  className="group bg-card border border-border rounded-lg p-6 hover:shadow-card-hover transition-gentle"
                >
                  <div className="text-2xl mb-3">🌿</div>
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-gentle">
                    Explore Stillbility® Here
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn about the cosmic field, sacred practices, and join the movement
                  </p>
                </a>
                
                <a 
                  href="https://stillbility.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-lg p-6 hover:shadow-card-hover transition-gentle"
                >
                  <div className="text-2xl mb-3">🌀</div>
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-primary transition-gentle">
                    Visit Stillbility.com
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Experience the dedicated sanctuary and interactive practices
                  </p>
                </a>
              </div>
              
              <blockquote className="italic text-lg text-foreground/80 font-light">
                "You are held. You are rooted. You are the Stillbility® Field."
              </blockquote>
            </div>
          </div>
        </section>
        
        {/* Newsletter Signup Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <NewsletterSignup 
                title="Join Our Mindful Community"
                description="Get weekly meditation insights, new tool updates, and exclusive guided practices delivered to your inbox. Start your journey with a free meditation guide."
                variant="card"
              />
            </div>
          </div>
        </section>
        
        <BlogGrid />
        <VlogSection />
        
        {/* Internal Linking and Contextual Content */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <InternalLinkMap
                currentPage="Home"
                relatedContent={[
                  {
                    title: "The Art of Mindful Breathing",
                    url: "/blog/the-art-of-mindful-breathing-your-gateway-to-inner-peace",
                    type: "article",
                    description: "Learn evidence-based breathing techniques that transform stress into calm and clarity.",
                    keywords: ["breathing", "mindfulness", "stress relief"]
                  },
                  {
                    title: "Dream Journal",
                    url: "/dream-journal",
                    type: "tool",
                    description: "Capture and explore your dreams to discover patterns and insights from your subconscious.",
                    keywords: ["dreams", "journaling", "self-discovery"]
                  },
                  {
                    title: "Creating Sacred Space",
                    url: "/blog/creating-sacred-space-designing-your-personal-meditation-corner",
                    type: "article", 
                    description: "Transform any corner into a peaceful sanctuary for your spiritual practice.",
                    keywords: ["meditation", "sacred space", "environment"]
                  },
                  {
                    title: "Weekly Stillness Practice",
                    url: "/weekly-stillness",
                    type: "practice",
                    description: "Track your meditation journey with our comprehensive practice tracker.",
                    keywords: ["meditation", "tracking", "habits"]
                  }
                ]}
              />
              
              <DefinitionGlossary
                compact={false}
                categories={["Core Concepts", "Spiritual Practices", "Breathing Techniques"]}
              />
            </div>
          </div>
        </section>
        
        {/* Conversational AI Optimization */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <ConversationalAIOptimizer
                pageTitle="Meditation & Mindfulness Resources"
                keyTakeaways={[
                  "The Dream Work provides free, evidence-based meditation resources curated by certified instructor Mary Murphy",
                  "Guided meditation practices are available for anxiety relief, self-love, grounding, creativity, and spiritual growth",
                  "Interactive tools include dream journaling, breathwork guidance, and meditation progress tracking",
                  "All content integrates traditional wisdom with modern neuroscience research on meditation benefits",
                  "Community-centered approach welcomes practitioners at every level, from beginners to experienced meditators"
                ]}
                quickAnswers={[
                  {
                    query: "What meditation practices help with anxiety?",
                    answer: "Focused attention breathing, body scan meditation, and mindful grounding techniques specifically designed to calm the nervous system and reduce anxious thoughts."
                  },
                  {
                    query: "How long should I meditate as a beginner?",
                    answer: "Start with 5-10 minute sessions using guided practices. Consistency matters more than duration - even 3 minutes of daily practice provides benefits."
                  },
                  {
                    query: "Is meditation backed by scientific research?",
                    answer: "Yes, extensive neuroscience research shows meditation increases gray matter density, reduces cortisol levels, and improves emotional regulation and focus."
                  },
                  {
                    query: "What makes The Dream Work approach different?",
                    answer: "Evidence-based practices, authentic guidance from certified instructor Mary Murphy, beginner-friendly resources, and integration of traditional wisdom with modern research."
                  }
                ]}
                faqs={[
                  {
                    question: "How do I start a meditation practice?",
                    answer: "Begin with short guided sessions (5-10 minutes), find a quiet space, set a consistent time daily, and use beginner-friendly techniques like mindful breathing or body awareness.",
                    category: "Getting Started",
                    keywords: ["meditation practice", "beginners", "guided meditation"],
                    relatedLinks: [
                      { text: "Meditation Library", url: "/meditation", internal: true },
                      { text: "Beginner's Guide", url: "/blog", internal: true }
                    ]
                  },
                  {
                    question: "Can meditation really help with anxiety and stress?",
                    answer: "Research shows regular meditation activates the parasympathetic nervous system, reduces stress hormones like cortisol, and increases gray matter in areas associated with emotional regulation.",
                    category: "Benefits",
                    keywords: ["anxiety relief", "stress reduction", "mental health"],
                    relatedLinks: [
                      { text: "Anxiety Meditation", url: "/meditation", internal: true },
                      { text: "Breathwork for Anxiety", url: "/breathwork", internal: true }
                    ]
                  },
                  {
                    question: "What is dream work and how does it relate to meditation?",
                    answer: "Dream work involves recording, analyzing, and exploring dreams for psychological insight and spiritual growth. It complements meditation by deepening self-awareness and accessing subconscious wisdom.",
                    category: "Practices",
                    keywords: ["dream work", "dream journaling", "spiritual growth"],
                    relatedLinks: [
                      { text: "Dream Journal Tool", url: "/dream-journal", internal: true }
                    ]
                  },
                  {
                    question: "Who is Mary Murphy and what are her qualifications?",
                    answer: "Mary Murphy is the founder of The Dream Work, a certified MBSR instructor with 15+ years of meditation experience. She holds multiple certifications in meditation teaching and mindfulness practices.",
                    category: "About",
                    keywords: ["Mary Murphy", "MBSR", "meditation teacher"],
                    relatedLinks: [
                      { text: "About Mary", url: "/about", internal: true }
                    ]
                  }
                ]}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;