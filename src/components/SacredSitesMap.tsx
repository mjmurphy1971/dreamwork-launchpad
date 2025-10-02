import { useState } from "react";
import { sacredSites, SacredSite } from "@/data/sacredSites";
import mapImage from "@/assets/sacred-sites-map.png";
import pinImage from "@/assets/sacred-pin.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SacredSitesMap = () => {
  const [hoveredSite, setHoveredSite] = useState<SacredSite | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });

  // Convert lat/lng to x/y percentage on the map
  // Map bounds: roughly -180 to 180 lng, -60 to 85 lat (standard world map)
  const coordsToPosition = (lat: number, lng: number) => {
    // Convert longitude to x (0-100%)
    const x = ((lng + 180) / 360) * 100;
    
    // Convert latitude to y (0-100%)
    // Using Mercator-like projection approximation
    const y = ((85 - lat) / 145) * 100;
    
    return { x, y };
  };

  const handlePinHover = (site: SacredSite, event: React.MouseEvent) => {
    setHoveredSite(site);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopoverPosition({
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handlePinLeave = () => {
    setHoveredSite(null);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🌍 Sacred Sites Around the World
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore sacred spaces across continents. Hover over each pin to discover the wisdom, invocation, and archetype of these powerful portals.
        </p>
      </div>

      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
        {/* Map Background */}
        <img 
          src={mapImage} 
          alt="World map showing sacred sites" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Sacred Site Pins */}
        {sacredSites.map((site, index) => {
          const position = coordsToPosition(site.coordinates[0], site.coordinates[1]);
          
          return (
            <div
              key={index}
              className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all duration-300 hover:scale-125 group"
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
              }}
              onMouseEnter={(e) => handlePinHover(site, e)}
              onMouseLeave={handlePinLeave}
            >
              <img 
                src={pinImage} 
                alt={`Pin for ${site.name}`}
                className="w-6 h-6 drop-shadow-lg group-hover:drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] transition-all"
              />
            </div>
          );
        })}

        {/* Hover Popup */}
        {hoveredSite && (
          <div 
            className="fixed z-50 animate-fade-in"
            style={{
              left: `${popoverPosition.x}px`,
              top: `${popoverPosition.y - 10}px`,
              transform: 'translate(-50%, -100%)',
              pointerEvents: 'none'
            }}
          >
            <Card className="w-80 shadow-xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{hoveredSite.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {hoveredSite.archetype}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {hoveredSite.location} • {hoveredSite.category}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed">
                  {hoveredSite.description}
                </p>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm italic text-primary/80">
                    "{hoveredSite.invocation}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from(new Set(sacredSites.map(s => s.category))).map((category) => (
          <div key={category} className="flex items-center gap-2">
            <img src={pinImage} alt="pin" className="w-4 h-4" />
            <span className="text-sm text-muted-foreground">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SacredSitesMap;
