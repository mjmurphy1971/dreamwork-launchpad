import { Play, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { createVideoSchema } from "./SchemaMarkup";
import { baseKeywords, formatDuration } from "@/utils/seoHelpers";
import morningMeditationThumb from "@/assets/morning-meditation-thumb.jpg";
import sacredSpaceThumb from "@/assets/sacred-space-thumb.jpg";
import breathworkThumb from "@/assets/breathwork-thumb.jpg";
import dreamJournalThumb from "@/assets/dream-journal-thumb.jpg";

const vlogs = [
  {
    id: 1,
    title: "Invitation to Share Your Story - Creating Sacred Connection", 
    description: "Join me in creating a beautiful community of storytellers. I'm inviting guests to share their personal journeys of spiritual awakening, healing, and transformation.",
    thumbnail: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t15.5256-10/472577662_1102528784885729_6829938710829778966_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9Wx8vB-EmfYQ7kNvgGYZF5n&_nc_ht=scontent.fyyc2-1.fna.fbcdn.net&_nc_gid=ATgpj-MPsO8TTeWeNxfKE6g&oh=00_AYCQfW8YJQFgek7lh_LO2IEUZpki8WRbJRJ4DWPyxfpfgg&oe=676CEADD",
    duration: "1:45",
    views: "127",
    publishedAt: "2024-08-22",
    category: "Community",
    videoUrl: "https://www.facebook.com/reel/922524566755117",
    videoId: "922524566755117",
    transcript: "Hello beautiful souls! I'm so excited to share something special with you today. I'm opening up The Dream Work to guest storytellers - people like you who have incredible journeys of healing, awakening, and transformation to share. Your experiences could be exactly what someone else needs to hear right now. If you feel called to share your journey, please reach out. Let's create a beautiful tapestry of human experience and support each other on this path of consciousness and growth.",
    keywords: ["story sharing", "guest stories", "community", "spiritual journey", "transformation", "healing stories"]
  },
  {
    id: 2,
    title: "Morning Meditation: Finding Peace in 10 Minutes",
    description: "Join me for a gentle morning meditation practice that will set a peaceful tone for your entire day. Learn breathing techniques, body awareness, and mindful intention setting.",
    thumbnail: morningMeditationThumb,
    duration: "12:34",
    views: "15.2K",
    publishedAt: "2024-08-14",
    category: "Guided Meditation",
    videoUrl: "https://www.youtube.com/watch?v=tOp-gbnyj3w",
    videoId: "tOp-gbnyj3w",
    transcript: "Welcome to this morning meditation practice. Find a comfortable seated position and begin to notice your breath. Take a deep inhale through the nose... and slowly exhale through the mouth. Let's set an intention for the day ahead. What quality would you like to cultivate today? Perhaps peace, compassion, or clarity. Hold that intention gently in your heart as we continue this practice together.",
    keywords: ["morning meditation", "guided meditation", "daily practice", "mindfulness", "breathing technique"]
  },
  {
    id: 3,
    title: "Sacred Space Tour: Creating Your Meditation Corner",
    description: "Take a tour of my personal meditation space and learn how to create your own sacred sanctuary at home. Discover essential elements, arrangement tips, and energy clearing techniques.",
    thumbnail: sacredSpaceThumb,
    duration: "8:45",
    views: "8.7K",
    publishedAt: "2024-08-11",
    category: "Home & Space",
    videoUrl: "https://www.youtube.com/watch?v=kO5I0p3IuiQ",
    videoId: "kO5I0p3IuiQ",
    transcript: "Welcome to my sacred meditation space. This corner of my home has been carefully curated to support deep spiritual practice. Let me show you the essential elements: a comfortable cushion positioned facing east, crystals for energy amplification, plants for life force, and candles for ambiance. The key is creating a space that feels separate from everyday activities - a threshold between the mundane and the sacred.",
    keywords: ["sacred space", "meditation room", "home sanctuary", "spiritual decor", "meditation setup"]
  },
  {
    id: 4,
    title: "Breathwork for Anxiety: Immediate Relief Techniques",
    description: "Learn powerful breathing techniques that can help you find calm in moments of stress and anxiety.",
    thumbnail: breathworkThumb,
    duration: "15:22",
    views: "22.1K",
    publishedAt: "2024-08-09",
    category: "Healing",
    videoUrl: "https://www.youtube.com/watch?v=tOp-gbnyj3w",
  },
  {
    id: 5,
    title: "Dream Journal Walk-Through: Recording Your Visions",
    description: "Explore the practice of dream journaling and discover how to capture and interpret your nighttime messages.",
    thumbnail: dreamJournalThumb,
    duration: "18:10",
    views: "12.5K",
    publishedAt: "2024-08-07",
    category: "Dream Work",
    videoUrl: "https://www.youtube.com/watch?v=kO5I0p3IuiQ",
  },
];

const VlogSection = () => {
  // Generate schema for all videos
  const videoSchemas = vlogs.map(vlog => createVideoSchema({
    title: vlog.title,
    description: vlog.description,
    duration: formatDuration(Math.ceil(parseInt(vlog.duration.split(':')[0]) + parseInt(vlog.duration.split(':')[1])/60)),
    uploadDate: vlog.publishedAt,
    thumbnailUrl: typeof vlog.thumbnail === 'string' ? vlog.thumbnail : `https://img.youtube.com/vi/${vlog.videoId}/maxresdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${vlog.videoId}`,
    category: vlog.category,
    keywords: [...baseKeywords, ...(vlog.keywords || []), vlog.category.toLowerCase()]
  }));

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Video Teachings Collection",
            "description": "Curated collection of meditation and mindfulness video teachings",
            "itemListElement": videoSchemas.map((schema, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": schema
            }))
          })}
        </script>
      </Helmet>
      <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Video Teachings
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch our latest video content featuring guided meditations, spiritual teachings, 
            and behind-the-scenes glimpses into mindful living.
          </p>
        </div>

        {/* Featured Video */}
        <div className="mb-12 animate-slide-up">
          <Card className="overflow-hidden shadow-dreamy border-0 bg-card">
            <div className="lg:flex">
              <div className="lg:w-2/3 relative group">
                <img
                  src={vlogs[0].thumbnail}
                  alt={vlogs[0].title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-smooth flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-primary-foreground/90 text-primary hover:bg-primary-foreground backdrop-blur-sm shadow-glow group/play"
                    onClick={() => window.open(vlogs[0].videoUrl, '_blank')}
                  >
                    <Play className="mr-2 w-6 h-6 group-hover/play:scale-110 transition-gentle" />
                    Watch Now
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                  {vlogs[0].duration}
                </div>
              </div>
              
              <div className="lg:w-1/3 p-8">
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                    🎥 Latest
                  </Badge>
                  <Badge variant="outline">
                    {vlogs[0].category}
                  </Badge>
                </div>
                
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                  {vlogs[0].title}
                </h3>
                
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {vlogs[0].description}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(vlogs[0].publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    {vlogs[0].views} views
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vlogs.slice(1).map((vlog, index) => (
            <Card
              key={vlog.id}
              className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => window.open(vlog.videoUrl, '_blank')}
            >
              <CardHeader className="p-0">
                <div className="relative group/video">
                  <img
                    src={vlog.thumbnail}
                    alt={vlog.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover/video:bg-black/10 transition-smooth flex items-center justify-center opacity-0 group-hover/video:opacity-100">
                    <Button
                      size="sm"
                      className="bg-primary-foreground/90 text-primary hover:bg-primary-foreground backdrop-blur-sm group/play"
                    >
                      <Play className="w-4 h-4 group-hover/play:scale-110 transition-gentle" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {vlog.duration}
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground text-xs">
                      {vlog.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-gentle">
                  {vlog.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {vlog.description}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(vlog.publishedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {vlog.views}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Subscribe CTA */}
        <div className="text-center mt-12 animate-fade-in">
          <div className="inline-flex flex-col items-center p-8 rounded-2xl bg-gradient-card shadow-dreamy max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center mb-4">
              <Play className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
              Never Miss a Video
            </h3>
            <p className="text-muted-foreground mb-4 text-center">
              Subscribe to get notified when we release new guided meditations and spiritual teachings.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => window.open('https://www.youtube.com/@TheDreamWork', '_blank')}
            >
              Subscribe to Channel
            </Button>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default VlogSection;