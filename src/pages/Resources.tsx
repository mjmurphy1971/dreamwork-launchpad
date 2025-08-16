import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Play, Clock, Heart, Sunrise, Moon, Palette, Sparkles, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Resources = () => {
  const playlists = [
    {
      title: "For Anxiety: Soothing the Nervous System",
      icon: <TreePine className="w-6 h-6" />,
      color: "text-emerald-500",
      description: "Gentle breathwork and body awareness to calm racing thoughts.",
      videos: [
        {
          title: "Daily Calm | 10 Minute Mindfulness Meditation | Be Present",
          description: "Gentle breathwork and body awareness to calm racing thoughts."
        },
        {
          title: "5-Minute Meditation You Can Do Anywhere | Goodful",
          description: "Quick emotional reset—ideal for moments of overwhelm."
        },
        {
          title: "10 MIN Guided Meditation To Clear Your Mind & Start New | Boho Beautiful",
          description: "A soft invitation to release tension and begin again."
        }
      ]
    },
    {
      title: "For Depression: Reconnecting with Inner Light",
      icon: <Sunrise className="w-6 h-6" />,
      color: "text-amber-500",
      description: "Visualization and affirmation to gently shift emotional energy.",
      videos: [
        {
          title: "Best 10 Min Guided Meditation | Master Your Mind To...",
          description: "Visualization and affirmation to gently shift emotional energy."
        },
        {
          title: "You Are This Moment — Award-Winning Life Changing...",
          description: "A poetic reminder of your inherent worth and presence."
        },
        {
          title: "Spiritual Talk That Everyone Needs to Hear",
          description: "Soulful reflection on purpose and the beauty of being alive."
        }
      ]
    },
    {
      title: "For Grounding: Rooting into the Present",
      icon: <TreePine className="w-6 h-6" />,
      color: "text-green-600",
      description: "A spacious meditation to reconnect with your body and breath.",
      videos: [
        {
          title: "Guided Mindfulness Meditation: Being the Boundless...",
          description: "A spacious meditation to reconnect with your body and breath."
        },
        {
          title: "Navigating Life's Challenges with Spiritual Awareness | Eckhart Tolle",
          description: "Grounding wisdom for staying centered in uncertainty."
        }
      ]
    },
    {
      title: "For Self-Love & Worthiness: Coming Home to Yourself",
      icon: <Heart className="w-6 h-6" />,
      color: "text-rose-500",
      description: "A gentle reminder that you are already enough.",
      videos: [
        {
          title: "You Are This Moment — Award-Winning Life Changing...",
          description: "A gentle reminder that you are already enough."
        },
        {
          title: "Best 10 Min Guided Meditation | Master Your Mind To...",
          description: "Affirmations and visualization to nurture inner worth."
        },
        {
          title: "Spiritual Talk That Everyone Needs to Hear",
          description: "A heart-centered reflection on your soul's value."
        }
      ]
    },
    {
      title: "Morning Rituals: Setting the Tone for the Day",
      icon: <Sunrise className="w-6 h-6" />,
      color: "text-orange-500",
      description: "Start your day with clarity and calm.",
      videos: [
        {
          title: "Daily Calm | 10 Minute Mindfulness Meditation | Be Present",
          description: "Start your day with clarity and calm."
        },
        {
          title: "5-Minute Meditation You Can Do Anywhere | Goodful",
          description: "Perfect for busy mornings or travel."
        },
        {
          title: "The Most Important Spiritual Practice | Eckhart Tolle Teachings",
          description: "Presence as your first act of the day."
        }
      ]
    },
    {
      title: "Evening Rituals: Unwinding & Releasing",
      icon: <Moon className="w-6 h-6" />,
      color: "text-indigo-400",
      description: "Let go of the day and return to stillness.",
      videos: [
        {
          title: "10 MIN Guided Meditation To Clear Your Mind & Start New | Boho Beautiful",
          description: "Let go of the day and return to stillness."
        },
        {
          title: "Guided Mindfulness Meditation: Being the Boundless...",
          description: "A gentle transition into rest and reflection."
        },
        {
          title: "Navigating Life's Challenges with Spiritual Awareness | Eckhart Tolle",
          description: "Release tension and find peace before sleep."
        }
      ]
    },
    {
      title: "Creative Flow: Opening the Channel",
      icon: <Palette className="w-6 h-6" />,
      color: "text-purple-500",
      description: "Tap into presence before writing or creating.",
      videos: [
        {
          title: "You Are This Moment — Award-Winning Life Changing...",
          description: "Tap into presence before writing or creating."
        },
        {
          title: "ALONENESS TO ONENESS - Best Life Changing Spiritual...",
          description: "Expand your awareness and dissolve creative blocks."
        },
        {
          title: "The Most Important Spiritual Practice | Eckhart Tolle Teachings",
          description: "Presence as the gateway to inspiration."
        }
      ]
    },
    {
      title: "Manifestation & Expansion: Living Into Possibility",
      icon: <Sparkles className="w-6 h-6" />,
      color: "text-yellow-500",
      description: "Set intentions and visualize your next chapter.",
      videos: [
        {
          title: "Best 10 Min Guided Meditation | Master Your Mind To...",
          description: "Set intentions and visualize your next chapter."
        },
        {
          title: "ALONENESS TO ONENESS - Best Life Changing Spiritual...",
          description: "Step into unity and limitless potential."
        },
        {
          title: "Spiritual Talk That Everyone Needs to Hear",
          description: "Expand your vision of what's possible."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-gentle overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-primary blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full bg-accent blur-3xl"></div>
          </div>
          
          <div className="container mx-auto text-center relative">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Curated Healing Resources</span>
            </div>
            <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 gradient-text">
              Return to Yourself
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A healing journey through presence, self-love, and spiritual expansion. Each playlist is carefully curated to support your wellbeing and inner growth.
            </p>
          </div>
        </section>

        {/* Playlists Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid gap-8 md:gap-12">
              {playlists.map((playlist, index) => (
                <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-elegant transition-all duration-500 hover:scale-[1.02]">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className={`${playlist.color} p-2 rounded-full bg-primary/10`}>
                        {playlist.icon}
                      </div>
                      <CardTitle className="font-heading text-xl md:text-2xl">
                        {playlist.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {playlist.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      {playlist.videos.map((video, videoIndex) => (
                        <div key={videoIndex} className="flex items-start space-x-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-gentle group">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-gentle">
                              <Play className="w-4 h-4 text-primary" />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-gentle">
                              {video.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {video.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                            <Clock className="w-3 h-3" />
                            <span>10 min</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center mt-16">
              <div className="bg-gradient-gentle p-8 rounded-2xl border border-border/50">
                <h3 className="font-heading text-2xl font-semibold mb-4 gradient-text">
                  Ready to Begin Your Journey?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  These resources are here to support you in returning to yourself. Start with whatever feels most aligned with your current needs.
                </p>
                <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-gentle">
                  Start Your Practice
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;