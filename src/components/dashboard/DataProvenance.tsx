import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Clock, Database, User, ExternalLink } from "lucide-react";

interface DataProvenanceProps {
  sources: Array<{
    name: string;
    type: 'analytics' | 'ai-tracking' | 'user-feedback' | 'manual' | 'api';
    reliability: 'high' | 'medium' | 'experimental';
    lastUpdated: string;
    methodology?: string;
  }>;
  author?: {
    name: string;
    credentials: string[];
    role: string;
  };
  reviewedBy?: string;
  className?: string;
}

export const DataProvenance = ({ 
  sources, 
  author, 
  reviewedBy, 
  className = "" 
}: DataProvenanceProps) => {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'analytics':
        return <Database className="w-3 h-3" />;
      case 'ai-tracking':
        return <ExternalLink className="w-3 h-3" />;
      case 'user-feedback':
        return <User className="w-3 h-3" />;
      default:
        return <Shield className="w-3 h-3" />;
    }
  };

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'high':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'experimental':
        return 'bg-purple-500/10 text-purple-600 border-purple-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  return (
    <Card className={`shadow-card border-0 bg-muted/30 ${className}`}>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          <h4 className="font-medium text-foreground">Data Transparency & E-E-A-T</h4>
        </div>
        
        {/* Data Sources */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Data Sources:</p>
          <div className="grid gap-2">
            {sources.map((source, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  {getSourceIcon(source.type)}
                  <span className="text-muted-foreground">{source.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getReliabilityColor(source.reliability)}>
                    {source.reliability}
                  </Badge>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{source.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Author Information */}
        {author && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Analysis By:</p>
            <div className="text-xs text-muted-foreground">
              <p>{author.name} - {author.role}</p>
              {author.credentials.length > 0 && (
                <p>Credentials: {author.credentials.join(', ')}</p>
              )}
            </div>
          </div>
        )}

        {/* Review Information */}
        {reviewedBy && (
          <div className="text-xs text-muted-foreground">
            <span>Reviewed by: {reviewedBy}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};