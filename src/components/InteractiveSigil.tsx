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
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    
    // Trigger entrance animation
    setTimeout(() => setIsLoaded(true), 200);
  }, []);


  const playSound = (elementId: string) => {
    try {
      const audio = new Audio(`/sounds/${elementId}-chime.mp3`);
      audio.volume = 0.3; // Gentle volume for sacred experience
      audio.play().catch(err => console.log('Audio playback prevented by browser'));
    } catch (error) {
      console.log("Audio file not found or supported");
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
    >

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
          stroke="currentColor"
          strokeWidth="6"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-scale-in' : ''
          } ${activeElement === 'circle' ? 'drop-shadow-lg' : ''}`}
          style={{
            stroke: activeElement === 'circle' ? sigilElements[0].color : 'currentColor',
            strokeWidth: activeElement === 'circle' ? '7' : '6',
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
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          } ${activeElement === 'triangle' ? 'drop-shadow-md' : ''}`}
          style={{
            fill: activeElement === 'triangle' ? sigilElements[1].color : 'currentColor',
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
          strokeLinecap="round"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          } ${activeElement === 'crescent' ? 'drop-shadow-md' : ''}`}
          style={{
            stroke: activeElement === 'crescent' ? sigilElements[3].color : 'currentColor',
            strokeWidth: activeElement === 'crescent' ? '14' : '12',
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
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`cursor-pointer transition-all duration-500 ${
            isLoaded ? 'animate-fade-in' : ''
          } ${activeElement === 'spiral' ? 'drop-shadow-md' : ''}`}
          style={{
            stroke: activeElement === 'spiral' ? sigilElements[2].color : 'currentColor',
            strokeWidth: activeElement === 'spiral' ? '6' : '4',
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

        {/* Sacred Text Definitions - appear on activation */}
        {activeElement === 'circle' && (
          <text x="100" y="25" className="text-sm fill-current text-center" textAnchor="middle">
            Wholeness, containment, and shared field
          </text>
        )}
        
        {activeElement === 'triangle' && (
          <text x="100" y="35" className="text-sm fill-current text-center" textAnchor="middle">
            Clarity and soul alignment
          </text>
        )}
        
        {activeElement === 'spiral' && (
          <text x="100" y="190" className="text-sm fill-current text-center" textAnchor="middle">
            Breath, flow, and dynamic stillness
          </text>
        )}
        
        {activeElement === 'crescent' && (
          <text x="100" y="180" className="text-sm fill-current text-center" textAnchor="middle">
            Receptivity and grounded holding
          </text>
        )}
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