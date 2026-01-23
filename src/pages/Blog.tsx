import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SocialShare from "@/components/SocialShare";
import { Helmet } from "react-helmet-async";
import SEOEnhancer from "@/components/SEOEnhancer";
import BlogPostSEO from "@/components/BlogPostSEO";
import JobMarketFAQSchema from "@/components/JobMarketFAQSchema";
import { blogPosts as staticBlogPosts, getPostBySlug as getStaticPostBySlug, getRelatedPosts as getStaticRelatedPosts, type BlogPost } from "@/data/blogContent";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";

// Extended type for database posts
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

// Convert DB post to BlogPost format
const convertDbPost = (dbPost: DbBlogPost): BlogPost => ({
  id: parseInt(dbPost.id.replace(/-/g, '').slice(0, 8), 16), // Convert UUID to number
  slug: dbPost.slug,
  title: dbPost.title,
  excerpt: dbPost.excerpt || "",
  content: dbPost.content,
  author: dbPost.author || "Mary Murphy",
  date: dbPost.published_at || new Date().toISOString(),
  readTime: `${Math.ceil(dbPost.content.split(/\s+/).length / 200)} min read`,
  category: dbPost.category || "Mindfulness",
  image: dbPost.image_url || "/placeholder.svg",
  featured: dbPost.featured || false,
  keywords: [],
});

const Blog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [dbPosts, setDbPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from database
  useEffect(() => {
    const fetchDbPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("status", "published")
        .order("published_at", { ascending: false });

      if (!error && data) {
        setDbPosts(data.map(convertDbPost));
      }
      setLoading(false);
    };
    fetchDbPosts();
  }, []);

  // Merge static and DB posts, DB posts take priority for same slug
  const allPosts = [...dbPosts, ...staticBlogPosts.filter(
    sp => !dbPosts.some(dp => dp.slug === sp.slug)
  )];

  useEffect(() => {
    if (slug) {
      // First check DB posts, then static
      const dbPost = dbPosts.find(p => p.slug === slug);
      const staticPost = getStaticPostBySlug(slug);
      setSelectedPost(dbPost || staticPost || null);
    } else {
      setSelectedPost(null);
    }
  }, [slug, dbPosts]);

  const getRelatedPosts = (post: BlogPost) => {
    return allPosts
      .filter(p => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  };

  const filteredPosts = allPosts
    .filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (selectedPost) {
    const postUrl = `https://www.thedreamwork.space/blog/${selectedPost.slug}`;
    const relatedPosts = getRelatedPosts(selectedPost);

    return (
      <div className="min-h-screen">
        <BlogPostSEO post={selectedPost} postUrl={postUrl} />
        {selectedPost.slug === 'the-job-market-is-broken-but-we-are-not' && <JobMarketFAQSchema />}
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/blog')}
            className="mb-6"
          >
            ← Back to Blog
          </Button>
          
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg shadow-card mb-6"
              />
              
              {selectedPost.videoUrl && (
                <div className="mb-6 flex justify-center">
                  <video 
                    controls 
                    className="w-full max-w-3xl rounded-lg shadow-card"
                    style={{ maxHeight: '500px' }}
                  >
                    <source src={selectedPost.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="gradient-card text-foreground border-0">
                    {selectedPost.category}
                  </Badge>
                  <div className="flex items-center text-muted-foreground text-sm gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(selectedPost.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedPost.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {selectedPost.author}
                    </span>
                  </div>
                </div>
                <SocialShare 
                  title={selectedPost.title} 
                  url={postUrl}
                  description={selectedPost.excerpt}
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-6">
                {selectedPost.title}
              </h1>
            </div>
            
            <div className="prose prose-lg max-w-none 
              prose-headings:font-heading 
              prose-h2:text-3xl prose-h2:font-bold prose-h2:mb-6 prose-h2:mt-12 prose-h2:gradient-text
              prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-4 prose-h3:mt-8 prose-h3:text-foreground
              prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-foreground prose-strong:font-semibold
              prose-em:text-muted-foreground prose-em:italic
              prose-ul:text-foreground prose-ul:my-6 prose-ul:space-y-2
              prose-ol:text-foreground prose-ol:my-6 prose-ol:space-y-2
              prose-li:text-foreground prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-muted-foreground
              prose-hr:border-border prose-hr:my-12
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            ">
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>
            
            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-8 border-t border-border/50">
                <h2 className="text-3xl font-heading font-bold gradient-text mb-8 text-center">
                  Related Articles
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer"
                      onClick={() => navigate(`/blog/${post.slug}`)}
                    >
                      <CardHeader className="p-0">
                        <div className="relative overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-smooth"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="bg-primary/90 text-primary-foreground text-xs">
                              {post.category}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="p-4">
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-2 leading-tight group-hover:text-primary transition-gentle line-clamp-2">
                          {post.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section - Proper H1 structure */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            My Blogging Life
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            "I can shake off everything if I write; my sorrows disappear, my courage is reborn." – Anne Frank
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-muted/50 border-border/50 focus:bg-background transition-gentle"
            />
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="grid gap-8 md:gap-12">
          {filteredPosts.map((post, index) => (
            <Card
              key={post.id}
              className={`overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer animate-fade-in ${post.featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''}`}
              onClick={() => navigate(`/blog/${post.slug}`)}
            >
              <img
                src={post.image}
                alt={post.title}
                className={`w-full object-cover group-hover:scale-105 transition-smooth ${post.featured ? 'h-64 md:h-full' : 'h-48'}`}
              />
              <div className="absolute top-4 left-4">
                <Badge variant="secondary" className="gradient-card text-foreground border-0">
                  {post.category}
                </Badge>
              </div>
              
              <div className={`${post.featured ? 'md:order-1' : ''}`}>
                <CardHeader className="pb-4">
                  <h2 className={`font-heading font-bold line-clamp-2 group-hover:text-primary transition-gentle ${
                    post.featured ? 'text-2xl md:text-3xl' : 'text-xl'
                  }`}>
                    {post.title}
                  </h2>
                </CardHeader>
                
                <CardContent className="pb-4">
                  <p className={`text-muted-foreground leading-relaxed line-clamp-3 ${
                    post.featured ? 'text-lg' : ''
                  }`}>
                    {post.excerpt}
                  </p>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center text-muted-foreground text-sm gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                  </div>
                  
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                    Read More
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </section>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No posts found matching your search.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;


