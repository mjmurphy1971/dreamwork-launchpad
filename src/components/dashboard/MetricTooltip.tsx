import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface MetricTooltipProps {
  definition: string;
  methodology?: string;
  source?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export const MetricTooltip = ({ 
  definition, 
  methodology, 
  source, 
  lastUpdated, 
  children 
}: MetricTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-1 cursor-help">
            {children}
            <HelpCircle className="w-3 h-3 text-muted-foreground" />
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-sm p-4 space-y-2">
          <div>
            <p className="font-medium text-sm">Definition</p>
            <p className="text-xs text-muted-foreground">{definition}</p>
          </div>
          {methodology && (
            <div>
              <p className="font-medium text-sm">Methodology</p>
              <p className="text-xs text-muted-foreground">{methodology}</p>
            </div>
          )}
          {source && (
            <div>
              <p className="font-medium text-sm">Data Source</p>
              <p className="text-xs text-muted-foreground">{source}</p>
            </div>
          )}
          {lastUpdated && (
            <div>
              <p className="font-medium text-sm">Last Updated</p>
              <p className="text-xs text-muted-foreground">{lastUpdated}</p>
            </div>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};