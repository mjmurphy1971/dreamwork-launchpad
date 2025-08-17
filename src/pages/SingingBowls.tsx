import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Bowl {
  id: string;
  name: string;
  frequency: number;
  chakra: string;
  color: string;
  size: number;
  note: string;
  benefits: string;
}

const bowls: Bowl[] = [
  {
    id: "root",
    name: "Root Chakra Bowl",
    frequency: 396,
    chakra: "Root (Muladhara)",
    color: "from-red-500 to-red-700",
    size: 120,
    note: "C",
    benefits: "Grounding, security, survival instincts"
  },
  {
    id: "sacral", 
    name: "Sacral Chakra Bowl",
    frequency: 417,
    chakra: "Sacral (Svadhisthana)",
    color: "from-orange-500 to-orange-700",
    size: 110,
    note: "D",
    benefits: "Creativity, sexuality, emotional balance"
  },
  {
    id: "solar",
    name: "Solar Plexus Bowl",
    frequency: 528,
    chakra: "Solar Plexus (Manipura)",
    color: "from-yellow-500 to-yellow-700",
    size: 100,
    note: "E",
    benefits: "Personal power, confidence, transformation"
  },
  {
    id: "heart",
    name: "Heart Chakra Bowl",
    frequency: 639,
    chakra: "Heart (Anahata)",
    color: "from-green-500 to-green-700",
    size: 90,
    note: "F",
    benefits: "Love, compassion, emotional healing"
  },
  {
    id: "throat",
    name: "Throat Chakra Bowl",
    frequency: 741,
    chakra: "Throat (Vishuddha)",
    color: "from-blue-500 to-blue-700",
    size: 80,
    note: "G",
    benefits: "Communication, truth, self-expression"
  },
  {
    id: "third-eye",
    name: "Third Eye Bowl",
    frequency: 852,
    chakra: "Third Eye (Ajna)",
    color: "from-indigo-500 to-indigo-700",
    size: 70,
    note: "A",
    benefits: "Intuition, wisdom, spiritual insight"
  },
  {
    id: "crown",
    name: "Crown Chakra Bowl",
    frequency: 963,
    chakra: "Crown (Sahasrara)",
    color: "from-purple-500 to-purple-700",
    size: 60,
    note: "B",
    benefits: "Spiritual connection, enlightenment, unity"
  }
];

const SingingBowls = () => {
  const [activeBowls, setActiveBowls] = useState<Set<string>>(new Set());
  const [masterVolume, setMasterVolume] = useState([0.5]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<Map<string, OscillatorNode>>(new Map());
  const gainNodesRef = useRef<Map<string, GainNode>>(new Map());
  const masterGainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    // Initialize audio context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGainRef.current = audioContextRef.current.createGain();
    masterGainRef.current.connect(audioContextRef.current.destination);
    masterGainRef.current.gain.setValueAtTime(masterVolume[0], audioContextRef.current.currentTime);

    return () => {
      stopAllBowls();
      audioContextRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (masterGainRef.current && audioContextRef.current) {
      masterGainRef.current.gain.setValueAtTime(masterVolume[0], audioContextRef.current.currentTime);
    }
  }, [masterVolume]);

  const playBowl = (bowl: Bowl) => {
    if (!audioContextRef.current || !masterGainRef.current) return;

    // Resume audio context if suspended
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }

    // Stop existing oscillator for this bowl
    const existingOscillator = oscillatorsRef.current.get(bowl.id);
    if (existingOscillator) {
      existingOscillator.stop();
      oscillatorsRef.current.delete(bowl.id);
    }

    // Create new oscillator
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(bowl.frequency, audioContextRef.current.currentTime);
    
    // Gentle attack and decay
    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContextRef.current.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.1, audioContextRef.current.currentTime + 2);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 8);

    oscillator.connect(gainNode);
    gainNode.connect(masterGainRef.current);

    oscillator.start();
    oscillator.stop(audioContextRef.current.currentTime + 8);

    oscillatorsRef.current.set(bowl.id, oscillator);
    gainNodesRef.current.set(bowl.id, gainNode);

    // Clean up when done
    oscillator.onended = () => {
      oscillatorsRef.current.delete(bowl.id);
      gainNodesRef.current.delete(bowl.id);
      setActiveBowls(prev => {
        const newSet = new Set(prev);
        newSet.delete(bowl.id);
        return newSet;
      });
    };

    setActiveBowls(prev => new Set(prev).add(bowl.id));
  };

  const stopBowl = (bowlId: string) => {
    const oscillator = oscillatorsRef.current.get(bowlId);
    const gainNode = gainNodesRef.current.get(bowlId);
    
    if (oscillator && gainNode && audioContextRef.current) {
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
      oscillator.stop(audioContextRef.current.currentTime + 0.3);
    }
  };

  const stopAllBowls = () => {
    oscillatorsRef.current.forEach((oscillator, bowlId) => {
      stopBowl(bowlId);
    });
    setActiveBowls(new Set());
    setIsPlaying(false);
  };

  const playSequence = async () => {
    if (isPlaying) {
      stopAllBowls();
      return;
    }

    setIsPlaying(true);
    
    for (const bowl of bowls) {
      if (!isPlaying) break;
      playBowl(bowl);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🎵 Singing Bowl Simulator
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Experience the healing vibrations of Tibetan singing bowls. Each bowl is tuned to 
            specific frequencies that resonate with your chakras and promote deep relaxation.
          </p>
        </section>

        {/* Controls */}
        <section className="max-w-md mx-auto mb-12">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-medium">Master Volume</label>
                    <span className="text-sm text-muted-foreground">{Math.round(masterVolume[0] * 100)}%</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Volume2 className="w-4 h-4 text-muted-foreground" />
                    <Slider
                      value={masterVolume}
                      onValueChange={setMasterVolume}
                      max={1}
                      min={0}
                      step={0.1}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    onClick={playSequence}
                    className="flex-1"
                    variant={isPlaying ? "destructive" : "default"}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="mr-2 w-4 h-4" />
                        Stop Sequence
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 w-4 h-4" />
                        Play Sequence
                      </>
                    )}
                  </Button>
                  
                  <Button
                    onClick={stopAllBowls}
                    variant="outline"
                    disabled={activeBowls.size === 0}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Singing Bowls */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {bowls.map((bowl) => {
              const isActive = activeBowls.has(bowl.id);
              
              return (
                <div key={bowl.id} className="text-center">
                  <div
                    className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                      isActive ? 'animate-pulse' : ''
                    }`}
                    onClick={() => playBowl(bowl)}
                  >
                    <div
                      className={`w-${bowl.size}px h-${bowl.size}px mx-auto rounded-full bg-gradient-to-br ${bowl.color} shadow-lg border-4 border-white/20 flex items-center justify-center relative overflow-hidden`}
                      style={{ 
                        width: `${bowl.size}px`, 
                        height: `${bowl.size}px`,
                        boxShadow: isActive ? `0 0 30px rgba(255, 255, 255, 0.5)` : undefined
                      }}
                    >
                      {/* Bowl rim */}
                      <div className="absolute inset-2 rounded-full border-2 border-white/30" />
                      
                      {/* Center dot */}
                      <div className="w-3 h-3 bg-white/60 rounded-full" />
                      
                      {/* Ripple effect when active */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1">
                    <h3 className="font-semibold text-sm">{bowl.note} - {bowl.frequency}Hz</h3>
                    <p className="text-xs text-muted-foreground">{bowl.chakra}</p>
                    <p className="text-xs text-muted-foreground leading-tight max-w-[120px] mx-auto">
                      {bowl.benefits}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Instructions */}
        <section className="max-w-4xl mx-auto">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6">
                How to Use Singing Bowls
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧘</span>
                  </div>
                  <h4 className="font-semibold mb-2">1. Find Your Center</h4>
                  <p className="text-muted-foreground text-sm">
                    Sit comfortably and take a few deep breaths to ground yourself.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <h4 className="font-semibold mb-2">2. Choose Your Bowl</h4>
                  <p className="text-muted-foreground text-sm">
                    Click on any bowl or play the full sequence for complete chakra balancing.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌊</span>
                  </div>
                  <h4 className="font-semibold mb-2">3. Feel the Vibration</h4>
                  <p className="text-muted-foreground text-sm">
                    Let the healing frequencies wash over you and restore inner harmony.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <p className="text-center text-muted-foreground text-sm leading-relaxed">
                  <strong>Sound Healing Tip:</strong> Each frequency corresponds to a specific chakra and 
                  promotes different aspects of well-being. Use headphones for the best experience, 
                  and allow the sounds to penetrate deeply into your consciousness for maximum healing benefit.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SingingBowls;