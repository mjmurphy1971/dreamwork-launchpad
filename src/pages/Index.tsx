import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import VlogSection from "@/components/VlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <BlogGrid />
        <VlogSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;