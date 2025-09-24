import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import sigilImage from "@/assets/stillbility-sigil-glow.jpg";

const InteractiveSigil = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

  const handleSigilClick = () => {
    // Play soft chime when modal opens
    try {
      const audio = new Audio('/sounds/sigil-chime.mp3');
      audio.volume = 0.3;
      audio.play().catch(err => console.log('Audio playback prevented by browser'));
    } catch (error) {
      console.log("Audio file not found or supported");
    }
    setIsModalOpen(true);
  };
  

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <div 
          className={`relative w-48 h-48 mx-auto text-foreground transition-all duration-700 cursor-pointer hover:scale-105 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} 
          onClick={handleSigilClick}
        >
          {/* Original Stillbility Sigil */}
          <img 
            src={sigilImage}
            alt="Stillbility Sigil - Sacred geometry containing triangle, spiral, crescent, and circle"
            className={`w-full h-full object-contain transition-all duration-1000 ${
              isLoaded ? 'animate-fade-in' : ''
            }`}
          />
          
          {/* Subtle breathing aura */}
          {isLoaded && (
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute inset-8 rounded-full opacity-10"
                style={{
                  background: `radial-gradient(circle, transparent 70%, hsl(var(--primary) / 0.3) 100%)`,
                  animation: 'pulse 6s ease-in-out infinite'
                }}
              />
            </div>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-md mx-auto bg-background/95 backdrop-blur border-muted">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-serif text-foreground mb-4">
            The Stillbility Sigil
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <span className="text-lg">🔺</span>
            <div>
              <p className="font-medium text-foreground">Triangle</p>
              <p>Clarity and soul alignment</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-lg">🌀</span>
            <div>
              <p className="font-medium text-foreground">Spiral</p>
              <p>Breath, flow, and dynamic stillness</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-lg">🌙</span>
            <div>
              <p className="font-medium text-foreground">Crescent</p>
              <p>Receptivity and grounded holding</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <span className="text-lg">⭕</span>
            <div>
              <p className="font-medium text-foreground">Circle</p>
              <p>Wholeness, containment, and shared field</p>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-muted text-center">
            <p className="italic text-foreground font-serif">
              "You are held. You are rooted. You are the Stillbility Field."
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InteractiveSigil;