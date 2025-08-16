import { Play, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const vlogs = [
  {
    id: 1,
    title: "Morning Meditation: Finding Peace in 10 Minutes",
    description: "Join me for a gentle morning meditation practice that will set a peaceful tone for your entire day.",
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    duration: "12:34",
    views: "15.2K",
    publishedAt: "2024-08-14",
    category: "Guided Meditation",
  },
  {
    id: 2,
    title: "Sacred Space Tour: Creating Your Meditation Corner",
    description: "Take a tour of my personal meditation space and learn how to create your own sacred sanctuary at home.",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop",
    duration: "8:45",
    views: "8.7K",
    publishedAt: "2024-08-11",
    category: "Home & Space",
  },
  {
    id: 3,
    title: "Breathwork for Anxiety: Immediate Relief Techniques",
    description: "Learn powerful breathing techniques that can help you find calm in moments of stress and anxiety.",
    thumbnail: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&h=450&fit=crop",
    duration: "15:22",
    views: "22.1K",
    publishedAt: "2024-08-09",
    category: "Healing",
  },
  {
    id: 4,
    title: "Dream Journal Walk-Through: Recording Your Visions",
    description: "Explore the practice of dream journaling and discover how to capture and interpret your nighttime messages.",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=450&fit=crop",
    duration: "18:10",
    views: "12.5K",
    publishedAt: "2024-08-07",
    category: "Dream Work",
  },
];

const VlogSection = () => {
  return (
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
              onClick={() => window.location.href = '/vlogs'}
            >
              Subscribe to Channel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VlogSection;