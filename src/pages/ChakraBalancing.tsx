import { useState, useEffect } from "react";
import { Play, RotateCcw, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Chakra {
  id: string;
  name: string;
  color: string;
  position: { x: number; y: number };
  frequency: number;
  element: string;
  affirmation: string;
  balance: number;
  isActive: boolean;
}

const chakras: Chakra[] = [
  {
    id: "crown",
    name: "Crown Chakra",
    color: "from-purple-400 to-violet-600",
    position: { x: 50, y: 5 },
    frequency: 963,
    element: "Thought",
    affirmation: "I am connected to divine wisdom",
    balance: 0,
    isActive: false
  },
  {
    id: "third-eye",
    name: "Third Eye Chakra", 
    color: "from-indigo-400 to-purple-600",
    position: { x: 50, y: 15 },
    frequency: 852,
    element: "Light",
    affirmation: "I trust my inner wisdom and intuition",
    balance: 0,
    isActive: false
  },
  {
    id: "throat",
    name: "Throat Chakra",
    color: "from-blue-400 to-cyan-600",
    position: { x: 50, y: 28 },
    frequency: 741,
    element: "Sound",
    affirmation: "I speak my truth with confidence",
    balance: 0,
    isActive: false
  },
  {
    id: "heart",
    name: "Heart Chakra",
    color: "from-green-400 to-emerald-600",
    position: { x: 50, y: 42 },
    frequency: 639,
    element: "Air",
    affirmation: "I give and receive love freely",
    balance: 0,
    isActive: false
  },
  {
    id: "solar",
    name: "Solar Plexus Chakra",
    color: "from-yellow-400 to-orange-500",
    position: { x: 50, y: 56 },
    frequency: 528,
    element: "Fire",
    affirmation: "I am confident and empowered",
    balance: 0,
    isActive: false
  },
  {
    id: "sacral",
    name: "Sacral Chakra",
    color: "from-orange-400 to-red-500",
    position: { x: 50, y: 70 },
    frequency: 417,
    element: "Water",
    affirmation: "I embrace my creativity and emotions",
    balance: 0,
    isActive: false
  },
  {
    id: "root",
    name: "Root Chakra",
    color: "from-red-500 to-red-700",
    position: { x: 50, y: 84 },
    frequency: 396,
    element: "Earth",
    affirmation: "I am grounded and secure",
    balance: 0,
    isActive: false
  }
];

const ChakraBalancing = () => {
  const [chakraStates, setChakraStates] = useState<Chakra[]>(chakras);
  const [selectedChakra, setSelectedChakra] = useState<Chakra | null>(null);
  const [isBalancing, setIsBalancing] = useState(false);
  const [overallBalance, setOverallBalance] = useState(0);

  const playChakraSound = (frequency: number) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 3);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 3);
  };

  const balanceChakra = (chakraId: string) => {
    setChakraStates(prev => 
      prev.map(chakra => {
        if (chakra.id === chakraId) {
          const newBalance = Math.min(100, chakra.balance + 20);
          playChakraSound(chakra.frequency);
          return { 
            ...chakra, 
            balance: newBalance,
            isActive: true
          };
        }
        return { ...chakra, isActive: false };
      })
    );
  };

  const resetAllChakras = () => {
    setChakraStates(prev => 
      prev.map(chakra => ({ ...chakra, balance: 0, isActive: false }))
    );
    setSelectedChakra(null);
  };

  const autoBalance = async () => {
    setIsBalancing(true);
    
    for (let i = 0; i < chakras.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      balanceChakra(chakras[i].id);
    }
    
    setIsBalancing(false);
  };

  useEffect(() => {
    const totalBalance = chakraStates.reduce((sum, chakra) => sum + chakra.balance, 0);
    setOverallBalance(Math.round(totalBalance / chakraStates.length));
  }, [chakraStates]);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🌈 Chakra Balancing Game
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Balance your energy centers through interactive visualization, healing frequencies, 
            and sacred affirmations. Watch your chakras glow as they align and harmonize.
          </p>
        </section>

        {/* Controls and Progress */}
        <section className="max-w-md mx-auto mb-8">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Balance</span>
                  <span className="text-sm text-muted-foreground">{overallBalance}%</span>
                </div>
                <Progress value={overallBalance} className="w-full" />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={autoBalance}
                  disabled={isBalancing}
                  className="flex-1"
                >
                  <Play className="mr-2 w-4 h-4" />
                  {isBalancing ? "Balancing..." : "Auto Balance"}
                </Button>
                
                <Button
                  onClick={resetAllChakras}
                  variant="outline"
                  disabled={isBalancing}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Chakra Visualization */}
        <section className="max-w-2xl mx-auto mb-8">
          <Card className="relative min-h-[600px] bg-gradient-to-b from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 border-2">
            <CardContent className="p-0 relative h-full">
              {/* Body Silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-[500px] bg-gray-200/30 dark:bg-gray-700/30 rounded-full"></div>
              </div>
              
              {/* Chakras */}
              {chakraStates.map((chakra) => (
                <div
                  key={chakra.id}
                  className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                  style={{
                    left: `${chakra.position.x}%`,
                    top: `${chakra.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => {
                    balanceChakra(chakra.id);
                    setSelectedChakra(chakra);
                  }}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${chakra.color} shadow-lg border-4 border-white/50 flex items-center justify-center relative ${
                      chakra.isActive ? 'animate-pulse shadow-2xl' : ''
                    }`}
                    style={{
                      opacity: 0.3 + (chakra.balance / 100) * 0.7,
                      boxShadow: chakra.balance > 50 ? `0 0 30px rgba(255, 255, 255, 0.6)` : undefined
                    }}
                  >
                    <div className="text-white text-xs font-bold">
                      {chakra.balance}%
                    </div>
                    
                    {/* Ripple effect when balanced */}
                    {chakra.balance === 100 && (
                      <div className="absolute inset-0 rounded-full bg-white/30 animate-ping"></div>
                    )}
                  </div>
                  
                  <div className="text-center mt-2">
                    <p className="text-xs font-semibold text-foreground">{chakra.name}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Selected Chakra Details */}
        {selectedChakra && (
          <section className="max-w-md mx-auto mb-8 animate-fade-in">
            <Card className={`border-2 bg-gradient-to-br ${selectedChakra.color} text-white`}>
              <CardHeader>
                <h3 className="text-xl font-heading font-bold text-center">
                  {selectedChakra.name}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-2">
                    <strong>Element:</strong> {selectedChakra.element}
                  </p>
                  <p className="text-sm opacity-90 mb-4">
                    <strong>Frequency:</strong> {selectedChakra.frequency}Hz
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="italic text-sm leading-relaxed">
                      "{selectedChakra.affirmation}"
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={() => playChakraSound(selectedChakra.frequency)}
                    variant="outline"
                    size="sm"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                  >
                    <Volume2 className="mr-2 w-4 h-4" />
                    Play Healing Frequency
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Instructions */}
        <section className="max-w-4xl mx-auto">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6">
                How to Balance Your Chakras
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h4 className="font-semibold mb-2">1. Click to Balance</h4>
                  <p className="text-muted-foreground text-sm">
                    Click on any chakra point to send healing energy and increase its balance.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <h4 className="font-semibold mb-2">2. Feel the Frequency</h4>
                  <p className="text-muted-foreground text-sm">
                    Each chakra plays its healing frequency. Listen and let the vibrations align your energy.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h4 className="font-semibold mb-2">3. Achieve Harmony</h4>
                  <p className="text-muted-foreground text-sm">
                    Balance all chakras to 100% and feel the powerful energy of complete alignment.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <p className="text-center text-muted-foreground text-sm leading-relaxed">
                  <strong>Chakra Wisdom:</strong> Each energy center corresponds to different aspects of your being. 
                  Take time with each chakra, repeat the affirmations, and visualize the colors flowing through your body 
                  for a deeper, more transformative experience.
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

export default ChakraBalancing;