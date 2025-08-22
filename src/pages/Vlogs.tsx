import { useState } from "react";
import { Play, Calendar, Eye, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { VideoTranscriptModal } from "@/components/VideoTranscriptModal";
import { createVideoSchema } from "@/components/SchemaMarkup";
import { baseKeywords, formatDuration } from "@/utils/seoHelpers";

// Enhanced video data with transcripts and detailed metadata for AI comprehension
const vlogs = [
  {
    id: 1,
    title: "Invitation to Share Your Story - Creating Sacred Connection",
    description: "Join me in creating a beautiful community of storytellers. I'm inviting guests to share their personal journeys of spiritual awakening, healing, and transformation. This is your invitation to connect and inspire others with your unique path.",
    thumbnail: "https://scontent.fyyc2-1.fna.fbcdn.net/v/t15.5256-10/472577662_1102528784885729_6829938710829778966_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=9Wx8vB-EmfYQ7kNvgGYZF5n&_nc_ht=scontent.fyyc2-1.fna.fbcdn.net&_nc_gid=ATgpj-MPsO8TTeWeNxfKE6g&oh=00_AYCQfW8YJQFgek7lh_LO2IEUZpki8WRbJRJ4DWPyxfpfgg&oe=676CEADD",
    videoUrl: "https://www.facebook.com/reel/922524566755117",
    videoId: "922524566755117",
    duration: "1:45",
    views: "127",
    uploadDate: "2024-08-22",
    category: "Community",
    featured: true,
    keywords: ["story sharing", "guest stories", "community", "spiritual journey", "transformation", "healing stories"],
    transcript: "Hello beautiful souls! I'm so excited to share something special with you today. I'm opening up The Dream Work to guest storytellers - people like you who have incredible journeys of healing, awakening, and transformation to share. Whether you've experienced a profound spiritual awakening, overcome challenges through meditation and mindfulness, or discovered healing through dream work, I want to hear your story. Your experiences could be exactly what someone else needs to hear right now. If you feel called to share your journey, please reach out. Let's create a beautiful tapestry of human experience and support each other on this path of consciousness and growth."
  },
  {
    id: 2,
    title: "Morning Meditation Practice - Finding Peace in Daily Life",
    description: "Join me for a gentle morning meditation session as I share insights on building a sustainable daily practice that brings peace and clarity to your everyday life. Learn breathing techniques, intention setting, and mindful awareness practices.",
    thumbnail: "https://img.youtube.com/vi/tOp-gbnyj3w/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=tOp-gbnyj3w",
    videoId: "tOp-gbnyj3w",
    duration: "15:32",
    views: "2.1K",
    uploadDate: "2024-08-15",
    category: "Meditation",
    featured: false,
    keywords: ["morning meditation", "daily practice", "mindfulness routine", "breathing techniques", "intention setting"],
    transcript: "Welcome to this morning meditation practice. Today we'll explore how to create a sustainable daily practice that brings peace into your everyday life. Find a comfortable seated position, close your eyes, and begin to notice your breath. Take a deep inhale through the nose, feeling your belly expand, and slowly exhale through the mouth. As we settle into this practice, let's set an intention for the day ahead. What quality would you like to cultivate today? Perhaps patience, compassion, or clarity. Hold that intention gently in your heart as we continue together. Notice how your body feels in this moment - any areas of tension or relaxation. Breathe into any areas that feel tight or uncomfortable. This practice of morning meditation creates a foundation of awareness that carries throughout your day, helping you respond rather than react to life's challenges."
  },
  {
    id: 3,
    title: "Dream Journaling Tips - Unlocking Your Subconscious Wisdom",
    description: "Discover practical techniques for keeping a dream journal and how to interpret the messages your subconscious mind is sending you each night. Learn symbol recognition, pattern tracking, and dream recall methods.",
    thumbnail: "https://img.youtube.com/vi/kO5I0p3IuiQ/mqdefault.jpg",
    videoUrl: "https://www.youtube.com/watch?v=kO5I0p3IuiQ",
    videoId: "kO5I0p3IuiQ",
    duration: "22:18",
    views: "1.8K",
    uploadDate: "2024-08-10",
    category: "Dream Work",
    featured: false,
    keywords: ["dream journal", "subconscious", "dream interpretation", "symbol analysis", "dream recall"],
    transcript: "Welcome to this exploration of dream journaling. Dreams are one of the most profound ways our subconscious communicates with us, offering insights, healing, and guidance. Let me share some practical techniques for keeping a dream journal. First, keep your journal and a pen right by your bedside. The moment you wake up, before moving or speaking, reach for your journal and begin writing whatever you remember. Don't worry about making sense of it initially - just capture the images, emotions, and fragments. Look for recurring symbols in your dreams. Water might represent emotions, houses often symbolize the self, and animals can represent instinctual wisdom. Pay attention to the emotions in your dreams as much as the imagery. Sometimes the feeling is more important than the story. Over time, patterns will emerge that offer deep insights into your psyche and spiritual path."
  },
  {
    id: 4,
    title: "Creating Sacred Space in Your Home",
    description: "Learn how to transform any corner of your living space into a peaceful sanctuary for meditation, reflection, and spiritual practice.",
    thumbnail: "/placeholder.svg", // Replace with actual thumbnail
    videoUrl: "#", // Replace with actual URL
    duration: "18:45",
    views: "3.2K",
    uploadDate: "2024-08-05",
    category: "Mindfulness",
    featured: false
  },
  {
    id: 5,
    title: "Breathwork for Anxiety Relief",
    description: "Simple yet powerful breathing techniques you can use anywhere to calm your nervous system and find peace in moments of stress.",
    thumbnail: "/placeholder.svg", // Replace with actual thumbnail
    videoUrl: "#", // Replace with actual URL
    duration: "12:30",
    views: "4.5K",
    uploadDate: "2024-08-01",
    category: "Healing",
    featured: false
  },
  {
    id: 6,
    title: "The Power of Intention Setting",
    description: "Explore how to set meaningful intentions that align with your deepest values and guide you toward living your dreams.",
    thumbnail: "/placeholder.svg", // Replace with actual thumbnail
    videoUrl: "#", // Replace with actual URL
    duration: "20:15",
    views: "1.9K",
    uploadDate: "2024-07-28",
    category: "Manifestation",
    featured: false
  },
  {
    id: 7,
    title: "Walking Meditation in Nature",
    description: "Join me for a peaceful walking meditation in a beautiful natural setting, learning how to bring mindfulness to movement.",
    thumbnail: "/placeholder.svg", // Replace with actual thumbnail
    videoUrl: "#", // Replace with actual URL
    duration: "25:42",
    views: "2.7K",
    uploadDate: "2024-07-20",
    category: "Nature",
    featured: false
  }
];

const categories = ["All", "Community", "Meditation", "Dream Work", "Mindfulness", "Healing", "Manifestation", "Nature"];

const Vlogs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredVlogs = vlogs.filter(vlog => {
    const matchesCategory = selectedCategory === "All" || vlog.category === selectedCategory;
    const matchesSearch = vlog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vlog.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredVlog = vlogs.find(vlog => vlog.featured);

  // Generate schema for all videos
  const videoSchemas = vlogs.map(vlog => createVideoSchema({
    title: vlog.title,
    description: vlog.description,
    duration: formatDuration(Math.ceil(parseInt(vlog.duration.split(':')[0]) + parseInt(vlog.duration.split(':')[1])/60)),
    uploadDate: vlog.uploadDate,
    thumbnailUrl: vlog.thumbnail,
    embedUrl: `https://www.youtube.com/embed/${vlog.videoId}`,
    category: vlog.category,
    keywords: [...baseKeywords, ...(vlog.keywords || []), vlog.category.toLowerCase()]
  }));

  const pageSchema = {
    "@type": "CollectionPage",
    "name": "Video Teaching Collection - Meditation & Mindfulness Vlogs",
    "description": "Comprehensive collection of meditation, dream work, and spiritual awakening video teachings with transcripts and detailed guidance for personal growth.",
    "hasPart": videoSchemas,
    "about": [
      {
        "@type": "Thing",
        "name": "Video Teaching",
        "description": "Educational video content about meditation and spiritual practices"
      },
      {
        "@type": "Thing",
        "name": "Spiritual Guidance",
        "description": "Personal insights and guidance for spiritual development and consciousness exploration"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Video Teachings - Meditation & Spiritual Guidance Vlogs"
        description="Explore our collection of meditation teaching videos, dream work guidance, and spiritual awakening content. Features transcripts, detailed descriptions, and practical techniques for personal growth."
        keywords={[...baseKeywords, "meditation videos", "spiritual teachings", "vlog content", "guided practice videos", "consciousness exploration", "personal development"].join(", ")}
        schemaType="CollectionPage"
        schemaData={pageSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space/" },
          { name: "Video Teachings", url: "https://www.thedreamwork.space/vlogs" }
        ]}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            Vlog Journey
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join me on a journey of mindfulness, dream work, and spiritual awakening through video stories and guided experiences.
          </p>
          
          {/* Channel Link */}
          <Button 
            size="lg" 
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={() => window.open('https://www.youtube.com/@TheDreamWorkSpace', '_blank')}
          >
            <Play className="mr-2 w-5 h-5" />
            Visit My YouTube Channel
          </Button>
        </section>

        {/* Featured Video */}
        {featuredVlog && (
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Featured Video</h2>
            <Card className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative group cursor-pointer" onClick={() => window.open(featuredVlog.videoUrl, '_blank')}>
                  <img
                    src={featuredVlog.thumbnail}
                    alt={featuredVlog.title}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                    {featuredVlog.duration}
                  </div>
                </div>
                
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="gradient-card text-foreground border-0 mb-4 w-fit">
                    {featuredVlog.category}
                  </Badge>
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                    {featuredVlog.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {featuredVlog.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredVlog.uploadDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featuredVlog.views} views
                    </span>
                  </div>
                  <Button 
                    className="w-fit"
                    onClick={() => window.open(featuredVlog.videoUrl, '_blank')}
                  >
                    <Play className="mr-2 w-4 h-4" />
                    Watch Now
                  </Button>
                </CardContent>
              </div>
            </Card>
          </section>
        )}

        {/* Filters and Search */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-smooth"
                >
                  <Filter className="mr-2 w-4 h-4" />
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-4 items-center">
              <Input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              
              <div className="flex gap-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Videos Grid/List */}
        <section>
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVlogs.map((vlog, index) => (
                <Card
                  key={vlog.id}
                  className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.open(vlog.videoUrl, '_blank')}
                >
                  <CardHeader className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={vlog.thumbnail}
                        alt={vlog.title}
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
                      <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {vlog.duration}
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="gradient-card text-foreground border-0">
                          {vlog.category}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-gentle">
                      {vlog.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-4">
                      {vlog.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(vlog.uploadDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {vlog.views} views
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredVlogs.map((vlog, index) => (
                <Card
                  key={vlog.id}
                  className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => window.open(vlog.videoUrl, '_blank')}
                >
                  <div className="grid md:grid-cols-4 gap-0">
                    <div className="relative group">
                      <img
                        src={vlog.thumbnail}
                        alt={vlog.title}
                        className="w-full h-32 md:h-full object-cover group-hover:scale-105 transition-smooth"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-1 py-0.5 rounded text-xs">
                        {vlog.duration}
                      </div>
                    </div>
                    
                    <CardContent className="md:col-span-3 p-6 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="gradient-card text-foreground border-0">
                          {vlog.category}
                        </Badge>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(vlog.uploadDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {vlog.views} views
                          </span>
                        </div>
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-gentle">
                        {vlog.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 mb-3">
                        {vlog.description}
                      </p>
                      
                      {/* Add transcript modal for videos with transcripts */}
                      {vlog.transcript && (
                        <VideoTranscriptModal
                          title={vlog.title}
                          transcript={vlog.transcript}
                          duration={vlog.duration}
                          category={vlog.category}
                          keywords={vlog.keywords}
                        />
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        {filteredVlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No videos found matching your criteria.</p>
          </div>
        )}

        {/* Call to Action */}
        <section className="text-center mt-16">
          <Card className="max-w-2xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                Join the Journey
              </h3>
              <p className="text-foreground leading-relaxed mb-6">
                Subscribe to my YouTube channel for weekly videos on meditation, dream work, and spiritual awakening. Let's explore consciousness together!
              </p>
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => window.open('https://www.youtube.com/@TheDreamWorkSpace', '_blank')}
              >
                Subscribe on YouTube
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Vlogs;