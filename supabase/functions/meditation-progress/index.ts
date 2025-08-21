import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    // Get user ID from session (for now, we'll use a simple user identification)
    const userAgent = req.headers.get('user-agent') || 'anonymous'
    const userId = btoa(userAgent).slice(0, 16) // Simple user identification

    if (req.method === 'GET') {
      // Fetch user's meditation progress
      const { data: sessions } = await supabase
        .from('meditation_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      // Calculate stats
      const stats = calculateStats(sessions || [])

      return new Response(JSON.stringify({ sessions, stats }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    if (req.method === 'POST') {
      // Log new meditation session
      const sessionData = await req.json()
      
      const { error } = await supabase
        .from('meditation_sessions')
        .insert({
          user_id: userId,
          session_id: sessionData.id,
          date: sessionData.date,
          duration: sessionData.duration,
          type: sessionData.type,
          mood_before: sessionData.mood_before,
          mood_after: sessionData.mood_after,
          notes: sessionData.notes,
          created_at: new Date().toISOString()
        })

      if (error) {
        console.error('Database error:', error)
        return new Response('Failed to save session', { 
          status: 500,
          headers: corsHeaders 
        })
      }

      // Fetch updated data
      const { data: sessions } = await supabase
        .from('meditation_sessions')
        .select('*')
        .eq('user_id', userId)
        .order('date', { ascending: false })

      const stats = calculateStats(sessions || [])

      return new Response(JSON.stringify({ sessions, stats }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders 
    })

  } catch (error) {
    console.error('Meditation progress error:', error)
    return new Response('Internal server error', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})

function calculateStats(sessions: any[]) {
  const totalSessions = sessions.length
  const totalMinutes = sessions.reduce((sum, session) => sum + (session.duration || 0), 0)
  
  // Calculate current streak
  const sortedSessions = [...sessions].sort((a, b) => b.date.localeCompare(a.date))
  let currentStreak = 0
  let checkDate = new Date()
  
  for (const session of sortedSessions) {
    const sessionDate = new Date(session.date)
    const daysDiff = Math.floor((checkDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysDiff <= currentStreak) {
      currentStreak++
      checkDate = sessionDate
    } else {
      break
    }
  }

  // Calculate longest streak (simplified for this implementation)
  const longestStreak = currentStreak // TODO: Implement proper longest streak calculation

  // Calculate this week's sessions
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  const thisWeekSessions = sessions.filter(
    session => new Date(session.date) >= oneWeekAgo
  ).length

  return {
    totalSessions,
    totalMinutes,
    currentStreak,
    longestStreak,
    weeklyGoal: 5, // Default weekly goal
    thisWeekSessions
  }
}