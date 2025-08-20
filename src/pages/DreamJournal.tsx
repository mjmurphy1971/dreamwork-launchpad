import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DreamJournal } from "@/components/DreamJournal";
import SEO from "@/components/SEO";

const DreamJournalPage = () => {
  const dreamJournalSchema = {
    "@type": "WebApplication",
    "name": "Dream Journal - Interactive Tool",
    "description": "Digital dream journal application for recording, analyzing, and tracking dream patterns and symbols for spiritual insight and self-discovery.",
    "applicationCategory": "Wellness",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Dream recording and storage",
      "Symbol recognition and analysis", 
      "Pattern tracking over time",
      "Mood and lucidity tracking",
      "Dream statistics and insights"
    ],
    "about": [
      {
        "@type": "Thing",
        "name": "Dream Analysis",
        "description": "Tools for understanding dream symbolism and meaning"
      },
      {
        "@type": "Thing",
        "name": "Lucid Dreaming",
        "description": "Practices for achieving conscious dreaming states"
      },
      {
        "@type": "Thing",
        "name": "Subconscious Exploration",
        "description": "Methods for accessing deeper layers of consciousness"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Dream Journal - Track Your Dreams & Discover Insights"
        description="Interactive dream journal tool for recording dreams, tracking patterns, analyzing symbols, and gaining insights from your subconscious mind. Free digital dream diary."
        keywords="dream journal, lucid dreaming, dream analysis, dream symbols, subconscious, dream diary, sleep insights, dream patterns"
        schemaType="WebPage"
        schemaData={dreamJournalSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space/" },
          { name: "Dream Journal", url: "https://www.thedreamwork.space/dream-journal" }
        ]}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        <DreamJournal />
      </main>
      <Footer />
    </div>
  );
};

export default DreamJournalPage;