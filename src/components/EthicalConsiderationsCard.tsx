// Component for displaying ethical considerations and disclaimers for health/wellness content

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, Heart, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface EthicalConsiderationsCardProps {
  ethicalNotes: string[];
  category: string;
  isHealthRelated?: boolean;
  disclaimerLevel?: "standard" | "health" | "mental-health" | "crisis";
}

export const EthicalConsiderationsCard = ({
  ethicalNotes,
  category,
  isHealthRelated = false,
  disclaimerLevel = "standard"
}: EthicalConsiderationsCardProps) => {
  const getDisclaimerIcon = () => {
    switch (disclaimerLevel) {
      case "crisis":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "mental-health":
        return <Heart className="w-5 h-5 text-orange-500" />;
      case "health":
        return <Shield className="w-5 h-5 text-blue-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-green-500" />;
    }
  };

  const getDisclaimerColor = () => {
    switch (disclaimerLevel) {
      case "crisis":
        return "border-red-200 bg-red-50";
      case "mental-health":
        return "border-orange-200 bg-orange-50";
      case "health":
        return "border-blue-200 bg-blue-50";
      default:
        return "border-green-200 bg-green-50";
    }
  };

  const getStandardDisclaimer = () => {
    switch (disclaimerLevel) {
      case "crisis":
        return "If you are experiencing a mental health crisis or having thoughts of self-harm, please contact emergency services (911) or the National Suicide Prevention Lifeline (988) immediately. This content is not a substitute for professional crisis intervention.";
      case "mental-health":
        return "This content is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any mental health condition. Always consult with qualified mental health professionals for personalized treatment.";
      case "health":
        return "This information is for educational purposes only and is not intended as medical advice. Always consult with healthcare providers before making changes to your health regimen or if you have medical concerns.";
      default:
        return "This content is for educational and inspirational purposes. Individual experiences may vary, and personal judgment should be used when applying these concepts.";
    }
  };

  return (
    <Card className={`${getDisclaimerColor()} border-l-4`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          {getDisclaimerIcon()}
          Ethical Considerations & Disclaimers
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          {isHealthRelated && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">
              Health-Related Content
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Standard Disclaimer */}
        <Alert className={disclaimerLevel === "crisis" ? "border-red-300" : ""}>
          <AlertDescription className="text-sm leading-relaxed">
            <strong>Important Notice:</strong> {getStandardDisclaimer()}
          </AlertDescription>
        </Alert>

        {/* Specific Ethical Notes */}
        {ethicalNotes.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Specific Considerations:</h4>
            <ul className="space-y-2">
              {ethicalNotes.map((note, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-current mt-2 flex-shrink-0" />
                  <span className="leading-relaxed">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Resources for Health-Related Content */}
        {isHealthRelated && (
          <div className="pt-3 border-t border-current/20">
            <h4 className="font-semibold text-sm mb-2">Professional Resources:</h4>
            <div className="text-xs space-y-1 text-muted-foreground">
              <p>• <strong>Mental Health:</strong> Psychology Today, NAMI, or your healthcare provider</p>
              <p>• <strong>Crisis Support:</strong> National Suicide Prevention Lifeline: 988</p>
              <p>• <strong>Medical Concerns:</strong> Consult your primary care physician or specialist</p>
            </div>
          </div>
        )}

        {/* Evidence-Based Badge */}
        <div className="flex items-center gap-2 pt-2 border-t border-current/20">
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span className="text-xs font-medium">Evidence-Based Content</span>
          </div>
          <span className="text-xs text-muted-foreground">
            • Peer-reviewed sources • Scientific backing • Ethical guidelines
          </span>
        </div>
      </CardContent>
    </Card>
  );
};