import { ArrowRight, Link } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface RelatedContent {
  title: string;
  url: string;
  type: 'tool' | 'article' | 'practice' | 'resource';
  description: string;
  keywords: string[];
}

interface InternalLinkMapProps {
  currentPage: string;
  relatedContent: RelatedContent[];
  className?: string;
}

export const InternalLinkMap = ({ currentPage, relatedContent, className = "" }: InternalLinkMapProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'tool':
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'article':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'practice':
        return 'bg-purple-500/10 text-purple-600 border-purple-200';
      case 'resource':
        return 'bg-orange-500/10 text-orange-600 border-orange-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tool': return '🛠️';
      case 'article': return '📖';
      case 'practice': return '🧘';
      case 'resource': return '💎';
      default: return '🔗';
    }
  };

  return (
    <Card className={`border-0 bg-muted/30 ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <Link className="w-5 h-5 text-primary" />
          Related Content
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Explore related practices, articles, and tools to deepen your journey
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {relatedContent.map((content, index) => (
          <a
            key={index}
            href={content.url}
            className="block group p-3 rounded-lg border border-border bg-card hover:shadow-card-hover transition-smooth"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm">{getTypeIcon(content.type)}</span>
                  <Badge className={getTypeColor(content.type)}>
                    {content.type}
                  </Badge>
                </div>
                <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-gentle">
                  {content.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {content.description}
                </p>
                {content.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {content.keywords.slice(0, 3).map((keyword, keyIndex) => (
                      <span 
                        key={keyIndex}
                        className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-gentle shrink-0 mt-1" />
            </div>
          </a>
        ))}
      </CardContent>
    </Card>
  );
};