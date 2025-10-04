import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { sacredSites } from "@/data/sacredSites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1IjoidGhlZHJlYW13b3JrIiwiYSI6ImNtZ2Nuc2gwNjA1d3Mya3BzMGxubmgxN3UifQ.5d1QdK-GI5oLDC5ZhR0dIQ';

const SacredSitesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [selectedSite, setSelectedSite] = useState<typeof sacredSites[0] | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Initialize map with beautiful styling
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for mystical feel
      projection: { name: 'globe' },
      zoom: 1.5,
      center: [20, 20],
      pitch: 0,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add atmosphere effect
    map.current.on('style.load', () => {
      if (!map.current) return;
      
      map.current.setFog({
        color: 'rgb(30, 20, 50)',
        'high-color': 'rgb(100, 70, 130)',
        'horizon-blend': 0.1,
        'space-color': 'rgb(10, 5, 20)',
        'star-intensity': 0.6
      });
    });

    // Gentle rotation animation
    const secondsPerRevolution = 300;
    const maxSpinZoom = 5;
    const slowSpinZoom = 3;
    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Event listeners for interaction
    map.current.on('mousedown', () => { userInteracting = true; });
    map.current.on('dragstart', () => { userInteracting = true; });
    map.current.on('mouseup', () => { userInteracting = false; spinGlobe(); });
    map.current.on('touchend', () => { userInteracting = false; spinGlobe(); });
    map.current.on('moveend', () => { spinGlobe(); });

    // Start spinning
    spinGlobe();

    // Add markers after map loads
    map.current.on('load', () => {
      sacredSites.forEach((site) => {
        // Create custom marker element
        const el = document.createElement('div');
        el.className = 'sacred-site-marker';
        el.style.width = '24px';
        el.style.height = '24px';
        el.style.backgroundImage = 'url(/lovable-uploads/f889b3fe-21b5-4455-84b9-48b5406e1764.png)';
        el.style.backgroundSize = 'contain';
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.3s ease';
        el.style.filter = 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))';

        // Add hover effects
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.3)';
          el.style.filter = 'drop-shadow(0 0 15px rgba(250, 204, 21, 0.9))';
          setSelectedSite(site);
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)';
          el.style.filter = 'drop-shadow(0 0 8px rgba(250, 204, 21, 0.6))';
          setSelectedSite(null);
        });

        // Add click to search
        el.addEventListener('click', () => {
          const searchQuery = encodeURIComponent(`${site.name} ${site.location} sacred site`);
          window.open(`https://www.bing.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
        });

        // Create marker
        const marker = new mapboxgl.Marker(el)
          .setLngLat([site.coordinates[1], site.coordinates[0]]) // [lng, lat]
          .addTo(map.current!);

        markersRef.current.push(marker);
      });
    });

    // Cleanup
    return () => {
      markersRef.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8 animate-fade-in">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          🌍 Sacred Sites Around the World
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore sacred spaces across continents. Hover over each glowing pin to discover the wisdom, invocation, and archetype of these powerful portals. Click any pin to learn more.
        </p>
      </div>

      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden shadow-2xl">
        {/* Mapbox Container */}
        <div ref={mapContainer} className="absolute inset-0 w-full h-full" />

        {/* Hover Card */}
        {selectedSite && (
          <div className="absolute top-4 left-4 z-10 animate-fade-in">
            <Card className="w-80 shadow-xl border-2 border-primary/20 bg-card/95 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{selectedSite.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {selectedSite.archetype}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedSite.location} • {selectedSite.category}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed">
                  {selectedSite.description}
                </p>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm italic text-primary/80">
                    "{selectedSite.invocation}"
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Instructions overlay */}
        <div className="absolute bottom-4 right-4 z-10 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-muted-foreground">
          Click and drag to explore • Scroll to zoom • Click pins to learn more
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
        {Array.from(new Set(sacredSites.map(s => s.category))).map((category) => (
          <div key={category} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary/60 animate-pulse" />
            <span className="text-sm text-muted-foreground">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SacredSitesMap;
