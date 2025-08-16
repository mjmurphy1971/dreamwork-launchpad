
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - No Overlay */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/22c9739a-197e-4a2b-b196-365b4bfd2cd9.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content positioned in the middle area between logo and tagline */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col justify-center min-h-[60vh] pt-32 pb-20">
          <div className="text-center">
            {/* Subtitle */}
            <p className="text-lg md:text-xl text-white/95 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
              Discover meditation techniques, mindfulness practices, and spiritual guidance 
              through our inspiring blog and video content.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up mb-12">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 transition-smooth shadow-glow group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-gentle" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-smooth group"
            >
              <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-gentle" />
              Watch Latest Vlog
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white/90">
            <div className="text-center">
              <div className="text-2xl font-semibold text-white">500+</div>
              <div className="text-sm">Blog Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-white">10K+</div>
              <div className="text-sm">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold text-white">100+</div>
              <div className="text-sm">Vlogs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm animate-float"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute top-1/2 right-20 w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm animate-float" style={{ animationDelay: "2s" }}></div>
    </section>
  );
};

export default Hero;
