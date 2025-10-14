import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(5000, "Message must be less than 5000 characters"),
  subject: z.string().trim().max(200, "Subject must be less than 200 characters").optional(),
  category: z.string().max(50, "Category must be less than 50 characters").optional(),
  timestamp: z.string().optional(),
  source: z.string().max(50, "Source must be less than 50 characters").optional(),
})

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })       
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const requestData = await req.json()

    // Validate input using zod schema
    const result = contactSchema.safeParse(requestData)
    if (!result.success) {
      const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      console.error('Validation errors:', errors)
      return new Response(JSON.stringify({ error: 'Validation failed', details: errors }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { name, email, subject, category, message, timestamp, source } = result.data

    // Save contact form submission (data already validated and trimmed)
    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email: email.toLowerCase(),
        subject: subject || `Message from ${name}`,
        category: category || 'general',
        message,
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
