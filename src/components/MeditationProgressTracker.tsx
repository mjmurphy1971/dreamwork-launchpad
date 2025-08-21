import { useState, useEffect } from "react";
import { Calendar, Clock, Target, Award, Flame, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface MeditationSession {
  id: string;
  date: string;
  duration: number; // in minutes
  type: string;
  mood_before: number; // 1-5 scale
  mood_after: number; // 1-5 scale
  notes?: string;
}

interface ProgressStats {
  totalSessions: number;
  totalMinutes: number;
  currentStreak: number;
  longestStreak: number;
  weeklyGoal: number;
  thisWeekSessions: number;
}

const MeditationProgressTracker = () => {
  const [sessions, setSessions] = useState<MeditationSession[]>([]);
  const [stats, setStats] = useState<ProgressStats>({
    totalSessions: 0,
    totalMinutes: 0,
    currentStreak: 0,
    longestStreak: 0,
    weeklyGoal: 5,
    thisWeekSessions: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user's meditation progress
  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = async () => {
    try {
      const response = await fetch('/api/meditation-progress');
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
        setStats(data.stats || stats);
      }
    } catch (error) {
      console.error('Failed to load progress data:', error);
      // Load from localStorage as fallback
      const savedSessions = localStorage.getItem('meditation-sessions');
      const savedStats = localStorage.getItem('meditation-stats');
      
      if (savedSessions) setSessions(JSON.parse(savedSessions));
      if (savedStats) setStats(JSON.parse(savedStats));
    } finally {
      setIsLoading(false);
    }
  };

  const logSession = async (sessionData: Omit<MeditationSession, 'id' | 'date'>) => {
    const newSession: MeditationSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString().split('T')[0],
      ...sessionData
    };

    try {
      const response = await fetch('/api/meditation-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSession)
      });

      if (response.ok) {
        const updatedData = await response.json();
        setSessions(updatedData.sessions);
        setStats(updatedData.stats);
        toast.success(`Great session! ${sessionData.duration} minutes logged 🧘‍♀️`);
      } else {
        throw new Error('Failed to save session');
      }
    } catch (error) {
      // Fallback to localStorage
      const updatedSessions = [...sessions, newSession];
      setSessions(updatedSessions);
      localStorage.setItem('meditation-sessions', JSON.stringify(updatedSessions));
      
      // Update stats locally
      const newStats = calculateStats(updatedSessions);
      setStats(newStats);
      localStorage.setItem('meditation-stats', JSON.stringify(newStats));
      
      toast.success(`Session logged locally! ${sessionData.duration} minutes 🧘‍♀️`);
    }
  };

  const calculateStats = (sessionList: MeditationSession[]): ProgressStats => {
    const totalSessions = sessionList.length;
    const totalMinutes = sessionList.reduce((sum, session) => sum + session.duration, 0);
    
    // Calculate current streak
    const sortedSessions = [...sessionList].sort((a, b) => b.date.localeCompare(a.date));
    let currentStreak = 0;
    let checkDate = new Date();
    
    for (const session of sortedSessions) {
      const sessionDate = new Date(session.date);
      const daysDiff = Math.floor((checkDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff <= currentStreak) {
        currentStreak++;
        checkDate = sessionDate;
      } else {
        break;
      }
    }

    // Calculate this week's sessions
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekSessions = sessionList.filter(
      session => new Date(session.date) >= oneWeekAgo
    ).length;

    return {
      totalSessions,
      totalMinutes,
      currentStreak,
      longestStreak: Math.max(stats.longestStreak, currentStreak),
      weeklyGoal: stats.weeklyGoal,
      thisWeekSessions
    };
  };

  const quickLogSession = (duration: number, type: string) => {
    logSession({
      duration,
      type,
      mood_before: 3,
      mood_after: 4,
      notes: `Quick ${duration}-minute ${type} session`
    });
  };

  const weeklyProgress = Math.min((stats.thisWeekSessions / stats.weeklyGoal) * 100, 100);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-20 bg-muted rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-16 bg-muted rounded"></div>
            <div className="h-16 bg-muted rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Session Logger */}
      <Card className="p-6">
        <h3 className="font-heading text-xl font-semibold mb-4 flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <span>Log Today's Practice</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button 
            variant="outline" 
            onClick={() => quickLogSession(5, "Breathing")}
            className="h-auto py-3 flex flex-col items-center space-y-1"
          >
            <span className="text-lg">🌬️</span>
            <span className="text-xs">5 min Breathwork</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => quickLogSession(10, "Mindfulness")}
            className="h-auto py-3 flex flex-col items-center space-y-1"
          >
            <span className="text-lg">🧘‍♀️</span>
            <span className="text-xs">10 min Mindfulness</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => quickLogSession(15, "Guided Meditation")}
            className="h-auto py-3 flex flex-col items-center space-y-1"
          >
            <span className="text-lg">🎧</span>
            <span className="text-xs">15 min Guided</span>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => quickLogSession(20, "Deep Meditation")}
            className="h-auto py-3 flex flex-col items-center space-y-1"
          >
            <span className="text-lg">🕯️</span>
            <span className="text-xs">20 min Deep</span>
          </Button>
        </div>
      </Card>

      {/* Weekly Progress */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-xl font-semibold flex items-center space-x-2">
            <Target className="w-5 h-5 text-primary" />
            <span>Weekly Goal</span>
          </h3>
          <Badge variant={weeklyProgress >= 100 ? "default" : "secondary"}>
            {stats.thisWeekSessions}/{stats.weeklyGoal} sessions
          </Badge>
        </div>
        <Progress value={weeklyProgress} className="mb-3" />
        <p className="text-sm text-muted-foreground">
          {weeklyProgress >= 100 
            ? "🎉 Goal achieved! You're building a strong practice." 
            : `${stats.weeklyGoal - stats.thisWeekSessions} more sessions to reach your weekly goal.`
          }
        </p>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Award className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.totalSessions}</div>
          <div className="text-xs text-muted-foreground">Total Sessions</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{Math.round(stats.totalMinutes / 60)}h</div>
          <div className="text-xs text-muted-foreground">Total Time</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Flame className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.currentStreak}</div>
          <div className="text-xs text-muted-foreground">Current Streak</div>
        </Card>
        
        <Card className="p-4 text-center">
          <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.longestStreak}</div>
          <div className="text-xs text-muted-foreground">Best Streak</div>
        </Card>
      </div>

      {/* Recent Sessions */}
      {sessions.length > 0 && (
        <Card className="p-6">
          <h3 className="font-heading text-xl font-semibold mb-4 flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-primary" />
            <span>Recent Sessions</span>
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {sessions.slice(-5).reverse().map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-lg">
                    {session.type.includes('Breathing') ? '🌬️' : 
                     session.type.includes('Guided') ? '🎧' : 
                     session.type.includes('Deep') ? '🕯️' : '🧘‍♀️'}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{session.type}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(session.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">{session.duration}m</div>
                  <div className="text-xs text-muted-foreground">
                    {session.mood_before} → {session.mood_after} 😊
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default MeditationProgressTracker;