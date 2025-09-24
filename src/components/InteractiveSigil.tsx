import { useState, useEffect } from "react";

interface SigilElement {
  id: string;
  name: string;
  definition: string;
  color: string;
  glowColor: string;
}

const sigilElements: SigilElement[] = [
  {
    id: "circle",
    name: "Circle",
    definition: "Wholeness, containment, and shared field",
    color: "#FFD700",
    glowColor: "rgba(255, 215, 0, 0.6)"
  },
  {
    id: "triangle", 
    name: "Triangle",
    definition: "Clarity and soul alignment",
    color: "#8A2BE2",
    glowColor: "rgba(138, 43, 226, 0.6)"
  },
  {
    id: "spiral",
    name: "Spiral", 
    definition: "Breath, flow, and dynamic stillness",
    color: "#00FF7F",
    glowColor: "rgba(0, 255, 127, 0.6)"
  },
  {
    id: "crescent",
    name: "Crescent",
    definition: "Receptivity and grounded holding", 
    color: "#FF4500",
    glowColor: "rgba(255, 69, 0, 0.6)"
  }
];

const InteractiveSigil = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [tappedElement, setTappedElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 200);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const playSound = (elementId: string) => {
    try {
      // Create a simple audio context for subtle sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Different frequencies for different elements
      const frequencies: Record<string, number> = {
        circle: 528, // Love frequency
        triangle: 741, // Intuition frequency  
        spiral: 639, // Connection frequency
        crescent: 396 // Grounding frequency
      };
      
      oscillator.frequency.setValueAtTime(frequencies[elementId] || 528, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      // Silently fail if audio context isn't supported
      console.log("Audio not supported");
    }
  };

  const handleElementInteraction = (elementId: string) => {
    playSound(elementId);
    
    if (isMobile) {
      setTappedElement(elementId);
      setTimeout(() => setTappedElement(null), 2000);
    }
  };

  const getElementForId = (id: string) => 
    sigilElements.find(el => el.id === id);

  const activeElement = hoveredElement || tappedElement;

  return (
    <div 
      className={`relative w-48 h-48 mx-auto text-foreground transition-all duration-700 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`} 
      onMouseMove={handleMouseMove}
    >
      {/* Desktop Tooltip */}
      {!isMobile && hoveredElement && (
        <div 
          className="absolute z-20 bg-background/95 border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm pointer-events-none transition-all duration-200 animate-fade-in"
          style={{
            left: Math.min(mousePosition.x + 15, 250),
            top: Math.max(mousePosition.y - 60, 10),
            maxWidth: '220px'
          }}
        >
          <div className="text-sm font-semibold text-primary">
            {getElementForId(hoveredElement)?.name}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {getElementForId(hoveredElement)?.definition}
          </div>
        </div>
      )}

      {/* Mobile Modal */}
      {isMobile && tappedElement && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-background rounded-xl p-6 m-4 max-w-sm shadow-2xl border border-border">
            <div className="text-lg font-semibold text-primary mb-2">
              {getElementForId(tappedElement)?.name}
            </div>
            <div className="text-muted-foreground mb-4">
              {getElementForId(tappedElement)?.definition}
            </div>
            <button 
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => setTappedElement(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SVG Sigil - Exact match to reference image */}
      <svg 
        width="192" 
        height="192" 
        viewBox="0 0 200 200" 
        className={`w-full h-full transition-all duration-1000 ${
          isLoaded ? 'animate-fade-in' : ''
        }`}
      >
        <defs>
          {/* Glow filters for each element */}
          {sigilElements.map(element => (
            <filter key={`glow-${element.id}`} id={`glow-${element.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Outer Circle - Source (matching reference thickness) */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={activeElement === 'circle' ? sigilElements[0].color : 'currentColor'}
          strokeWidth={activeElement === 'circle' ? '7' : '6'}
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-scale-in' : ''
          }`}
          style={{
            filter: activeElement === 'circle' ? `url(#glow-circle)` : 'none',
            transformOrigin: '100px 100px',
            animationDelay: '0.8s'
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setHoveredElement('circle');
              playSound('circle');
            }
          }}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('circle')}
        />

        {/* Triangle at top - solid filled (matching reference) */}
        <path
          d="M100 40 L125 80 L75 80 Z"
          fill={activeElement === 'triangle' ? sigilElements[1].color : 'currentColor'}
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          }`}
          style={{
            filter: activeElement === 'triangle' ? `url(#glow-triangle)` : 'none',
            animationDelay: '0.2s'
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setHoveredElement('triangle');
              playSound('triangle');
            }
          }}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('triangle')}
        />

        {/* Spiral in center - precisely matching reference design */}
        <path
          d="M100 100 
             Q110 100, 115 105 
             Q115 115, 105 120 
             Q90 120, 85 105 
             Q85 85, 105 80 
             Q130 80, 135 105 
             Q135 135, 105 140 
             Q70 140, 65 105 
             Q65 65, 105 60 
             Q150 60, 155 105 
             Q155 155, 105 160"
          fill="none"
          stroke={activeElement === 'spiral' ? sigilElements[2].color : 'currentColor'}
          strokeWidth={activeElement === 'spiral' ? '10' : '8'}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          }`}
          style={{
            filter: activeElement === 'spiral' ? `url(#glow-spiral)` : 'none',
            transformOrigin: '100px 100px',
            animationDelay: '0.4s'
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setHoveredElement('spiral');
              playSound('spiral');
            }
          }}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('spiral')}
        />

        {/* Crescent at bottom - thick arc matching reference */}
        <path
          d="M45 155 A55 55 0 0 0 155 155"
          fill="none"
          stroke={activeElement === 'crescent' ? sigilElements[3].color : 'currentColor'}
          strokeWidth={activeElement === 'crescent' ? '18' : '16'}
          strokeLinecap="round"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          }`}
          style={{
            filter: activeElement === 'crescent' ? `url(#glow-crescent)` : 'none',
            animationDelay: '0.6s'
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setHoveredElement('crescent');
              playSound('crescent');
            }
          }}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('crescent')}
        />
      </svg>
      
      {/* Subtle breathing aura */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-8 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, transparent 70%, ${sigilElements[0].glowColor} 100%)`,
              animation: 'pulse 6s ease-in-out infinite'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveSigil;