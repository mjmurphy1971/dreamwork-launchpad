import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Define searchable content from all pages
  const searchableContent = [
    { path: '/meditation', page: 'Meditation Practices', keywords: ['meditation', 'mindfulness', 'breathing', 'peace', 'calm', 'stress', 'anxiety', 'focus', 'awareness'] },
    { path: '/breathwork', page: 'Breathwork', keywords: ['breathwork', 'breathing', 'pranayama', 'breath', 'respiratory', 'oxygen', 'calm', 'anxiety', 'stress'] },
    { path: '/natural-healing/homeopathy', page: 'Homeopathy', keywords: ['homeopathy', 'natural', 'healing', 'remedies', 'depression', 'anxiety', 'stress', 'holistic', 'alternative'] },
    { path: '/natural-healing/herbology', page: 'Herbology', keywords: ['herbology', 'herbs', 'natural', 'healing', 'depression', 'anxiety', 'stress', 'botanical', 'plant medicine'] },
    { path: '/weekly-stillness', page: 'Weekly Stillness', keywords: ['stillness', 'weekly', 'practice', 'meditation', 'quiet', 'peace', 'reflection'] },
    { path: '/morning-rituals', page: 'Morning Rituals', keywords: ['morning', 'rituals', 'routine', 'start', 'day', 'meditation', 'practice'] },
    { path: '/work-transitions', page: 'Work Transitions', keywords: ['work', 'transitions', 'stress', 'workplace', 'mindfulness', 'balance', 'career'] },
    { path: '/evening-winddowns', page: 'Evening Winddowns', keywords: ['evening', 'winddown', 'sleep', 'relaxation', 'night', 'rest', 'calm'] },
    { path: '/dream-journal', page: 'Dream Journal', keywords: ['dream', 'journal', 'dreams', 'sleep', 'subconscious', 'reflection'] },
    { path: '/oracle-cards', page: 'Oracle Cards', keywords: ['oracle', 'cards', 'divination', 'guidance', 'spiritual', 'intuition'] },
    { path: '/thought-bubbles', page: 'Thought Bubbles', keywords: ['thought', 'bubbles', 'anxiety', 'depression', 'mental', 'thoughts', 'mindfulness'] },
    { path: '/singing-bowls', page: 'Singing Bowls', keywords: ['singing', 'bowls', 'sound', 'therapy', 'meditation', 'healing', 'vibration'] },
    { path: '/gratitude-garden', page: 'Gratitude Garden', keywords: ['gratitude', 'garden', 'thankfulness', 'appreciation', 'positive', 'depression', 'mood'] },
    { path: '/chakra-balancing', page: 'Chakra Balancing', keywords: ['chakra', 'balancing', 'energy', 'spiritual', 'healing', 'meditation'] },
    { path: '/mindful-coloring', page: 'Mindful Coloring', keywords: ['mindful', 'coloring', 'art', 'creativity', 'meditation', 'stress', 'anxiety', 'relaxation'] },
    { path: '/blog', page: 'Blog', keywords: ['blog', 'articles', 'posts', 'meditation', 'mindfulness', 'spiritual', 'healing'] },
    { path: '/vlogs', page: 'Vlogs', keywords: ['vlogs', 'videos', 'meditation', 'spiritual', 'guidance', 'practice'] }
  ];
  
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    const searchTermLower = searchTerm.toLowerCase();
    
    // Find pages that contain the search term
    const matchingPages = searchableContent.filter(content => 
      content.keywords.some(keyword => keyword.includes(searchTermLower)) ||
      content.page.toLowerCase().includes(searchTermLower)
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
      <div className="relative z-10 text-center text-white px-4 flex flex-col justify-end min-h-[95vh] pb-32">
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
