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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/b9454b96-c3d1-483e-baaa-44c00c4ff001.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 flex flex-col justify-center items-center min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Tagline - assuming these are part of the hero content now */}
          <img
            src="/lovable-uploads/85401e36-bc0d-4dac-bede-13f273db1297.png"
            alt="The Dream Work Logo"
            className="w-32 h-32 object-contain mx-auto mb-4"
          />
          <h1 className="font-heading text-5xl md:text-7xl font-bold gradient-text mb-4">
            The Dream Work
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed">
            Heal the Vibe, <span className="font-script font-semibold">Live the Dream</span>
          </p>
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
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm font-semibold"
                    onClick={handleSearch}
                  >
                    <Search className="w-5 h-5 mr-2" />
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
