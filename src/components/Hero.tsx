import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Comprehensive searchable content mapping all pages with actual content
  const searchableContent = [
    { 
      path: '/about', 
      page: 'About Mary Murphy', 
      keywords: ['mary', 'murphy', 'founder', 'about', 'meditation', 'mindfulness', 'journey', 'dream work', 'inspiration', 'community', 'resources', 'beginner', 'accessible', 'stress relief', 'inner peace', 'guidance', 'practices', 'wellness'],
      content: 'About Mary Murphy Founder of The Dream Work Creating a Space Where Inspiration Unfolds meditation mindfulness resources community beginner-friendly approach'
    },
    { 
      path: '/meditation', 
      page: 'Meditation Practices', 
      keywords: ['meditation', 'mindfulness', 'breathing', 'peace', 'calm', 'stress', 'anxiety', 'depression', 'focus', 'awareness', 'inner light', 'emotional healing', 'guided', 'audio', 'sessions'],
      content: 'meditation practices anxiety depression grounding self-love focus awareness guided audio sessions emotional healing inner light'
    },
    { 
      path: '/breathwork', 
      page: 'Breathwork', 
      keywords: ['breathwork', 'breathing', 'pranayama', 'breath', 'respiratory', 'oxygen', 'calm', 'anxiety', 'stress', 'patterns'],
      content: 'breathwork breathing patterns pranayama respiratory techniques oxygen calm anxiety stress relief'
    },
    { 
      path: '/natural-healing/homeopathy', 
      page: 'Homeopathy', 
      keywords: ['homeopathy', 'natural', 'healing', 'remedies', 'anxiety', 'stress', 'holistic', 'alternative', 'digestive', 'sleep', 'insomnia', 'headaches', 'migraines', 'gentle'],
      content: 'homeopathic healing natural remedies anxiety stress digestive issues sleep insomnia headaches migraines cold flu allergies womens health childrens health pet health gentle holistic alternative'
    },
    { 
      path: '/natural-healing/herbology', 
      page: 'Herbology', 
      keywords: ['herbology', 'herbs', 'natural', 'healing', 'botanical', 'plant medicine', 'herbal remedies', 'conditions', 'symptoms'],
      content: 'herbology herbs natural healing botanical plant medicine herbal remedies conditions symptoms search resources'
    },
    { 
      path: '/weekly-stillness', 
      page: 'Weekly Stillness', 
      keywords: ['stillness', 'weekly', 'practice', 'meditation', 'quiet', 'peace', 'reflection', 'tracker'],
      content: 'weekly stillness practice meditation quiet peace reflection tracker'
    },
    { 
      path: '/dream-journal', 
      page: 'Dream Journal', 
      keywords: ['dream', 'journal', 'dreams', 'sleep', 'subconscious', 'reflection', 'writing'],
      content: 'dream journal dreams sleep subconscious reflection writing analysis'
    },
    { 
      path: '/oracle-cards', 
      page: 'Oracle Cards', 
      keywords: ['oracle', 'cards', 'divination', 'guidance', 'spiritual', 'intuition', 'daily'],
      content: 'oracle cards divination guidance spiritual intuition daily wisdom'
    },
    { 
      path: '/thought-bubbles', 
      page: 'Thought Bubbles', 
      keywords: ['thought', 'bubbles', 'anxiety', 'mental', 'thoughts', 'mindfulness', 'release'],
      content: 'thought bubbles anxiety mental thoughts mindfulness release emotional'
    },
    { 
      path: '/singing-bowls', 
      page: 'Singing Bowls', 
      keywords: ['singing', 'bowls', 'sound', 'therapy', 'meditation', 'healing', 'vibration', 'audio'],
      content: 'singing bowls sound therapy meditation healing vibration audio'
    },
    { 
      path: '/gratitude-garden', 
      page: 'Gratitude Garden', 
      keywords: ['gratitude', 'garden', 'thankfulness', 'appreciation', 'positive', 'mood'],
      content: 'gratitude garden thankfulness appreciation positive mood wellness'
    },
    { 
      path: '/chakra-balancing', 
      page: 'Chakra Balancing', 
      keywords: ['chakra', 'balancing', 'energy', 'spiritual', 'healing', 'meditation', 'game'],
      content: 'chakra balancing energy spiritual healing meditation game interactive'
    },
    { 
      path: '/mindful-coloring', 
      page: 'Mindful Coloring', 
      keywords: ['mindful', 'coloring', 'art', 'creativity', 'meditation', 'stress', 'anxiety', 'relaxation', 'studio'],
      content: 'mindful coloring art creativity meditation stress anxiety relaxation studio'
    },
    { 
      path: '/blog', 
      page: 'Blog', 
      keywords: ['blog', 'articles', 'posts', 'meditation', 'mindfulness', 'spiritual', 'healing'],
      content: 'blog articles posts meditation mindfulness spiritual healing resources'
    },
    { 
      path: '/vlogs', 
      page: 'Vlogs', 
      keywords: ['vlogs', 'videos', 'meditation', 'spiritual', 'guidance', 'practice'],
      content: 'vlogs videos meditation spiritual guidance practice visual'
    }
  ];
  
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    const searchTermLower = searchTerm.toLowerCase();
    
    // Enhanced search - check keywords, page names, and content
    const matchingPages = searchableContent.filter(content => 
      content.keywords.some(keyword => keyword.includes(searchTermLower)) ||
      content.page.toLowerCase().includes(searchTermLower) ||
      content.content.toLowerCase().includes(searchTermLower) ||
      searchTermLower.split(' ').some(term => 
        content.keywords.some(keyword => keyword.includes(term)) ||
        content.content.toLowerCase().includes(term)
      )
    );
    
    if (matchingPages.length > 0) {
      // Navigate to the first matching page
      const targetPage = matchingPages[0];
      window.location.href = targetPage.path + `?search=${encodeURIComponent(searchTerm)}`;
    } else {
      // Fallback to Google site search
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
    <section className="relative w-full min-h-[90svh] md:min-h-screen flex flex-col justify-start md:justify-center items-center overflow-hidden pt-24 sm:pt-28 pb-6 sm:pb-8">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/b9454b96-c3d1-483e-baaa-44c00c4ff001.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-contain md:object-cover object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/10 to-background/20" aria-hidden="true" />
      </div>
      
      {/* Hero Content - Dynamic positioning for mobile and desktop */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 py-0 md:py-12 max-w-4xl mx-auto space-y-4 md:space-y-6">
        
        {/* Descriptive Text */}
        <div className="hidden md:block mb-6 md:mb-8">
          <p className="text-base md:text-lg lg:text-xl text-white max-w-2xl mx-auto leading-relaxed mb-4 md:mb-6">
            Transform your consciousness through guided meditation, dream work, and spiritual practices. 
            Join our community of seekers on the journey to inner peace and mindful living.
          </p>
        </div>
        
        {/* Call to Action and Search - Responsive layout */}
        <div className="flex flex-col gap-4 justify-center items-center max-w-2xl mx-auto mt-2 md:mt-0">
          <Button 
            size="lg" 
            className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm w-full sm:w-auto px-6 py-3"
            onClick={() => window.location.href = '/meditation'}
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
          </Button>
          
          {/* Search Section */}
          <div className="w-full max-w-md">
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="Search the site..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/70 backdrop-blur-sm focus:bg-white/30 flex-1 h-10 md:h-11"
              />
              <Button 
                variant="outline" 
                size="default"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm font-semibold h-10 md:h-11 px-3 md:px-4"
                onClick={handleSearch}
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Search</span>
              </Button>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;

