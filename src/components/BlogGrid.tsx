import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import meditationPost from "@/assets/meditation-post.jpg";
import mindfulnessPost from "@/assets/mindfulness-post.jpg";
import dreamworkPost from "@/assets/dreamwork-post.jpg";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Mindful Breathing: Your Gateway to Inner Peace",
    excerpt: "Discover how simple breathing techniques can transform your daily stress into moments of profound calm and clarity...",
    author: "The Dream Work",
    date: "2024-08-15",
    readTime: "8 min read",
    category: "Meditation",
    image: meditationPost,
    featured: true,
  },
  {
    id: 2,
    title: "Creating Sacred Space: Designing Your Personal Meditation Corner",
    excerpt: "Learn how to transform any corner of your home into a peaceful sanctuary for your spiritual practice...",
    author: "The Dream Work",
    date: "2024-08-12",
    readTime: "6 min read",
    category: "Mindfulness",
    image: mindfulnessPost,
    featured: false,
  },
  {
    id: 3,
    title: "Dream Journaling: Unlocking Messages from Your Subconscious",
    excerpt: "Explore the powerful practice of dream work and how your nighttime visions can guide your waking life...",
    author: "The Dream Work",
    date: "2024-08-10",
    readTime: "10 min read",
    category: "Dream Work",
    image: dreamworkPost,
    featured: false,
  },
  {
    id: 4,
    title: "5-Minute Morning Mindfulness Routine for Busy Lives",
    excerpt: "Start your day with intention and clarity using this simple yet powerful morning practice...",
    author: "The Dream Work",
    date: "2024-08-08",
    readTime: "5 min read",
    category: "Mindfulness",
    image: meditationPost,
    featured: false,
  },
  {
    id: 5,
    title: "The Science of Gratitude: How Appreciation Rewires Your Brain",
    excerpt: "Dive into the fascinating research behind gratitude practices and their profound impact on mental health...",
    author: "The Dream Work",
    date: "2024-08-05",
    readTime: "12 min read",
    category: "Science",
    image: mindfulnessPost,
    featured: false,
  },
  {
    id: 6,
    title: "Healing Through Sound: An Introduction to Sound Bath Meditation",
    excerpt: "Experience the transformative power of sound healing and discover how vibrations can restore balance...",
    author: "The Dream Work",
    date: "2024-08-03",
    readTime: "9 min read",
    category: "Healing",
    image: dreamworkPost,
    featured: false,
  },
];

const BlogGrid = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section className="py-16 bg-gradient-card">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of mindfulness articles, meditation guides, and spiritual wisdom 
            to support your journey toward inner peace.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12 animate-slide-up">
            <Card className="overflow-hidden shadow-dreamy border-0 bg-card hover:shadow-glow transition-smooth">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                      ⭐ Featured
                    </Badge>
                    <Badge variant="outline">
                      {featuredPost.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground group">
                    Read Full Article
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-gentle" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <Card
              key={post.id}
              className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-primary/90 text-primary-foreground">
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-gentle">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="px-6 pb-6 pt-0">
                <Button variant="ghost" className="w-full justify-between group/btn hover:bg-primary/5">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-gentle" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12 animate-fade-in">
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 text-primary hover:bg-primary/5 transition-smooth"
          >
            Load More Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;