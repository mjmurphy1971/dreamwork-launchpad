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
        // Create custom glowing pin marker element
        const el = document.createElement('div');
        el.className = 'sacred-site-marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50% 50% 50% 0';
        el.style.background = 'linear-gradient(135deg, #fef08a 0%, #facc15 50%, #fbbf24 100%)';
        el.style.transform = 'rotate(-45deg)';
        el.style.cursor = 'pointer';
        el.style.transition = 'all 0.3s ease';
        el.style.boxShadow = '0 0 12px rgba(250, 204, 21, 0.8), 0 0 20px rgba(254, 240, 138, 0.6)';
        el.style.border = '2px solid rgba(255, 255, 255, 0.9)';
        el.style.position = 'relative';
        el.style.transformOrigin = 'bottom left';

        // Add a bright center dot
        const dot = document.createElement('div');
        dot.style.width = '6px';
        dot.style.height = '6px';
        dot.style.borderRadius = '50%';
        dot.style.background = 'rgba(255, 255, 255, 0.95)';
        dot.style.position = 'absolute';
        dot.style.top = '50%';
        dot.style.left = '50%';
        dot.style.transform = 'translate(-50%, -50%)';
        dot.style.boxShadow = '0 0 8px rgba(255, 255, 255, 0.9)';
        el.appendChild(dot);

        // Add hover effects
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'rotate(-45deg) scale(1.4)';
          el.style.boxShadow = '0 0 20px rgba(250, 204, 21, 1), 0 0 30px rgba(254, 240, 138, 0.9)';
          setSelectedSite(site);
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'rotate(-45deg) scale(1)';
          el.style.boxShadow = '0 0 12px rgba(250, 204, 21, 0.8), 0 0 20px rgba(254, 240, 138, 0.6)';
          setSelectedSite(null);
        });

        // Add click to search
        el.addEventListener('click', () => {
          const searchQuery = encodeURIComponent(`${site.name} ${site.location} sacred site`);
          window.open(`https://www.bing.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
        });

        // Create marker with proper anchor at the tip of the pin
        // Using 'bottom-left' because after rotation, that's where the point is
        const marker = new mapboxgl.Marker({
          element: el,
          anchor: 'bottom-left',
          offset: [0, 0] // Fine-tune if needed
        })
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

      {/* Sacred Sites Directory - Grouped by Location */}
      <div className="mt-12 animate-fade-in">
        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Sacred Sites Directory
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(
            sacredSites.reduce((acc, site) => {
              const country = site.location;
              if (!acc[country]) acc[country] = [];
              acc[country].push(site);
              return acc;
            }, {} as Record<string, typeof sacredSites>)
          )
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([country, sites]) => (
            <Card key={country} className="hover:border-primary/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <span className="text-primary">📍</span>
                  {country}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {sites.map((site) => (
                    <li key={site.name}>
                      <a
                        href={`https://www.bing.com/search?q=${encodeURIComponent(`${site.name} ${site.location} sacred site`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary group-hover:animate-pulse" />
                        {site.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
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
