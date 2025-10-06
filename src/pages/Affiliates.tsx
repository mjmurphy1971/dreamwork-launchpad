import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { affiliatePrograms, categories } from "@/data/affiliatePrograms";
import { ExternalLink, Heart, Sparkles } from "lucide-react";

const Affiliates = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPrograms = selectedCategory === "All" 
    ? affiliatePrograms 
    : affiliatePrograms.filter(program => program.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Soulful Tools & Resources We Love | The Dream Work</title>
        <meta name="description" content="Discover handpicked spiritual tools, meditation resources, and healing products aligned with The Dream Work's mission of emotional healing and ritual design." />
        <meta name="keywords" content="spiritual tools, meditation resources, oracle decks, healing products, wellness tools, mindfulness resources, ritual tools, spiritual coaching" />
        <link rel="canonical" href="https://www.thedreamwork.space/affiliates" />
        
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "name": "Soulful Tools & Resources We Love",
              "description": "Curated collection of spiritual and wellness affiliate programs aligned with The Dream Work's mission",
              "url": "https://www.thedreamwork.space/affiliates",
              "isPartOf": {
                "@type": "WebSite",
                "name": "The Dream Work",
                "url": "https://www.thedreamwork.space"
              }
            }
          `}
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

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

        {/* Programs Grid */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPrograms.map((program) => (
            <Card 
              key={program.name} 
              className="shadow-card border-0 bg-card hover:shadow-elegant transition-gentle group"
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
                
                <CardTitle className="text-2xl font-heading text-foreground mb-3 group-hover:text-primary transition-gentle">
                  {program.name}
                </CardTitle>
                
                <CardDescription className="text-foreground/70 leading-relaxed min-h-[4rem]">
                  {program.description}
                </CardDescription>
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
                  >
                    Explore this offering
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
