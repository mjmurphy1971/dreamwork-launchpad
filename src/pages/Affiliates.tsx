import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { affiliatePrograms, categories } from "@/data/affiliatePrograms";
import { ExternalLink, Heart, Sparkles, Star, TrendingUp } from "lucide-react";

const Affiliates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Featured programs for the month
  const featuredPrograms = affiliatePrograms.slice(0, 3);
  const featuredNames = featuredPrograms.map(p => p.name);
  
  // Filter out featured programs from the main grid
  const nonFeaturedPrograms = affiliatePrograms.filter(p => !featuredNames.includes(p.name));
  
  const filteredPrograms = selectedCategory === "All" 
    ? nonFeaturedPrograms 
    : nonFeaturedPrograms.filter(program => program.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Soulful Spiritual Tools & Meditation Resources | Mindvalley, Hay House, Energy Muse & More</title>
        <meta name="description" content="Discover handpicked spiritual tools, meditation resources, and healing products from Mindvalley, Hay House, Energy Muse, Sounds True, and more. Curated affiliate partners for emotional healing, ritual design, and conscious living." />
        <meta name="keywords" content="Mindvalley affiliate, Hay House books, Energy Muse crystals, spiritual tools, meditation resources, oracle decks, healing products, wellness tools, mindfulness resources, ritual tools, spiritual coaching, manifestation tools, yoga download, dharma crafts" />
        <link rel="canonical" href="https://www.thedreamwork.space/affiliates" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Soulful Tools & Resources We Love",
            "description": "Curated collection of spiritual and wellness affiliate programs including Mindvalley, Hay House, Energy Muse, and more",
            "url": "https://www.thedreamwork.space/affiliates",
            "keywords": ["spiritual tools", "meditation resources", "ritual design", "emotional healing", "manifestation", "mindfulness"],
            "about": {
              "@type": "Thing",
              "name": "Spiritual Wellness Resources"
            },
            "isPartOf": {
              "@type": "WebSite",
              "name": "The Dream Work",
              "url": "https://www.thedreamwork.space"
            },
            "mainEntity": {
              "@type": "ItemList",
              "numberOfItems": affiliatePrograms.length,
              "itemListElement": affiliatePrograms.map((program, index) => ({
                "@type": "Product",
                "position": index + 1,
                "name": program.name,
                "description": program.description,
                "category": program.category,
                "offers": {
                  "@type": "Offer",
                  "availability": "https://schema.org/InStock",
                  "priceCurrency": "USD"
                },
                "url": program.joinLink
              }))
            }
          })}
        </script>
      </Helmet>

      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
            <Heart className="w-6 h-6 text-primary" />
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-6 leading-relaxed">
            Soulful Tools & Resources We Love
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            Each offering below is a doorway into deeper stillness, clarity, and creative empowerment. 
            We only share what we truly love and use—handpicked partners aligned with our mission of 
            emotional healing, ritual design, and soulful transformation.
          </p>
          
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-left">
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong className="text-foreground">A Note on Transparency:</strong> The links below are affiliate partnerships, 
              which means we may receive a small commission if you choose to explore these offerings. 
              This helps sustain our sanctuary and allows us to continue creating free resources for our community. 
              Your trust means everything to us.
            </p>
          </div>
        </section>

        {/* Featured This Month Section */}
        <section className="mb-16" data-ai-tag="featured-resources" data-category="spiritual-tools">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Star className="w-5 h-5 text-primary fill-primary" />
              <TrendingUp className="w-5 h-5 text-primary" />
              <Star className="w-5 h-5 text-primary fill-primary" />
            </div>
            <h2 className="text-3xl font-heading font-bold gradient-text mb-3">
              Featured This Month
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Timely offerings resonating with this season's energy—specially selected for depth and transformation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredPrograms.map((program) => (
              <Card 
                key={program.name}
                className="shadow-elegant border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5 hover:shadow-glow transition-gentle group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    Featured
                  </Badge>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-heading text-foreground mb-2 group-hover:text-primary transition-gentle">
                    {program.name}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit">
                    {program.category}
                  </Badge>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="text-foreground/70 leading-relaxed mb-4 min-h-[3rem]">
                    {program.description}
                  </CardDescription>
                  
                  <Button 
                    asChild 
                    size="sm"
                    className="w-full group/btn"
                  >
                    <a 
                      href={program.joinLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                      data-affiliate-partner={program.name}
                    >
                      Explore {program.name}
                      <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-1 transition-gentle" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <h2 className="text-2xl font-heading font-bold gradient-text mb-6 text-center">
            Browse All Resources
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
                data-category-filter={category}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Programs Grid */}
        <section 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          data-ai-tag="affiliate-resources"
          data-content-type="product-recommendations"
        >
          {filteredPrograms.map((program, index) => (
            <Card 
              key={program.name} 
              className="shadow-card border-0 bg-card hover:shadow-elegant transition-gentle group"
              data-affiliate-partner={program.name}
              data-category={program.category}
              itemScope
              itemType="https://schema.org/Product"
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="secondary" className="mb-2">
                    {program.category}
                  </Badge>
                  <div className="text-right text-xs text-muted-foreground">
                    <div>{program.commission} commission</div>
                    <div>{program.cookieDuration}</div>
                  </div>
                </div>
                
                <CardTitle 
                  className="text-2xl font-heading text-foreground mb-3 group-hover:text-primary transition-gentle"
                  itemProp="name"
                >
                  {program.name}
                </CardTitle>
                
                <CardDescription 
                  className="text-foreground/70 leading-relaxed min-h-[4rem]"
                  itemProp="description"
                >
                  {program.description}
                </CardDescription>
                
                <meta itemProp="category" content={program.category} />
              </CardHeader>
              
              <CardContent>
                <Button 
                  asChild 
                  className="w-full group/btn"
                  variant="default"
                >
                  <a 
                    href={program.joinLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                    itemProp="url"
                    aria-label={`Explore ${program.name} affiliate program`}
                  >
                    Explore {program.name}
                    <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-gentle" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Categories Explanation Section */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-heading font-bold gradient-text mb-8 text-center">
            Explore by Category
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  🔮 Ritual Tools
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sacred objects that hold intention—crystals, mala beads, altar tools, 
                  and spiritual adornments for your contemplative practice.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  📚 Courses & Audio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transformative learning through books, audio programs, and courses on 
                  spirituality, healing, and personal growth.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  🧘 Meditation & Coaching
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Guided practices, spiritual coaching, and wellness tools to deepen 
                  your meditation journey and conscious living.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading flex items-center gap-2">
                  ✨ Healing & Manifestation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prayer-based healing, manifestation practices, and energy work for 
                  those seeking miracles in the everyday.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Final Note */}
        <section className="max-w-3xl mx-auto text-center">
          <Card className="shadow-card border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="p-8">
              <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                With Gratitude
              </h3>
              <p className="text-foreground/80 leading-relaxed">
                Thank you for supporting these offerings and helping us sustain this sacred space. 
                Every exploration, every purchase, every shared link helps us continue providing 
                free meditation resources, tools, and community support. Your journey matters, 
                and we're honored to walk alongside you.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Affiliates;
