import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SacredSitesMap from "@/components/SacredSitesMap";
import SEO from "@/components/SEO";
import { ConversationalAIOptimizer } from "@/components/ConversationalAIOptimizer";

const SacredSites = () => {
  const sacredSitesSchema = {
    "@type": "WebApplication",
    "name": "Sacred Sites Interactive Map",
    "description": "Interactive world map of sacred spiritual locations, energy vortexes, temples, and pilgrimage sites with invocations and archetypal wisdom.",
    "url": "https://thedreamwork.space/sacred-sites",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Interactive world map of 20+ sacred sites",
      "Geographic coordinates for each location",
      "Sacred invocations and wisdom teachings",
      "Archetypal classifications",
      "Hover-activated information cards",
      "Continental categorization"
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Sacred Sites",
        "description": "Spiritually significant locations around the world including temples, energy vortexes, and pilgrimage destinations"
      },
      {
        "@type": "Thing",
        "name": "Spiritual Tourism",
        "description": "Travel to sacred locations for spiritual growth, healing, and consciousness expansion"
      },
      {
        "@type": "Thing",
        "name": "Energy Vortexes",
        "description": "Locations with concentrated spiritual energy conducive to meditation, healing, and transformation"
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/5">
      <SEO
        title="Sacred Sites Map | Interactive World Spiritual Locations | The Dreamwork"
        description="Explore an interactive map of 20+ sacred sites around the world. Discover powerful spiritual portals, ancient temples, and energy vortexes with invocations and archetypal wisdom teachings."
        keywords="sacred sites, spiritual locations, world map, energy vortexes, temples, pilgrimage sites, meditation spots, spiritual tourism, sacred geometry, Mount Kailash, Glastonbury Tor, Sedona vortex, Machu Picchu, Delphi oracle"
        canonical="https://thedreamwork.space/sacred-sites"
        schemaType="WebApplication"
        schemaData={sacredSitesSchema}
        breadcrumbs={[
          { name: "Home", url: "https://thedreamwork.space" },
          { name: "Sacred Sites Map", url: "https://thedreamwork.space/sacred-sites" }
        ]}
      />
      <ConversationalAIOptimizer
        pageTitle="Sacred Sites Interactive Map"
        faqs={[
          {
            question: "What is the Sacred Sites Map?",
            answer: "An interactive world map featuring 20+ sacred spiritual locations including temples, energy vortexes, and pilgrimage sites. Each location includes geographic coordinates, invocations, and archetypal wisdom teachings.",
            category: "Tool Features",
            keywords: ["interactive map", "sacred sites", "spiritual locations"],
            relatedLinks: [
              { text: "View Sacred Sites Map", url: "/sacred-sites", internal: true }
            ]
          },
          {
            question: "How do I use the Sacred Sites Map?",
            answer: "Hover over any pin on the map to see detailed information about that sacred site, including its name, location, description, sacred invocation, and archetypal classification.",
            category: "Usage",
            keywords: ["how to use", "interactive", "hover"],
          },
          {
            question: "What sacred sites are included?",
            answer: "The map features Mount Kailash, Glastonbury Tor, Sedona, Machu Picchu, Delphi, Jerusalem, Mecca, Uluru, Lake Titicaca, and many more sacred locations across Asia, Europe, Africa, Americas, and Oceania.",
            category: "Content",
            keywords: ["locations", "temples", "energy vortexes", "pilgrimage sites"],
          }
        ]}
        keyTakeaways={[
          "Interactive map of 20+ sacred spiritual locations worldwide",
          "Each site includes invocations and archetypal wisdom",
          "Geographic coordinates provided for pilgrimage planning",
          "Locations categorized by continent and spiritual archetype",
          "Free tool for spiritual seekers and conscious travelers"
        ]}
        quickAnswers={[
          {
            query: "What are sacred sites?",
            answer: "Spiritually significant locations around the world including ancient temples, energy vortexes, pilgrimage destinations, and places of profound spiritual power."
          },
          {
            query: "How many sacred sites are on the map?",
            answer: "The map features 20+ sacred sites across all continents including Asia, Europe, Africa, North and South America, and Oceania."
          },
          {
            query: "Is the Sacred Sites Map free to use?",
            answer: "Yes, the Sacred Sites Map is completely free to use and explore for spiritual seekers, pilgrims, and conscious travelers."
          }
        ]}
      />
      <Helmet>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sacred Sites Map | Interactive World Spiritual Locations" />
        <meta property="og:description" content="Explore 20+ sacred sites worldwide with invocations and wisdom teachings" />
        <meta property="og:url" content="https://thedreamwork.space/sacred-sites" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sacred Sites Map | The Dreamwork" />
        <meta name="twitter:description" content="Interactive map of sacred spiritual locations worldwide" />
      </Helmet>

      <Header />
      
      <main className="flex-1">
        <SacredSitesMap />
        
        {/* AI-Optimized Content Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <ConversationalAIOptimizer
              pageTitle="Sacred Sites Interactive Map"
              faqs={[
                {
                  question: "What is the Sacred Sites Map?",
                  answer: "An interactive world map featuring 20+ sacred spiritual locations including temples, energy vortexes, and pilgrimage sites. Each location includes geographic coordinates, invocations, and archetypal wisdom teachings.",
                  category: "Tool Features",
                  keywords: ["interactive map", "sacred sites", "spiritual locations"],
                  relatedLinks: [
                    { text: "Meditation Practices", url: "/meditation", internal: true },
                    { text: "Stillbility Tools", url: "/stillbility", internal: true }
                  ]
                },
                {
                  question: "How do I use the Sacred Sites Map?",
                  answer: "Hover over any pin on the map to see detailed information about that sacred site, including its name, location, description, sacred invocation, and archetypal classification.",
                  category: "Usage",
                  keywords: ["how to use", "interactive", "hover"],
                },
                {
                  question: "What sacred sites are included?",
                  answer: "The map features Mount Kailash, Glastonbury Tor, Sedona, Machu Picchu, Delphi, Jerusalem, Mecca, Uluru, Lake Titicaca, and many more sacred locations across Asia, Europe, Africa, Americas, and Oceania.",
                  category: "Content",
                  keywords: ["locations", "temples", "energy vortexes", "pilgrimage sites"],
                },
                {
                  question: "What are energy vortexes?",
                  answer: "Energy vortexes are locations where the Earth's energy is said to be especially concentrated, making them conducive to meditation, healing, and spiritual transformation. Notable examples include Sedona and Glastonbury Tor.",
                  category: "Spiritual Concepts",
                  keywords: ["energy", "vortex", "healing", "meditation"],
                },
                {
                  question: "Can I use this for planning spiritual pilgrimages?",
                  answer: "Yes! The map provides geographic coordinates for each sacred site, making it perfect for planning spiritual travel and pilgrimage journeys to temples, vortexes, and other power spots around the world.",
                  category: "Travel Planning",
                  keywords: ["pilgrimage", "spiritual travel", "coordinates", "planning"],
                }
              ]}
              keyTakeaways={[
                "Interactive map of 20+ sacred spiritual locations worldwide",
                "Each site includes invocations and archetypal wisdom",
                "Geographic coordinates provided for pilgrimage planning",
                "Locations categorized by continent and spiritual archetype",
                "Free tool for spiritual seekers and conscious travelers"
              ]}
              quickAnswers={[
                {
                  query: "What are sacred sites?",
                  answer: "Spiritually significant locations around the world including ancient temples, energy vortexes, pilgrimage destinations, and places of profound spiritual power."
                },
                {
                  query: "How many sacred sites are on the map?",
                  answer: "The map features 20+ sacred sites across all continents including Asia, Europe, Africa, North and South America, and Oceania."
                },
                {
                  query: "Is the Sacred Sites Map free to use?",
                  answer: "Yes, the Sacred Sites Map is completely free to use and explore for spiritual seekers, pilgrims, and conscious travelers."
                },
                {
                  query: "What is the purpose of sacred invocations?",
                  answer: "Sacred invocations help you connect with the energy and archetypal wisdom of each location, deepening your spiritual practice and honoring the sacred nature of these places."
                }
              ]}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SacredSites;
