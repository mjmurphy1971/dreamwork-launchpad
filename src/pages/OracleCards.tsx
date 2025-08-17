import { useState } from "react";
import { Shuffle, Heart, Star, Compass, Sun, Moon, TreePine, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TextToSpeech } from "@/components/TextToSpeech";

const oracleCards = [
  {
    title: "Trust Your Journey",
    message: "Every step you take is leading you exactly where you need to be. Trust the process, even when the path seems unclear.",
    affirmation: "I trust in the perfect unfolding of my life's journey.",
    icon: Compass,
    color: "from-blue-400 to-purple-600"
  },
  {
    title: "Inner Light",
    message: "Your inner light is always shining, even in the darkest moments. Allow it to guide you forward with love and grace.",
    affirmation: "I am filled with divine light that illuminates my path.",
    icon: Sun,
    color: "from-yellow-400 to-orange-500"
  },
  {
    title: "Embrace Change",
    message: "Change is the universe's way of helping you grow. Welcome it with open arms and an open heart.",
    affirmation: "I embrace change as an opportunity for growth and transformation.",
    icon: Waves,
    color: "from-teal-400 to-blue-500"
  },
  {
    title: "Deep Rest",
    message: "Your soul is calling for rest and restoration. Honor this need and allow yourself to receive the healing you deserve.",
    affirmation: "I honor my need for rest and restoration.",
    icon: Moon,
    color: "from-indigo-400 to-purple-600"
  },
  {
    title: "Rooted Strength",
    message: "Like a tree, you are both grounded and reaching toward the light. Your strength comes from deep roots and endless growth.",
    affirmation: "I am grounded in my strength and reaching toward my highest potential.",
    icon: TreePine,
    color: "from-green-400 to-emerald-600"
  },
  {
    title: "Love Frequency",
    message: "You are loved beyond measure. Open your heart to receive this love and let it overflow to others.",
    affirmation: "I am worthy of infinite love and I share this love freely.",
    icon: Heart,
    color: "from-pink-400 to-rose-500"
  },
  {
    title: "Divine Timing",
    message: "Everything is happening in perfect timing. What seems delayed is actually divinely orchestrated for your highest good.",
    affirmation: "I trust in divine timing and surrender to the flow of life.",
    icon: Star,
    color: "from-violet-400 to-purple-500"
  },
  {
    title: "Inner Wisdom",
    message: "All the answers you seek are already within you. Quiet your mind and listen to the wisdom of your heart.",
    affirmation: "I trust my inner wisdom to guide me to my highest truth.",
    icon: Compass,
    color: "from-amber-400 to-yellow-500"
  },
  {
    title: "Gentle Release",
    message: "It's safe to let go of what no longer serves you. Release with gratitude and make space for new blessings.",
    affirmation: "I release what no longer serves me with love and gratitude.",
    icon: Waves,
    color: "from-cyan-400 to-blue-500"
  },
  {
    title: "Sacred Pause",
    message: "Sometimes the most powerful action is to pause, breathe, and reconnect with your center before moving forward.",
    affirmation: "I honor the power of the sacred pause in my life.",
    icon: Moon,
    color: "from-slate-400 to-gray-600"
  }
];

const OracleCards = () => {
  const [selectedCard, setSelectedCard] = useState<typeof oracleCards[0] | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawCard = () => {
    setIsDrawing(true);
    setSelectedCard(null);
    
    setTimeout(() => {
      const randomCard = oracleCards[Math.floor(Math.random() * oracleCards.length)];
      setSelectedCard(randomCard);
      setIsDrawing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🔮 Daily Oracle Cards
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Draw a card for guidance, inspiration, and gentle wisdom from the universe. 
            Each card carries a message your soul needs to hear today.
          </p>
          
          <Button
            onClick={drawCard}
            disabled={isDrawing}
            size="lg"
            className="text-lg px-8 py-4 bg-gradient-primary hover:opacity-90 transition-all"
          >
            <Shuffle className="mr-2 w-5 h-5" />
            {isDrawing ? "Drawing your card..." : "Draw Your Card"}
          </Button>
        </section>

        {/* Card Display */}
        {isDrawing && (
          <section className="mb-12">
            <div className="max-w-md mx-auto">
              <Card className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-dashed border-primary/30 animate-pulse">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Shuffle className="w-10 h-10 text-primary-foreground animate-spin" />
                  </div>
                  <p className="text-muted-foreground">The universe is selecting your perfect message...</p>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {selectedCard && !isDrawing && (
          <section className="mb-12 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <Card className={`bg-gradient-to-br ${selectedCard.color} text-white shadow-card-glow border-0`}>
                <CardHeader className="text-center pb-4">
                  <div className="w-20 h-20 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <selectedCard.icon className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold mb-2">
                    {selectedCard.title}
                  </h2>
                </CardHeader>
                
                <CardContent className="px-8 pb-8">
                  <div className="text-center space-y-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                      <p className="text-lg leading-relaxed font-medium mb-4">
                        {selectedCard.message}
                      </p>
                      <hr className="border-white/30 my-4" />
                      <p className="text-base italic">
                        "{selectedCard.affirmation}"
                      </p>
                    </div>
                    
                    <div className="flex gap-4 justify-center flex-wrap">
                      <TextToSpeech
                        text={`${selectedCard.title}. ${selectedCard.message} Your affirmation: ${selectedCard.affirmation}`}
                        buttonText="Listen to your message"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      />
                      <Button
                        onClick={drawCard}
                        variant="outline"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        <Shuffle className="mr-2 w-4 h-4" />
                        Draw Another
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Instructions */}
        <section className="max-w-4xl mx-auto">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6">
                How to Use Oracle Cards
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧘</span>
                  </div>
                  <h4 className="font-semibold mb-2">1. Center Yourself</h4>
                  <p className="text-muted-foreground text-sm">
                    Take a few deep breaths and set an intention for guidance.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🤲</span>
                  </div>
                  <h4 className="font-semibold mb-2">2. Ask Your Question</h4>
                  <p className="text-muted-foreground text-sm">
                    Silently ask what you need to know or simply request guidance.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💖</span>
                  </div>
                  <h4 className="font-semibold mb-2">3. Receive with Love</h4>
                  <p className="text-muted-foreground text-sm">
                    Trust that the perfect message will come through for you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default OracleCards;