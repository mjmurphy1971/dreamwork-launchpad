import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogPosts, BlogPost } from "@/data/blogContent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DbBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  author: string | null;
  published_at: string | null;
  category: string | null;
  image_url: string | null;
  featured: boolean | null;
  status: string;
}

const convertDbPost = (dbPost: DbBlogPost): BlogPost => ({
  id: dbPost.id.charCodeAt(0),
  slug: dbPost.slug,
  title: dbPost.title,
  excerpt: dbPost.excerpt || '',
  content: dbPost.content,
  author: dbPost.author || 'Mary Murphy',
  date: dbPost.published_at || new Date().toISOString(),
  readTime: `${Math.ceil(dbPost.content.length / 1000)} min read`,
  category: dbPost.category || 'Mindfulness',
  image: dbPost.image_url || '/placeholder.svg',
  featured: dbPost.featured || false,
  keywords: dbPost.category ? [dbPost.category.toLowerCase()] : ['mindfulness'],
});

const BlogGrid = () => {
  const navigate = useNavigate();
  const [allPosts, setAllPosts] = useState<BlogPost[]>(blogPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDbPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (error) {
          console.error('Error fetching blog posts:', error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          const dbPosts = data.map(convertDbPost);
          // Merge: DB posts take priority, then static posts (excluding duplicates)
          const dbSlugs = new Set(dbPosts.map(p => p.slug));
          const staticFiltered = blogPosts.filter(p => !dbSlugs.has(p.slug));
          setAllPosts([...dbPosts, ...staticFiltered]);
        }
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDbPosts();
  }, []);

  const postsSorted = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const featuredPost = postsSorted.find((post) => post.featured) ?? postsSorted[0];
  const regularPosts = postsSorted.filter((post) => post.id !== featuredPost?.id).slice(0, 5);
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
                  
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                    onClick={() => navigate(`/blog/${featuredPost.slug}`)}
                  >
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
              onClick={() => navigate(`/blog/${post.slug}`)}
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
                <Button 
                  variant="ghost" 
                  className="w-full justify-between group/btn hover:bg-primary/5"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/blog/${post.slug}`);
                  }}
                >
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
            onClick={() => window.location.href = '/blog'}
          >
            Load More Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;