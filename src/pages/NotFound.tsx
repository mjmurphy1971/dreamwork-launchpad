import SEO from "@/components/SEO";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="Page Not Found - 404 Error"
        description="The page you are looking for could not be found. Return to The Dream Work homepage to continue your mindfulness journey."
        canonical={`https://www.thedreamwork.space${location.pathname}`}
      />
      <PerformanceMonitor pageName="404-not-found" />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-secondary/10">
        <div className="text-center p-8 max-w-md mx-auto">
          <div className="mb-8">
            <h1 className="text-6xl font-heading font-bold gradient-text mb-4">404</h1>
            <h2 className="text-2xl font-heading text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              The page you're looking for has wandered off into the dreamscape. 
              Let's guide you back to your mindfulness journey.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button asChild className="w-full">
              <a href="/">Return to Homepage</a>
            </Button>
            
            <Button variant="outline" asChild className="w-full">
              <a href="/blog">Explore Our Blog</a>
            </Button>
            
            <Button variant="ghost" asChild className="w-full">
              <a href="/meditation">Start Meditating</a>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
