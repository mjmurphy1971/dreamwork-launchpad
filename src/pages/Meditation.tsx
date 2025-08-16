import { useState } from "react";
import { Play, Heart, Sun, Moon, Palette, Sparkles, TreePine, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TextToSpeech } from "@/components/TextToSpeech";
import { GuidedAudioSession } from "@/components/GuidedAudioSession";

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
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
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
                        <div className="mt-4 flex gap-2 flex-wrap">
                          <Badge variant="secondary" className="gradient-card text-foreground border-0">
                            Watch on YouTube
                          </Badge>
                          <TextToSpeech 
                            text={video.description}
                            buttonText="Listen to description"
                            className="text-xs"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Guided Audio Sessions */}
        <section className="mt-16 mb-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-heading font-bold gradient-text mb-4">
              Guided Audio Sessions
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Listen to guided meditations with AI-generated audio. Perfect for when you prefer audio-only sessions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <GuidedAudioSession
              title="Quick Anxiety Relief"
              sessions={[
                {
                  name: "3-Minute Breathing Space",
                  text: "Find a comfortable position and close your eyes. Take a deep breath in through your nose for 4 counts. Hold for 4 counts. Exhale slowly through your mouth for 6 counts. Feel your shoulders release with each exhale. Notice the sensation of your breath naturally flowing. You are safe in this moment. With each breath, feel anxiety melting away from your body. Continue breathing at your own pace, knowing that this feeling will pass.",
                  duration: "3 minutes"
                },
                {
                  name: "Body Scan for Calm",
                  text: "Starting at the top of your head, notice any tension you're holding. Breathe into that space and let it soften. Move your attention to your forehead, your eyes, your jaw. Let each part of your face relax completely. Feel the relaxation flowing down into your neck and shoulders. Notice how your chest rises and falls with each breath. Let your arms feel heavy and relaxed. Continue this gentle awareness down through your torso, your hips, your legs, all the way to your toes. Your whole body is now at peace.",
                  duration: "5 minutes"
                }
              ]}
            />
            
            <GuidedAudioSession
              title="Morning Intention Setting"
              sessions={[
                {
                  name: "Daily Clarity Practice",
                  text: "As you begin this new day, take a moment to connect with your inner wisdom. Place your hand on your heart and feel its steady rhythm. Ask yourself: What do I most need today? Listen for the answer that arises naturally. Set an intention that feels aligned with your highest good. Visualize yourself moving through your day with grace and presence. See yourself responding to challenges with clarity and calm. Feel gratitude for this opportunity to begin again.",
                  duration: "4 minutes"
                },
                {
                  name: "Energizing Breathwork",
                  text: "Sit tall and take three deep, energizing breaths. Feel your spine lengthening with each inhale. On your next breath, breathe in vitality and strength. Exhale anything that doesn't serve you today. Continue this pattern, breathing in energy and life force, breathing out stagnation. Feel yourself becoming more alert and present with each breath. You are ready to meet this day with an open heart and clear mind.",
                  duration: "3 minutes"
                }
              ]}
            />
          </div>
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