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
    glowColor: "rgba(255, 215, 0, 0.8)"
  },
  {
    id: "triangle", 
    name: "Triangle",
    definition: "Clarity and soul alignment",
    color: "#8A2BE2",
    glowColor: "rgba(138, 43, 226, 0.8)"
  },
  {
    id: "spiral",
    name: "Spiral", 
    definition: "Breath, flow, and dynamic stillness",
    color: "#00FF7F",
    glowColor: "rgba(0, 255, 127, 0.8)"
  },
  {
    id: "crescent",
    name: "Crescent",
    definition: "Receptivity and grounded holding", 
    color: "#FF4500",
    glowColor: "rgba(255, 69, 0, 0.8)"
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
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleElementInteraction = (elementId: string) => {
    if (isMobile) {
      setTappedElement(elementId);
      // Clear tapped state after animation
      setTimeout(() => setTappedElement(null), 1500);
    }
  };

  const getElementForId = (id: string) => 
    sigilElements.find(el => el.id === id);

  const activeElement = hoveredElement || tappedElement;
  
  // Generate spiral path to match the sigil design
  const createSpiralPath = () => {
    const cx = 100;
    const cy = 120;
    const startRadius = 8;
    const endRadius = 25;
    const turns = 2.5;
    const steps = 100;
    
    let path = "";
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * turns * Math.PI * 2;
      const radius = startRadius + (endRadius - startRadius) * (i / steps);
      const x = cx + radius * Math.cos(angle);
      const y = cy + radius * Math.sin(angle);
      
      if (i === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    }
    return path;
  };

  const spiralPath = createSpiralPath();

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
            left: mousePosition.x + 15,
            top: mousePosition.y - 50,
            maxWidth: '200px'
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-background rounded-lg p-6 m-4 max-w-sm shadow-2xl border border-border">
            <div className="text-lg font-semibold text-primary mb-2">
              {getElementForId(tappedElement)?.name}
            </div>
            <div className="text-muted-foreground mb-4">
              {getElementForId(tappedElement)?.definition}
            </div>
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
              onClick={() => setTappedElement(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SVG Sigil */}
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
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}
          
          {/* Pulse animation for circle */}
          <animate 
            id="circlePulse"
            attributeName="r"
            values="88;92;88"
            dur="4s"
            repeatCount="indefinite"
          />
        </defs>

        {/* Outer Circle - Source */}
        <circle
          cx="100"
          cy="100"
          r="88"
          fill="none"
          stroke={activeElement === 'circle' ? sigilElements[0].color : 'currentColor'}
          strokeWidth={activeElement === 'circle' ? '5' : '4'}
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-scale-in' : ''
          }`}
          style={{
            filter: activeElement === 'circle' ? `url(#glow-circle)` : 'none',
            transformOrigin: '100px 100px',
            animationDelay: '0.8s'
          }}
          onMouseEnter={() => !isMobile && setHoveredElement('circle')}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('circle')}
        >
          {isLoaded && <animate attributeName="r" values="88;92;88" dur="4s" repeatCount="indefinite" begin="1s" />}
        </circle>

        {/* Triangle at top - filled thick triangle */}
        <path
          d="M100 45 L125 85 L75 85 Z"
          fill={activeElement === 'triangle' ? sigilElements[1].color : 'currentColor'}
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          }`}
          style={{
            filter: activeElement === 'triangle' ? `url(#glow-triangle)` : 'none',
            animationDelay: '0.2s'
          }}
          onMouseEnter={() => !isMobile && setHoveredElement('triangle')}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('triangle')}
        />

        {/* Large Crescent at bottom - thick arc */}
        <path
          d="M50 150 A50 50 0 0 0 150 150"
          fill="none"
          stroke={activeElement === 'crescent' ? sigilElements[3].color : 'currentColor'}
          strokeWidth={activeElement === 'crescent' ? '16' : '14'}
          strokeLinecap="round"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          }`}
          style={{
            filter: activeElement === 'crescent' ? `url(#glow-crescent)` : 'none',
            animationDelay: '0.6s'
          }}
          onMouseEnter={() => !isMobile && setHoveredElement('crescent')}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('crescent')}
        />

        {/* Spiral in center */}
        <path
          d={spiralPath}
          fill="none"
          stroke={activeElement === 'spiral' ? sigilElements[2].color : 'currentColor'}
          strokeWidth={activeElement === 'spiral' ? '8' : '6'}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          }`}
          style={{
            filter: activeElement === 'spiral' ? `url(#glow-spiral)` : 'none',
            transformOrigin: '100px 120px',
            animationDelay: '0.4s'
          }}
          onMouseEnter={() => !isMobile && setHoveredElement('spiral')}
          onMouseLeave={() => !isMobile && setHoveredElement(null)}
          onClick={() => handleElementInteraction('spiral')}
        >
          {isLoaded && (
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0 100 120;360 100 120"
              dur="20s"
              repeatCount="indefinite"
              begin="1.2s"
            />
          )}
        </path>
      </svg>
      
      {/* Gentle breathing indicator */}
      {isLoaded && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-4 rounded-full opacity-20 animate-pulse"
            style={{
              background: `radial-gradient(circle, transparent 60%, ${sigilElements[0].glowColor} 100%)`,
              animationDuration: '4s'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default InteractiveSigil;