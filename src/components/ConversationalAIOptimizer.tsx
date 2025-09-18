import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle, ArrowRight } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  relatedLinks?: Array<{
    text: string;
    url: string;
    internal?: boolean;
  }>;
  keywords: string[];
}

interface ConversationalAIOptimizerProps {
  pageTitle: string;
  faqs: FAQItem[];
  keyTakeaways: string[];
  quickAnswers: Array<{
    query: string;
    answer: string;
  }>;
  className?: string;
}

export const ConversationalAIOptimizer = ({
  pageTitle,
  faqs,
  keyTakeaways,
  quickAnswers,
  className = ""
}: ConversationalAIOptimizerProps) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Key Takeaways for AI Extraction */}
      <Card className="border-0 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Key Takeaways: {pageTitle}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {keyTakeaways.map((takeaway, index) => (
            <div key={index} className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-foreground leading-relaxed">{takeaway}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Answers for Voice Queries */}
      <Card className="border-0 bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            Quick Answers
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Direct responses to common queries about this content
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickAnswers.map((qa, index) => (
            <div key={index} className="border-l-2 border-primary/20 pl-4">
              <h4 className="font-medium text-foreground text-sm mb-1">
                {qa.query}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {qa.answer}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Comprehensive FAQ Section */}
      <Card className="border-0 bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground">
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 rounded-lg border border-border bg-muted/20">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-medium text-foreground text-sm leading-tight">
                  {faq.question}
                </h4>
                <Badge variant="outline" className="text-xs shrink-0">
                  {faq.category}
                </Badge>
              </div>
              
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                {faq.answer}
              </p>
              
              {faq.keywords.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {faq.keywords.map((keyword, keyIndex) => (
                    <span 
                      key={keyIndex}
                      className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}
              
              {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {faq.relatedLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target={link.internal ? "_self" : "_blank"}
                      rel={link.internal ? undefined : "noopener noreferrer"}
                      className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                    >
                      {link.text}
                      <ArrowRight className="w-2 h-2" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};