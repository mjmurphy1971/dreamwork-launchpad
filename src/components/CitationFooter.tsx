// Citation footer component for evidence-based articles

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, FileText } from "lucide-react";
import { Citation, formatCitation } from "@/data/evidenceBasedContent";

interface CitationFooterProps {
  citations: Citation[];
  lastUpdated?: string;
  disclaimer?: string;
}

export const CitationFooter = ({ 
  citations, 
  lastUpdated, 
  disclaimer = "This content is for educational purposes only and should not replace professional medical advice. Always consult with healthcare providers for medical concerns."
}: CitationFooterProps) => {
  const getCitationIcon = (type: Citation["type"]) => {
    switch (type) {
      case "study":
      case "meta-analysis":
        return <FileText className="w-4 h-4" />;
      case "book":
        return <BookOpen className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const getCitationTypeColor = (type: Citation["type"]) => {
    switch (type) {
      case "meta-analysis":
        return "bg-green-500/10 text-green-600 border-green-200";
      case "study":
        return "bg-blue-500/10 text-blue-600 border-blue-200";
      case "review":
        return "bg-purple-500/10 text-purple-600 border-purple-200";
      case "book":
        return "bg-orange-500/10 text-orange-600 border-orange-200";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 mt-12">
      {/* Scientific References */}
      <Card className="border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="w-5 h-5" />
            Scientific References
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            This article is based on peer-reviewed research and evidence-based practices.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {citations.map((citation, index) => (
            <div key={citation.id} className="space-y-2">
              <div className="flex items-start gap-3">
                <span className="text-sm font-mono text-muted-foreground mt-1">
                  [{index + 1}]
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCitationIcon(citation.type)}
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCitationTypeColor(citation.type)}`}
                    >
                      {citation.type.replace("-", " ").toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {citation.year}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {formatCitation(citation)}
                  </p>
                  {citation.doi && (
                    <a
                      href={`https://doi.org/${citation.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Full Study
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Disclaimer and Last Updated */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Medical Disclaimer</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {disclaimer}
                </p>
              </div>
            </div>
            
            {lastUpdated && (
              <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground">
                  Last updated: {new Date(lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long", 
                    day: "numeric"
                  })}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};