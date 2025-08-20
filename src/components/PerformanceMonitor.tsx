import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Search, 
  Brain,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Globe,
  Zap,
  Code2,
  Gauge,
  Target,
  Shield,
  Smartphone,
  Monitor,
  Activity,
  Database,
  Link,
  FileText,
  Settings
} from "lucide-react";

interface GA4Data {
  pageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: string;
  bounceRate: number;
  conversionRate: number;
  topPages: Array<{ page: string; views: number; engagement: number }>;
  trafficSources: Array<{ source: string; sessions: number; percentage: number }>;
  userBehavior: {
    newUsers: number;
    returningUsers: number;
    avgPagesPerSession: number;
  };
}

interface GSCData {
  searchRankings: Array<{ keyword: string; position: number; clicks: number; impressions: number; ctr: number; trend: 'up' | 'down' | 'stable' }>;
  indexCoverage: {
    validPages: number;
    warningsPages: number;
    errorPages: number;
    excludedPages: number;
  };
  mobileFriendliness: {
    score: number;
    issues: string[];
  };
}

interface CrUXData {
  coreWebVitals: {
    lcp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    inp: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
    cls: { value: number; rating: 'good' | 'needs-improvement' | 'poor' };
  };
  deviceBreakdown: {
    desktop: { lcp: number; inp: number; cls: number };
    mobile: { lcp: number; inp: number; cls: number };
  };
  performanceScore: number;
}

interface StructuredDataHealth {
  implementations: Array<{ type: string; pages: number; status: 'valid' | 'warning' | 'error' }>;
  richResultsEligible: number;
  schemaErrors: Array<{ type: string; error: string; pages: number }>;
}

interface AIOptimizationData {
  mentionCount: number;
  sources: string[];
  topicsCovered: string[];
  crawlability: number;
  contentDepth: number;
  semanticStructure: number;
}

const PerformanceMonitor = () => {
  const [ga4Data, setGA4Data] = useState<GA4Data>({
    pageViews: 45230,
    uniqueVisitors: 28750,
    avgSessionDuration: "4:32",
    bounceRate: 32.5,
    conversionRate: 3.8,
    topPages: [
      { page: "Meditation Tools", views: 8200, engagement: 85 },
      { page: "Dream Journal", views: 6800, engagement: 92 },
      { page: "Breathwork Practices", views: 5100, engagement: 78 },
      { page: "Herbology Resources", views: 4900, engagement: 71 },
      { page: "Blog Articles", views: 4650, engagement: 88 }
    ],
    trafficSources: [
      { source: "Organic Search", sessions: 15650, percentage: 54.5 },
      { source: "Direct", sessions: 7200, percentage: 25.1 },
      { source: "Social Media", sessions: 3450, percentage: 12.0 },
      { source: "Referral", sessions: 1890, percentage: 6.6 },
      { source: "Email", sessions: 560, percentage: 1.8 }
    ],
    userBehavior: {
      newUsers: 18900,
      returningUsers: 9850,
      avgPagesPerSession: 3.7
    }
  });

  const [gscData, setGSCData] = useState<GSCData>({
    searchRankings: [
      { keyword: "meditation techniques", position: 8, clicks: 1250, impressions: 15600, ctr: 8.0, trend: 'up' },
      { keyword: "dream journal digital", position: 5, clicks: 890, impressions: 8900, ctr: 10.0, trend: 'up' },
      { keyword: "breathwork exercises", position: 12, clicks: 560, impressions: 9200, ctr: 6.1, trend: 'stable' },
      { keyword: "herbal medicine guide", position: 18, clicks: 320, impressions: 7800, ctr: 4.1, trend: 'down' },
      { keyword: "mindfulness practices", position: 6, clicks: 1150, impressions: 12400, ctr: 9.3, trend: 'up' },
      { keyword: "guided meditation", position: 11, clicks: 780, impressions: 11200, ctr: 7.0, trend: 'stable' }
    ],
    indexCoverage: {
      validPages: 127,
      warningsPages: 8,
      errorPages: 2,
      excludedPages: 15
    },
    mobileFriendliness: {
      score: 96,
      issues: ["Text too small on mobile", "Clickable elements too close"]
    }
  });

  const [cruxData, setCruxData] = useState<CrUXData>({
    coreWebVitals: {
      lcp: { value: 1.8, rating: 'good' },
      inp: { value: 180, rating: 'good' },
      cls: { value: 0.08, rating: 'good' }
    },
    deviceBreakdown: {
      desktop: { lcp: 1.6, inp: 120, cls: 0.05 },
      mobile: { lcp: 2.1, inp: 220, cls: 0.12 }
    },
    performanceScore: 94
  });

  const [structuredData, setStructuredData] = useState<StructuredDataHealth>({
    implementations: [
      { type: "Article/BlogPosting", pages: 45, status: 'valid' },
      { type: "BreadcrumbList", pages: 127, status: 'valid' },
      { type: "Organization", pages: 1, status: 'valid' },
      { type: "WebSite", pages: 1, status: 'valid' },
      { type: "VideoObject", pages: 12, status: 'warning' },
      { type: "FAQPage", pages: 3, status: 'valid' }
    ],
    richResultsEligible: 89,
    schemaErrors: [
      { type: "VideoObject", error: "Missing duration property", pages: 5 },
      { type: "BlogPosting", error: "Missing author image", pages: 3 }
    ]
  });

  const [aiOptimization, setAIOptimization] = useState<AIOptimizationData>({
    mentionCount: 127,
    sources: ["Claude", "ChatGPT", "Perplexity", "SearchGPT", "Gemini", "Copilot"],
    topicsCovered: ["Meditation", "Dream Work", "Herbology", "Breathwork", "Mindfulness", "Holistic Healing"],
    crawlability: 92,
    contentDepth: 88,
    semanticStructure: 94
  });

  const [isMonitoring, setIsMonitoring] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const interval = setInterval(() => {
      setGA4Data(prev => ({
        ...prev,
        pageViews: prev.pageViews + Math.floor(Math.random() * 8),
        uniqueVisitors: prev.uniqueVisitors + Math.floor(Math.random() * 5)
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

  const getCoreWebVitalColor = (rating: string) => {
    switch (rating) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Advanced Performance Dashboard
        </h2>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsMonitoring(!isMonitoring)}
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Configure Integrations
          </Button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-muted-foreground">
              {isMonitoring ? 'Live Monitoring' : 'Monitoring Paused'}
            </span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="ga4" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            GA4 Analytics
          </TabsTrigger>
          <TabsTrigger value="gsc" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search Console
          </TabsTrigger>
          <TabsTrigger value="crux" className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Core Web Vitals
          </TabsTrigger>
          <TabsTrigger value="schema" className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            Structured Data
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Performance Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-card border-0 bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Performance Score</p>
                    <p className="text-lg font-bold text-foreground">{cruxData.performanceScore}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-card border-0 bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Conversion Rate</p>
                    <p className="text-lg font-bold text-foreground">{ga4Data.conversionRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">AI Mentions</p>
                    <p className="text-lg font-bold text-foreground">{aiOptimization.mentionCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Schema Health</p>
                    <p className="text-lg font-bold text-foreground">{structuredData.richResultsEligible}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Core Web Vitals Quick View */}
          <Card className="shadow-card border-0 bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Core Web Vitals Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Largest Contentful Paint</p>
                  <p className={`text-2xl font-bold ${getCoreWebVitalColor(cruxData.coreWebVitals.lcp.rating)}`}>
                    {cruxData.coreWebVitals.lcp.value}s
                  </p>
                  <Badge variant={cruxData.coreWebVitals.lcp.rating === 'good' ? 'default' : 'destructive'} className="text-xs">
                    {cruxData.coreWebVitals.lcp.rating}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Interaction to Next Paint</p>
                  <p className={`text-2xl font-bold ${getCoreWebVitalColor(cruxData.coreWebVitals.inp.rating)}`}>
                    {cruxData.coreWebVitals.inp.value}ms
                  </p>
                  <Badge variant={cruxData.coreWebVitals.inp.rating === 'good' ? 'default' : 'destructive'} className="text-xs">
                    {cruxData.coreWebVitals.inp.rating}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Cumulative Layout Shift</p>
                  <p className={`text-2xl font-bold ${getCoreWebVitalColor(cruxData.coreWebVitals.cls.rating)}`}>
                    {cruxData.coreWebVitals.cls.value}
                  </p>
                  <Badge variant={cruxData.coreWebVitals.cls.rating === 'good' ? 'default' : 'destructive'} className="text-xs">
                    {cruxData.coreWebVitals.cls.rating}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ga4" className="space-y-6">
          {/* GA4 Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="shadow-card border-0 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-500/10">
                    <Eye className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Page Views</p>
                    <p className="text-2xl font-bold text-foreground">{ga4Data.pageViews.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-foreground">{ga4Data.uniqueVisitors.toLocaleString()}</p>
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
                    <p className="text-2xl font-bold text-foreground">{ga4Data.avgSessionDuration}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-500/10">
                    <Activity className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold text-foreground">{ga4Data.bounceRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top Pages with Engagement */}
            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground">Top Performing Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ga4Data.topPages.map((page, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{page.page}</span>
                        <Badge variant="secondary">{page.views.toLocaleString()} views</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Engagement:</span>
                        <Progress value={page.engagement} className="flex-1 h-2" />
                        <span className="text-xs text-muted-foreground">{page.engagement}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground">Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {ga4Data.trafficSources.map((source, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{source.source}</span>
                        <Badge variant="outline">{source.percentage}%</Badge>
                      </div>
                      <Progress value={source.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="gsc" className="space-y-6">
          {/* GSC Performance Metrics */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Search Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {gscData.searchRankings.map((ranking, index) => (
                    <div key={index} className="p-3 rounded bg-muted/50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground">{ranking.keyword}</span>
                          {getTrendIcon(ranking.trend)}
                        </div>
                        <Badge variant={ranking.position <= 10 ? "default" : "secondary"}>
                          #{ranking.position}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                        <div>Clicks: {ranking.clicks}</div>
                        <div>Impressions: {ranking.impressions.toLocaleString()}</div>
                        <div>CTR: {ranking.ctr}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground">Index Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded bg-green-50 dark:bg-green-950/20">
                    <span className="text-sm font-medium text-green-800 dark:text-green-200">Valid Pages</span>
                    <Badge variant="default">{gscData.indexCoverage.validPages}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-yellow-50 dark:bg-yellow-950/20">
                    <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Warnings</span>
                    <Badge variant="secondary">{gscData.indexCoverage.warningsPages}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-red-50 dark:bg-red-950/20">
                    <span className="text-sm font-medium text-red-800 dark:text-red-200">Errors</span>
                    <Badge variant="destructive">{gscData.indexCoverage.errorPages}</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded bg-gray-50 dark:bg-gray-950/20">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Excluded</span>
                    <Badge variant="outline">{gscData.indexCoverage.excludedPages}</Badge>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-foreground mb-3">Mobile Friendliness</p>
                  <div className="flex items-center gap-2 mb-3">
                    <Progress value={gscData.mobileFriendliness.score} className="flex-1" />
                    <Badge variant="default">{gscData.mobileFriendliness.score}/100</Badge>
                  </div>
                  {gscData.mobileFriendliness.issues.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Issues to address:</p>
                      {gscData.mobileFriendliness.issues.map((issue, index) => (
                        <p key={index} className="text-xs text-red-600">• {issue}</p>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="crux" className="space-y-6">
          {/* Core Web Vitals Detailed */}
          <Card className="shadow-card border-0 bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Core Web Vitals - Real User Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-3">
                  <div className="p-3 rounded-full bg-blue-500/10 w-fit mx-auto">
                    <Monitor className="w-8 h-8 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Largest Contentful Paint</p>
                    <p className={`text-3xl font-bold ${getCoreWebVitalColor(cruxData.coreWebVitals.lcp.rating)}`}>
                      {cruxData.coreWebVitals.lcp.value}s
                    </p>
                    <Badge variant={cruxData.coreWebVitals.lcp.rating === 'good' ? 'default' : 'destructive'}>
                      {cruxData.coreWebVitals.lcp.rating}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Desktop: {cruxData.deviceBreakdown.desktop.lcp}s</p>
                    <p>Mobile: {cruxData.deviceBreakdown.mobile.lcp}s</p>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="p-3 rounded-full bg-green-500/10 w-fit mx-auto">
                    <Activity className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Interaction to Next Paint</p>
                    <p className={`text-3xl font-bold ${getCoreWebVitalColor(cruxData.coreWebVitals.inp.rating)}`}>
                      {cruxData.coreWebVitals.inp.value}ms
                    </p>
                    <Badge variant={cruxData.coreWebVitals.inp.rating === 'good' ? 'default' : 'destructive'}>
                      {cruxData.coreWebVitals.inp.rating}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Desktop: {cruxData.deviceBreakdown.desktop.inp}ms</p>
                    <p>Mobile: {cruxData.deviceBreakdown.mobile.inp}ms</p>
                  </div>
                </div>

                <div className="text-center space-y-3">
                  <div className="p-3 rounded-full bg-purple-500/10 w-fit mx-auto">
                    <Gauge className="w-8 h-8 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Cumulative Layout Shift</p>
                    <p className={`text-3xl font-bold ${getCoreWebVitalColor(cruxData.coreWebVitals.cls.rating)}`}>
                      {cruxData.coreWebVitals.cls.value}
                    </p>
                    <Badge variant={cruxData.coreWebVitals.cls.rating === 'good' ? 'default' : 'destructive'}>
                      {cruxData.coreWebVitals.cls.rating}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Desktop: {cruxData.deviceBreakdown.desktop.cls}</p>
                    <p>Mobile: {cruxData.deviceBreakdown.mobile.cls}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-foreground">Overall Performance Score</span>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={cruxData.performanceScore} className="flex-1" />
                  <Badge variant="default" className="text-lg px-3">{cruxData.performanceScore}/100</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schema" className="space-y-6">
          {/* Structured Data Implementation */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Schema Implementation Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {structuredData.implementations.map((impl, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded bg-muted/50">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{impl.type}</span>
                        <CheckCircle className={`w-4 h-4 ${getStatusColor(impl.status)}`} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{impl.pages} pages</Badge>
                        <Badge variant={impl.status === 'valid' ? 'default' : impl.status === 'warning' ? 'secondary' : 'destructive'}>
                          {impl.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded bg-green-50 dark:bg-green-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800 dark:text-green-200">Rich Results Eligible</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={structuredData.richResultsEligible} className="flex-1" />
                    <Badge variant="default">{structuredData.richResultsEligible}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Schema Errors & Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {structuredData.schemaErrors.length > 0 ? (
                  <div className="space-y-3">
                    {structuredData.schemaErrors.map((error, index) => (
                      <div key={index} className="p-3 rounded bg-red-50 dark:bg-red-950/20">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-800 dark:text-red-200">
                              {error.type}
                            </p>
                            <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                              {error.error}
                            </p>
                            <Badge variant="destructive" className="text-xs mt-2">
                              {error.pages} pages affected
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">No schema errors detected</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          {/* AI Optimization Metrics */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground">AI Optimization Scores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Crawlability</span>
                    <Badge variant="default">{aiOptimization.crawlability}%</Badge>
                  </div>
                  <Progress value={aiOptimization.crawlability} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Content Depth</span>
                    <Badge variant="default">{aiOptimization.contentDepth}%</Badge>
                  </div>
                  <Progress value={aiOptimization.contentDepth} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Semantic Structure</span>
                    <Badge variant="default">{aiOptimization.semanticStructure}%</Badge>
                  </div>
                  <Progress value={aiOptimization.semanticStructure} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Referencing Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-3">
                  <div>
                    <p className="text-3xl font-bold text-foreground">{aiOptimization.mentionCount}</p>
                    <p className="text-sm text-muted-foreground">Total AI Mentions</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">AI Sources</p>
                    <div className="flex flex-wrap gap-1">
                      {aiOptimization.sources.map((source, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{source}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground">Topic Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-3">Well-Covered Topics</p>
                  <div className="flex flex-wrap gap-1">
                    {aiOptimization.topicsCovered.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Optimization Recommendations */}
          <Card className="shadow-card border-0 bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                <Target className="w-5 h-5" />
                AI Optimization Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded bg-green-50 dark:bg-green-950/20">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Excellent semantic structure implementation
                    </p>
                    <p className="text-xs text-green-700 dark:text-green-300">
                      Your content uses proper heading hierarchy and semantic HTML5 elements
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded bg-blue-50 dark:bg-blue-950/20">
                  <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Add more contextual information for AI models
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Include definitions, background context, and cross-references to help AI models better understand your content
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded bg-yellow-50 dark:bg-yellow-950/20">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                      Enhance video content metadata
                    </p>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      Add detailed descriptions, transcripts, and chapter markers to improve AI understanding of video content
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMonitor;