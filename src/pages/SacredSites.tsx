import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SacredSitesMap from "@/components/SacredSitesMap";

const SacredSites = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-background to-accent/5">
      <Helmet>
        <title>Sacred Sites Map | Interactive World Spiritual Locations | The Dreamwork</title>
        <meta 
          name="description" 
          content="Explore an interactive map of sacred sites around the world. Discover powerful spiritual portals, ancient temples, and energy vortexes with invocations and wisdom teachings." 
        />
        <meta name="keywords" content="sacred sites, spiritual locations, world map, energy vortexes, temples, pilgrimage sites, meditation spots, spiritual tourism" />
        <link rel="canonical" href="https://thedreamwork.space/sacred-sites" />
      </Helmet>

      <Header />
      
      <main className="flex-1 pt-20">
        <SacredSitesMap />
      </main>

      <Footer />
    </div>
  );
};

export default SacredSites;
