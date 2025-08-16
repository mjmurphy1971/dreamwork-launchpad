import { Moon, BookOpen, Heart, Smartphone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const EveningWinddowns = () => {
  const practices = [
    {
      id: "digital-sunset",
      title: "Digital Sunset",
      duration: "5 min",
      description: "Create a peaceful transition from screen time to sleep time",
      steps: [
        "Set devices to 'Do Not Disturb' mode",
        "Place phone in another room",
        "Take 5 deep breaths",
        "Say: 'The day is complete, I am at peace'"
      ],
      icon: Smartphone
    },
    {
      id: "gratitude-journal",
      title: "Three Gratitudes",
      duration: "3 min",
      description: "End your day by acknowledging what went well",
      steps: [
        "Write down three things you're grateful for",
        "Include one challenge that taught you something",
        "Add one thing you're looking forward to",
        "Close with 'Thank you' to yourself"
      ],
      icon: BookOpen
    },
    {
      id: "body-appreciation",
      title: "Body Appreciation Scan",
      duration: "4 min",
      description: "Thank your body for carrying you through the day",
      steps: [
        "Lie down comfortably",
        "Start at your feet, thank each body part",
        "Notice areas of tension with kindness",
        "Send love to your whole being"
      ],
      icon: Heart
    },
    {
      id: "tomorrow-intention",
      title: "Tomorrow's Gentle Intention",
      duration: "2 min",
      description: "Set a loving intention for the next day",
      steps: [
        "Take three calming breaths",
        "Ask: 'How do I want to feel tomorrow?'",
        "Set one simple, kind intention",
        "Trust that you have everything you need"
      ],
      icon: Moon
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
              <Moon className="w-8 h-8 text-accent mr-3" />
              <h1 className="text-4xl font-heading font-bold text-foreground">
                Evening Wind-downs
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soothing practices to release the day and prepare for restorative sleep
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
                              <Moon className="w-3 h-3 mr-1" />
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
                <a href="/work-transitions">← Work Transitions</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/weekly-stillness">Back to Tracker</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EveningWinddowns;