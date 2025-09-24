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
  const [activeElement, setActiveElement] = useState<string | null>(null);
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
      // Create a gentle chime sound using audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Gentle chime frequencies - more bell-like harmonics
      const frequencies: Record<string, number> = {
        circle: 523.25, // C5 - wholeness
        triangle: 659.25, // E5 - clarity  
        spiral: 783.99, // G5 - flow
        crescent: 392.00 // G4 - grounding
      };
      
      oscillator.frequency.setValueAtTime(frequencies[elementId] || 523.25, audioContext.currentTime);
      oscillator.type = 'sine';
      
      // Gentle chime envelope - soft attack, sustained decay
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.05, audioContext.currentTime + 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 1.2);
    } catch (error) {
      console.log("Audio not supported");
    }
  };

  const handleElementInteraction = (elementId: string) => {
    playSound(elementId);
    
    if (isMobile) {
      setActiveElement(elementId);
      setTimeout(() => setActiveElement(null), 2000);
    }
  };

  const getElementForId = (id: string) => 
    sigilElements.find(el => el.id === id);
  
  // Generate sacred spiral geometry
  const generateSpiralPath = ({ turns = 3, spacing = 8, center = [100, 100] }) => {
    const [cx, cy] = center;
    const steps = 100;
    const maxAngle = turns * 2 * Math.PI;
    
    let path = "";
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const angle = t * maxAngle;
      const radius = spacing * angle / (2 * Math.PI);
      
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      
      if (i === 0) {
        path += `M ${x.toFixed(2)} ${y.toFixed(2)}`;
      } else {
        path += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
      }
    }
    return path;
  };

  // Sacred spiral positioned at center of sigil
  const spiralPath = generateSpiralPath({ turns: 2.5, spacing: 12, center: [100, 110] });

  return (
    <div 
      className={`relative w-48 h-48 mx-auto text-foreground transition-all duration-700 ${
        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`} 
      onMouseMove={handleMouseMove}
    >
      {/* Desktop Tooltip */}
      {!isMobile && activeElement && (
        <div 
          className="absolute z-20 bg-background/95 border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm pointer-events-none transition-all duration-200 animate-fade-in"
          style={{
            left: Math.min(mousePosition.x + 15, 250),
            top: Math.max(mousePosition.y - 60, 10),
            maxWidth: '220px'
          }}
        >
          <div className="text-sm font-semibold text-primary">
            {getElementForId(activeElement)?.name}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {getElementForId(activeElement)?.definition}
          </div>
        </div>
      )}

      {/* Mobile Modal */}
      {isMobile && activeElement && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-background rounded-xl p-6 m-4 max-w-sm shadow-2xl border border-border">
            <div className="text-lg font-semibold text-primary mb-2">
              {getElementForId(activeElement)?.name}
            </div>
            <div className="text-muted-foreground mb-4">
              {getElementForId(activeElement)?.definition}
            </div>
            <button 
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              onClick={() => setActiveElement(null)}
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
              setActiveElement('circle');
              playSound('circle');
            }
          }}
          onMouseLeave={() => !isMobile && setActiveElement(null)}
          onClick={() => handleElementInteraction('circle')}
        />

        {/* Triangle at top - smaller, centered (matching reference) */}
        <path
          d="M100 50 L115 75 L85 75 Z"
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
              setActiveElement('triangle');
              playSound('triangle');
            }
          }}
          onMouseLeave={() => !isMobile && setActiveElement(null)}
          onClick={() => handleElementInteraction('triangle')}
        />

        {/* Crescent at bottom - precise arc matching reference */}
        <path
          d="M60 150 A40 40 0 0 0 140 150"
          fill="none"
          stroke={activeElement === 'crescent' ? sigilElements[3].color : 'currentColor'}
          strokeWidth={activeElement === 'crescent' ? '14' : '12'}
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
              setActiveElement('crescent');
              playSound('crescent');
            }
          }}
          onMouseLeave={() => !isMobile && setActiveElement(null)}
          onClick={() => handleElementInteraction('crescent')}
        />

        {/* Spiral in center - sacred geometry with mathematical precision */}
        <path
          d={spiralPath}
          fill="none"
          stroke={activeElement === 'spiral' ? sigilElements[2].color : 'currentColor'}
          strokeWidth={activeElement === 'spiral' ? '6' : '4'}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          }`}
          style={{
            filter: activeElement === 'spiral' ? `url(#glow-spiral)` : 'none',
            transformOrigin: '100px 110px',
            animationDelay: '0.4s'
          }}
          onMouseEnter={() => {
            if (!isMobile) {
              setActiveElement('spiral');
              playSound('spiral');
            }
          }}
          onMouseLeave={() => !isMobile && setActiveElement(null)}
          onClick={() => handleElementInteraction('spiral')}
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