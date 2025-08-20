// Enhanced Articles page with evidence-based content and semantic clustering

import { useState } from "react";
import { Search, Filter, BookOpen, Award, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { EvidenceBasedArticle } from "@/components/EvidenceBasedArticle";
import { EVIDENCE_BASED_ARTICLES, CONTENT_CLUSTERS } from "@/data/evidenceBasedContent";
import { baseKeywords } from "@/utils/seoHelpers";

const Articles = () => {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedCluster, setSelectedCluster] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const currentArticle = selectedArticle ? 
    EVIDENCE_BASED_ARTICLES.find(article => article.id === selectedArticle) : null;

  const currentClusterData = selectedCluster !== "all" ? 
    CONTENT_CLUSTERS.find(cluster => cluster.id === selectedCluster) : null;

  const filteredArticles = EVIDENCE_BASED_ARTICLES.filter(article => {
    const matchesCluster = selectedCluster === "all" || article.cluster === selectedCluster;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCluster && matchesSearch;
  });

  // If viewing a specific article
  if (currentArticle && currentClusterData) {
    const relatedClusters = CONTENT_CLUSTERS.filter(cluster => 
      currentClusterData.relatedTopics.includes(cluster.id)
    );

    return (
      <div className="min-h-screen">
        <SEO
          title={`${currentArticle.title} - Evidence-Based Guide`}
          description={currentArticle.excerpt}
          keywords={[...baseKeywords, ...currentArticle.keywords].join(", ")}
          schemaType="Article"
          breadcrumbs={[
            { name: "Home", url: "https://www.thedreamwork.space/" },
            { name: "Articles", url: "https://www.thedreamwork.space/articles" },
            { name: currentArticle.title, url: `https://www.thedreamwork.space/articles/${currentArticle.id}` }
          ]}
        />
        <Header />
        <main className="container mx-auto px-4 py-8">
          <EvidenceBasedArticle
            {...currentArticle}
            cluster={currentClusterData}
            relatedClusters={relatedClusters}
            onBack={() => setSelectedArticle(null)}
            onNavigate={(target) => {
              // Handle navigation to other articles or clusters
              const targetArticle = EVIDENCE_BASED_ARTICLES.find(a => a.id === target);
              if (targetArticle) {
                setSelectedArticle(target);
              } else {
                setSelectedCluster(target);
                setSelectedArticle(null);
              }
            }}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Article listing page
  const pageSchema = {
    "@type": "CollectionPage",
    "name": "Evidence-Based Articles - Meditation & Mindfulness Guides",
    "description": "Comprehensive collection of evidence-based articles on meditation, mindfulness, and holistic wellness with scientific citations and expert insights.",
    "hasPart": EVIDENCE_BASED_ARTICLES.map(article => ({
      "@type": "Article",
      "headline": article.title,
      "description": article.excerpt,
      "keywords": article.keywords.join(", "),
      "articleSection": article.category,
      "url": `https://www.thedreamwork.space/articles/${article.id}`
    })),
    "about": [
      {
        "@type": "Thing",
        "name": "Evidence-Based Wellness",
        "description": "Health and wellness content supported by peer-reviewed research and scientific evidence"
      },
      {
        "@type": "Thing",
        "name": "Meditation Research",
        "description": "Scientific studies and research on meditation and mindfulness practices"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Evidence-Based Articles - Meditation & Mindfulness Research"
        description="Explore our comprehensive collection of evidence-based articles on meditation, mindfulness, and holistic wellness. All content is supported by scientific research and peer-reviewed studies."
        keywords={[...baseKeywords, "evidence-based articles", "meditation research", "scientific studies", "peer-reviewed content", "wellness research"].join(", ")}
        schemaType="CollectionPage"
        schemaData={pageSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space/" },
          { name: "Articles", url: "https://www.thedreamwork.space/articles" }
        ]}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8">
            Evidence-Based Articles
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover meditation, mindfulness, and wellness practices backed by scientific research. 
            Every article includes peer-reviewed citations and evidence-based recommendations.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Peer-reviewed sources
            </div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Expert insights
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Semantic organization
            </div>
          </div>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </section>

        {/* Content Organization */}
        <Tabs value={selectedCluster} onValueChange={setSelectedCluster} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="all" className="text-xs">All Topics</TabsTrigger>
            {CONTENT_CLUSTERS.slice(0, 7).map(cluster => (
              <TabsTrigger key={cluster.id} value={cluster.id} className="text-xs">
                {cluster.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* All Articles */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="cursor-pointer hover:shadow-card-hover transition-smooth group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedArticle(article.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <Badge variant="outline" className="text-xs">
                        Evidence-Based
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award className="w-3 h-3" />
                          {article.citations.length} Citations
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {article.keywords.slice(0, 3).map((keyword, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Individual Cluster Tabs */}
          {CONTENT_CLUSTERS.map(cluster => (
            <TabsContent key={cluster.id} value={cluster.id} className="space-y-8">
              {/* Cluster Overview */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    {cluster.name}
                  </CardTitle>
                  <p className="text-muted-foreground">{cluster.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {cluster.keywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Cluster Articles */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles.filter(article => article.cluster === cluster.id).map((article, index) => (
                  <Card
                    key={article.id}
                    className="cursor-pointer hover:shadow-card-hover transition-smooth group"
                    onClick={() => setSelectedArticle(article.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">{article.category}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {article.citations.length} Citations
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.readTime}
                        </span>
                        <span>Last updated: {new Date(article.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Articles;