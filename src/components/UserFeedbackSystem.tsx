import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Star, 
  Send, 
  Heart, 
  Lightbulb,
  User,
  Clock,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Feedback {
  id: string;
  type: 'suggestion' | 'praise' | 'issue' | 'feature-request';
  rating: number;
  message: string;
  page: string;
  user: string;
  timestamp: Date;
  status: 'new' | 'reviewed' | 'implemented';
}

const UserFeedbackSystem = () => {
  const { toast } = useToast();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'praise' | 'issue' | 'feature-request'>('suggestion');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'new' | 'reviewed' | 'implemented'>('all');

  const [feedbackList, setFeedbackList] = useState<Feedback[]>([
    {
      id: '1',
      type: 'praise',
      rating: 5,
      message: 'The dream journal feature is absolutely amazing! It has really helped me track my dreams and notice patterns.',
      page: 'Dream Journal',
      user: 'sarah.m@email.com',
      timestamp: new Date('2024-12-15'),
      status: 'reviewed'
    },
    {
      id: '2',
      type: 'suggestion',
      rating: 4,
      message: 'Could you add more guided meditations for beginners? The current ones are great but more variety would be helpful.',
      page: 'Meditation Tools',
      user: 'alex.chen@email.com',
      timestamp: new Date('2024-12-14'),
      status: 'new'
    },
    {
      id: '3',
      type: 'feature-request',
      rating: 5,
      message: 'It would be wonderful to have a community feature where users can share their meditation experiences.',
      page: 'Home',
      user: 'maya.patel@email.com',
      timestamp: new Date('2024-12-13'),
      status: 'new'
    },
    {
      id: '4',
      type: 'issue',
      rating: 3,
      message: 'Some of the herb links in the herbology section are not working properly.',
      page: 'Herbology',
      user: 'john.doe@email.com',
      timestamp: new Date('2024-12-12'),
      status: 'implemented'
    }
  ]);

  const handleSubmitFeedback = () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please provide your feedback message.",
        variant: "destructive"
      });
      return;
    }

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      type: feedbackType,
      rating,
      message: message.trim(),
      page: window.location.pathname,
      user: userEmail || 'Anonymous',
      timestamp: new Date(),
      status: 'new'
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    
    // Reset form
    setMessage('');
    setUserEmail('');
    setRating(5);
    setShowFeedbackForm(false);

    toast({
      title: "Feedback Submitted!",
      description: "Thank you for your valuable feedback. We'll review it soon.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'praise': return <Heart className="w-4 h-4 text-red-500" />;
      case 'suggestion': return <Lightbulb className="w-4 h-4 text-yellow-500" />;
      case 'issue': return <MessageCircle className="w-4 h-4 text-orange-500" />;
      case 'feature-request': return <Star className="w-4 h-4 text-blue-500" />;
      default: return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'reviewed': return 'bg-yellow-500';
      case 'implemented': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredFeedback = feedbackList.filter(feedback => 
    filterStatus === 'all' || feedback.status === filterStatus
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          User Feedback System
        </h2>
        <Button onClick={() => setShowFeedbackForm(!showFeedbackForm)}>
          <MessageCircle className="mr-2 w-4 h-4" />
          {showFeedbackForm ? 'Cancel' : 'Leave Feedback'}
        </Button>
      </div>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <Card className="shadow-card border-0 bg-card">
          <CardHeader>
            <CardTitle className="text-lg font-heading text-foreground">Share Your Feedback</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Feedback Type</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'suggestion', label: 'Suggestion', icon: Lightbulb },
                  { value: 'praise', label: 'Praise', icon: Heart },
                  { value: 'issue', label: 'Issue', icon: MessageCircle },
                  { value: 'feature-request', label: 'Feature Request', icon: Star }
                ].map(({ value, label, icon: Icon }) => (
                  <Button
                    key={value}
                    variant={feedbackType === value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFeedbackType(value as any)}
                  >
                    <Icon className="mr-2 w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="focus:outline-none"
                  >
                    <Star 
                      className={`w-6 h-6 ${star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Your Message</label>
              <Textarea
                placeholder="Share your thoughts, suggestions, or report issues..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Email (Optional)</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>

            <Button onClick={handleSubmitFeedback} className="w-full">
              <Send className="mr-2 w-4 h-4" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Feedback Dashboard */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter by status:</span>
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'reviewed', 'implemented'].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus(status as any)}
            >
              {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback) => (
          <Card key={feedback.id} className="shadow-card border-0 bg-card">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(feedback.type)}
                  <Badge 
                    variant="secondary" 
                    className="text-xs capitalize"
                  >
                    {feedback.type.replace('-', ' ')}
                  </Badge>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(feedback.status)}`} />
                  <span className="text-xs text-muted-foreground capitalize">{feedback.status}</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star}
                      className={`w-3 h-3 ${star <= feedback.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-sm text-foreground mb-3">{feedback.message}</p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {feedback.user}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {feedback.timestamp.toLocaleDateString()}
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {feedback.page}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFeedback.length === 0 && (
        <Card className="shadow-card border-0 bg-card">
          <CardContent className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No feedback found for the selected filter.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserFeedbackSystem;