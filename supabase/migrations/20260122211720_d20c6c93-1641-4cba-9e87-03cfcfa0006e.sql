-- Drop existing restrictive policies on blog_posts
DROP POLICY IF EXISTS "Allow public read access to published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Allow authenticated users to manage posts" ON public.blog_posts;

-- Create policies that allow full management of blog posts
-- Public can read published posts
CREATE POLICY "Anyone can read published posts"
ON public.blog_posts
FOR SELECT
USING (status = 'published');

-- Allow public insert for blog admin (temporary - should add auth later)
CREATE POLICY "Allow public insert for blog posts"
ON public.blog_posts
FOR INSERT
WITH CHECK (true);

-- Allow public update for blog posts
CREATE POLICY "Allow public update for blog posts"
ON public.blog_posts
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow public delete for blog posts
CREATE POLICY "Allow public delete for blog posts"
ON public.blog_posts
FOR DELETE
USING (true);