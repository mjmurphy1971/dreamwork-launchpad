import { Calendar, Clock, Heart, Sunrise, Coffee, Moon, Flower } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const WeeklyStillness = () => {
  const currentWeekPractices = [
    {
      day: "Monday",
      practice: "Morning Breath Reset",
      duration: "2 minutes",
      description: "Before checking your phone, take 10 deep breaths. Inhale for 4, hold for 4, exhale for 6.",
      icon: <Sunrise className="w-6 h-6" />,
      trigger: "When you first wake up"
    },
    {
      day: "Tuesday", 
      practice: "Mindful Coffee/Tea Ritual",
      duration: "3 minutes",
      description: "Feel the warmth of your cup. Notice the aroma. Take three conscious sips in complete silence.",
      icon: <Coffee className="w-6 h-6" />,
      trigger: "During your first drink of the day"
    },
    {
      day: "Wednesday",
      practice: "Transition Pause",
      duration: "1 minute", 
      description: "Before entering any new space (home, office, store), pause at the threshold and take 3 centering breaths.",
      icon: <Heart className="w-6 h-6" />,
      trigger: "At doorways and transitions"
    },
    {
      day: "Thursday",
      practice: "Nature Connection",
      duration: "2 minutes",
      description: "Find one natural element (tree, flower, sky). Observe it completely without judgment or naming.",
      icon: <Flower className="w-6 h-6" />,
      trigger: "During any outdoor moment"
    },
    {
      day: "Friday",
      practice: "Gratitude Body Scan",
      duration: "3 minutes",
      description: "Thank three parts of your body for supporting you today. Start with your feet and work upward.",
      icon: <Heart className="w-6 h-6" />,
      trigger: "Before your evening meal"
    },
    {
      day: "Saturday",
      practice: "Sound Meditation",
      duration: "2 minutes",
      description: "Sit quietly and count 20 different sounds around you. Don't label them, just notice and count.",
      icon: <Moon className="w-6 h-6" />,
      trigger: "During any quiet moment"
    },
    {
      day: "Sunday",
      practice: "Weekly Reflection",
      duration: "5 minutes",
      description: "Ask yourself: 'What brought me the most peace this week?' Simply notice what arises.",
      icon: <Calendar className="w-6 h-6" />,
      trigger: "Before bed"
    }
  ];

  const quickTechniques = [
    {
      name: "4-7-8 Breath",
      time: "30 seconds",
      description: "Inhale for 4, hold for 7, exhale for 8. Repeat 3 times."
    },
    {
      name: "5-4-3-2-1 Grounding",
      time: "1 minute", 
      description: "Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste."
    },
    {
      name: "Loving-Kindness Burst",
      time: "1 minute",
      description: "Send good wishes to yourself, someone you love, someone neutral, someone difficult."
    },
    {
      name: "Body Tension Release",
      time: "2 minutes",
      description: "Tense all muscles for 5 seconds, then completely relax. Repeat 3 times."
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            🕯️ Weekly Stillness Practices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Simple, micro-moments of peace designed to anchor you in stillness amidst life's beautiful chaos. 
            Each practice takes 1-5 minutes and can be done anywhere, anytime.
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              1-5 minutes each
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              New practices weekly
            </div>
          </div>
        </section>

        {/* Current Week's Practices */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">
              This Week's Stillness Journey
            </h2>
            <p className="text-lg text-muted-foreground">
              Seven gentle practices to weave mindfulness into your daily rhythm
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentWeekPractices.map((practice, index) => (
              <Card key={practice.day} className="border-0 shadow-card hover:shadow-card-hover transition-smooth group">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      {practice.day}
                    </Badge>
                    <div className="text-primary">{practice.icon}</div>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-gentle">
                    {practice.practice}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {practice.duration}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    {practice.description}
                  </p>
                  <div className="border-t border-border/50 pt-3">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">When:</span> {practice.trigger}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Techniques Toolkit */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-semibold text-foreground mb-4">
              Emergency Stillness Toolkit
            </h2>
            <p className="text-lg text-muted-foreground">
              When chaos feels overwhelming, reach for these instant calm techniques
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {quickTechniques.map((technique, index) => (
              <Card key={technique.name} className="border-0 shadow-card bg-gradient-card p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-lg font-semibold text-foreground">
                    {technique.name}
                  </h3>
                  <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                    {technique.time}
                  </Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {technique.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-gradient-hero text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-3xl font-semibold mb-4">
            Receive Weekly Stillness Practices
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Get 7 new micro-practices delivered to your inbox every Sunday. 
            Transform scattered moments into sacred pauses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email for weekly stillness"
              className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:bg-primary-foreground/20"
            />
            <Button 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              onClick={() => window.location.href = 'mailto:mary@thedreamwork.space?subject=Weekly Stillness Practices Signup'}
            >
              Join the Practice
            </Button>
          </div>
          
          <p className="text-primary-foreground/70 text-sm">
            ✨ Always free • 🕊️ Delivered with love • 📱 Mobile-friendly practices
          </p>
        </section>

        {/* Philosophy & Suggestions */}
        <section className="mt-16 text-center">
          <h2 className="font-heading text-3xl font-semibold text-foreground mb-6">
            The Art of Micro-Stillness
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-left">
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Why Micro-Practices Work
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Fits into the busiest schedules</li>
                <li>• Creates new neural pathways gradually</li>
                <li>• Builds sustainable meditation habits</li>
                <li>• Provides immediate stress relief</li>
                <li>• Requires no special equipment or location</li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                Ways to Expand This Practice
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Create workplace stillness challenges</li>
                <li>• Share practices with family/friends</li>
                <li>• Journal about your stillness experiences</li>
                <li>• Set phone reminders for practice times</li>
                <li>• Adapt practices for children and teens</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default WeeklyStillness;