import { useState } from "react";
import { Calendar, Clock, User, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    id: 1,
    title: "🌪️ When a Cataclysmic Event Happens, Where Will You Turn?",
    excerpt: "There's a bang outside. Loud enough to bounce through the halls of your home. You check for the source. Your dog sounds the alarm...",
    content: `There's a bang outside.

Loud enough to bounce through the halls of your home. You check for the source. Your dog sounds the alarm, barking with instinctive urgency. Nothing. Then you see it—a large grey cloud rising on the horizon, cascading over the sunlit sky. Daylight dims into dusk.

You open your phone, waiting for your morning coffee to cool.

You check your portfolio. Stocks down. Bonds down. The market is slipping into chaos. Suddenly, coffee isn't needed to wake you up.

The phone rings. You answer with your usual cheerful tone, only to be met with a voice—disturbed, distressed. Another. Another loved one's health is slipping away. There's no time to ponder. The time is now. But what about your job? Your children? Your pets? Do you have the means to travel? Where will you stay?

You walk toward your workplace.

People are leaving the building with boxes, folders, and framed photos tucked under their arms. Some are crying. Some are laughing. Your confident stride becomes hesitant. Each step brings you closer to a truth you're not sure you're ready for—but you keep walking. Because you must.

When a cataclysmic event happens—where will you turn? Who will you call first? And what will you say?

These moments will always come. They're the milestones of our lives—marking the times we overcame, endured, or barely dodged. Sometimes they strike like lightning. Sometimes they feel like being run over by a bus. In those first seconds, even breathing becomes difficult. Our hearts race. Our minds scramble to assess, organize, make sense.

But here's what I've learned: the moment we slow down—when we choose to breathe, to center, to ground—everything shifts. The external chaos doesn't disappear, but our relationship to it transforms.

In these moments, we discover what truly matters. We learn where our real support lies. We find out who we are when everything we thought we knew crumbles away.

So, where will you turn? The answer might surprise you. It might not be where you expected. But it will be exactly where you need to be.`,
    author: "The Dream Work",
    date: "2024-08-12",
    readTime: "3 min read",
    category: "Resilience",
    image: "https://static.wixstatic.com/media/nsplsh_972e0594432b4fb1886cc75438995ac1~mv2.jpg/v1/fill/w_454,h_681,fp_0.50_0.50,q_90,enc_avif,quality_auto/nsplsh_972e0594432b4fb1886cc75438995ac1~mv2.webp",
    featured: true,
  },
  {
    id: 2,
    title: "🌌 Seeking Proof, Finding Self",
    excerpt: "This piece emerged from a quiet reckoning—a moment when I realized how often I search outside myself for validation, and how rarely...",
    content: `**Intro**

This piece emerged from a quiet reckoning—a moment when I realized how often I search outside myself for validation, and how rarely I pause to ask why. It's about the chase, the cost, and the quiet truth waiting beneath it all.

We all seek proof.

We search for it in familiar places—books, videos, TV, social media. And in unfamiliar ones—tarot cards, psychic readings, the stars. We need it for ourselves. We need it from others.

It's not love. It's not fear. It's proof.

Each day, throughout the day, we search for it:

Proof that someone loves us.

Proof that our beliefs are true.

Proof that our fears are justified.

We comb through everything—desperate to validate something inside or outside of ourselves.

This pursuit can be exhausting, exhilarating, frustrating, joyful. We risk the result because the unknown is unbearable. We want to be free—from doubt, from ambiguity, from the blank canvas of uncertainty.

Seeking truth can feel godlike. We follow every breadcrumb, unravel every thread, chasing the rush of clarity.

It keeps us up at night. It numbs hunger and thirst. It pulls us from the ordinary and the extraordinary alike.

We chase proof because the unknown echoes in the corners of our soul. Our minds crave redemption from the endless loop of "what ifs." Conspiracy theories, market swings, relationship dynamics—we want to know. We want proof of the future. Proof of the present.

But what if the seeking itself is the answer?

What if the journey to find proof teaches us more about ourselves than any external validation ever could?

In the end, the greatest proof we can find is not outside ourselves—it's the quiet knowing that comes from within. The peace that emerges when we stop seeking and start being.`,
    author: "The Dream Work",
    date: "2024-08-09",
    readTime: "3 min read",
    category: "Self-Discovery",
    image: "https://static.wixstatic.com/media/nsplsh_477654575f54364e696a38~mv2_d_4000_6016_s_4_2.jpg/v1/fill/w_454,h_683,fp_0.50_0.50,q_90,enc_avif,quality_auto/nsplsh_477654575f54364e696a38~mv2_d_4000_6016_s_4_2.webp",
    featured: false,
  },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedPost) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => setSelectedPost(null)}
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
            
            <div className="prose prose-lg max-w-none">
              {selectedPost.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
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
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-6 leading-tight">
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
              className={`overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer animate-fade-in ${
                post.featured ? 'md:grid md:grid-cols-2 md:gap-8' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedPost(post)}
            >
              <div className={`relative overflow-hidden ${post.featured ? 'md:order-2' : ''}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className={`w-full object-cover group-hover:scale-105 transition-smooth ${
                    post.featured ? 'h-64 md:h-full' : 'h-48'
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="gradient-card text-foreground border-0">
                    {post.category}
                  </Badge>
                </div>
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