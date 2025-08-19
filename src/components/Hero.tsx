import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  console.log('Hero component rendering');
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/b9454b96-c3d1-483e-baaa-44c00c4ff001.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your consciousness through guided meditation, dream work, and spiritual practices. 
            Join our community of seekers on the journey to inner peace and mindful living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
              onClick={() => window.location.href = '/weekly-stillness'}
            >
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              onClick={() => window.open('https://www.youtube.com/watch?v=tOp-gbnyj3w', '_blank')}
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Welcome Video
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
