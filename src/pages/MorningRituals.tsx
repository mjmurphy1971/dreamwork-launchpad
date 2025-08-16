import { Clock, Sun, Coffee, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const MorningRituals = () => {
  const practices = [
    {
      id: "sunrise-breath",
      title: "Sunrise Breathing",
      duration: "3 min",
      description: "Welcome the day with gentle breath awareness before checking your phone",
      steps: [
        "Place feet on floor, sitting at bed's edge",
        "Take 10 slow, deep breaths",
        "Set one intention for the day",
        "Smile before reaching for your device"
      ],
      icon: Sun
    },
    {
      id: "mindful-coffee",
      title: "Sacred Coffee Ritual",
      duration: "5 min", 
      description: "Transform your morning beverage into a mindfulness practice",
      steps: [
        "Prepare your drink with full attention",
        "Hold the warm cup in both hands",
        "Take three conscious sips in silence",
        "Notice the warmth, aroma, and taste"
      ],
      icon: Coffee
    },
    {
      id: "mirror-gratitude",
      title: "Mirror Gratitude",
      duration: "2 min",
      description: "Start your day with self-appreciation and positive intention",
      steps: [
        "Look into your own eyes in the mirror",
        "Say: 'Good morning, beautiful soul'",
        "Name three things you're grateful for",
        "Smile at yourself with genuine warmth"
      ],
      icon: Smile
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sun className="w-8 h-8 text-accent mr-3" />
              <h1 className="text-4xl font-heading font-bold text-foreground">
                Morning Rituals
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Gentle practices to awaken your spirit and set the tone for a mindful day
            </p>
          </div>

          {/* Practice Cards */}
          <div className="grid gap-8 max-w-4xl mx-auto">
            {practices.map((practice) => {
              const IconComponent = practice.icon;
              return (
                <Card key={practice.id} className="border-0 shadow-card hover:shadow-glow transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-heading text-foreground">
                            {practice.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {practice.duration}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="hover-scale">
                        Start Practice
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {practice.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-heading font-semibold text-foreground">Practice Steps:</h4>
                      <ol className="space-y-2">
                        {practice.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </span>
                            <span className="text-muted-foreground">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-center mt-12">
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href="/weekly-stillness">← Back to Tracker</a>
              </Button>
              <Button asChild>
                <a href="/work-transitions">Work Transitions →</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MorningRituals;