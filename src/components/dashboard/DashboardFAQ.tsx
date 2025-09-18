import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  relatedLinks?: Array<{
    text: string;
    url: string;
    external?: boolean;
  }>;
}

interface DashboardFAQProps {
  title: string;
  faqs: FAQItem[];
  className?: string;
}

export const DashboardFAQ = ({ title, faqs, className = "" }: DashboardFAQProps) => {
  return (
    <Card className={`shadow-card border-0 bg-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-sm font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground space-y-2">
                <p>{faq.answer}</p>
                {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                  <div>
                    <p className="font-medium text-foreground">Related Resources:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {faq.relatedLinks.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a 
                            href={link.url}
                            target={link.external ? "_blank" : "_self"}
                            rel={link.external ? "noopener noreferrer" : undefined}
                            className="text-primary hover:underline"
                          >
                            {link.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};