import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/f889b3fe-21b5-4455-84b9-48b5406e1764.png"
          alt="Dreamy bridge landscape with spiritual atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-8">
            <span className="text-primary-foreground text-sm font-medium">
              ✨ Transform Your Life Through Mindful Living
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-5xl md:text-7xl font-semibold text-primary-foreground mb-6 leading-tight">
            Heal the Vibe,{" "}
            <span className="gradient-text">Live the Dream</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover meditation techniques, mindfulness practices, and spiritual guidance 
            through our inspiring blog and video content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
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