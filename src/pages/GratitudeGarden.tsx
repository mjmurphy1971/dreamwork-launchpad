import { useState, useEffect } from "react";
import { Plus, Trash2, Flower, Heart, Star, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface GratitudeFlower {
  id: string;
  gratitude: string;
  date: string;
  type: 'rose' | 'sunflower' | 'lotus' | 'tulip' | 'cherry' | 'lavender';
  color: string;
  x: number;
  y: number;
}

const flowerTypes = [
  { type: 'rose' as const, emoji: '🌹', color: 'text-red-500' },
  { type: 'sunflower' as const, emoji: '🌻', color: 'text-yellow-500' },
  { type: 'lotus' as const, emoji: '🪷', color: 'text-pink-500' },
  { type: 'tulip' as const, emoji: '🌷', color: 'text-purple-500' },
  { type: 'cherry' as const, emoji: '🌸', color: 'text-pink-400' },
  { type: 'lavender' as const, emoji: '🌺', color: 'text-indigo-500' }
];

const GratitudeGarden = () => {
  const [flowers, setFlowers] = useState<GratitudeFlower[]>([]);
  const [newGratitude, setNewGratitude] = useState("");
  const [selectedFlower, setSelectedFlower] = useState<GratitudeFlower | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Load flowers from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('gratitudeFlowers');
    if (saved) {
      setFlowers(JSON.parse(saved));
    }
  }, []);

  // Save flowers to localStorage
  useEffect(() => {
    localStorage.setItem('gratitudeFlowers', JSON.stringify(flowers));
  }, [flowers]);

  const plantFlower = () => {
    if (!newGratitude.trim()) return;

    const randomFlowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
    
    const newFlower: GratitudeFlower = {
      id: Date.now().toString(),
      gratitude: newGratitude.trim(),
      date: new Date().toLocaleDateString(),
      type: randomFlowerType.type,
      color: randomFlowerType.color,
      x: Math.random() * 60 + 20, // 20-80% of container width  
      y: Math.random() * 30 + 10   // 10-40% of container height (from bottom)
    };

    console.log('Planting flower:', newFlower); // Debug log
    setFlowers(prev => {
      const updated = [...prev, newFlower];
      console.log('Updated flowers array:', updated); // Debug log
      return updated;
    });
    setNewGratitude("");
    setShowForm(false);
  };

  const removeFlower = (id: string) => {
    setFlowers(prev => prev.filter(f => f.id !== id));
    setSelectedFlower(null);
  };

  const getFlowerEmoji = (type: GratitudeFlower['type']) => {
    return flowerTypes.find(f => f.type === type)?.emoji || '🌸';
  };

  const inspirationalPrompts = [
    "A moment of peace I experienced today",
    "Someone who made me smile recently", 
    "A simple pleasure I enjoyed",
    "Something beautiful I noticed",
    "A skill or ability I'm grateful for",
    "A memory that brings me joy",
    "An act of kindness I witnessed",
    "Something that made me laugh"
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🌸 Gratitude Garden
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Plant flowers of gratitude and watch your garden of appreciation bloom. 
            Each grateful thought becomes a beautiful flower in your personal sanctuary.
          </p>
        </section>

        {/* Garden Stats */}
        <section className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">{flowers.length}</div>
              <div className="text-sm text-muted-foreground">Flowers Planted</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">
                {flowers.filter(f => f.date === new Date().toLocaleDateString()).length}
              </div>
              <div className="text-sm text-muted-foreground">Today</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">
                {new Set(flowers.map(f => f.date)).size}
              </div>
              <div className="text-sm text-muted-foreground">Days Practiced</div>
            </Card>
            <Card className="text-center p-4">
              <div className="text-2xl font-bold text-primary">
                {new Set(flowers.map(f => f.type)).size}
              </div>
              <div className="text-sm text-muted-foreground">Flower Types</div>
            </Card>
          </div>
        </section>

        {/* Garden Visualization */}
        <section className="max-w-6xl mx-auto mb-8">
          <Card className="relative min-h-[400px] bg-gradient-to-b from-sky-100 to-green-100 dark:from-sky-900/20 dark:to-green-900/20 border-2 border-green-200 dark:border-green-800 overflow-hidden">
            <CardContent className="p-0 relative h-full">
              {/* Sky background */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20" />
              
              {/* Ground */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-200 to-green-100 dark:from-green-800/30 dark:to-green-700/20" />
              
              {/* Sun */}
              <div className="absolute top-4 right-4">
                <Sun className="w-12 h-12 text-yellow-400 animate-pulse" />
              </div>
              
              {/* Flowers */}
              {flowers.map((flower) => {
                console.log('Rendering flower:', flower); // Debug log
                return (
                  <div
                    key={flower.id}
                    className="absolute cursor-pointer transition-transform hover:scale-110 animate-fade-in z-10"
                    style={{ 
                      left: `${flower.x}%`, 
                      bottom: `${25 + flower.y}%`, // Ensure flowers appear above ground
                      transform: 'translate(-50%, 0)',
                      zIndex: 10
                    }}
                    onClick={() => setSelectedFlower(flower)}
                  >
                    <div className="text-5xl hover:drop-shadow-lg filter drop-shadow-sm">
                      {getFlowerEmoji(flower.type)}
                    </div>
                    <div className="text-center text-xs text-muted-foreground mt-1 max-w-[80px] mx-auto truncate">
                      {flower.gratitude.length > 15 ? flower.gratitude.substring(0, 15) + '...' : flower.gratitude}
                    </div>
                  </div>
                );
              })}
              
              {/* Empty garden message */}
              {flowers.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Flower className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Your garden is waiting to bloom!</p>
                    <p className="text-sm">Plant your first flower of gratitude</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Add Gratitude Button - More Prominent */}
        <section className="text-center mb-8">
          <div className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 max-w-2xl mx-auto border-2 border-dashed border-primary/30">
            <div className="text-4xl mb-4">🌻</div>
            <h3 className="text-2xl font-heading font-bold mb-4 gradient-text">
              Ready to Plant Some Gratitude?
            </h3>
            <p className="text-muted-foreground mb-6">
              Transform your appreciation into a beautiful flower that will bloom in your personal garden
            </p>
            <Button
              onClick={() => setShowForm(!showForm)}
              size="lg"
              className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-4 shadow-lg text-white font-bold"
            >
              <Plus className="mr-3 w-6 h-6" />
              {showForm ? "Hide Form" : "Plant a Flower of Gratitude"}
            </Button>
          </div>
        </section>

        {/* Gratitude Form */}
        {showForm && (
          <section className="max-w-2xl mx-auto mb-8 animate-fade-in">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-heading font-bold text-center">
                  What are you grateful for today?
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="I'm grateful for..."
                  value={newGratitude}
                  onChange={(e) => setNewGratitude(e.target.value)}
                  className="min-h-[100px]"
                />
                
                <div className="text-sm text-muted-foreground">
                  <p className="mb-2">Need inspiration? Try reflecting on:</p>
                  <div className="grid md:grid-cols-2 gap-2">
                    {inspirationalPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => setNewGratitude(prompt + ": ")}
                        className="text-left p-2 rounded hover:bg-muted transition-gentle text-xs"
                      >
                        • {prompt}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={plantFlower}
                    disabled={!newGratitude.trim()}
                  >
                    <Flower className="mr-2 w-4 h-4" />
                    Plant Flower
                  </Button>
                  <Button
                    onClick={() => setShowForm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Selected Flower Details */}
        {selectedFlower && (
          <section className="max-w-md mx-auto mb-8 animate-fade-in">
            <Card className="border-2 border-primary/50">
              <CardContent className="p-6 text-center">
                <div className="text-6xl mb-4">
                  {getFlowerEmoji(selectedFlower.type)}
                </div>
                <p className="text-lg mb-4 leading-relaxed">
                  {selectedFlower.gratitude}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Planted on {selectedFlower.date}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => setSelectedFlower(null)}
                    variant="outline"
                    size="sm"
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => removeFlower(selectedFlower.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4" />
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
                How Your Garden Grows
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">1. Feel Grateful</h4>
                  <p className="text-muted-foreground text-sm">
                    Notice something you appreciate - big or small, it all counts.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Flower className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">2. Plant a Flower</h4>
                  <p className="text-muted-foreground text-sm">
                    Write your gratitude and watch it bloom into a beautiful flower.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">3. Watch It Grow</h4>
                  <p className="text-muted-foreground text-sm">
                    Return daily to see your garden flourish with appreciation.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <p className="text-center text-muted-foreground text-sm leading-relaxed">
                  <strong>Gratitude Science:</strong> Research shows that regular gratitude practice 
                  can improve mental health, increase life satisfaction, and enhance relationships. 
                  Your garden serves as a beautiful visual reminder of all the good in your life!
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

export default GratitudeGarden;