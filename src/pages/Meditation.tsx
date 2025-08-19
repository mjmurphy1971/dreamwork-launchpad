import { useState } from "react";
import { Play, Heart, Sun, Moon, Palette, Sparkles, TreePine, CloudRain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TextToSpeech } from "@/components/TextToSpeech";
import { GuidedAudioSession } from "@/components/GuidedAudioSession";
import { useEffect } from "react";
import { highlightSearchTerm, getSearchTermFromURL } from "@/utils/searchHighlight";

const meditationCategories = [
  {
    id: "anxiety",
    title: "For Anxiety: Soothing the Nervous System",
    icon: CloudRain,
    color: "bg-blue-500/10 text-blue-600",
    videos: [
      {
        title: "10 Minutes of Focused Attention: A Quick Exercise to Calm an Anxious Mind",
        description: "Headspace guided meditation to ease anxiety through focused attention on the breath.",
        url: "https://www.youtube.com/watch?v=Hvs_49dikDQ",
        thumbnail: "https://img.youtube.com/vi/Hvs_49dikDQ/mqdefault.jpg"
      },
      {
        title: "A 10-Minute Meditation for Stress from Headspace",
        description: "Reframe stressful situations and find peace through mindful breathing.",
        url: "https://www.youtube.com/watch?v=lS0kcSNlULw",
        thumbnail: "https://img.youtube.com/vi/lS0kcSNlULw/mqdefault.jpg"
      },
      {
        title: "Guided Sleep Meditation for Anxiety Relief",
        description: "Jason Stephenson's calming meditation to release anxiety and intrusive thoughts.",
        url: "https://www.youtube.com/watch?v=ieJ-qUe1do8",
        thumbnail: "https://img.youtube.com/vi/ieJ-qUe1do8/mqdefault.jpg"
      },
      {
        title: "Managing Anxious Thoughts And Stress With Mindfulness",
        description: "Headspace grounding technique to settle your mind and body.",
        url: "https://www.youtube.com/watch?v=EfubAj5f_rM",
        thumbnail: "https://img.youtube.com/vi/EfubAj5f_rM/mqdefault.jpg"
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
        title: "Sleep Hypnosis for Self Love, Confidence & Self Esteem",
        description: "Michael Sealey's healing meditation to build self-worth and inner confidence.",
        url: "https://www.youtube.com/watch?v=DHwgBCx0uNs",
        thumbnail: "https://img.youtube.com/vi/DHwgBCx0uNs/mqdefault.jpg"
      },
      {
        title: "1 Hour Sleep Hypnosis: Higher Self Healing for Depression & Anxiety",
        description: "Deep subconscious healing to take control of your peace and well-being.",
        url: "https://www.youtube.com/watch?v=HpHKf4tlvFw",
        thumbnail: "https://img.youtube.com/vi/HpHKf4tlvFw/mqdefault.jpg"
      },
      {
        title: "Sleep Hypnosis for Clearing Subconscious Negativity",
        description: "Transform negative thoughts and remove emotional blocks with deep healing.",
        url: "https://www.youtube.com/watch?v=_MCXtMjaJXw",
        thumbnail: "https://img.youtube.com/vi/_MCXtMjaJXw/mqdefault.jpg"
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
        title: "EPIC GUIDED MEDITATION: Earth Grounding",
        description: "The Honest Guys' empowering visualization to reconnect with Earth's energy.",
        url: "https://www.youtube.com/watch?v=dpqX3Fthw_E",
        thumbnail: "https://img.youtube.com/vi/dpqX3Fthw_E/mqdefault.jpg"
      },
      {
        title: "Mindfulness Meditation - Guided 10 Minutes",
        description: "The Honest Guys' mindfulness practice to be completely present in the moment.",
        url: "https://www.youtube.com/watch?v=6p_yaNFSYao",
        thumbnail: "https://img.youtube.com/vi/6p_yaNFSYao/mqdefault.jpg"
      },
      {
        title: "Guided Meditation - Blissful Deep Relaxation",
        description: "Gentle guidance into a state of profound peace and grounding.",
        url: "https://www.youtube.com/watch?v=Jyy0ra2WcQQ",
        thumbnail: "https://img.youtube.com/vi/Jyy0ra2WcQQ/mqdefault.jpg"
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
        title: "Sleep Hypnosis for Self Love, Confidence & Self Esteem",
        description: "Heal your inner being and connect to your self-worth through deep rest.",
        url: "https://www.youtube.com/watch?v=DHwgBCx0uNs",
        thumbnail: "https://img.youtube.com/vi/DHwgBCx0uNs/mqdefault.jpg"
      },
      {
        title: "Sleep Hypnosis for Regaining Confidence & Connecting to Your Inner Power",
        description: "Michael Sealey's meditation to reconnect with your limitless inner strength.",
        url: "https://www.youtube.com/watch?v=2H1On9pr7y4",
        thumbnail: "https://img.youtube.com/vi/2H1On9pr7y4/mqdefault.jpg"
      },
      {
        title: "10 Min Meditation For Positive Energy | Manifest Love & Light",
        description: "Boho Beautiful's practice to cultivate the love and light within you.",
        url: "https://www.youtube.com/watch?v=8zfQvchPkqQ",
        thumbnail: "https://img.youtube.com/vi/8zfQvchPkqQ/mqdefault.jpg"
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
        title: "Guided Morning Meditation | 10 Minutes To Start Each Day Perfectly",
        description: "Boho Beautiful's perfect morning meditation with visualization and peace.",
        url: "https://www.youtube.com/watch?v=8_f7ltCNSAQ",
        thumbnail: "https://img.youtube.com/vi/8_f7ltCNSAQ/mqdefault.jpg"
      },
      {
        title: "Morning Guided Meditation | 10 Minutes To Execute The Perfect Day",
        description: "Set your mind up for success, happiness, and focus with this morning practice.",
        url: "https://www.youtube.com/watch?v=X2OaMAUEPXM",
        thumbnail: "https://img.youtube.com/vi/X2OaMAUEPXM/mqdefault.jpg"
      },
      {
        title: "Reset: Decompress Your Body and Mind",
        description: "Headspace meditation to pause and reset between tasks for better presence.",
        url: "https://www.youtube.com/watch?v=QHkXvPq2pQE",
        thumbnail: "https://img.youtube.com/vi/QHkXvPq2pQE/mqdefault.jpg"
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
        title: "10 Minute Bedtime Yoga | Yoga With Adriene",
        description: "Gentle stretches and breathing to prepare for a restful night's sleep.",
        url: "https://www.youtube.com/watch?v=CLDHeV9OI5U",
        thumbnail: "https://img.youtube.com/vi/CLDHeV9OI5U/mqdefault.jpg"
      },
      {
        title: "Wind Down Yoga | 12-Minute Bedtime Yoga",
        description: "Yoga with Adriene's relaxing session to help you wind down after work.",
        url: "https://www.youtube.com/watch?v=BiWDsfZ3zbo",
        thumbnail: "https://img.youtube.com/vi/BiWDsfZ3zbo/mqdefault.jpg"
      },
      {
        title: "GUIDED SLEEP MEDITATION - The Sanctuary",
        description: "The Honest Guys' peaceful journey to a warm sanctuary with fireplace sounds.",
        url: "https://www.youtube.com/watch?v=Y7rCDZXSgxI",
        thumbnail: "https://img.youtube.com/vi/Y7rCDZXSgxI/mqdefault.jpg"
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
        title: "Yoga For Creativity | 40-Minute Yoga Practice",
        description: "Yoga with Adriene's full practice to unlock creative energy and inspiration.",
        url: "https://www.youtube.com/watch?v=mY3lX6iAxq8",
        thumbnail: "https://img.youtube.com/vi/mY3lX6iAxq8/mqdefault.jpg"
      },
      {
        title: "Flow - Day 24 - Create",
        description: "Unlock creativity through intuitive movement and mindful presence.",
        url: "https://www.youtube.com/watch?v=49M4lpWZspo",
        thumbnail: "https://img.youtube.com/vi/49M4lpWZspo/mqdefault.jpg"
      },
      {
        title: "Awaken The Artist Within | Yoga With Adriene",
        description: "Tap into your creative energy with this warming flow for artistic expression.",
        url: "https://www.youtube.com/watch?v=twDBxdmjCA8",
        thumbnail: "https://img.youtube.com/vi/twDBxdmjCA8/mqdefault.jpg"
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
        title: "15 MIN Guided Meditation For Manifestation & Success",
        description: "Boho Beautiful's powerful meditation to manifest success and inner fire.",
        url: "https://www.youtube.com/watch?v=APvLO3uXLnE",
        thumbnail: "https://img.youtube.com/vi/APvLO3uXLnE/mqdefault.jpg"
      },
      {
        title: "Guided Meditation For Powerful Positivity",
        description: "10-minute Boho Beautiful meditation for peace, focus, and positive energy.",
        url: "https://www.youtube.com/watch?v=-Tb1lR8Z5oM",
        thumbnail: "https://img.youtube.com/vi/-Tb1lR8Z5oM/mqdefault.jpg"
      },
      {
        title: "Guided Meditation For Overcoming Fear & Shifting Reality",
        description: "15-minute practice to overcome fear and step into your desired reality.",
        url: "https://www.youtube.com/watch?v=DZ3Vc_72TJE",
        thumbnail: "https://img.youtube.com/vi/DZ3Vc_72TJE/mqdefault.jpg"
      }
    ]
  }
];

const Meditation = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  useEffect(() => {
    const searchTerm = getSearchTermFromURL();
    if (searchTerm) {
      // Delay highlighting to ensure content is rendered
      setTimeout(() => {
        highlightSearchTerm(searchTerm);
      }, 500);
    }
  }, []);

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
                      className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer transform hover:-translate-y-1"
                    >
                      <div onClick={() => window.open(video.url, '_blank')}>
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
                            <div className="absolute top-3 right-3">
                              <Badge variant="secondary" className="bg-black/50 text-white border-0 text-xs">
                                YouTube
                              </Badge>
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
                          {(video as any).creator && (
                            <p className="text-xs text-muted-foreground mt-2 italic">
                              By{' '}
                              <a 
                                href={(video as any).creatorLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  window.open((video as any).creatorLink, '_blank');
                                }}
                              >
                                {(video as any).creator}
                              </a>
                            </p>
                          )}
                        </CardContent>
                      </div>
                      
                      {/* Interactive elements outside the main clickable area */}
                      <div className="px-6 pb-6 pt-0">
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(video.url, '_blank', 'noopener,noreferrer');
                            }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                            type="button"
                          >
                            <Play className="w-3 h-3 mr-1" />
                            Watch Video
                          </button>
                          <div onClick={(e) => e.stopPropagation()}>
                            <TextToSpeech 
                              text={video.description}
                              buttonText="Listen"
                              className="text-xs"
                            />
                          </div>
                        </div>
                      </div>
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
                },
                {
                  name: "Grounding Visualization",
                  text: "Imagine roots growing from the base of your spine, extending deep into the earth. Feel these roots anchoring you, drawing up stability and calm. With each breath, feel yourself becoming more grounded, more centered. Any worries or fears are absorbed by the earth below you. You are supported, you are safe, you are connected to something larger than yourself.",
                  duration: "4 minutes"
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
                },
                {
                  name: "Gratitude Awakening",
                  text: "Begin by feeling appreciation for this moment of awakening. Feel gratitude for your breath, for your heartbeat, for the gift of consciousness itself. Think of three things you're grateful for in your life right now. Let this feeling of appreciation fill your entire being. Carry this energy of gratitude with you as you step into your day.",
                  duration: "3 minutes"
                }
              ]}
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-8">
            <GuidedAudioSession
              title="Deep Sleep & Dreams"
              sessions={[
                {
                  name: "Sleep Preparation",
                  text: "As you prepare for rest, let your body sink deeply into your bed. Release the day that has passed. Feel your muscles relaxing one by one. Your breathing becomes slower and deeper. Your mind is becoming quiet and peaceful. You are safe to let go and drift into restorative sleep. May your dreams be filled with wisdom and healing.",
                  duration: "6 minutes"
                },
                {
                  name: "Dream Incubation",
                  text: "Before sleep, set an intention for your dreams tonight. Ask your subconscious mind to bring you insights, healing, or guidance. Visualize yourself receiving exactly what you need through your dreams. Trust that your inner wisdom will speak to you in the language of symbols and stories. Sleep peacefully, knowing answers will come.",
                  duration: "5 minutes"
                }
              ]}
            />
            
            <GuidedAudioSession
              title="Self-Love & Healing"
              sessions={[
                {
                  name: "Inner Child Healing",
                  text: "Imagine meeting your younger self with complete love and acceptance. See that child's innocence and wonder. Speak words of encouragement and support. Tell them they are loved exactly as they are. Hold space for any emotions that arise. Send healing light to any wounds from the past. You are worthy of love, now and always.",
                  duration: "7 minutes"
                },
                {
                  name: "Heart Opening Practice",
                  text: "Place both hands on your heart. Feel its steady, loving rhythm. Breathe into your heart space, imagining it expanding with each inhale. Send love to yourself first, then to loved ones, then to all beings everywhere. Feel your heart as an infinite source of love and compassion. You are love itself, expressing in human form.",
                  duration: "5 minutes"
                },
                {
                  name: "Forgiveness Meditation",
                  text: "Bring to mind someone or something you're ready to forgive, including yourself. Understand that forgiveness is a gift you give yourself. Release the burden of resentment. Feel the lightness that comes with letting go. Send compassion to all involved. You are free to love fully when you forgive completely.",
                  duration: "6 minutes"
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