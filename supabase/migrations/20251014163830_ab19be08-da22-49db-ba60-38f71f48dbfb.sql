-- Fix anonymous user data access issue in chat tables
-- Remove NULL user_id support and tighten RLS policies

-- Step 1: Drop existing RLS policies on chat_conversations
DROP POLICY IF EXISTS "Users can create conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can delete their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can update their own conversations" ON public.chat_conversations;
DROP POLICY IF EXISTS "Users can view their own conversations" ON public.chat_conversations;

-- Step 2: Drop existing RLS policies on chat_messages
DROP POLICY IF EXISTS "Users can create messages in their conversations" ON public.chat_messages;
DROP POLICY IF EXISTS "Users can view messages from their conversations" ON public.chat_messages;

-- Step 3: Make user_id NOT NULL on chat_conversations
-- First, delete any existing rows with NULL user_id (if any)
DELETE FROM public.chat_conversations WHERE user_id IS NULL;

-- Then alter the column to NOT NULL
ALTER TABLE public.chat_conversations 
ALTER COLUMN user_id SET NOT NULL;

-- Step 4: Create new restrictive RLS policies for chat_conversations
CREATE POLICY "Users can create their own conversations" 
ON public.chat_conversations 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own conversations" 
ON public.chat_conversations 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations" 
ON public.chat_conversations 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations" 
ON public.chat_conversations 
FOR DELETE 
USING (auth.uid() = user_id);

-- Step 5: Create new restrictive RLS policies for chat_messages
CREATE POLICY "Users can create messages in their own conversations" 
ON public.chat_messages 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND chat_conversations.user_id = auth.uid()
  )
);

CREATE POLICY "Users can view messages from their own conversations" 
ON public.chat_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 
    FROM chat_conversations 
    WHERE chat_conversations.id = chat_messages.conversation_id 
    AND chat_conversations.user_id = auth.uid()
  )
);