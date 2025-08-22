-- Create meditation progress table (if not exists)
CREATE TABLE IF NOT EXISTS public.meditation_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes INTEGER NOT NULL,
  meditation_type TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gratitude entries table for Gratitude Garden (if not exists)
CREATE TABLE IF NOT EXISTS public.gratitude_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create practice sessions table for Practice Tracker (if not exists)
CREATE TABLE IF NOT EXISTS public.practice_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  practice_type TEXT NOT NULL,
  duration_minutes INTEGER,
  notes TEXT,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables (safe to run multiple times)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gratitude_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_sessions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them (safer approach)
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create RLS policies for profiles table
CREATE POLICY "Users can view their own profile" 
ON public.profiles FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for meditation_progress table
CREATE POLICY "Users can view their own meditation progress" 
ON public.meditation_progress FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own meditation progress" 
ON public.meditation_progress FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own meditation progress" 
ON public.meditation_progress FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own meditation progress" 
ON public.meditation_progress FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for gratitude_entries table
CREATE POLICY "Users can view their own gratitude entries" 
ON public.gratitude_entries FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own gratitude entries" 
ON public.gratitude_entries FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own gratitude entries" 
ON public.gratitude_entries FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own gratitude entries" 
ON public.gratitude_entries FOR DELETE 
USING (auth.uid() = user_id);

-- Create RLS policies for practice_sessions table
CREATE POLICY "Users can view their own practice sessions" 
ON public.practice_sessions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own practice sessions" 
ON public.practice_sessions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own practice sessions" 
ON public.practice_sessions FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own practice sessions" 
ON public.practice_sessions FOR DELETE 
USING (auth.uid() = user_id);