import { Briefcase, DoorOpen, Pause, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WorkTransitions = () => {
  const practices = [
    {
      id: "doorway-pause",
      title: "Doorway Reset",
      duration: "30 sec",
      description: "Use physical thresholds as mindfulness triggers throughout your workday",
      steps: [
        "Pause at any doorway before entering",
        "Take three conscious breaths",
        "Set intention for the next space",
        "Step through with awareness"
      ],
      icon: DoorOpen
    },
    {
      id: "email-breath",
      title: "Email Breathing Space",
      duration: "1 min",
      description: "Create calm before opening your inbox",
      steps: [
        "Before opening email, pause",
        "Take 5 deep belly breaths",
        "Remind yourself: 'I respond, not react'",
        "Open inbox with centered awareness"
      ],
      icon: Briefcase
    },
    {
      id: "meeting-ground",
      title: "Meeting Grounding",
      duration: "1 min",
      description: "Center yourself before virtual or in-person meetings",
      steps: [
        "Arrive 2 minutes early",
        "Feel your feet on the ground",
        "Soften your shoulders and jaw",
        "Set intention to listen deeply"
      ],
      icon: Pause
    },
    {
      id: "energy-shift",
      title: "Energy Shift Break",
      duration: "2 min",
      description: "Quick reset when feeling stuck or overwhelmed",
      steps: [
        "Stand up and stretch arms overhead",
        "Take 3 energizing breaths",
        "Shake out hands and feet",
        "Return to task with fresh perspective"
      ],
      icon: Zap
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
              <Briefcase className="w-8 h-8 text-accent mr-3" />
              <h1 className="text-4xl font-heading font-bold text-foreground">
                Work Transitions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Micro-practices to maintain presence and reduce stress during your workday
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
                              <Briefcase className="w-3 h-3 mr-1" />
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
                <a href="/morning-rituals">← Morning Rituals</a>
              </Button>
              <Button asChild>
                <a href="/evening-winddowns">Evening Wind-downs →</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WorkTransitions;