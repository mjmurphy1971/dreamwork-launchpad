import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Target
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

      <div className="grid lg:grid-cols-2 gap-6">
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

        {/* AI Insights & Analytics */}
        <Card className="shadow-card border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              AI-Driven Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="border border-border/50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(insight.category)}
                      <span className="font-medium text-foreground text-sm">{insight.title}</span>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getPriorityColor(insight.priority)}`}
                    >
                      {insight.priority} priority
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs capitalize">
                      {insight.category.replace('-', ' ')}
                    </Badge>
                    {insight.actionable && (
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

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

      {/* Future AI Capabilities */}
      <Card className="shadow-card border-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Future AI Integrations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Planned Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Voice-activated meditation guidance</li>
                <li>• Real-time mood analysis from journal entries</li>
                <li>• Personalized herb interaction checking</li>
                <li>• Adaptive meditation session lengths</li>
                <li>• Community insight generation</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Integration Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Content Personalization</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Automated Summaries</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Predictive Analytics</span>
                  <Badge variant="secondary">Beta</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Voice Integration</span>
                  <Badge variant="outline">Planned</Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIIntegrationHub;