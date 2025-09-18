import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import SEOEnhancer from "@/components/SEOEnhancer";
import { blogPosts, getPostBySlug, getRelatedPosts, type BlogPost } from "@/data/blogContent";
import ReactMarkdown from "react-markdown";


const Blog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (slug) {
      const post = getPostBySlug(slug);
      setSelectedPost(post || null);
    } else {
      setSelectedPost(null);
    }
  }, [slug]);

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedPost) {
    const postUrl = `https://www.thedreamwork.space/blog/${selectedPost.slug}`;
    const relatedPosts = getRelatedPosts(selectedPost);
    const imageUrl = selectedPost.image.includes('static.wixstatic.com') 
      ? selectedPost.image.replace(/\/v1\/fill\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\//, '/v1/fill/w_1200,h_630,fp_0.50_0.50,q_90,enc_avif,quality_auto/')
      : selectedPost.image;

    return (
      <div className="min-h-screen">
        <Helmet>
          <title>{selectedPost.title} | The Dream Work</title>
          <meta name="description" content={selectedPost.excerpt} />
          <link rel="canonical" href={postUrl} />

          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:url" content={postUrl} />
          <meta property="og:title" content={selectedPost.title} />
          <meta property="og:description" content={selectedPost.excerpt} />
          <meta property="og:image" content={imageUrl} />

          {/* Twitter - Fix: Use 'name' instead of 'property' */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@thedreamworkspace" />
          <meta name="twitter:creator" content="@thedreamworkspace" />
          <meta name="twitter:url" content={postUrl} />
          <meta name="twitter:title" content={selectedPost.title} />
          <meta name="twitter:description" content={selectedPost.excerpt} />
          <meta name="twitter:image" content={imageUrl} />

          {/* Enhanced Article/BlogPosting Schema with SEO optimization */}
          <script type="application/ld+json">
            {`
              {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": "${postUrl}"
                },
                "headline": "${selectedPost.title.replace(/"/g, '\\"')}",
                "description": "${selectedPost.excerpt.replace(/"/g, '\\"')}",
                "image": {
                  "@type": "ImageObject",
                  "url": "${imageUrl}",
                  "width": 1200,
                  "height": 630
                },
                "author": {
                  "@type": "Person",
                  "name": "${selectedPost.author}",
                  "url": "https://www.thedreamwork.space/about",
                  "sameAs": [
                    "https://www.instagram.com/thedreamworkspace",
                    "https://www.facebook.com/thedreamworkspace"
                  ]
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "The Dream Work",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.thedreamwork.space/images/logo.png",
                    "width": 200,
                    "height": 60
                  },
                  "url": "https://www.thedreamwork.space"
                },
                "datePublished": "${selectedPost.date}T00:00:00Z",
                "dateModified": "${selectedPost.lastModified || selectedPost.date}T00:00:00Z",
                "articleSection": "${selectedPost.category}",
                "keywords": "${selectedPost.keywords.join(', ')}",
                "wordCount": "${selectedPost.content.split(' ').length}",
                "timeRequired": "PT${selectedPost.readTime.replace(' min read', 'M')}",
                "about": [
                  {
                    "@type": "Thing",
                    "name": "Meditation"
                  },
                  {
                    "@type": "Thing",
                    "name": "Mindfulness"
                  },
                  {
                    "@type": "Thing",
                    "name": "Spiritual Wellness"
                  }
                ],
                "isAccessibleForFree": true,
                "copyrightHolder": {
                  "@type": "Organization",
                  "name": "The Dream Work"
                }
              }
            `}
          </script>
        </Helmet>
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
              
              <div className="flex items-center gap-4 mb-4">
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
              
              <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-6">
                {selectedPost.title}
              </h1>
            </div>
            
            <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:gradient-text prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-em:text-muted-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:mb-2">
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


