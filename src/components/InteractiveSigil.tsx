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

  // Build an Archimedean spiral that matches the original sigil style
  const makeSpiral = (
    cx: number,
    cy: number,
    a: number,
    b: number,
    thetaMax: number,
    segments = 160
  ) => {
    let d = "";
    let started = false;
    for (let i = 0; i <= thetaMax; i += thetaMax / segments) {
      const r = a + b * i;
      const x = cx + r * Math.cos(i);
      const y = cy + r * Math.sin(i);
      d += `${started ? " L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`;
      started = true;
    }
    return d;
  };

  // Spiral centered slightly above the crescent, ~1.25 turns
  const spiralD = makeSpiral(100, 115, 1.2, 3.2, Math.PI * 2.2);

  const getElementForId = (id: string) => 
    sigilElements.find(el => el.id === id);

  return (
    <div className="relative w-48 h-48 mx-auto text-foreground" onMouseMove={handleMouseMove}>
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
          d="M100 55 L120 90 L80 90 Z"
          fill="none"
          stroke={hoveredElement === 'triangle' ? sigilElements[1].color : 'currentColor'}
          strokeWidth={hoveredElement === 'triangle' ? '4' : '3'}
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'triangle' ? `url(#glow-triangle) drop-shadow(0 0 20px ${sigilElements[1].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('triangle')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Large Crescent at bottom - Root chakra */}
        <path
          d="M55 145 A45 45 0 0 0 145 145"
          fill="none"
          stroke={hoveredElement === 'crescent' ? sigilElements[3].color : 'currentColor'}
          strokeWidth={hoveredElement === 'crescent' ? '12' : '10'}
          strokeLinecap="round"
          className="cursor-pointer transition-all duration-300"
          style={{
            filter: hoveredElement === 'crescent' ? `url(#glow-crescent) drop-shadow(0 0 20px ${sigilElements[3].glowColor})` : 'none'
          }}
          onMouseEnter={() => setHoveredElement('crescent')}
          onMouseLeave={() => setHoveredElement(null)}
        />

        {/* Spiral in center - Heart chakra */}
        <path
          d={spiralD}
          fill="none"
          stroke={hoveredElement === 'spiral' ? sigilElements[2].color : 'currentColor'}
          strokeWidth={hoveredElement === 'spiral' ? '6' : '5'}
          strokeLinecap="round"
          strokeLinejoin="round"
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