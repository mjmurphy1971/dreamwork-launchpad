import { useState } from "react";
import { Play, Wind, Heart, Zap, Moon, Sun, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const breathworkTechniques = [
  {
    id: "box-breathing",
    name: "Box Breathing (4-4-4-4)",
    category: "Beginner",
    icon: Heart,
    color: "bg-blue-500/10 text-blue-600",
    description: "A foundational technique using equal counts for inhale, hold, exhale, and hold. Perfect for beginners and stress relief.",
    benefits: ["Reduces anxiety", "Improves focus", "Calms nervous system", "Better sleep"],
    instructions: [
      "Inhale for 4 counts",
      "Hold breath for 4 counts", 
      "Exhale for 4 counts",
      "Hold empty for 4 counts",
      "Repeat 4-8 cycles"
    ],
    videoUrl: "https://www.youtube.com/watch?v=tEmt1Znux58",
    videoTitle: "Box Breathing Technique - Guided Practice",
    image: "/placeholder.svg", // Replace with actual image
    duration: "5-10 minutes",
    bestFor: "Stress relief, focus, before sleep"
  },
  {
    id: "478-breathing",
    name: "4-7-8 Breathing",
    category: "Calming",
    icon: Moon,
    color: "bg-purple-500/10 text-purple-600",
    description: "Dr. Andrew Weil's relaxation technique that acts as a natural tranquilizer for the nervous system.",
    benefits: ["Quick relaxation", "Better sleep", "Anxiety relief", "Stress reduction"],
    instructions: [
      "Exhale completely through mouth",
      "Close mouth, inhale through nose for 4 counts",
      "Hold breath for 7 counts",
      "Exhale through mouth for 8 counts",
      "Repeat 3-4 cycles"
    ],
    videoUrl: "https://www.youtube.com/watch?v=YRPh_GaiL8s",
    videoTitle: "4-7-8 Breathing Exercise - Natural Relaxation",
    image: "/placeholder.svg", // Replace with actual image
    duration: "2-5 minutes",
    bestFor: "Sleep preparation, anxiety, quick calm"
  },
  {
    id: "wim-hof",
    name: "Wim Hof Method",
    category: "Advanced",
    icon: Zap,
    color: "bg-orange-500/10 text-orange-600",
    description: "Powerful breathing technique combining controlled hyperventilation with breath retention for energy and resilience.",
    benefits: ["Increased energy", "Improved immunity", "Stress resilience", "Mental clarity"],
    instructions: [
      "Take 30 deep, powerful breaths",
      "On final exhale, hold breath as long as comfortable",
      "Take recovery breath and hold for 15 seconds",
      "Repeat for 3-4 rounds"
    ],
    videoUrl: "https://www.youtube.com/watch?v=tybOi4hjZFQ",
    videoTitle: "Wim Hof Breathing Technique - Guided Method",
    image: "/placeholder.svg", // Replace with actual image
    duration: "10-15 minutes",
    bestFor: "Energy boost, cold exposure prep, immunity"
  },
  {
    id: "pranayama",
    name: "Pranayama (Yogic Breathing)",
    category: "Traditional",
    icon: Wind,
    color: "bg-green-500/10 text-green-600",
    description: "Ancient yogic breathing practices that control life force energy (prana) for spiritual and physical well-being.",
    benefits: ["Spiritual connection", "Energy balance", "Emotional regulation", "Inner peace"],
    instructions: [
      "Sit comfortably with straight spine",
      "Practice specific pranayama technique",
      "Focus on breath awareness",
      "Maintain steady rhythm",
      "End with natural breathing"
    ],
    videoUrl: "https://www.youtube.com/watch?v=8VwufJrUhic",
    videoTitle: "Pranayama Breathing Techniques - Complete Guide",
    image: "/placeholder.svg", // Replace with actual image
    duration: "10-20 minutes",
    bestFor: "Spiritual practice, energy work, meditation prep"
  },
  {
    id: "breath-of-fire",
    name: "Breath of Fire (Kapalabhati)",
    category: "Energizing",
    icon: Sun,
    color: "bg-yellow-500/10 text-yellow-600",
    description: "Rapid, rhythmic breathing that generates internal heat and energy while purifying the respiratory system.",
    benefits: ["Increased alertness", "Detoxification", "Core strength", "Mental clarity"],
    instructions: [
      "Sit with straight spine",
      "Place hands on knees",
      "Breathe rapidly through nose",
      "Focus on forceful exhales",
      "Let inhales happen naturally"
    ],
    videoUrl: "https://www.youtube.com/watch?v=83wI2oMnKPE",
    videoTitle: "Breath of Fire - Energizing Breathing Practice",
    image: "/placeholder.svg", // Replace with actual image
    duration: "3-5 minutes",
    bestFor: "Morning energy, mental clarity, detox"
  },
  {
    id: "coherent-breathing",
    name: "Coherent Breathing (5-5)",
    category: "Therapeutic",
    icon: Heart,
    color: "bg-pink-500/10 text-pink-600",
    description: "Balanced breathing at 5 breaths per minute that optimizes heart rate variability and nervous system function.",
    benefits: ["Heart health", "Emotional balance", "Stress resilience", "Better HRV"],
    instructions: [
      "Inhale slowly for 5 counts",
      "Exhale slowly for 5 counts",
      "Maintain smooth, even rhythm",
      "Focus on heart center",
      "Continue for 10-20 minutes"
    ],
    videoUrl: "https://www.youtube.com/watch?v=EwQkfoKPs2k",
    videoTitle: "Coherent Breathing - Heart Rate Variability Training",
    image: "/placeholder.svg", // Replace with actual image
    duration: "10-20 minutes",
    bestFor: "Heart health, emotional regulation, HRV training"
  }
];

const categories = ["All", "Beginner", "Calming", "Energizing", "Advanced", "Traditional", "Therapeutic"];

const Breathwork = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTechniques = breathworkTechniques.filter(technique => {
    const matchesCategory = selectedCategory === "All" || technique.category === selectedCategory;
    const matchesSearch = technique.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         technique.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         technique.benefits.some(benefit => benefit.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-6 leading-tight">
            🌬️ Breathwork Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the transformative power of conscious breathing. Each technique offers unique benefits for healing, energy, and spiritual connection.
          </p>
          
          <Card className="max-w-2xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
                Why Breathwork?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Breathwork is one of the most accessible and powerful tools for transformation. It can shift your nervous system from stress to relaxation in minutes, increase energy naturally, and create profound states of healing and awareness.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="transition-smooth"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search techniques or benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </section>

        {/* Techniques Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {filteredTechniques.map((technique, index) => {
            const IconComponent = technique.icon;
            return (
              <Card
                key={technique.id}
                className="overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-full ${technique.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-heading font-bold text-foreground">
                        {technique.name}
                      </h3>
                      <Badge variant="secondary" className="gradient-card text-foreground border-0 mt-1">
                        {technique.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Video Thumbnail */}
                  <div 
                    className="relative overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => window.open(technique.videoUrl, '_blank')}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${technique.videoUrl.split('v=')[1]}/mqdefault.jpg`}
                      alt={technique.videoTitle}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-smooth"
                      onError={(e) => {
                        e.currentTarget.src = technique.image;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                        <Play className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {technique.description}
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Benefits:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {technique.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-primary rounded-full"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2 text-sm">Best For:</h4>
                      <p className="text-xs text-muted-foreground mb-2">{technique.bestFor}</p>
                      <p className="text-xs text-muted-foreground">
                        <strong>Duration:</strong> {technique.duration}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-foreground mb-2 text-sm">Instructions:</h4>
                    <ol className="text-xs text-muted-foreground space-y-1">
                      {technique.instructions.map((step, i) => (
                        <li key={i} className="flex gap-2">
                          <span className="text-primary font-semibold">{i + 1}.</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => window.open(technique.videoUrl, '_blank')}
                  >
                    <Play className="mr-2 w-4 h-4" />
                    Watch Guided Practice
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {filteredTechniques.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No breathwork techniques found matching your search.</p>
          </div>
        )}

        {/* Safety Notice */}
        <section className="mb-8">
          <Card className="max-w-4xl mx-auto shadow-card border-0 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-heading font-semibold text-yellow-800 dark:text-yellow-200 mb-3">
                ⚠️ Important Safety Guidelines
              </h3>
              <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2">
                <li>• Always practice breathwork in a safe, comfortable environment</li>
                <li>• Stop immediately if you feel dizzy, nauseous, or uncomfortable</li>
                <li>• Consult healthcare providers if you have respiratory or heart conditions</li>
                <li>• Pregnant women should avoid intense breathing practices</li>
                <li>• Never practice advanced techniques while driving or operating machinery</li>
                <li>• Start slowly and build up your practice gradually</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="max-w-2xl mx-auto shadow-card border-0 bg-card">
            <CardContent className="p-8">
              <h3 className="text-2xl font-heading font-bold gradient-text mb-4">
                Start Your Breathwork Journey
              </h3>
              <p className="text-foreground leading-relaxed mb-6">
                Begin with simple techniques like Box Breathing or 4-7-8, then explore more advanced practices as you build confidence and experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" onClick={() => setSelectedCategory("Beginner")}>
                  Beginner Techniques
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.open('/meditation', '_self')}>
                  Explore Meditation
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Breathwork;