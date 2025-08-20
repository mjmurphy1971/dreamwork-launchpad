import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Users, 
  TrendingUp,
  Zap,
  MessageSquare,
  Search,
  Lightbulb,
  Target,
  Moon,
  Smartphone,
  Bell,
  Clock,
  Calendar,
  BarChart3,
  Settings,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Play,
  Pause
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PersonalizedRecommendation {
  id: string;
  type: 'meditation' | 'breathwork' | 'journaling' | 'herbs' | 'reading';
  title: string;
  description: string;
  confidence: number;
  basedOn: string[];
}

interface AIInsight {
  id: string;
  category: 'trend' | 'optimization' | 'content' | 'user-behavior';
  title: string;
  description: string;
  actionable: boolean;
  priority: 'low' | 'medium' | 'high';
}

const AIIntegrationHub = () => {
  const { toast } = useToast();
  const [selectedUser, setSelectedUser] = useState('');
  const [aiQuery, setAIQuery] = useState('');
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("insights");

  // High Priority Action States
  const [dreamWorkCampaign, setDreamWorkCampaign] = useState({
    enabled: false,
    eveningPromptTime: '20:00',
    targetAudience: 'all-users',
    campaignActive: false
  });

  const [mobileNotifications, setMobileNotifications] = useState({
    morningEnabled: true,
    eveningEnabled: true,
    morningTime: '07:00',
    eveningTime: '21:00',
    notificationsActive: false
  });

  const [personalizationEngine, setPersonalizationEngine] = useState({
    enabled: true,
    confidenceThreshold: 75,
    segmentationActive: true,
    a_b_testing: false
  });

  const [personalizedRecs, setPersonalizedRecs] = useState<PersonalizedRecommendation[]>([
    {
      id: '1',
      type: 'meditation',
      title: 'Morning Mindfulness for Anxiety',
      description: 'Based on your recent dream journal entries showing stress patterns, try this 10-minute morning meditation focused on grounding techniques.',
      confidence: 87,
      basedOn: ['Dream Journal Activity', 'Meditation History', 'Time Preferences']
    },
    {
      id: '2',
      type: 'herbs',
      title: 'Chamomile Tea Protocol',
      description: 'Your usage patterns suggest difficulty with evening wind-down. Consider chamomile tea 1 hour before your typical sleep time.',
      confidence: 92,
      basedOn: ['Sleep Tracking', 'Herbology Searches', 'Evening Activity']
    },
    {
      id: '3',
      type: 'breathwork',
      title: 'Box Breathing for Focus',
      description: 'Your meditation sessions show restlessness patterns. Box breathing (4-4-4-4 pattern) may help improve concentration.',
      confidence: 78,
      basedOn: ['Meditation Feedback', 'Session Duration', 'Focus Metrics']
    }
  ]);

  const [aiInsights, setAIInsights] = useState<AIInsight[]>([
    {
      id: '1',
      category: 'trend',
      title: 'Rising Interest in Dream Work',
      description: 'AI models are increasingly referencing dream interpretation content. Users are 40% more likely to engage with dream-related tools in the evening.',
      actionable: true,
      priority: 'high'
    },
    {
      id: '2',
      category: 'optimization',
      title: 'Herbology Content Gap',
      description: 'AI analysis shows missing content for "adaptogenic herbs for students" - a high-search-volume, low-competition keyword opportunity.',
      actionable: true,
      priority: 'medium'
    },
    {
      id: '3',
      category: 'user-behavior',
      title: 'Mobile Meditation Preference',
      description: '73% of meditation tool usage occurs on mobile devices between 6-8 AM and 9-11 PM, suggesting optimal timing for push notifications.',
      actionable: true,
      priority: 'high'
    },
    {
      id: '4',
      category: 'content',
      title: 'Personalization Opportunity',
      description: 'Users who receive personalized meditation recommendations have 2.3x higher session completion rates.',
      actionable: true,
      priority: 'high'
    }
  ]);

  const generateAISummary = async () => {
    if (!aiQuery.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a topic to generate an AI summary.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = `## AI-Generated Summary: ${aiQuery}

**Overview:** This topic encompasses several key aspects relevant to mindfulness and wellness practices.

**Key Points:**
• Evidence-based research supports the effectiveness of these practices
• Traditional wisdom aligns with modern scientific understanding  
• Individual variation in response requires personalized approaches
• Integration with daily routines enhances long-term benefits

**Practical Applications:**
• Start with 5-10 minute daily sessions
• Maintain consistency over intensity
• Track progress through journaling or apps
• Seek guidance from qualified practitioners when needed

**Safety Considerations:**
• Always consult healthcare providers for medical conditions
• Start slowly and listen to your body's responses
• Modify practices based on individual needs and limitations

**Further Resources:**
• Peer-reviewed research articles
• Traditional texts and teachings
• Professional practitioner networks
• Online communities for support and guidance

*This summary is AI-generated and should be reviewed by human experts before publication.*`;

      setGeneratedSummary(mockSummary);
      setIsGenerating(false);
      
      toast({
        title: "Summary Generated!",
        description: "AI has created a comprehensive summary. Please review for accuracy.",
      });
    }, 3000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'meditation': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'breathwork': return <Zap className="w-4 h-4 text-blue-500" />;
      case 'journaling': return <BookOpen className="w-4 h-4 text-green-500" />;
      case 'herbs': return <Sparkles className="w-4 h-4 text-orange-500" />;
      case 'reading': return <BookOpen className="w-4 h-4 text-indigo-500" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trend': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'optimization': return <Target className="w-4 h-4 text-green-500" />;
      case 'content': return <BookOpen className="w-4 h-4 text-purple-500" />;
      case 'user-behavior': return <Users className="w-4 h-4 text-orange-500" />;
      default: return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 border-red-200';
      case 'medium': return 'text-yellow-600 border-yellow-200';
      case 'low': return 'text-green-600 border-green-200';
      default: return 'text-gray-600 border-gray-200';
    }
  };

  // Action Handlers for High Priority Items
  const handleDreamWorkCampaign = async (action: 'activate' | 'deactivate' | 'configure') => {
    switch (action) {
      case 'activate':
        setDreamWorkCampaign(prev => ({ ...prev, campaignActive: true }));
        toast({
          title: "Dream Work Campaign Activated!",
          description: "Evening dream tool promotions will begin showing to users at the specified time.",
        });
        break;
      case 'deactivate':
        setDreamWorkCampaign(prev => ({ ...prev, campaignActive: false }));
        toast({
          title: "Campaign Paused",
          description: "Dream work promotions have been temporarily disabled.",
        });
        break;
      case 'configure':
        // Configuration logic would go here
        toast({
          title: "Configuration Updated",
          description: "Dream work campaign settings have been saved.",
        });
        break;
    }
  };

  const handleMobileNotifications = async (action: 'activate' | 'deactivate' | 'test') => {
    switch (action) {
      case 'activate':
        setMobileNotifications(prev => ({ ...prev, notificationsActive: true }));
        toast({
          title: "Mobile Notifications Activated!",
          description: "Meditation reminders will be sent at optimal times based on usage patterns.",
        });
        break;
      case 'deactivate':
        setMobileNotifications(prev => ({ ...prev, notificationsActive: false }));
        toast({
          title: "Notifications Paused",
          description: "Mobile meditation reminders have been temporarily disabled.",
        });
        break;
      case 'test':
        toast({
          title: "Test Notification Sent",
          description: "Check your mobile device for the test meditation reminder.",
        });
        break;
    }
  };

  const handlePersonalizationEngine = async (action: 'optimize' | 'test' | 'configure') => {
    switch (action) {
      case 'optimize':
        setPersonalizationEngine(prev => ({ ...prev, a_b_testing: true }));
        toast({
          title: "A/B Testing Started",
          description: "Testing enhanced personalization algorithms with user segments.",
        });
        break;
      case 'test':
        toast({
          title: "Personalization Test Complete",
          description: "Algorithm performed 15% better than baseline in user engagement.",
        });
        break;
      case 'configure':
        toast({
          title: "Engine Configured",
          description: "Personalization settings have been updated successfully.",
        });
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
          AI Integration Hub
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Leverage artificial intelligence to enhance user experience through personalized recommendations, 
          content generation, and data-driven insights.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            High Priority Actions
          </TabsTrigger>
          <TabsTrigger value="personalization" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Personalization
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Content Generation
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          {/* High Priority Action Items */}
          <div className="grid gap-6">
            
            {/* Dream Work Evening Engagement */}
            <Card className="shadow-card border-0 bg-card border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                    <Moon className="w-5 h-5 text-blue-600" />
                    Rising Interest in Dream Work
                    <Badge variant="destructive" className="text-xs">HIGH PRIORITY</Badge>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {dreamWorkCampaign.campaignActive ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI models are increasingly referencing dream interpretation content. Users are 40% more likely to engage with dream-related tools in the evening.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Evening Prompt Time</label>
                        <Input 
                          type="time" 
                          value={dreamWorkCampaign.eveningPromptTime}
                          onChange={(e) => setDreamWorkCampaign(prev => ({ ...prev, eveningPromptTime: e.target.value }))}
                          className="w-32"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Target Audience</label>
                        <select 
                          value={dreamWorkCampaign.targetAudience}
                          onChange={(e) => setDreamWorkCampaign(prev => ({ ...prev, targetAudience: e.target.value }))}
                          className="text-sm border rounded px-2 py-1"
                        >
                          <option value="all-users">All Users</option>
                          <option value="frequent-dreamers">Frequent Dreamers</option>
                          <option value="evening-active">Evening Active</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded bg-blue-50 dark:bg-blue-950/20">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Projected Impact</span>
                        </div>
                        <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                          <li>• +40% dream tool engagement</li>
                          <li>• +25% evening session duration</li>
                          <li>• +60% journal entries in evening</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!dreamWorkCampaign.campaignActive ? (
                      <Button onClick={() => handleDreamWorkCampaign('activate')} className="flex items-center gap-2">
                        <Play className="w-4 h-4" />
                        Activate Campaign
                      </Button>
                    ) : (
                      <Button onClick={() => handleDreamWorkCampaign('deactivate')} variant="outline" className="flex items-center gap-2">
                        <Pause className="w-4 h-4" />
                        Pause Campaign
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handleDreamWorkCampaign('configure')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mobile Meditation Optimization */}
            <Card className="shadow-card border-0 bg-card border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    Mobile Meditation Preference
                    <Badge variant="destructive" className="text-xs">HIGH PRIORITY</Badge>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {mobileNotifications.notificationsActive ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  73% of meditation tool usage occurs on mobile devices between 6-8 AM and 9-11 PM, suggesting optimal timing for push notifications.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Morning Notifications
                        </label>
                        <Switch 
                          checked={mobileNotifications.morningEnabled}
                          onCheckedChange={(checked) => setMobileNotifications(prev => ({ ...prev, morningEnabled: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Morning Time</span>
                        <Input 
                          type="time" 
                          value={mobileNotifications.morningTime}
                          onChange={(e) => setMobileNotifications(prev => ({ ...prev, morningTime: e.target.value }))}
                          className="w-32"
                          disabled={!mobileNotifications.morningEnabled}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Moon className="w-4 h-4" />
                          Evening Notifications
                        </label>
                        <Switch 
                          checked={mobileNotifications.eveningEnabled}
                          onCheckedChange={(checked) => setMobileNotifications(prev => ({ ...prev, eveningEnabled: checked }))}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Evening Time</span>
                        <Input 
                          type="time" 
                          value={mobileNotifications.eveningTime}
                          onChange={(e) => setMobileNotifications(prev => ({ ...prev, eveningTime: e.target.value }))}
                          className="w-32"
                          disabled={!mobileNotifications.eveningEnabled}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded bg-green-50 dark:bg-green-950/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Bell className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800 dark:text-green-200">Optimization Benefits</span>
                        </div>
                        <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                          <li>• +50% notification engagement</li>
                          <li>• +35% daily active users</li>
                          <li>• +28% session completion rates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!mobileNotifications.notificationsActive ? (
                      <Button onClick={() => handleMobileNotifications('activate')} className="flex items-center gap-2">
                        <Bell className="w-4 h-4" />
                        Activate Notifications
                      </Button>
                    ) : (
                      <Button onClick={() => handleMobileNotifications('deactivate')} variant="outline" className="flex items-center gap-2">
                        <Pause className="w-4 h-4" />
                        Pause Notifications
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handleMobileNotifications('test')}>
                      Test Notification
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalization Engine Enhancement */}
            <Card className="shadow-card border-0 bg-card border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Personalization Opportunity
                    <Badge variant="destructive" className="text-xs">HIGH PRIORITY</Badge>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {personalizationEngine.a_b_testing ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <BarChart3 className="w-3 h-3" />
                        Testing
                      </Badge>
                    ) : (
                      <Badge variant="outline">Optimizable</Badge>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Users who receive personalized meditation recommendations have 2.3x higher session completion rates.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Confidence Threshold</label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{personalizationEngine.confidenceThreshold}%</span>
                        </div>
                      </div>
                      <Progress value={personalizationEngine.confidenceThreshold} className="h-2" />
                      <Input 
                        type="range" 
                        min="50" 
                        max="95" 
                        value={personalizationEngine.confidenceThreshold}
                        onChange={(e) => setPersonalizationEngine(prev => ({ ...prev, confidenceThreshold: parseInt(e.target.value) }))}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">User Segmentation</label>
                        <Switch 
                          checked={personalizationEngine.segmentationActive}
                          onCheckedChange={(checked) => setPersonalizationEngine(prev => ({ ...prev, segmentationActive: checked }))}
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded bg-purple-50 dark:bg-purple-950/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium text-purple-800 dark:text-purple-200">Expected Results</span>
                        </div>
                        <ul className="text-xs text-purple-700 dark:text-purple-300 space-y-1">
                          <li>• +130% completion rates</li>
                          <li>• +85% user satisfaction</li>
                          <li>• +42% repeat usage</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!personalizationEngine.a_b_testing ? (
                      <Button onClick={() => handlePersonalizationEngine('optimize')} className="flex items-center gap-2">
                        <BarChart3 className="w-4 h-4" />
                        Start A/B Testing
                      </Button>
                    ) : (
                      <Button onClick={() => handlePersonalizationEngine('test')} variant="outline" className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        View Test Results
                      </Button>
                    )}
                    <Button variant="outline" onClick={() => handlePersonalizationEngine('configure')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configure Engine
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medium Priority - Herbology Content Gap */}
            <Card className="shadow-card border-0 bg-card border-l-4 border-l-yellow-500">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-orange-600" />
                    Herbology Content Gap
                    <Badge variant="secondary" className="text-xs">MEDIUM PRIORITY</Badge>
                  </CardTitle>
                  <Badge variant="outline">Optimization</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  AI analysis shows missing content for "adaptogenic herbs for students" - a high-search-volume, low-competition keyword opportunity.
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Keyword Opportunity</h4>
                    <div className="p-3 rounded bg-orange-50 dark:bg-orange-950/20">
                      <div className="text-xs text-orange-700 dark:text-orange-300 space-y-1">
                        <div className="flex justify-between">
                          <span>Search Volume:</span>
                          <span className="font-medium">2,400/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Competition:</span>
                          <span className="font-medium">Low</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Difficulty:</span>
                          <span className="font-medium">23/100</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Suggested Actions</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Create comprehensive guide for student herbs</li>
                      <li>• Add adaptogenic herb profiles</li>
                      <li>• Include study-focused recipes</li>
                      <li>• Link to existing herbology content</li>
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button className="flex items-center gap-2">
                    <ArrowRight className="w-4 h-4" />
                    Create Content Plan
                  </Button>
                  <Button variant="outline">
                    Research Keywords
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personalization" className="space-y-6">
          {/* Personalized Recommendations */}
          <Card className="shadow-card border-0 bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Enter user ID or email for personalized recs..."
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  />
                  <Button size="sm">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                {personalizedRecs.map((rec) => (
                  <div key={rec.id} className="border border-border/50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(rec.type)}
                        <span className="font-medium text-foreground text-sm">{rec.title}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {rec.confidence}% confidence
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    
                    <div className="flex flex-wrap gap-1">
                      {rec.basedOn.map((factor, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          {/* AI Content Generation */}
          <Card className="shadow-card border-0 bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI Content Summarization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="Enter topic for AI summary (e.g., 'meditation for anxiety', 'herb interactions')"
                    value={aiQuery}
                    onChange={(e) => setAIQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button 
                    onClick={generateAISummary}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 w-4 h-4" />
                        Generate Summary
                      </>
                    )}
                  </Button>
                </div>

                {generatedSummary && (
                  <div className="border border-border/50 rounded-lg p-4 bg-muted/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-foreground">Generated Summary</h4>
                      <Badge variant="outline" className="text-xs">
                        Requires Human Review
                      </Badge>
                    </div>
                    <Textarea
                      value={generatedSummary}
                      onChange={(e) => setGeneratedSummary(e.target.value)}
                      rows={12}
                      className="text-sm"
                    />
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button size="sm">
                        Approve & Publish
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  AI Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Recommendation Accuracy</span>
                    <span className="font-medium">87.3%</span>
                  </div>
                  <Progress value={87.3} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">User Engagement</span>
                    <span className="font-medium">+42%</span>
                  </div>
                  <Progress value={142} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Content Generation Speed</span>
                    <span className="font-medium">2.3s avg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-0 bg-card">
              <CardHeader>
                <CardTitle className="text-lg font-heading text-foreground">Integration Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dream Work Campaign</span>
                    <Badge variant={dreamWorkCampaign.campaignActive ? "default" : "outline"}>
                      {dreamWorkCampaign.campaignActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mobile Notifications</span>
                    <Badge variant={mobileNotifications.notificationsActive ? "default" : "outline"}>
                      {mobileNotifications.notificationsActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Personalization Engine</span>
                    <Badge variant={personalizationEngine.a_b_testing ? "default" : "secondary"}>
                      {personalizationEngine.a_b_testing ? "Testing" : "Optimizable"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content Generation</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIIntegrationHub;