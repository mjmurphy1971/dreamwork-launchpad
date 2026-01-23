-- Remove the overly permissive policies that allow public write access
DROP POLICY IF EXISTS "Allow public insert for blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow public update for blog posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow public delete for blog posts" ON public.blog_posts;

-- Keep the read policies for public access to published posts
-- The "Blog posts are publicly readable" policy already restricts to published/scheduled posts

-- Note: All write operations will now go through the blog-admin-auth edge function
-- which uses the service role key and validates the admin password server-side