import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/a384f6fc-69e7-4ad3-9b8c-b1dc1a47a927.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto animate-fade-in flex flex-col justify-end min-h-[80vh] pb-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-background/20 backdrop-blur-sm border border-primary-foreground/20 mb-6">
              <span className="text-primary-foreground text-sm font-medium">
                ✨ Transform Your Life Through Mindful Living
              </span>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-primary-foreground/95 mb-6 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover meditation techniques, mindfulness practices, and spiritual guidance 
              through our inspiring blog and video content.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up mb-8">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-smooth shadow-glow group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-gentle" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm transition-smooth group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-gentle" />
              Watch Latest Vlog
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-primary-foreground/80">
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary-foreground">500+</div>
              <div className="text-sm">Blog Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary-foreground">10K+</div>
              <div className="text-sm">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-primary-foreground">100+</div>
              <div className="text-sm">Vlogs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary-foreground/5 backdrop-blur-sm animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-accent/10 backdrop-blur-sm animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 rounded-full bg-primary-glow/10 backdrop-blur-sm animate-float" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};

export default Hero;