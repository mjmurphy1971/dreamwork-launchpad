import { Shield, Award, Clock, ExternalLink, User, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Citation {
  title: string;
  url: string;
  type: 'research' | 'study' | 'expert' | 'organization';
  date?: string;
}

interface AuthorInfo {
  name: string;
  credentials: string[];
  experience: string;
  bio?: string;
  profileUrl?: string;
}

interface AuthoritySignalsProps {
  author?: AuthorInfo;
  lastUpdated: string;
  reviewedBy?: string;
  citations?: Citation[];
  dataSource?: string;
  methodology?: string;
  evidenceLevel?: 'high' | 'medium' | 'preliminary';
  className?: string;
}

export const AuthoritySignals = ({ 
  author,
  lastUpdated,
  reviewedBy,
  citations = [],
  dataSource,
  methodology,
  evidenceLevel,
  className = ""
}: AuthoritySignalsProps) => {
  const getEvidenceBadge = (level: string) => {
    switch (level) {
      case 'high':
        return 'bg-green-500/10 text-green-600 border-green-200';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
      case 'preliminary':
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-200';
    }
  };

  const getCitationIcon = (type: string) => {
    switch (type) {
      case 'research': return '🔬';
      case 'study': return '📊';
      case 'expert': return '👨‍⚕️';
      case 'organization': return '🏛️';
      default: return '📄';
    }
  };

  return (
    <Card className={`border-0 bg-muted/20 ${className}`}>
      <CardContent className="p-4 space-y-4">
        {/* E-E-A-T Header */}
        <div className="flex items-center gap-2 pb-2 border-b border-border/50">
          <Shield className="w-4 h-4 text-primary" />
          <h4 className="font-medium text-foreground">Credibility & Transparency</h4>
        </div>

        {/* Author Information (Expertise & Experience) */}
        {author && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <User className="w-3 h-3 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Author</span>
            </div>
            <div className="ml-5 space-y-1">
              {author.profileUrl ? (
                <a 
                  href={author.profileUrl}
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  {author.name}
                </a>
              ) : (
                <p className="text-sm font-medium text-foreground">{author.name}</p>
              )}
              <p className="text-xs text-muted-foreground">{author.experience}</p>
              {author.credentials.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {author.credentials.map((credential, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {credential}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Trustworthiness Indicators */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-muted-foreground">
              Last Updated: <span className="text-foreground">{new Date(lastUpdated).toLocaleDateString()}</span>
            </span>
          </div>
          
          {reviewedBy && (
            <div className="flex items-center gap-2">
              <Award className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                Reviewed by: <span className="text-foreground">{reviewedBy}</span>
              </span>
            </div>
          )}

          {dataSource && (
            <div className="flex items-center gap-2">
              <BookOpen className="w-3 h-3 text-muted-foreground" />
              <span className="text-muted-foreground">
                Data Source: <span className="text-foreground">{dataSource}</span>
              </span>
            </div>
          )}
        </div>

        {/* Evidence Level */}
        {evidenceLevel && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Evidence Level:</p>
            <Badge className={getEvidenceBadge(evidenceLevel)}>
              {evidenceLevel.charAt(0).toUpperCase() + evidenceLevel.slice(1)} Evidence
            </Badge>
          </div>
        )}

        {/* Methodology */}
        {methodology && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-foreground">Methodology:</p>
            <p className="text-xs text-muted-foreground leading-relaxed">{methodology}</p>
          </div>
        )}

        {/* Citations (Authoritativeness) */}
        {citations.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-foreground">Scientific References:</p>
            <div className="space-y-2">
              {citations.map((citation, index) => (
                <a
                  key={index}
                  href={citation.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 p-2 rounded border border-border hover:bg-muted/50 transition-smooth group"
                >
                  <span className="text-sm mt-0.5">{getCitationIcon(citation.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-primary group-hover:text-primary/80 line-clamp-2">
                      {citation.title}
                    </p>
                    {citation.date && (
                      <p className="text-xs text-muted-foreground mt-1">{citation.date}</p>
                    )}
                  </div>
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};