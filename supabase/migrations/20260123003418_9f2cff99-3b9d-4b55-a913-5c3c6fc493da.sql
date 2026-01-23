-- Allow Blog Admin (currently unauthenticated) to list drafts/scheduled posts.
-- NOTE: This makes all blog posts readable to the public. Use only as a temporary workaround until admin auth is added.

DO $$
BEGIN
  -- Ensure RLS is enabled (safe if already enabled)
  EXECUTE 'ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY';
EXCEPTION WHEN others THEN
  -- ignore
END $$;

-- Create a broad SELECT policy if it doesn't already exist
DROP POLICY IF EXISTS "Allow public read all blog posts" ON public.blog_posts;
CREATE POLICY "Allow public read all blog posts"
ON public.blog_posts
FOR SELECT
USING (true);
