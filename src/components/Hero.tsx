
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/b3bb3f28-63b7-4009-b230-c5a5b4b93213.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content positioned between logo and tagline */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto flex flex-col justify-center min-h-[60vh] pt-40 pb-24">
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto leading-relaxed font-medium text-center">
            Discover meditation techniques, mindfulness practices, and spiritual guidance 
            through our inspiring blog and video content.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm group"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Latest Vlog
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-semibold">500+</div>
              <div className="text-sm opacity-90">Blog Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">10K+</div>
              <div className="text-sm opacity-90">Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-semibold">100+</div>
              <div className="text-sm opacity-90">Vlogs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
