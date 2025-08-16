import { useState } from "react";
import { Play, Heart, Sun, Moon, Palette, Sparkles, TreePine, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const meditationCategories = [
  {
    id: "anxiety",
    title: "For Anxiety: Soothing the Nervous System",
    icon: CloudRain,
    color: "bg-blue-500/10 text-blue-600",
    videos: [
      {
        title: "Daily Calm | 10 Minute Mindfulness Meditation | Be Present",
        description: "Gentle breathwork and body awareness to calm racing thoughts.",
        url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
        thumbnail: "https://img.youtube.com/vi/ZToicYcHIOU/mqdefault.jpg"
      },
      {
        title: "5-Minute Meditation You Can Do Anywhere | Goodful",
        description: "Quick emotional reset—ideal for moments of overwhelm.",
        url: "https://www.youtube.com/watch?v=inpok4MKVLM", 
        thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg"
      },
      {
        title: "10 MIN Guided Meditation To Clear Your Mind & Start New | Boho Beautiful",
        description: "A soft invitation to release tension and begin again.",
        url: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
        thumbnail: "https://img.youtube.com/vi/g_tea8ZNk5A/mqdefault.jpg"
      }
    ]
  },
  {
    id: "depression",
    title: "For Depression: Reconnecting with Inner Light",
    icon: Sun,
    color: "bg-yellow-500/10 text-yellow-600",
    videos: [
      {
        title: "Best 10 Min Guided Meditation | Master Your Mind To Transform Your Life",
        description: "Visualization and affirmation to gently shift emotional energy.",
        url: "https://www.youtube.com/watch?v=itZMM5gCboo",
        thumbnail: "https://img.youtube.com/vi/itZMM5gCboo/mqdefault.jpg"
      },
      {
        title: "You Are This Moment — Award-Winning Life Changing Short Film",
        description: "A poetic reminder of your inherent worth and presence.",
        url: "https://www.youtube.com/watch?v=YQP2StSwg1s",
        thumbnail: "https://img.youtube.com/vi/YQP2StSwg1s/mqdefault.jpg"
      },
      {
        title: "Spiritual Talk That Everyone Needs to Hear",
        description: "Soulful reflection on purpose and the beauty of being alive.",
        url: "https://www.youtube.com/watch?v=aAVPDYJwWuc",
        thumbnail: "https://img.youtube.com/vi/aAVPDYJwWuc/mqdefault.jpg"
      }
    ]
  },
  {
    id: "grounding",
    title: "For Grounding: Rooting into the Present",
    icon: TreePine,
    color: "bg-green-500/10 text-green-600",
    videos: [
      {
        title: "Guided Mindfulness Meditation: Being the Boundless Awareness You Are",
        description: "A spacious meditation to reconnect with your body and breath.",
        url: "https://www.youtube.com/watch?v=cEqZthCaMpo",
        thumbnail: "https://img.youtube.com/vi/cEqZthCaMpo/mqdefault.jpg"
      },
      {
        title: "Navigating Life's Challenges with Spiritual Awareness | Eckhart Tolle",
        description: "Grounding wisdom for staying centered in uncertainty.",
        url: "https://www.youtube.com/watch?v=mMRrCYPxD0I",
        thumbnail: "https://img.youtube.com/vi/mMRrCYPxD0I/mqdefault.jpg"
      }
    ]
  },
  {
    id: "self-love",
    title: "For Self-Love & Worthiness: Coming Home to Yourself",
    icon: Heart,
    color: "bg-pink-500/10 text-pink-600",
    videos: [
      {
        title: "You Are This Moment — Award-Winning Life Changing Short Film",
        description: "A gentle reminder that you are already enough.",
        url: "https://www.youtube.com/watch?v=YQP2StSwg1s",
        thumbnail: "https://img.youtube.com/vi/YQP2StSwg1s/mqdefault.jpg"
      },
      {
        title: "Best 10 Min Guided Meditation | Master Your Mind To Transform Your Life",
        description: "Affirmations and visualization to nurture inner worth.",
        url: "https://www.youtube.com/watch?v=itZMM5gCboo",
        thumbnail: "https://img.youtube.com/vi/itZMM5gCboo/mqdefault.jpg"
      },
      {
        title: "Spiritual Talk That Everyone Needs to Hear",
        description: "A heart-centered reflection on your soul's value.",
        url: "https://www.youtube.com/watch?v=aAVPDYJwWuc",
        thumbnail: "https://img.youtube.com/vi/aAVPDYJwWuc/mqdefault.jpg"
      }
    ]
  },
  {
    id: "morning",
    title: "Morning Rituals: Setting the Tone for the Day",
    icon: Sun,
    color: "bg-orange-500/10 text-orange-600",
    videos: [
      {
        title: "Daily Calm | 10 Minute Mindfulness Meditation | Be Present",
        description: "Start your day with clarity and calm.",
        url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
        thumbnail: "https://img.youtube.com/vi/ZToicYcHIOU/mqdefault.jpg"
      },
      {
        title: "5-Minute Meditation You Can Do Anywhere | Goodful",
        description: "Perfect for busy mornings or travel.",
        url: "https://www.youtube.com/watch?v=inpok4MKVLM",
        thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/mqdefault.jpg"
      },
      {
        title: "The Most Important Spiritual Practice | Eckhart Tolle Teachings",
        description: "Presence as your first act of the day.",
        url: "https://www.youtube.com/watch?v=d-diB65scQU",
        thumbnail: "https://img.youtube.com/vi/d-diB65scQU/mqdefault.jpg"
      }
    ]
  },
  {
    id: "evening",
    title: "Evening Rituals: Unwinding & Releasing",
    icon: Moon,
    color: "bg-purple-500/10 text-purple-600",
    videos: [
      {
        title: "10 MIN Guided Meditation To Clear Your Mind & Start New | Boho Beautiful",
        description: "Let go of the day and return to stillness.",
        url: "https://www.youtube.com/watch?v=g_tea8ZNk5A",
        thumbnail: "https://img.youtube.com/vi/g_tea8ZNk5A/mqdefault.jpg"
      },
      {
        title: "Guided Mindfulness Meditation: Being the Boundless Awareness You Are",
        description: "A gentle transition into rest and reflection.",
        url: "https://www.youtube.com/watch?v=cEqZthCaMpo",
        thumbnail: "https://img.youtube.com/vi/cEqZthCaMpo/mqdefault.jpg"
      },
      {
        title: "Navigating Life's Challenges with Spiritual Awareness | Eckhart Tolle",
        description: "Release tension and find peace before sleep.",
        url: "https://www.youtube.com/watch?v=mMRrCYPxD0I",
        thumbnail: "https://img.youtube.com/vi/mMRrCYPxD0I/mqdefault.jpg"
      }
    ]
  },
  {
    id: "creative",
    title: "Creative Flow: Opening the Channel",
    icon: Palette,
    color: "bg-indigo-500/10 text-indigo-600",
    videos: [
      {
        title: "You Are This Moment — Award-Winning Life Changing Short Film",
        description: "Tap into presence before writing or creating.",
        url: "https://www.youtube.com/watch?v=YQP2StSwg1s",
        thumbnail: "https://img.youtube.com/vi/YQP2StSwg1s/mqdefault.jpg"
      },
      {
        title: "ALONENESS TO ONENESS - Best Life Changing Spiritual Documentary Film",
        description: "Expand your awareness and dissolve creative blocks.",
        url: "https://www.youtube.com/watch?v=lu8m5FA2nL8",
        thumbnail: "https://img.youtube.com/vi/lu8m5FA2nL8/mqdefault.jpg"
      },
      {
        title: "The Most Important Spiritual Practice | Eckhart Tolle Teachings",
        description: "Presence as the gateway to inspiration.",
        url: "https://www.youtube.com/watch?v=d-diB65scQU",
        thumbnail: "https://img.youtube.com/vi/d-diB65scQU/mqdefault.jpg"
      }
    ]
  },
  {
    id: "manifestation",
    title: "Manifestation & Expansion: Living Into Possibility",
    icon: Sparkles,
    color: "bg-violet-500/10 text-violet-600",
    videos: [
      {
        title: "Best 10 Min Guided Meditation | Master Your Mind To Transform Your Life",
        description: "Set intentions and visualize your next chapter.",
        url: "https://www.youtube.com/watch?v=itZMM5gCboo",
        thumbnail: "https://img.youtube.com/vi/itZMM5gCboo/mqdefault.jpg"
      },
      {
        title: "ALONENESS TO ONENESS - Best Life Changing Spiritual Documentary Film",
        description: "Step into unity and limitless potential.",
        url: "https://www.youtube.com/watch?v=lu8m5FA2nL8",
        thumbnail: "https://img.youtube.com/vi/lu8m5FA2nL8/mqdefault.jpg"
      },
      {
        title: "Spiritual Talk That Everyone Needs to Hear",
        description: "Expand your vision of what's possible.",
        url: "https://www.youtube.com/watch?v=aAVPDYJwWuc",
        thumbnail: "https://img.youtube.com/vi/aAVPDYJwWuc/mqdefault.jpg"
      }
    ]
  }
];

const Meditation = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = selectedCategory 
    ? meditationCategories.filter(cat => cat.id === selectedCategory)
    : meditationCategories;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-relaxed">
            🌿 The Dreamwork Space Playlist
          </h1>
          <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-8">
            "Return to Yourself"
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A healing journey through presence, self-love, and spiritual expansion.
          </p>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="transition-smooth"
            >
              All Categories
            </Button>
            {meditationCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-smooth"
                >
                  <IconComponent className="mr-2 w-4 h-4" />
                  {category.title.split(':')[0]}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Categories */}
        <section className="space-y-12">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-full ${category.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.videos.map((video, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer"
                      onClick={() => window.open(video.url, '_blank')}
                    >
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                            onError={(e) => {
                              e.currentTarget.src = '/placeholder.svg';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <h4 className="font-heading font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-gentle">
                          {video.title}
                        </h4>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {video.description}
                        </p>
                        <div className="mt-4">
                          <Badge variant="secondary" className="gradient-card text-foreground border-0">
                            Watch on YouTube
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16 mb-8">
          <Card className="max-w-2xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                Begin Your Journey Today
              </h3>
              <p className="text-foreground leading-relaxed mb-6">
                Each meditation in this playlist has been carefully chosen to support different aspects of your healing journey. Start wherever feels right for you today.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Explore More Resources
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Meditation;