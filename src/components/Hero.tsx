import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  console.log('Hero component rendering');
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/b9454b96-c3d1-483e-baaa-44c00c4ff001.png"
          alt="The Dream Work - Heal the Vibe, Live the Dream"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center">
                <div className="w-8 h-8 text-white">∞</div>
              </div>
            </div>
          </div>
          
          <p className="text-2xl md:text-3xl mb-8 font-light">
            Heal the Vibe, <span className="font-script italic">Live the Dream</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
              Start Your Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
              <Play className="mr-2 w-5 h-5" />
              Watch Intro
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
