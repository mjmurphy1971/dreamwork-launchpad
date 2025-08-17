import { useState, useEffect } from "react";
import { Plus, X, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Bubble {
  id: string;
  text: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
}

const bubbleColors = [
  "from-blue-400/30 to-blue-600/30",
  "from-purple-400/30 to-purple-600/30", 
  "from-pink-400/30 to-pink-600/30",
  "from-teal-400/30 to-teal-600/30",
  "from-orange-400/30 to-orange-600/30",
  "from-green-400/30 to-green-600/30"
];

const ThoughtBubbles = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [newThought, setNewThought] = useState("");
  const [isReleasing, setIsReleasing] = useState(false);

  const createBubble = (text: string) => {
    const bubble: Bubble = {
      id: Date.now().toString(),
      text,
      x: Math.random() * 80 + 10, // 10-90% of screen width
      y: 90, // Start at bottom
      size: Math.random() * 60 + 40, // 40-100px
      opacity: 1,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
    };
    setBubbles(prev => [...prev, bubble]);
  };

  const releaseThought = () => {
    if (!newThought.trim()) return;
    
    setIsReleasing(true);
    createBubble(newThought);
    setNewThought("");
    
    setTimeout(() => setIsReleasing(false), 1000);
  };

  const releaseAllBubbles = () => {
    setBubbles(prev => 
      prev.map(bubble => ({
        ...bubble,
        y: -20,
        opacity: 0
      }))
    );
    
    setTimeout(() => setBubbles([]), 2000);
  };

  // Animate bubbles floating up
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbles(prev => 
        prev.map(bubble => ({
          ...bubble,
          y: bubble.y - (Math.random() * 2 + 0.5),
          x: bubble.x + (Math.sin(Date.now() * 0.001 + parseFloat(bubble.id)) * 0.5),
          opacity: bubble.y < 10 ? bubble.opacity - 0.02 : bubble.opacity
        })).filter(bubble => bubble.opacity > 0 && bubble.y > -50)
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const presetWorries = [
    "I'm not good enough",
    "What if I fail?",
    "I don't have enough time",
    "People will judge me",
    "I'm behind in life",
    "I can't handle this",
    "Nothing ever works out",
    "I'm too old/young"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Header />
      
      {/* Floating bubbles */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className={`absolute transition-all duration-1000 ease-out bg-gradient-to-br ${bubble.color} backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center p-4 shadow-lg`}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              opacity: bubble.opacity,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <span className="text-xs text-white font-medium text-center leading-tight max-w-full">
              {bubble.text.length > 50 ? bubble.text.substring(0, 50) + '...' : bubble.text}
            </span>
          </div>
        ))}
      </div>

      <main className="container mx-auto px-4 py-8 relative z-20">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🧠 Thought Bubble Release
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your worries into floating bubbles and watch them drift away. 
            A playful way to practice letting go and finding mental clarity.
          </p>
        </section>

        {/* Release Interface */}
        <section className="max-w-2xl mx-auto mb-12">
          <Card className="bg-card/90 backdrop-blur-sm border-border/50 shadow-card">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What thought would you like to release?
                  </label>
                  <Textarea
                    placeholder="Write any worry, fear, or negative thought here..."
                    value={newThought}
                    onChange={(e) => setNewThought(e.target.value)}
                    className="min-h-[100px] resize-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        releaseThought();
                      }
                    }}
                  />
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={releaseThought}
                    disabled={!newThought.trim() || isReleasing}
                    className="bg-gradient-primary hover:opacity-90"
                  >
                    <Wind className="mr-2 w-4 h-4" />
                    {isReleasing ? "Releasing..." : "Release Thought"}
                  </Button>
                  
                  {bubbles.length > 0 && (
                    <Button
                      onClick={releaseAllBubbles}
                      variant="outline"
                    >
                      <X className="mr-2 w-4 h-4" />
                      Clear All Bubbles
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Quick Release Buttons */}
        <section className="max-w-4xl mx-auto mb-12">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-xl font-heading font-bold text-center mb-6">
                Quick Release Common Worries
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
                {presetWorries.map((worry, index) => (
                  <Button
                    key={index}
                    onClick={() => createBubble(worry)}
                    variant="outline"
                    size="sm"
                    className="text-xs h-auto py-3 px-4 text-left justify-start whitespace-normal"
                  >
                    <Plus className="mr-2 w-3 h-3 flex-shrink-0" />
                    {worry}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Instructions */}
        <section className="max-w-4xl mx-auto">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6">
                How Thought Release Works
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✍️</span>
                  </div>
                  <h4 className="font-semibold mb-2">1. Write It Down</h4>
                  <p className="text-muted-foreground text-sm">
                    Capture the thought, worry, or fear that's been weighing on your mind.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🫧</span>
                  </div>
                  <h4 className="font-semibold mb-2">2. Create a Bubble</h4>
                  <p className="text-muted-foreground text-sm">
                    Watch your thought transform into a beautiful floating bubble.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌬️</span>
                  </div>
                  <h4 className="font-semibold mb-2">3. Let It Float Away</h4>
                  <p className="text-muted-foreground text-sm">
                    Feel the relief as your worry drifts up and disappears into the sky.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <p className="text-center text-muted-foreground text-sm leading-relaxed">
                  <strong>Mindfulness Tip:</strong> As you watch each bubble float away, 
                  take a deep breath and feel the weight of that thought lifting from your mind and body. 
                  This practice helps create distance between you and your worries, 
                  reminding you that thoughts are temporary visitors, not permanent residents.
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

export default ThoughtBubbles;