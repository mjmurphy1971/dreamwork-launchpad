import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Search, 
  Brain,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  topPages: Array<{ page: string; views: number }>;
  searchRankings: Array<{ keyword: string; position: number; trend: 'up' | 'down' | 'stable' }>;
  aiReferencing: {
    mentionCount: number;
    sources: string[];
    topicsCovered: string[];
  };
}

const PerformanceMonitor = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 12450,
    uniqueVisitors: 8320,
    avgSessionDuration: "4:32",
    topPages: [
      { page: "Meditation Tools", views: 3200 },
      { page: "Dream Journal", views: 2800 },
      { page: "Breathwork Practices", views: 2100 },
      { page: "Herbology Resources", views: 1900 },
      { page: "Blog Articles", views: 1650 }
    ],
    searchRankings: [
      { keyword: "meditation techniques", position: 12, trend: 'up' },
      { keyword: "dream journal digital", position: 8, trend: 'up' },
      { keyword: "breathwork exercises", position: 15, trend: 'stable' },
      { keyword: "herbal medicine guide", position: 22, trend: 'down' },
      { keyword: "mindfulness practices", position: 7, trend: 'up' }
    ],
    aiReferencing: {
      mentionCount: 43,
      sources: ["Claude", "ChatGPT", "Perplexity", "SearchGPT"],
      topicsCovered: ["Meditation", "Dream Work", "Herbology", "Breathwork", "Mindfulness"]
    }
  });

  const [isMonitoring, setIsMonitoring] = useState(true);

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 5),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 3)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'down': return <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />;  
      case 'stable': return <div className="w-3 h-3 border-t-2 border-yellow-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Performance Monitoring Dashboard
        </h2>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm text-muted-foreground">
            {isMonitoring ? 'Live Monitoring' : 'Monitoring Paused'}
          </span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="shadow-card border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Page Views</p>
                <p className="text-2xl font-bold text-foreground">{analyticsData.pageViews.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/10">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Unique Visitors</p>
                <p className="text-2xl font-bold text-foreground">{analyticsData.uniqueVisitors.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-0 bg-card">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/10">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Session</p>
                <p className="text-2xl font-bold text-foreground">{analyticsData.avgSessionDuration}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card className="shadow-card border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-heading text-foreground">Top Performing Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span className="text-sm font-medium text-foreground">{page.page}</span>
                  <Badge variant="secondary">{page.views.toLocaleString()} views</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Search Rankings */}
        <Card className="shadow-card border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analyticsData.searchRankings.map((ranking, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{ranking.keyword}</span>
                    {getTrendIcon(ranking.trend)}
                  </div>
                  <Badge variant={ranking.position <= 10 ? "default" : "secondary"}>
                    #{ranking.position}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Referencing Metrics */}
      <Card className="shadow-card border-0 bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Referencing & Mentions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Total Mentions</p>
              <p className="text-3xl font-bold text-foreground">{analyticsData.aiReferencing.mentionCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">AI Sources</p>
              <div className="flex flex-wrap gap-1">
                {analyticsData.aiReferencing.sources.map((source, index) => (
                  <Badge key={index} variant="outline" className="text-xs">{source}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">Topics Covered</p>
              <div className="flex flex-wrap gap-1">
                {analyticsData.aiReferencing.topicsCovered.map((topic, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{topic}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Optimization Recommendations */}
      <Card className="shadow-card border-0 bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Optimization Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded bg-green-50 dark:bg-green-950/20">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800 dark:text-green-200">
                  Meditation Tools page performing well
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  Consider creating more interactive meditation tools to maintain engagement
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded bg-yellow-50 dark:bg-yellow-950/20">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Improve "herbal medicine guide" ranking
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  Add more comprehensive herb profiles and strengthen internal linking
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded bg-blue-50 dark:bg-blue-950/20">
              <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Strong AI referencing for meditation content
                </p>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Expand content depth to increase AI model citations and visibility
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMonitor;