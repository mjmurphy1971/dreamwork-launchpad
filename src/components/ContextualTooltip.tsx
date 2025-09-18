import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle, ExternalLink } from "lucide-react";

interface ContextualTooltipProps {
  term: string;
  definition: string;
  examples?: string[];
  relatedLinks?: Array<{
    text: string;
    url: string;
    internal?: boolean;
  }>;
  source?: string;
  children: React.ReactNode;
  className?: string;
}

export const ContextualTooltip = ({ 
  term,
  definition, 
  examples = [],
  relatedLinks = [],
  source,
  children,
  className = ""
}: ContextualTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`cursor-help underline decoration-dotted decoration-primary/60 hover:decoration-primary transition-smooth ${className}`}>
            {children}
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4 space-y-3 bg-card border-border text-card-foreground">
          <div>
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <HelpCircle className="w-3 h-3 text-primary" />
              {term}
            </h4>
            <p className="text-xs text-muted-foreground mt-1">{definition}</p>
          </div>
          
          {examples.length > 0 && (
            <div>
              <p className="font-medium text-xs text-foreground">Examples:</p>
              <ul className="text-xs text-muted-foreground list-disc list-inside space-y-1 mt-1">
                {examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            </div>
          )}
          
          {relatedLinks.length > 0 && (
            <div>
              <p className="font-medium text-xs text-foreground">Related:</p>
              <div className="space-y-1 mt-1">
                {relatedLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url}
                    target={link.internal ? "_self" : "_blank"}
                    rel={link.internal ? undefined : "noopener noreferrer"}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    {link.text}
                    {!link.internal && <ExternalLink className="w-2 h-2" />}
                  </a>
                ))}
              </div>
            </div>
          )}
          
          {source && (
            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">Source: {source}</p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};