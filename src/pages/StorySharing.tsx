import { useState } from "react";
import { Send, Heart, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";

const StorySharing = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    story: "",
    category: "",
    anonymous: false
  });
  const { toast } = useToast();

  const featuredStories = [
    {
      id: 1,
      title: "Finding Peace After Loss - My Journey with Grief Meditation",
      excerpt: "After losing my mother, I discovered how meditation became my anchor in the storm of grief. Here's how mindfulness helped me find peace in the darkness...",
      author: "Sarah M.",
      category: "Healing",
      date: "2024-08-20",
      featured: true
    },
    {
      id: 2,
      title: "Dream Work Saved My Life - Uncovering Hidden Trauma",
      excerpt: "Through dream journaling, I uncovered repressed memories and began a healing journey I never knew I needed. Dreams became my therapist...",
      author: "Anonymous",
      category: "Dream Work", 
      date: "2024-08-18",
      featured: false
    },
    {
      id: 3,
      title: "From Anxiety to Awakening - A Corporate Executive's Spiritual Journey",
      excerpt: "I thought success meant climbing the corporate ladder. Then anxiety became my teacher, leading me to discover meditation and a completely new way of being...",
      author: "Michael R.",
      category: "Transformation",
      date: "2024-08-15",
      featured: false
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Story Submitted Successfully!",
      description: "Thank you for sharing your journey. We'll review your story and be in touch soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      title: "",
      story: "",
      category: "",
      anonymous: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const pageSchema = {
    "@type": "WebPage",
    "name": "Share Your Story - Guest Storytelling Community",
    "description": "Share your spiritual journey, healing story, or transformation experience with our mindful community. Connect through authentic storytelling and inspire others on their path.",
    "about": [
      {
        "@type": "Thing",
        "name": "Story Sharing",
        "description": "Community platform for sharing personal spiritual and healing journeys"
      },
      {
        "@type": "Thing",
        "name": "Guest Stories",
        "description": "Personal narratives of transformation, awakening, and healing"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Share Your Story - Guest Storytelling Community"
        description="Share your spiritual journey, healing story, or transformation experience with our mindful community. Connect through authentic storytelling and inspire others on their path."
        keywords="story sharing, guest stories, spiritual journey, healing stories, transformation, community, personal growth, meditation stories"
        schemaType="WebPage"
        schemaData={pageSchema}
        breadcrumbs={[
          { name: "Home", url: "https://www.thedreamwork.space/" },
          { name: "Share Your Story", url: "https://www.thedreamwork.space/story-sharing" }
        ]}
      />
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold gradient-text mb-8 leading-loose pt-2 pb-2">
            Share Your Sacred Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Your journey of healing, awakening, and transformation has the power to inspire and support others. 
            Join our community of storytellers and share the wisdom you've gained along your path.
          </p>
          <div className="bg-gradient-card backdrop-blur-sm rounded-lg p-6 border border-border shadow-card max-w-2xl mx-auto">
            <h2 className="text-lg font-heading font-semibold text-foreground mb-4">What Stories Are We Looking For?</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>• Spiritual awakening experiences</div>
              <div>• Healing through meditation</div>
              <div>• Dream work revelations</div>
              <div>• Overcoming anxiety/depression</div>
              <div>• Life-changing synchronicities</div>
              <div>• Transformation through mindfulness</div>
            </div>
          </div>
        </section>

        {/* Featured Stories */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-8 text-center">
            Featured Community Stories
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
            {featuredStories.map((story, index) => (
              <Card
                key={story.id}
                className={`overflow-hidden shadow-card border-0 bg-card hover:shadow-card-hover transition-smooth group cursor-pointer animate-fade-in ${
                  story.featured ? 'lg:col-span-2 lg:row-span-1' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant="secondary" 
                      className="gradient-card text-foreground border-0"
                    >
                      {story.category}
                    </Badge>
                    {story.featured && (
                      <Badge variant="outline" className="text-xs">
                        <Heart className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h3 className={`font-heading font-semibold text-foreground leading-tight group-hover:text-primary transition-gentle ${
                    story.featured ? 'text-xl' : 'text-lg'
                  }`}>
                    {story.title}
                  </h3>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className={`text-muted-foreground leading-relaxed mb-4 ${
                    story.featured ? 'text-base' : 'text-sm'
                  }`}>
                    {story.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {story.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(story.date).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Story Submission Form */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-card border-0 bg-card">
              <CardHeader className="text-center pb-6">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Submit Your Story
                </h2>
                <p className="text-muted-foreground">
                  Share your journey with our community. All stories are reviewed before publication.
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
                      Story Title
                    </label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      placeholder="Give your story a compelling title"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
                      Story Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a category</option>
                      <option value="Healing">Healing Journey</option>
                      <option value="Meditation">Meditation Experience</option>
                      <option value="Dream Work">Dream Work</option>
                      <option value="Transformation">Life Transformation</option>
                      <option value="Awakening">Spiritual Awakening</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="story" className="block text-sm font-medium text-foreground mb-2">
                      Your Story
                    </label>
                    <Textarea
                      id="story"
                      name="story"
                      value={formData.story}
                      onChange={handleInputChange}
                      required
                      placeholder="Share your journey in detail. What happened? How did it change you? What wisdom did you gain? Be authentic and speak from the heart..."
                      rows={8}
                      className="resize-none"
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleInputChange}
                      className="rounded border-border"
                    />
                    <label htmlFor="anonymous" className="text-sm text-muted-foreground">
                      Publish this story anonymously
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto"
                  >
                    <Send className="mr-2 w-4 h-4" />
                    Submit Your Story
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-card backdrop-blur-sm rounded-lg p-8 border border-border shadow-card">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
            Ready to Inspire Others?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Your story has the power to heal, inspire, and guide others on their journey. 
            By sharing your experience, you become part of a beautiful tapestry of human transformation.
          </p>
          <Button 
            size="lg"
            onClick={() => document.getElementById('name')?.focus()}
          >
            Start Sharing Your Story
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default StorySharing;