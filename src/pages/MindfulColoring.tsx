import { useEffect, useRef, useState } from "react";
import { Download, RotateCcw, Palette, PenTool, Circle, Square, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Canvas as FabricCanvas, Circle as FabricCircle, PencilBrush } from "fabric";

const colors = [
  "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF",
  "#FFFF00", "#FF00FF", "#00FFFF", "#FFA500", "#800080",
  "#FFC0CB", "#A52A2A", "#808080", "#FFD700", "#32CD32"
];

const mandalaPatterns = [
  {
    name: "Simple Lotus",
    points: "M300,300 C300,250 350,250 350,300 C350,350 300,350 300,300 M300,300 C250,300 250,250 300,250 C350,250 350,300 300,300 M300,300 C300,350 250,350 250,300 C250,250 300,250 300,300"
  },
  {
    name: "Sacred Circle",
    points: "M300,300 m-80,0 a80,80 0 1,0 160,0 a80,80 0 1,0 -160,0 M300,300 m-60,0 a60,60 0 1,0 120,0 a60,60 0 1,0 -120,0 M300,300 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0"
  },
  {
    name: "Flower Mandala",
    points: "M300,300 C320,280 340,280 340,300 C340,320 320,320 300,300 M300,300 C280,280 260,280 260,300 C260,320 280,320 300,300 M300,300 C280,320 280,340 300,340 C320,340 320,320 300,300 M300,300 C320,320 340,320 340,300 C340,280 320,280 300,300"
  }
];

const MindfulColoring = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState([3]);
  const [activeTool, setActiveTool] = useState<"brush" | "eraser">("brush");
  const [selectedPattern, setSelectedPattern] = useState(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 600,
      height: 600,
      backgroundColor: "#ffffff",
      isDrawingMode: true
    });

    // Initialize the drawing brush
    const brush = new PencilBrush(canvas);
    brush.color = activeColor;
    brush.width = brushSize[0];
    canvas.freeDrawingBrush = brush;

    setFabricCanvas(canvas);

    // Load initial mandala pattern
    loadMandalaPattern(canvas, 0);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (!fabricCanvas) return;

    const brush = fabricCanvas.freeDrawingBrush as PencilBrush;
    if (brush) {
      brush.color = activeTool === "eraser" ? "#ffffff" : activeColor;
      brush.width = brushSize[0];
    }
  }, [activeColor, brushSize, activeTool, fabricCanvas]);

  const loadMandalaPattern = (canvas: FabricCanvas, patternIndex: number) => {
    // Clear existing pattern
    canvas.getObjects().forEach(obj => {
      if ((obj as any).isPattern) {
        canvas.remove(obj);
      }
    });

    // Create pattern using simple shapes for now
    const pattern = mandalaPatterns[patternIndex];
    
    // Create concentric circles as a base pattern
    for (let i = 1; i <= 3; i++) {
      const circle = new FabricCircle({
        left: 300 - (i * 30),
        top: 300 - (i * 30),
        radius: i * 30,
        fill: 'transparent',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        selectable: false,
        evented: false
      });
      (circle as any).isPattern = true;
      canvas.add(circle);
    }

    // Add petal shapes around the center
    for (let angle = 0; angle < 360; angle += 45) {
      const radian = (angle * Math.PI) / 180;
      const x = 300 + Math.cos(radian) * 80;
      const y = 300 + Math.sin(radian) * 80;
      
      const petal = new FabricCircle({
        left: x - 15,
        top: y - 15,
        radius: 15,
        fill: 'transparent',
        stroke: '#e0e0e0',
        strokeWidth: 1,
        selectable: false,
        evented: false
      });
      (petal as any).isPattern = true;
      canvas.add(petal);
    }

    canvas.renderAll();
  };

  const handlePatternChange = (patternIndex: number) => {
    setSelectedPattern(patternIndex);
    if (fabricCanvas) {
      loadMandalaPattern(fabricCanvas, patternIndex);
    }
  };

  const handleClear = () => {
    if (!fabricCanvas) return;
    
    // Remove all objects except pattern
    fabricCanvas.getObjects().forEach(obj => {
      if (!(obj as any).isPattern) {
        fabricCanvas.remove(obj);
      }
    });
    
    fabricCanvas.renderAll();
  };

  const handleDownload = () => {
    if (!fabricCanvas) return;
    
    const dataURL = fabricCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 1
    });
    
    const link = document.createElement('a');
    link.download = 'mindful-coloring.png';
    link.href = dataURL;
    link.click();
  };

  const breathingPrompts = [
    "Breathe in peace as you add each color...",
    "Let your breath flow with each stroke...",
    "Feel gratitude with every mindful mark...",
    "Breathe out tension, breathe in creativity...",
    "Stay present with each gentle movement..."
  ];

  const [currentPrompt, setCurrentPrompt] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrompt(prev => (prev + 1) % breathingPrompts.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🎨 Mindful Coloring Studio
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Find peace through mindful coloring. Choose sacred patterns, blend colors with intention, 
            and let each stroke become a meditation in motion.
          </p>
        </section>

        {/* Breathing Prompt */}
        <section className="text-center mb-8">
          <Card className="max-w-lg mx-auto bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-primary/20">
            <CardContent className="p-4">
              <p className="text-lg italic text-primary font-medium animate-fade-in">
                {breathingPrompts[currentPrompt]}
              </p>
            </CardContent>
          </Card>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Tools Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pattern Selection */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Sacred Patterns</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {mandalaPatterns.map((pattern, index) => (
                  <Button
                    key={index}
                    onClick={() => handlePatternChange(index)}
                    variant={selectedPattern === index ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    {pattern.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Tools */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Tools</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    onClick={() => setActiveTool("brush")}
                    variant={activeTool === "brush" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    <PenTool className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setActiveTool("eraser")}
                    variant={activeTool === "eraser" ? "default" : "outline"}
                    size="sm"
                    className="flex-1"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Brush Size</label>
                  <Slider
                    value={brushSize}
                    onValueChange={setBrushSize}
                    min={1}
                    max={20}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-muted-foreground mt-1">
                    {brushSize[0]}px
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Palette */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Color Palette</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setActiveColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        activeColor === color
                          ? "border-primary scale-110 shadow-lg"
                          : "border-gray-300 hover:scale-105"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                
                <div className="mt-4">
                  <input
                    type="color"
                    value={activeColor}
                    onChange={(e) => setActiveColor(e.target.value)}
                    className="w-full h-10 rounded border border-border"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <Button
                  onClick={handleClear}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <RotateCcw className="mr-2 w-4 h-4" />
                  Clear Canvas
                </Button>
                <Button
                  onClick={handleDownload}
                  size="sm"
                  className="w-full"
                >
                  <Download className="mr-2 w-4 h-4" />
                  Save Art
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <Card className="p-4">
              <div className="flex justify-center">
                <canvas
                  ref={canvasRef}
                  className="border border-border rounded-lg shadow-lg max-w-full"
                />
              </div>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <section className="max-w-4xl mx-auto mt-12">
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold text-center mb-6">
                Mindful Coloring Practice
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🫁</span>
                  </div>
                  <h4 className="font-semibold mb-2">1. Breathe Mindfully</h4>
                  <p className="text-muted-foreground text-sm">
                    Follow the breathing prompts and let each breath guide your creative flow.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎨</span>
                  </div>
                  <h4 className="font-semibold mb-2">2. Color with Intention</h4>
                  <p className="text-muted-foreground text-sm">
                    Choose colors that resonate with your current emotions and energy.
                  </p>
                </div>
                
                <div>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🧘</span>
                  </div>
                  <h4 className="font-semibold mb-2">3. Stay Present</h4>
                  <p className="text-muted-foreground text-sm">
                    Focus on the movement of your hand and the beauty emerging on the canvas.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <p className="text-center text-muted-foreground text-sm leading-relaxed">
                  <strong>Mindful Art Therapy:</strong> Coloring sacred patterns activates both creative and meditative states, 
                  reducing stress while increasing focus and inner peace. Let your intuition guide each color choice 
                  and celebrate the unique masterpiece you create.
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

export default MindfulColoring;