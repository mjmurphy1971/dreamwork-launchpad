import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Simple site search - you can enhance this with more sophisticated search logic
      const searchQuery = encodeURIComponent(searchTerm.trim());
      window.open(`https://www.google.com/search?q=site:${window.location.hostname} ${searchQuery}`, '_blank');
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  console.log('Hero component rendering');
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/b9454b96-c3d1-483e-baaa-44c00c4ff001.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 flex flex-col justify-end min-h-[90vh] pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your consciousness through guided meditation, dream work, and spiritual practices. 
              Join our community of seekers on the journey to inner peace and mindful living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
                onClick={() => window.location.href = '/meditation'}
              >
                Start Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex flex-col sm:flex-row gap-2 items-center">
                <div className="flex gap-2 items-center">
                  <Input
                    type="text"
                    placeholder="Search the site..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm focus:bg-white/30"
                  />
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5" />
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
