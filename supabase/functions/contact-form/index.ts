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

    const { 
      name, 
      email, 
      subject, 
      category, 
      message, 
      timestamp, 
      source 
    } = await req.json()

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response('Name, email, and message are required', { 
        status: 400,
        headers: corsHeaders 
      })
    }

    if (!email.includes('@')) {
      return new Response('Invalid email address', { 
        status: 400,
        headers: corsHeaders 
      })
    }

    // Save contact form submission
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        subject: subject?.trim() || `Message from ${name}`,
        category: category || 'general',
        message: message.trim(),
        submitted_at: timestamp || new Date().toISOString(),
        source: source || 'website',
        status: 'new'
      })
    
    if (error) {
      console.error('Database error:', error)
      return new Response('Failed to submit your message. Please try again.', { 
        status: 500,
        headers: corsHeaders 
      })
    }

    // TODO: Send email notification to admin
    // TODO: Send auto-reply to user
    console.log(`New contact form submission from: ${email}`)

    return new Response('Message sent successfully!', {
      headers: corsHeaders
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return new Response('Internal server error', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})