// Navigation component for semantic content clusters with internal linking

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Network, Tag } from "lucide-react";
import { ContentCluster } from "@/data/evidenceBasedContent";

interface ContentClusterNavigationProps {
  currentCluster: ContentCluster;
  relatedClusters: ContentCluster[];
  onNavigate?: (clusterId: string) => void;
}

export const ContentClusterNavigation = ({
  currentCluster,
  relatedClusters,
  onNavigate
}: ContentClusterNavigationProps) => {
  return (
    <div className="space-y-6">
      {/* Current Topic Cluster */}
      <Card className="border-l-4 border-l-primary bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Network className="w-5 h-5" />
            Current Topic: {currentCluster.name}
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {currentCluster.description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Keywords */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Key Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentCluster.keywords.map((keyword, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Related Articles in Cluster */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Articles in This Series
              </h4>
              <div className="space-y-2">
                {currentCluster.articles.map((article, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start h-auto p-2 text-left"
                    onClick={() => onNavigate?.(article)}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className="text-sm capitalize">
                        {article.replace(/-/g, " ")}
                      </span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Topic Clusters */}
      {relatedClusters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Explore Related Topics</CardTitle>
            <p className="text-sm text-muted-foreground">
              Dive deeper into connected areas of meditation and mindfulness.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {relatedClusters.map((cluster) => (
                <div
                  key={cluster.id}
                  className="group p-3 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={() => onNavigate?.(cluster.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {cluster.name}
                    </h4>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {cluster.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <BookOpen className="w-3 h-3" />
                    <span>{cluster.articles.length} articles</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* SEO Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `${currentCluster.name} - Content Series`,
            "description": currentCluster.description,
            "itemListElement": currentCluster.articles.map((article, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": article.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
              "url": `https://www.thedreamwork.space/articles/${article}`
            })),
            "about": currentCluster.keywords.map(keyword => ({
              "@type": "Thing",
              "name": keyword
            }))
          })
        }}
      />
    </div>
  );
};