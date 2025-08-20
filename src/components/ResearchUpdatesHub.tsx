import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  TrendingUp, 
  Search, 
  ExternalLink, 
  Bell,
  Calendar,
  Brain,
  Leaf,
  Heart,
  Zap,
  Filter,
  RefreshCw
} from "lucide-react";

interface ResearchUpdate {
  id: string;
  category: 'ai-indexing' | 'seo-trends' | 'meditation-research' | 'mindfulness-studies';
  title: string;
  description: string;
  source: string;
  date: Date;
  impact: 'low' | 'medium' | 'high';
  actionRequired: boolean;
  url?: string;
}

interface TrendingTopic {
  topic: string;
  growth: number;
  category: string;
  relevance: number;
}

const ResearchUpdatesHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const [researchUpdates, setResearchUpdates] = useState<ResearchUpdate[]>([
    {
      id: '1',
      category: 'ai-indexing',
      title: 'Google AI Overview Integration with Wellness Content',
      description: 'New research shows that AI-generated overviews are prominently featuring meditation and mindfulness content, with 40% increase in visibility for well-structured, evidence-based articles.',
      source: 'Search Engine Journal',
      date: new Date('2024-12-15'),
      impact: 'high',
      actionRequired: true,
      url: 'https://searchenginejournal.com'
    },
    {
      id: '2',
      category: 'meditation-research',
      title: 'Neuroplasticity Changes in 8-Week Meditation Programs',
      description: 'Latest neuroscience research demonstrates measurable brain changes in participants following structured meditation programs, supporting evidence-based content approaches.',
      source: 'Nature Neuroscience',
      date: new Date('2024-12-14'),
      impact: 'high',
      actionRequired: true,
      url: 'https://nature.com'
    },
    {
      id: '3',
      category: 'seo-trends',
      title: 'Voice Search Optimization for Wellness Queries',
      description: 'Voice search queries for meditation and wellness topics increased 65% this year. Long-tail, conversational keywords showing higher conversion rates.',
      source: 'Moz Research',
      date: new Date('2024-12-13'),
      impact: 'medium',
      actionRequired: true,
      url: 'https://moz.com'
    },
    {
      id: '4',
      category: 'mindfulness-studies',
      title: 'Digital Mindfulness Tools Effectiveness Study',
      description: 'Comprehensive analysis of digital meditation apps and tools shows interactive elements increase engagement by 280% compared to static content.',
      source: 'Journal of Medical Internet Research',
      date: new Date('2024-12-12'),
      impact: 'high',
      actionRequired: true,
      url: 'https://jmir.org'
    },
    {
      id: '5',
      category: 'ai-indexing',
      title: 'ChatGPT and Claude Citation Patterns for Wellness Content',
      description: 'Analysis reveals AI models prefer citing sources with structured data, clear authorship, and evidence-based claims. Schema markup increases citation likelihood by 45%.',
      source: 'AI Research Institute',
      date: new Date('2024-12-10'),
      impact: 'medium',
      actionRequired: false
    }
  ]);

  const [trendingTopics, setTrendingTopics] = useState<TrendingTopic[]>([
    { topic: 'AI-assisted meditation', growth: 156, category: 'Technology', relevance: 92 },
    { topic: 'Breathwork for anxiety', growth: 87, category: 'Mental Health', relevance: 95 },
    { topic: 'Digital detox practices', growth: 73, category: 'Wellness', relevance: 88 },
    { topic: 'Personalized mindfulness', growth: 68, category: 'Technology', relevance: 90 },
    { topic: 'Workplace meditation', growth: 54, category: 'Corporate', relevance: 76 }
  ]);

  const categories = [
    { value: 'all', label: 'All Updates' },
    { value: 'ai-indexing', label: 'AI Indexing' },
    { value: 'seo-trends', label: 'SEO Trends' },
    { value: 'meditation-research', label: 'Meditation Research' },
    { value: 'mindfulness-studies', label: 'Mindfulness Studies' }
  ];

  const filteredUpdates = researchUpdates.filter(update => {
    const matchesCategory = selectedCategory === 'all' || update.category === selectedCategory;
    const matchesSearch = update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         update.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai-indexing': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'seo-trends': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'meditation-research': return <Heart className="w-4 h-4 text-red-500" />;
      case 'mindfulness-studies': return <Leaf className="w-4 h-4 text-green-500" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 border-red-200 bg-red-50';
      case 'medium': return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'low': return 'text-green-600 border-green-200 bg-green-50';
      default: return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  const refreshUpdates = () => {
    setLastUpdated(new Date());
    // Simulate fetching new updates
    console.log('Refreshing research updates...');
  };

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refreshUpdates();
      }, 300000); // Refresh every 5 minutes

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground">
            Research & Updates Hub
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <Bell className={`mr-2 w-4 h-4 ${autoRefresh ? 'text-green-500' : 'text-gray-400'}`} />
            Auto-refresh {autoRefresh ? 'On' : 'Off'}
          </Button>
          <Button variant="outline" size="sm" onClick={refreshUpdates}>
            <RefreshCw className="mr-2 w-4 h-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Trending Topics */}
      <Card className="shadow-card border-0 bg-card">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Trending Topics in Meditation & Wellness
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trendingTopics.map((topic, index) => (
              <div key={index} className="border border-border/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{topic.topic}</h4>
                  <Badge variant="secondary" className="text-xs">
                    +{topic.growth}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{topic.category}</span>
                  <span>{topic.relevance}% relevant</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${topic.relevance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search research updates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category.value}
              variant={selectedCategory === category.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.value)}
            >
              <Filter className="mr-2 w-4 h-4" />
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Research Updates */}
      <div className="space-y-4">
        {filteredUpdates.map((update) => (
          <Card key={update.id} className="shadow-card border-0 bg-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getCategoryIcon(update.category)}
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{update.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs capitalize">
                        {update.category.replace('-', ' ')}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getImpactColor(update.impact)}`}
                      >
                        {update.impact} impact
                      </Badge>
                      {update.actionRequired && (
                        <Badge variant="default" className="text-xs">
                          Action Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" />
                    {update.date.toLocaleDateString()}
                  </div>
                  <div>{update.source}</div>
                </div>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {update.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {update.actionRequired && (
                    <Button size="sm">
                      Plan Action
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    Save for Later
                  </Button>
                </div>
                {update.url && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(update.url, '_blank')}
                  >
                    <ExternalLink className="mr-2 w-4 h-4" />
                    Read Full Article
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUpdates.length === 0 && (
        <Card className="shadow-card border-0 bg-card">
          <CardContent className="p-8 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No research updates found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      {/* Adaptation Strategy */}
      <Card className="shadow-card border-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardHeader>
          <CardTitle className="text-lg font-heading text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Continuous Adaptation Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-3">Current Focus Areas</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Optimizing for AI model citations and references
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Implementing voice search optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Enhancing interactive content elements
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Building evidence-based content library
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-3">Next Quarter Goals</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Achieve top 3 AI model citations for meditation content</li>
                <li>• Implement advanced schema markup across all pages</li>
                <li>• Launch personalized content recommendation system</li>
                <li>• Establish partnerships with research institutions</li>
                <li>• Create AI-optimized content templates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResearchUpdatesHub;