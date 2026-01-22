import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface SubscribeRequest {
  email: string;
  name?: string;
  preferences?: {
    new_posts?: boolean;
    weekly_digest?: boolean;
    monthly_digest?: boolean;
  };
}

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const resend = resendApiKey ? new Resend(resendApiKey) : null;

    const { email, name, preferences }: SubscribeRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ success: false, error: "Valid email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Check if subscriber already exists
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, unsubscribed_at")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (existing) {
      if (existing.unsubscribed_at) {
        // Resubscribe
        await supabase
          .from("subscribers")
          .update({ 
            unsubscribed_at: null, 
            confirmed: true,
            name: name || null,
            preferences: preferences || { new_posts: true, weekly_digest: true, monthly_digest: false }
          })
          .eq("id", existing.id);

        return new Response(
          JSON.stringify({ success: true, message: "Welcome back! You've been resubscribed." }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ success: true, message: "You're already subscribed!" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create new subscriber
    const { error: insertError } = await supabase
      .from("subscribers")
      .insert({
        email: email.toLowerCase(),
        name: name || null,
        confirmed: true,
        preferences: preferences || { new_posts: true, weekly_digest: true, monthly_digest: false }
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error("Failed to create subscription");
    }

    // Send welcome email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: "The Dream Work <newsletter@thedreamwork.space>",
          to: [email],
          subject: "Welcome to The Dream Work ✨",
          html: generateWelcomeEmail(name),
        });
      } catch (emailError) {
        console.error("Welcome email error:", emailError);
        // Don't fail the subscription if email fails
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Successfully subscribed! Welcome to our community." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Subscribe error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function generateWelcomeEmail(name?: string): string {
  const greeting = name ? `Dear ${name}` : "Dear Friend";
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; background: #faf8f5; color: #2d2d2d; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #8b7355; }
        .content { font-size: 16px; line-height: 1.8; color: #555; }
        .cta { display: inline-block; background: linear-gradient(135deg, #8b7355, #a08060); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; margin-top: 20px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e0d8; font-size: 12px; color: #888; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">✨ The Dream Work</div>
        </div>
        <div class="content">
          <p>${greeting},</p>
          <p>Welcome to The Dream Work community. We're so glad you're here.</p>
          <p>This is a space for mindfulness, spiritual growth, and finding stillness in the midst of life's beautiful chaos. You'll receive our latest posts, guided practices, and gentle reminders to pause and breathe.</p>
          <p>We believe that every moment is an invitation to return to ourselves—to remember that life is beautiful, even in the mess.</p>
          <p>With gratitude and warmth,<br/>Mary Murphy<br/><em>Founder, The Dream Work</em></p>
        </div>
        <div style="text-align: center;">
          <a href="https://www.thedreamwork.space" class="cta">Explore The Dream Work</a>
        </div>
        <div class="footer">
          <p>You're receiving this because you subscribed to The Dream Work newsletter.</p>
          <p><a href="https://www.thedreamwork.space/unsubscribe" style="color: #888;">Unsubscribe</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
