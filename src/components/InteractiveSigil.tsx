import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

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
  
  // Generate sacred Archimedean spiral with exact mathematical precision
  const generateSacredSpiralPath = () => {
    let path = "M250,250";
    for (let t = 0; t < 6.28 * 2.5; t += 0.1) {
      const r = 5 * t;
      const x = 250 + r * Math.cos(t);
      const y = 250 + r * Math.sin(t);
      path += ` L${x.toFixed(2)},${y.toFixed(2)}`;
    }
    return path;
  };

  // Sacred spiral path using blueprint formula
  const spiralPath = generateSacredSpiralPath();

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <div 
          className={`relative w-48 h-48 mx-auto text-foreground transition-all duration-700 cursor-pointer hover:scale-105 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`} 
          onClick={handleSigilClick}
        >
          {/* SVG Sigil - Sacred Geometry */}
          <svg 
            width="192" 
            height="192" 
            viewBox="0 0 500 500" 
            className={`w-full h-full transition-all duration-1000 ${
              isLoaded ? 'animate-fade-in' : ''
            }`}
          >
            <defs>
              {/* Crescent moon mask - precise sacred geometry */}
              <mask id="crescent-mask">
                <circle cx="250" cy="320" r="40" fill="white" />
                <circle cx="270" cy="320" r="40" fill="black" />
              </mask>
            </defs>

            {/* Sacred Blueprint Implementation - All elements centered around (250, 250) */}
            <g>
              
              {/* 1. Outer Circle - Wholeness, containment, shared field */}
              <circle
                cx="250"
                cy="250"
                r="200"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className={`transition-all duration-500 ${isLoaded ? 'animate-scale-in' : ''}`}
                style={{
                  transformOrigin: '250px 250px',
                  animationDelay: '0.8s'
                }}
              />

              {/* 2. Equilateral Triangle - Clarity and soul alignment */}
              <polygon
                points="250,130 220,180 280,180"
                fill="currentColor"
                className={`transition-all duration-500 ${isLoaded ? 'animate-fade-in' : ''}`}
                style={{
                  transformOrigin: '250px 155px',
                  animationDelay: '0.2s'
                }}
              />

              {/* 3. Sacred Spiral - Breath, flow, and dynamic stillness */}
              <path
                d={spiralPath}
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-all duration-500 ${isLoaded ? 'animate-fade-in' : ''}`}
                style={{
                  transformOrigin: '250px 250px',
                  animationDelay: '0.4s'
                }}
              />

              {/* 4. Crescent - Receptivity and grounded holding */}
              <circle
                cx="250"
                cy="320"
                r="40"
                fill="currentColor"
                mask="url(#crescent-mask)"
                className={`transition-all duration-500 ${isLoaded ? 'animate-fade-in' : ''}`}
                style={{
                  transformOrigin: '250px 320px',
                  animationDelay: '0.6s'
                }}
              />
            </g>
          </svg>
          
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