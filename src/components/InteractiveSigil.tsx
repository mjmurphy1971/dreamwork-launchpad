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
        viewBox="0 0 160 160" 
        className="w-full h-full"
      >
        <defs>
          {/* Glow filters for each element */}
          {sigilElements.map(element => (
            <filter key={`glow-${element.id}`} id={`glow-${element.id}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          ))}
        </defs>

        {/* Circle - Source */}
        <circle
          cx="80"
          cy="80"
          r="75"
          fill="none"
          stroke={hoveredElement === 'circle' ? sigilElements[0].color : 'currentColor'}
          strokeWidth={hoveredElement === 'circle' ? '3' : '2'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'circle' ? `url(#glow-circle) drop-shadow(0 0 20px ${sigilElements[0].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('circle')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Triangle - Crown chakra */}
        <path
          d="M80 20 L130 110 L30 110 Z"
          fill="none"
          stroke={hoveredElement === 'triangle' ? sigilElements[1].color : 'currentColor'}
          strokeWidth={hoveredElement === 'triangle' ? '3' : '2'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'triangle' ? `url(#glow-triangle) drop-shadow(0 0 20px ${sigilElements[1].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('triangle')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Spiral - Heart chakra */}
        <path
          d="M80 80 Q90 70, 100 80 Q100 100, 80 100 Q60 100, 60 80 Q60 60, 80 60 Q110 60, 110 80 Q110 110, 80 110 Q50 110, 50 80 Q50 50, 80 50"
          fill="none"
          stroke={hoveredElement === 'spiral' ? sigilElements[2].color : 'currentColor'}
          strokeWidth={hoveredElement === 'spiral' ? '3' : '2'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'spiral' ? `url(#glow-spiral) drop-shadow(0 0 20px ${sigilElements[2].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('spiral')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Crescent - Root chakra */}
        <path
          d="M40 80 Q40 40, 80 40 Q120 40, 120 80 Q100 60, 80 60 Q60 60, 40 80"
          fill="none"
          stroke={hoveredElement === 'crescent' ? sigilElements[3].color : 'currentColor'}
          strokeWidth={hoveredElement === 'crescent' ? '3' : '2'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'crescent' ? `url(#glow-crescent) drop-shadow(0 0 20px ${sigilElements[3].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('crescent')}
          onMouseLeave={() => setHoveredElement(null)}
        />
      </svg>
    </div>
  );
};

export default InteractiveSigil;