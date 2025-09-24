import { useState } from "react";

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
    definition: "The eternal field of presence - Source energy",
    color: "#FFD700",
    glowColor: "rgba(255, 215, 0, 0.8)"
  },
  {
    id: "triangle", 
    name: "Triangle",
    definition: "Sacred ascension and grounding - Crown chakra",
    color: "#8A2BE2",
    glowColor: "rgba(138, 43, 226, 0.8)"
  },
  {
    id: "spiral",
    name: "Spiral", 
    definition: "The breath of life, ever-expanding - Heart chakra",
    color: "#00FF7F",
    glowColor: "rgba(0, 255, 127, 0.8)"
  },
  {
    id: "crescent",
    name: "Crescent",
    definition: "Receptivity and divine feminine - Root chakra", 
    color: "#FF4500",
    glowColor: "rgba(255, 69, 0, 0.8)"
  }
];

const InteractiveSigil = () => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const getElementForId = (id: string) => 
    sigilElements.find(el => el.id === id);

  return (
    <div className="relative w-40 h-40 mx-auto" onMouseMove={handleMouseMove}>
      {/* Tooltip */}
      {hoveredElement && (
        <div 
          className="absolute z-20 bg-background/95 border border-border rounded-lg p-3 shadow-lg backdrop-blur-sm pointer-events-none transition-opacity duration-200"
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

      {/* SVG Sigil */}
      <svg 
        width="160" 
        height="160" 
        viewBox="0 0 200 200" 
        className="w-full h-full"
      >
        <defs>
          {/* Glow filters for each element */}
          {sigilElements.map(element => (
            <filter key={`glow-${element.id}`} id={`glow-${element.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Outer Circle - Source */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke={hoveredElement === 'circle' ? sigilElements[0].color : 'currentColor'}
          strokeWidth={hoveredElement === 'circle' ? '4' : '3'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'circle' ? `url(#glow-circle) drop-shadow(0 0 20px ${sigilElements[0].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('circle')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Triangle at top - Crown chakra */}
        <path
          d="M100 35 L130 85 L70 85 Z"
          fill={hoveredElement === 'triangle' ? sigilElements[1].color : 'currentColor'}
          stroke={hoveredElement === 'triangle' ? sigilElements[1].color : 'currentColor'}
          strokeWidth={hoveredElement === 'triangle' ? '2' : '1'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'triangle' ? `url(#glow-triangle) drop-shadow(0 0 20px ${sigilElements[1].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('triangle')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Large Crescent at bottom - Root chakra */}
        <path
          d="M40 140 Q40 95, 100 95 Q160 95, 160 140 Q160 160, 100 160 Q40 160, 40 140"
          fill={hoveredElement === 'crescent' ? sigilElements[3].color : 'currentColor'}
          stroke={hoveredElement === 'crescent' ? sigilElements[3].color : 'currentColor'}
          strokeWidth={hoveredElement === 'crescent' ? '2' : '1'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'crescent' ? `url(#glow-crescent) drop-shadow(0 0 20px ${sigilElements[3].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('crescent')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Spiral in center - Heart chakra */}
        <path
          d="M100 127 Q110 127, 115 132 Q115 142, 105 147 Q90 147, 85 132 Q85 117, 100 112 Q120 112, 130 127 Q130 147, 105 157 Q80 157, 70 132 Q70 102, 100 92"
          fill="none"
          stroke={hoveredElement === 'spiral' ? sigilElements[2].color : 'currentColor'}
          strokeWidth={hoveredElement === 'spiral' ? '4' : '3'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'spiral' ? `url(#glow-spiral) drop-shadow(0 0 20px ${sigilElements[2].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('spiral')}
          onMouseLeave={() => setHoveredElement(null)}
        />
      </svg>
    </div>
  );
};

export default InteractiveSigil;