-- Create enum for post status
CREATE TYPE public.blog_post_status AS ENUM ('draft', 'scheduled', 'published');

-- Create blog_posts table to manage all posts with scheduling
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  author TEXT DEFAULT 'Mary Murphy',
  category TEXT,
  tags TEXT[],
  status blog_post_status NOT NULL DEFAULT 'draft',
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  featured BOOLEAN DEFAULT false,
  social_share_enabled BOOLEAN DEFAULT true,
  email_notify_enabled BOOLEAN DEFAULT true,
  zapier_webhook_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create subscribers table for newsletter
CREATE TABLE public.subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  confirmed BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{"new_posts": true, "weekly_digest": true, "monthly_digest": false}'::jsonb,
  unsubscribed_at TIMESTAMP WITH TIME ZONE
);

-- Create automation_logs table to track all automation events
CREATE TABLE public.automation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.blog_posts(id) ON DELETE SET NULL,
  automation_type TEXT NOT NULL, -- 'email_notification', 'social_share', 'scheduled_publish', 'newsletter_digest'
  status TEXT NOT NULL, -- 'pending', 'success', 'failed'
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- Blog posts are publicly readable (for the blog)
CREATE POLICY "Blog posts are publicly readable"
  ON public.blog_posts FOR SELECT
  USING (status = 'published' OR (status = 'scheduled' AND scheduled_at <= now()));

-- Subscribers table - only accessible via edge functions (service role)
CREATE POLICY "Subscribers managed via service role only"
  ON public.subscribers FOR ALL
  USING (false);

-- Automation logs - only accessible via edge functions (service role)
CREATE POLICY "Automation logs managed via service role only"
  ON public.automation_logs FOR ALL
  USING (false);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to auto-publish scheduled posts
CREATE OR REPLACE FUNCTION public.publish_scheduled_posts()
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE public.blog_posts
  SET status = 'published', published_at = now()
  WHERE status = 'scheduled' 
    AND scheduled_at IS NOT NULL 
    AND scheduled_at <= now();
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Enable realtime for blog_posts to trigger automations
ALTER PUBLICATION supabase_realtime ADD TABLE public.blog_posts;