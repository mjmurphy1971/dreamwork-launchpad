import { useState } from "react";
import { Mail, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface NewsletterSignupProps {
  variant?: "inline" | "card" | "modal";
  title?: string;
  description?: string;
}

const NewsletterSignup = ({ 
  variant = "card", 
  title = "Stay Connected to Your Journey",
  description = "Get weekly meditation insights, practice reminders, and exclusive content delivered to your inbox."
}: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.trim().toLowerCase(),
          source: window.location.pathname,
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
        toast.success("Welcome to The Dream Work community! 🌟");
      } else {
        const error = await response.text();
        toast.error(error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Mail className="w-5 h-5 text-primary" />
          <h3 className="font-heading text-lg font-semibold">
            {title}
          </h3>
        </div>
        <p className="text-muted-foreground text-sm">
          {description}
        </p>
      </div>

      {isSubscribed ? (
        <div className="text-center space-y-3 py-4">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-semibold text-green-600 dark:text-green-400">You're all set!</h4>
            <p className="text-sm text-muted-foreground">
              Check your inbox for a welcome email with your first meditation guide.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="flex-1 bg-background border-border/50 focus:border-primary"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || !email}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                "Join Community"
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            ✨ Free forever. Unsubscribe anytime. No spam, just peace.
          </p>
        </form>
      )}
    </div>
  );

  if (variant === "inline") {
    return (
      <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
        {content}
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div className="space-y-4">
        {content}
      </div>
    );
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
      {content}
    </Card>
  );
};

export default NewsletterSignup;