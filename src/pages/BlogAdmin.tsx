import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Calendar, 
  Mail, 
  Share2, 
  Clock, 
  CheckCircle, 
  FileText,
  Users,
  Activity,
  Send,
  Eye,
  Save,
  X,
  Loader2,
  Lock,
  LogOut
} from "lucide-react";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  author: string | null;
  category: string | null;
  tags: string[] | null;
  status: 'draft' | 'scheduled' | 'published';
  scheduled_at: string | null;
  published_at: string | null;
  featured: boolean | null;
  social_share_enabled: boolean | null;
  email_notify_enabled: boolean | null;
  zapier_webhook_url: string | null;
  created_at: string;
  updated_at: string;
}

interface AutomationLog {
  id: string;
  post_id: string | null;
  automation_type: string;
  status: string;
  details: any;
  created_at: string;
}

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  subscribed_at: string;
  confirmed: boolean | null;
  preferences: any;
  unsubscribed_at: string | null;
}

const BlogAdmin = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "",
    tags: "",
    status: "draft" as 'draft' | 'scheduled' | 'published',
    scheduled_at: "",
    featured: false,
    social_share_enabled: true,
    email_notify_enabled: true,
    zapier_webhook_url: ""
  });

  // Check for stored session on mount
  useEffect(() => {
    const storedSession = sessionStorage.getItem('blog_admin_session');
    if (storedSession) {
      const { password: storedPassword, expiry } = JSON.parse(storedSession);
      if (new Date().getTime() < expiry) {
        setAdminPassword(storedPassword);
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('blog_admin_session');
      }
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    setAuthLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('blog-admin-auth', {
        body: { action: 'verify', password: password.trim() }
      });

      if (error) {
        throw new Error(error.message || "Authentication failed");
      }

      if (data?.success) {
        setAdminPassword(password.trim());
        setIsAuthenticated(true);
        // Store session for 2 hours
        const expiry = new Date().getTime() + (2 * 60 * 60 * 1000);
        sessionStorage.setItem('blog_admin_session', JSON.stringify({ password: password.trim(), expiry }));
        toast.success("Access granted!");
      } else {
        toast.error(data?.error || "Invalid password");
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword("");
    setPassword("");
    setPosts([]);
    sessionStorage.removeItem('blog_admin_session');
    toast.success("Logged out successfully");
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch posts through authenticated edge function
      const { data, error } = await supabase.functions.invoke('blog-admin-auth', {
        body: { action: 'list', password: adminPassword }
      });

      if (error) {
        throw new Error(error.message || "Failed to fetch posts");
      }

      if (data?.success && data?.posts) {
        setPosts(data.posts);
      } else if (data?.error) {
        throw new Error(data.error);
      }

      // Get subscriber count via edge function
      try {
        const { data: countData } = await supabase.functions.invoke('blog-automation', {
          body: { action: 'get_stats' }
        });
        if (countData?.subscriber_count) {
          setSubscriberCount(countData.subscriber_count);
        }
      } catch (e) {
        console.log('Stats not available');
      }

    } catch (error: any) {
      console.error('Fetch error:', error);
      if (error.message?.includes('Invalid admin password')) {
        handleLogout();
      }
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      image_url: "",
      category: "",
      tags: "",
      status: "draft",
      scheduled_at: "",
      featured: false,
      social_share_enabled: true,
      email_notify_enabled: true,
      zapier_webhook_url: ""
    });
    setEditingPost(null);
    setIsCreating(false);
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      image_url: post.image_url || "",
      category: post.category || "",
      tags: post.tags?.join(", ") || "",
      status: post.status,
      scheduled_at: post.scheduled_at ? new Date(post.scheduled_at).toISOString().slice(0, 16) : "",
      featured: post.featured || false,
      social_share_enabled: post.social_share_enabled ?? true,
      email_notify_enabled: post.email_notify_enabled ?? true,
      zapier_webhook_url: post.zapier_webhook_url || ""
    });
    setIsCreating(true);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }

    setSaving(true);

    try {
      const postData = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        excerpt: formData.excerpt || null,
        content: formData.content,
        image_url: formData.image_url || null,
        category: formData.category || null,
        tags: formData.tags ? formData.tags.split(",").map(t => t.trim()).filter(Boolean) : null,
        status: formData.status,
        scheduled_at: formData.scheduled_at ? new Date(formData.scheduled_at).toISOString() : null,
        featured: formData.featured,
        social_share_enabled: formData.social_share_enabled,
        email_notify_enabled: formData.email_notify_enabled,
        zapier_webhook_url: formData.zapier_webhook_url || null,
        published_at: formData.status === 'published' ? new Date().toISOString() : null
      };

      let savedPostId: string | null = null;
      const isNewlyPublished = formData.status === 'published' && 
        (!editingPost || editingPost.status !== 'published');

      if (editingPost) {
        const { data, error } = await supabase.functions.invoke('blog-admin-auth', {
          body: { 
            action: 'update', 
            password: adminPassword,
            post_id: editingPost.id,
            post: postData
          }
        });

        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || "Failed to update post");
        }
        savedPostId = editingPost.id;
        toast.success("Post updated successfully");
      } else {
        const { data, error } = await supabase.functions.invoke('blog-admin-auth', {
          body: { 
            action: 'create', 
            password: adminPassword,
            post: postData
          }
        });

        if (error || !data?.success) {
          throw new Error(data?.error || error?.message || "Failed to create post");
        }
        savedPostId = data?.post_id || null;
        toast.success("Post created successfully");
      }

      // Auto-generate image if none set and post is being published
      if (isNewlyPublished && savedPostId && !formData.image_url) {
        try {
          toast.info("Generating AI image for your post...");
          await supabase.functions.invoke('generate-blog-image', {
            body: { 
              post_id: savedPostId, 
              title: formData.title,
              excerpt: formData.excerpt || undefined,
              category: formData.category || undefined
            }
          });
          toast.success("AI image generated!");
        } catch (imageError) {
          console.error('Auto image generation failed:', imageError);
          toast.error("Post saved but image generation failed");
        }
      }

      // Auto-trigger Zapier webhook when a post is newly published
      if (isNewlyPublished && savedPostId && formData.social_share_enabled && formData.zapier_webhook_url) {
        try {
          await supabase.functions.invoke('blog-automation', {
            body: { action: 'trigger_social', post_id: savedPostId }
          });
          toast.success("Social share triggered automatically!");
        } catch (webhookError) {
          console.error('Auto webhook trigger failed:', webhookError);
          toast.error("Post saved but social share failed - you can retry manually");
        }
      }

      resetForm();
      fetchData();
    } catch (error: any) {
      console.error('Save error:', error);
      toast.error(error.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { data, error } = await supabase.functions.invoke('blog-admin-auth', {
        body: { 
          action: 'delete', 
          password: adminPassword,
          post_id: id
        }
      });

      if (error || !data?.success) {
        throw new Error(data?.error || error?.message || "Failed to delete post");
      }
      toast.success("Post deleted");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete post");
    }
  };

  const triggerAutomation = async (postId: string, action: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('blog-automation', {
        body: { action, post_id: postId }
      });

      if (error) throw error;
      toast.success(data?.message || `${action} triggered successfully`);
    } catch (error: any) {
      toast.error(error.message || `Failed to trigger ${action}`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'scheduled': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.status === 'published').length,
    scheduled: posts.filter(p => p.status === 'scheduled').length,
    drafts: posts.filter(p => p.status === 'draft').length
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <SEO 
          title="Blog Admin | The Dream Work"
          description="Manage blog posts, automation, and subscribers"
        />
        <Header />
        
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-heading font-bold gradient-text">Blog Admin</h1>
                <p className="text-muted-foreground mt-2">Enter admin password to continue</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="mt-1"
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full gap-2" 
                  disabled={authLoading}
                >
                  {authLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  Access Dashboard
                </Button>
              </form>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Blog Admin | The Dream Work"
        description="Manage blog posts, automation, and subscribers"
      />
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold gradient-text">Blog Dashboard</h1>
              <p className="text-muted-foreground mt-1">Manage posts, scheduling, and automation</p>
            </div>
            <div className="flex items-center gap-2">
              {!isCreating && (
                <Button onClick={() => setIsCreating(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              )}
              <Button variant="outline" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Posts</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.published}</p>
                  <p className="text-sm text-muted-foreground">Published</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.scheduled}</p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{subscriberCount}</p>
                  <p className="text-sm text-muted-foreground">Subscribers</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Post Editor */}
          {isCreating && (
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter post title"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-friendly-slug"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description for previews..."
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content * (Markdown supported)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your post content here..."
                    className="mt-1 font-mono text-sm"
                    rows={12}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://..."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="Mindfulness, Gratitude, etc."
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="meditation, peace, gratitude"
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="mt-1 w-full h-10 px-3 rounded-md border border-input bg-background"
                    >
                      <option value="draft">Draft</option>
                      <option value="scheduled">Scheduled</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  {formData.status === 'scheduled' && (
                    <div>
                      <Label htmlFor="scheduled_at">Schedule Date & Time</Label>
                      <Input
                        id="scheduled_at"
                        type="datetime-local"
                        value={formData.scheduled_at}
                        onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-4">Automation Settings</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Featured Post</Label>
                        <p className="text-sm text-muted-foreground">Show prominently on homepage</p>
                      </div>
                      <Switch
                        checked={formData.featured}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notify subscribers on publish</p>
                      </div>
                      <Switch
                        checked={formData.email_notify_enabled}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, email_notify_enabled: checked }))}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Social Sharing</Label>
                        <p className="text-sm text-muted-foreground">Trigger Zapier webhook</p>
                      </div>
                      <Switch
                        checked={formData.social_share_enabled}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, social_share_enabled: checked }))}
                      />
                    </div>
                    {formData.social_share_enabled && (
                      <div>
                        <Label htmlFor="zapier_webhook_url">Zapier Webhook URL</Label>
                        <Input
                          id="zapier_webhook_url"
                          value={formData.zapier_webhook_url}
                          onChange={(e) => setFormData(prev => ({ ...prev, zapier_webhook_url: e.target.value }))}
                          placeholder="https://hooks.zapier.com/..."
                          className="mt-1"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} disabled={saving} className="gap-2">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {editingPost ? 'Update Post' : 'Save Post'}
                  </Button>
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Posts List */}
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Posts ({stats.total})</TabsTrigger>
              <TabsTrigger value="published">Published ({stats.published})</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled ({stats.scheduled})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({stats.drafts})</TabsTrigger>
            </TabsList>

            {['all', 'published', 'scheduled', 'drafts'].map(tab => (
              <TabsContent key={tab} value={tab} className="space-y-4">
                {posts
                  .filter(p => tab === 'all' || 
                    (tab === 'published' && p.status === 'published') ||
                    (tab === 'scheduled' && p.status === 'scheduled') ||
                    (tab === 'drafts' && p.status === 'draft')
                  )
                  .map(post => (
                    <Card key={post.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold truncate">{post.title}</h3>
                            {post.featured && (
                              <Badge variant="secondary" className="text-xs">Featured</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="outline" className={getStatusColor(post.status)}>
                              {post.status}
                            </Badge>
                            {post.scheduled_at && post.status === 'scheduled' && (
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(post.scheduled_at).toLocaleString()}
                              </span>
                            )}
                            {post.published_at && post.status === 'published' && (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                {new Date(post.published_at).toLocaleDateString()}
                              </span>
                            )}
                            <span>/blog/{post.slug}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {post.status === 'published' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                                title="View Post"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {post.email_notify_enabled && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => triggerAutomation(post.id, 'send_notifications')}
                                  title="Send Email Notification"
                                >
                                  <Mail className="w-4 h-4" />
                                </Button>
                              )}
                              {post.social_share_enabled && post.zapier_webhook_url && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => triggerAutomation(post.id, 'trigger_social')}
                                  title="Trigger Social Share"
                                >
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              )}
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(post)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(post.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                {posts.filter(p => tab === 'all' || 
                  (tab === 'published' && p.status === 'published') ||
                  (tab === 'scheduled' && p.status === 'scheduled') ||
                  (tab === 'drafts' && p.status === 'draft')
                ).length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No posts found</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogAdmin;
