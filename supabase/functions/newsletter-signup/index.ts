import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Validation schema
const newsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  source: z.string().max(50, "Source must be less than 50 characters").optional(),
  timestamp: z.string().optional(),
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
    const result = newsletterSchema.safeParse(requestData)
    if (!result.success) {
      const errors = result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      console.error('Validation errors:', errors)
      return new Response(JSON.stringify({ error: 'Validation failed', details: errors }), { 
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const { email, source, timestamp } = result.data

    // Check if email already exists
    const { data: existingUser } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email.toLowerCase())
      .single()

    if (existingUser) {
      if (existingUser.is_active) {
        return new Response('You are already subscribed to our newsletter!', { 
          status: 400,
          headers: corsHeaders 
        })
      } else {
        // Reactivate existing subscriber
        await supabase
          .from('newsletter_subscribers')
          .update({ 
            is_active: true, 
            resubscribed_at: new Date().toISOString(),
            source: source || 'website'
          })
          .eq('id', existingUser.id)
      }
    } else {
      // Create new subscriber (data already validated and trimmed)
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({
          email: email.toLowerCase(),
          subscribed_at: timestamp || new Date().toISOString(),
          source: source || 'website',
          is_active: true
        })
      
      if (error) {
        console.error('Database error:', error)
        return new Response('Failed to subscribe. Please try again.', { 
          status: 500,
          headers: corsHeaders 
        })
      }
    }

    // TODO: Add email service integration here (SendGrid, Mailgun, etc.)
    // For now, we'll just log the subscription
    console.log(`New newsletter subscription: ${email} from ${source}`)

    return new Response('Successfully subscribed!', {
      headers: corsHeaders
    })

  } catch (error) {
    console.error('Newsletter signup error:', error)
    return new Response('Internal server error', { 
      status: 500,
      headers: corsHeaders 
    })
  }
})