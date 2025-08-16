import { useState, useEffect } from "react";
import { Check, Calendar, Trophy, Target, Flame } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Practice {
  id: string;
  name: string;
  duration: string;
  description: string;
  category: string;
}

interface PracticeProgress {
  practiceId: string;
  date: string;
  completed: boolean;
  completedAt?: Date;
}

const DAILY_PRACTICES: Practice[] = [
  {
    id: "morning-breath",
    name: "Morning Breath Reset",
    duration: "2 min",
    description: "10 deep breaths before checking your phone",
    category: "Morning"
  },
  {
    id: "tea-meditation", 
    name: "Mindful Tea/Coffee Ritual",
    duration: "3 min",
    description: "Three conscious sips in complete silence",
    category: "Nourishment"
  },
  {
    id: "transition-pause",
    name: "Transition Pause",
    duration: "1 min",
    description: "3 centering breaths at doorways",
    category: "Movement"
  },
  {
    id: "nature-connection",
    name: "Nature Connection",
    duration: "2 min", 
    description: "Observe one natural element without judgment",
    category: "Grounding"
  },
  {
    id: "gratitude-scan",
    name: "Gratitude Body Scan",
    duration: "3 min",
    description: "Thank three parts of your body",
    category: "Evening"
  }
];

const PracticeTracker = () => {
  const [progress, setProgress] = useState<PracticeProgress[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [weeklyGoal] = useState(21); // 3 practices per day * 7 days

  const today = new Date().toISOString().split('T')[0];

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('stillness-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('stillness-progress', JSON.stringify(progress));
    calculateStats();
  }, [progress]);

  const calculateStats = () => {
    // Calculate total completed practices
    const completed = progress.filter(p => p.completed).length;
    setTotalCompleted(completed);

    // Calculate current streak
    let streak = 0;
    const dates = [...new Set(progress.map(p => p.date))].sort().reverse();
    
    for (const date of dates) {
      const dayPractices = progress.filter(p => p.date === date && p.completed);
      if (dayPractices.length > 0) {
        streak++;
      } else {
        break;
      }
    }
    setCurrentStreak(streak);
  };

  const togglePractice = (practiceId: string) => {
    const existingIndex = progress.findIndex(
      p => p.practiceId === practiceId && p.date === today
    );

    if (existingIndex >= 0) {
      // Toggle existing practice
      const newProgress = [...progress];
      newProgress[existingIndex] = {
        ...newProgress[existingIndex],
        completed: !newProgress[existingIndex].completed,
        completedAt: !newProgress[existingIndex].completed ? new Date() : undefined
      };
      setProgress(newProgress);
    } else {
      // Add new practice completion
      setProgress([
        ...progress,
        {
          practiceId,
          date: today,
          completed: true,
          completedAt: new Date()
        }
      ]);
    }
  };

  const isPracticeCompleted = (practiceId: string) => {
    return progress.some(
      p => p.practiceId === practiceId && p.date === today && p.completed
    );
  };

  const getTodayCompletedCount = () => {
    return progress.filter(p => p.date === today && p.completed).length;
  };

  const getWeeklyCompletedCount = () => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weekAgoString = oneWeekAgo.toISOString().split('T')[0];
    
    return progress.filter(
      p => p.date >= weekAgoString && p.date <= today && p.completed
    ).length;
  };

  const weeklyProgress = Math.round((getWeeklyCompletedCount() / weeklyGoal) * 100);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-primary mr-2" />
              <span className="text-2xl font-bold text-foreground">{getTodayCompletedCount()}</span>
            </div>
            <p className="text-sm text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-primary mr-2" />
              <span className="text-2xl font-bold text-foreground">{getWeeklyCompletedCount()}</span>
            </div>
            <p className="text-sm text-muted-foreground">This Week</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Flame className="w-5 h-5 text-accent mr-2" />
              <span className="text-2xl font-bold text-foreground">{currentStreak}</span>
            </div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center mb-2">
              <Trophy className="w-5 h-5 text-accent mr-2" />
              <span className="text-2xl font-bold text-foreground">{totalCompleted}</span>
            </div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Bar */}
      <Card className="border-0 shadow-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading text-lg font-semibold text-foreground">
              Weekly Progress
            </h3>
            <Badge variant="outline" className="text-primary border-primary/30">
              {weeklyProgress}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-muted rounded-full h-3 mb-2">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(weeklyProgress, 100)}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            {getWeeklyCompletedCount()} of {weeklyGoal} practices completed this week
          </p>
        </CardContent>
      </Card>

      {/* Today's Practices */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <h3 className="font-heading text-xl font-semibold text-foreground">
            Today's Stillness Practices
          </h3>
          <p className="text-muted-foreground">
            Mark each practice as you complete it throughout your day
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {DAILY_PRACTICES.map((practice) => {
              const isCompleted = isPracticeCompleted(practice.id);
              
              return (
                <div 
                  key={practice.id}
                  className={`border rounded-xl p-4 transition-all duration-300 ${
                    isCompleted 
                      ? 'border-primary/50 bg-primary/5 shadow-glow' 
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className={`font-heading font-semibold ${
                          isCompleted ? 'text-primary' : 'text-foreground'
                        }`}>
                          {practice.name}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {practice.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {practice.duration}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {practice.description}
                      </p>
                    </div>
                    
                    <Button
                      variant={isCompleted ? "default" : "outline"}
                      size="sm"
                      onClick={() => togglePractice(practice.id)}
                      className={`ml-4 ${
                        isCompleted 
                          ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                          : 'border-primary/30 text-primary hover:bg-primary/5'
                      }`}
                    >
                      <Check className={`w-4 h-4 ${isCompleted ? 'mr-2' : ''}`} />
                      {isCompleted ? 'Completed' : 'Mark Done'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {getTodayCompletedCount() === DAILY_PRACTICES.length && (
            <div className="mt-6 text-center p-4 bg-gradient-card rounded-xl border border-accent/20">
              <Trophy className="w-8 h-8 text-accent mx-auto mb-2" />
              <h4 className="font-heading text-lg font-semibold text-foreground mb-1">
                Daily Goal Complete! 🎉
              </h4>
              <p className="text-muted-foreground">
                You've completed all stillness practices for today. Your inner peace thanks you.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeTracker;