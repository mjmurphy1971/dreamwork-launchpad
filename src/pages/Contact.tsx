import { useState } from "react";
import { Send, Mail, MessageSquare, User, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Message sent successfully! We'll get back to you soon. 🙏");
      } else {
        const error = await response.text();
        toast.error(error || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact The Dream Work",
    "description": "Get in touch with The Dream Work for meditation guidance, practice support, and healing resources.",
    "url": "https://thedreamwork.space/contact"
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Contact Us"
        description="Get in touch with The Dream Work for meditation guidance, practice support, and healing resources. We're here to support your wellness journey."
        keywords="contact, meditation guidance, practice support, wellness coaching, dream work"
        schemaType="WebPage"
        schemaData={contactSchema}
        breadcrumbs={[
          { name: "Home", url: "https://thedreamwork.space/" },
          { name: "Contact", url: "https://thedreamwork.space/contact" }
        ]}
      />
      
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl font-bold gradient-text mb-4">
              Get In Touch
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need guidance on your meditation journey, have questions about our tools, 
              or want to share your experience, we're here to listen and support you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MessageSquare className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-2xl font-semibold">Send us a message</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center space-y-6 py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-600 dark:text-green-400 text-xl mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. We typically respond within 24 hours. 
                      In the meantime, feel free to explore our meditation resources.
                    </p>
                  </div>
                  <Button 
                    onClick={() => window.location.href = '/meditation'}
                    variant="outline"
                  >
                    Explore Meditation Tools
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>Name *</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={isSubmitting}
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email *</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={isSubmitting}
                        className="bg-background border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger className="bg-background border-border/50">
                        <SelectValue placeholder="What's this about?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="meditation-guidance">Meditation Guidance</SelectItem>
                        <SelectItem value="technical-support">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                        <SelectItem value="collaboration">Collaboration</SelectItem>
                        <SelectItem value="general">General Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Brief subject line"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      disabled={isSubmitting}
                      className="bg-background border-border/50 focus:border-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help you on your wellness journey..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      disabled={isSubmitting}
                      rows={6}
                      className="bg-background border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>

            {/* Contact Info & FAQ */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">
                  Response Times
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">General Inquiries:</span>
                    <span className="font-medium">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Technical Support:</span>
                    <span className="font-medium">12-24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Meditation Guidance:</span>
                    <span className="font-medium">48-72 hours</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading text-xl font-semibold mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-1">How do I get started with meditation?</h4>
                    <p className="text-muted-foreground">
                      Begin with our <a href="/meditation" className="text-primary hover:underline">guided audio sessions</a> - 
                      just 5-10 minutes daily can make a significant difference.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Are the tools free to use?</h4>
                    <p className="text-muted-foreground">
                      Yes! All our meditation tools and resources are completely free. 
                      Our mission is to make wellness accessible to everyone.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Can I suggest new features?</h4>
                    <p className="text-muted-foreground">
                      Absolutely! We love hearing from our community. 
                      Select "Feedback & Suggestions" above to share your ideas.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;