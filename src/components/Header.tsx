import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
    if (!searchQuery.trim()) return;
    
    const searchTermLower = searchQuery.toLowerCase();
    
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
      window.location.href = targetPage.path + `?search=${encodeURIComponent(searchQuery)}`;
    } else {
      // Fallback to Google site search
      const searchQueryEncoded = encodeURIComponent(searchQuery.trim());
      window.open(`https://www.google.com/search?q=site:${window.location.hostname} ${searchQueryEncoded}`, '_blank');
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 cursor-pointer hover:opacity-80 transition-gentle" onClick={handleLogoClick}>
            <img 
              src="/lovable-uploads/85401e36-bc0d-4dac-bede-13f273db1297.png" 
              alt="The Dream Work Logo" 
              className="w-12 h-12 object-contain md:w-16 md:h-16"
            />
            <div className="hidden md:block">
              <h1 className="font-heading text-xl md:text-2xl font-semibold gradient-text">
                The Dream Work
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground">
                Heal the Vibe, <span className="font-script font-semibold">Live the Dream</span>
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10">
            <a href="/" className="text-foreground hover:text-primary transition-gentle">
              Home
            </a>
            <div className="relative group">
              <span className="text-foreground hover:text-primary transition-gentle cursor-pointer">
                Tools
              </span>
              <div className="absolute top-full left-0 mt-2 w-72 bg-background border border-border/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <div className="text-xs font-semibold text-muted-foreground px-3 py-1 mb-1">Core Tools</div>
                  <a href="/dream-journal" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌙 Dream Journal
                  </a>
                  <a href="/meditation" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🧘 Guided Audio Sessions
                  </a>
                  <a href="/weekly-stillness" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    📊 Practice Tracker
                  </a>
                  <a href="/breathwork" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌬️ Breathwork Patterns
                  </a>
                  <hr className="my-2 border-border/50" />
                  <div className="text-xs font-semibold text-muted-foreground px-3 py-1 mb-1">Mind Play Tools</div>
                  <a href="/mindful-coloring" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🎨 Mindful Coloring Studio
                  </a>
                  <a href="/oracle-cards" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🔮 Daily Oracle Cards
                  </a>
                  <a href="/chakra-balancing" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌈 Chakra Balancing Game
                  </a>
                  <a href="/singing-bowls" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🎵 Singing Bowl Simulator
                  </a>
                  <a href="/gratitude-garden" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌸 Gratitude Garden
                  </a>
                  <a href="/thought-bubbles" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🧠 Thought Bubble Release
                  </a>
                </div>
              </div>
            </div>
            <a href="/blog" className="text-foreground hover:text-primary transition-gentle">
              Blog
            </a>
            <a href="/articles" className="text-foreground hover:text-primary transition-gentle">
              Articles
            </a>
            <a href="/vlogs" className="text-foreground hover:text-primary transition-gentle">
              Vlogs
            </a>
            <a href="/meditation" className="text-foreground hover:text-primary transition-gentle">
              Meditation Practices
            </a>
            <div className="relative group">
              <span className="text-foreground hover:text-primary transition-gentle cursor-pointer">
                Natural Healing
              </span>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border/50 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-2">
                  <a href="/natural-healing/homeopathy" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌿 Homeopathy Resources
                  </a>
                  <a href="/natural-healing/herbology" className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-gentle">
                    🌱 Herbology Resources
                  </a>
                </div>
              </div>
            </div>
            <a href="/about" className="text-foreground hover:text-primary transition-gentle">
              About
            </a>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="relative flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10 pr-16 w-48 bg-muted/50 border-border/50 focus:bg-background transition-gentle"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs"
                >
                  Go
                </Button>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col space-y-4 mt-4">
              <a href="/" className="text-foreground hover:text-primary transition-gentle">
                Home
              </a>
              <div className="border-l-2 border-primary/20 pl-4">
                <span className="text-sm font-semibold text-muted-foreground mb-2 block">Core Tools</span>
                <a href="/dream-journal" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌙 Dream Journal
                </a>
                <a href="/meditation" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🧘 Guided Audio Sessions
                </a>
                <a href="/weekly-stillness" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  📊 Practice Tracker
                </a>
                <a href="/breathwork" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌬️ Breathwork Patterns
                </a>
                <span className="text-sm font-semibold text-muted-foreground mb-2 mt-4 block">Mind Play Tools</span>
                <a href="/mindful-coloring" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🎨 Mindful Coloring Studio
                </a>
                <a href="/oracle-cards" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🔮 Daily Oracle Cards
                </a>
                <a href="/chakra-balancing" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌈 Chakra Balancing Game
                </a>
                <a href="/singing-bowls" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🎵 Singing Bowl Simulator
                </a>
                <a href="/gratitude-garden" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌸 Gratitude Garden
                </a>
                <a href="/thought-bubbles" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🧠 Thought Bubble Release
                </a>
              </div>
              <a href="/blog" className="text-foreground hover:text-primary transition-gentle">
                Blog
              </a>
              <a href="/articles" className="text-foreground hover:text-primary transition-gentle">
                Articles
              </a>
              <a href="/vlogs" className="text-foreground hover:text-primary transition-gentle">
                Vlogs
              </a>
              <a href="/meditation" className="text-foreground hover:text-primary transition-gentle">
                Meditation Practices
              </a>
              <div className="border-l-2 border-primary/20 pl-4">
                <span className="text-sm font-semibold text-muted-foreground mb-2 block">Natural Healing</span>
                <a href="/natural-healing/homeopathy" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌿 Homeopathy Resources
                </a>
                <a href="/natural-healing/herbology" className="block py-1 text-foreground hover:text-primary transition-gentle">
                  🌱 Herbology Resources
                </a>
              </div>
              <a href="/about" className="text-foreground hover:text-primary transition-gentle">
                About
              </a>
              
              {/* Mobile Search */}
              <div className="relative sm:hidden flex items-center">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="pl-10 pr-16 bg-muted/50 border-border/50 focus:bg-background transition-gentle"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 px-2 text-xs"
                >
                  Go
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;