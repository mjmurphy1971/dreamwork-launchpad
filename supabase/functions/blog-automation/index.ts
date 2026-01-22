import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AutomationRequest {
  action: "publish_post" | "send_notifications" | "trigger_social" | "send_digest";
  post_id?: string;
  digest_type?: "weekly" | "monthly";
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

    const { action, post_id, digest_type }: AutomationRequest = await req.json();

    let result: any = {};

    switch (action) {
      case "publish_post":
        result = await publishScheduledPosts(supabase);
        break;

      case "send_notifications":
        if (!post_id) throw new Error("post_id is required for send_notifications");
        if (!resend) throw new Error("RESEND_API_KEY is not configured");
        result = await sendEmailNotifications(supabase, resend, post_id);
        break;

      case "trigger_social":
        if (!post_id) throw new Error("post_id is required for trigger_social");
        result = await triggerSocialShare(supabase, post_id);
        break;

      case "send_digest":
        if (!digest_type) throw new Error("digest_type is required for send_digest");
        if (!resend) throw new Error("RESEND_API_KEY is not configured");
        result = await sendNewsletterDigest(supabase, resend, digest_type);
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ success: true, ...result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: any) {
    console.error("Blog automation error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function publishScheduledPosts(supabase: any) {
  const now = new Date().toISOString();
  
  // Find posts that are scheduled and due for publishing
  const { data: postsToPublish, error: fetchError } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "scheduled")
    .lte("scheduled_at", now);

  if (fetchError) throw fetchError;

  if (!postsToPublish || postsToPublish.length === 0) {
    return { published: 0, message: "No posts to publish" };
  }

  const publishedIds: string[] = [];

  for (const post of postsToPublish) {
    // Update post status to published
    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({ status: "published", published_at: now })
      .eq("id", post.id);

    if (!updateError) {
      publishedIds.push(post.id);

      // Log the automation
      await supabase.from("automation_logs").insert({
        post_id: post.id,
        automation_type: "scheduled_publish",
        status: "success",
        details: { published_at: now }
      });
    }
  }

  return { published: publishedIds.length, post_ids: publishedIds };
}

async function sendEmailNotifications(supabase: any, resend: any, postId: string) {
  // Get the post details
  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (postError || !post) throw new Error("Post not found");

  if (!post.email_notify_enabled) {
    return { sent: 0, message: "Email notifications disabled for this post" };
  }

  // Get active subscribers who want new post notifications
  const { data: subscribers, error: subError } = await supabase
    .from("subscribers")
    .select("*")
    .is("unsubscribed_at", null)
    .eq("confirmed", true);

  if (subError) throw subError;

  // Filter subscribers who have new_posts preference enabled
  const eligibleSubscribers = subscribers?.filter((sub: any) => 
    sub.preferences?.new_posts !== false
  ) || [];

  if (eligibleSubscribers.length === 0) {
    return { sent: 0, message: "No eligible subscribers" };
  }

  // Send emails in batches
  const emails = eligibleSubscribers.map((sub: any) => sub.email);
  
  try {
    const emailResponse = await resend.emails.send({
      from: "The Dream Work <newsletter@thedreamwork.space>",
      to: emails,
      subject: `New Post: ${post.title}`,
      html: generateNewPostEmail(post),
    });

    // Log success
    await supabase.from("automation_logs").insert({
      post_id: postId,
      automation_type: "email_notification",
      status: "success",
      details: { 
        sent_count: emails.length,
        email_response: emailResponse 
      }
    });

    return { sent: emails.length, message: "Notifications sent successfully" };
  } catch (emailError: any) {
    // Log failure
    await supabase.from("automation_logs").insert({
      post_id: postId,
      automation_type: "email_notification",
      status: "failed",
      details: { error: emailError.message }
    });
    throw emailError;
  }
}

async function triggerSocialShare(supabase: any, postId: string) {
  // Get the post details
  const { data: post, error: postError } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (postError || !post) throw new Error("Post not found");

  if (!post.social_share_enabled) {
    return { triggered: false, message: "Social sharing disabled for this post" };
  }

  if (!post.zapier_webhook_url) {
    return { triggered: false, message: "No Zapier webhook URL configured for this post" };
  }

  try {
    // Call Zapier webhook
    const response = await fetch(post.zapier_webhook_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: post.title,
        excerpt: post.excerpt,
        slug: post.slug,
        url: `https://www.thedreamwork.space/blog/${post.slug}`,
        image_url: post.image_url,
        category: post.category,
        tags: post.tags,
        published_at: post.published_at || new Date().toISOString(),
      }),
    });

    // Log success
    await supabase.from("automation_logs").insert({
      post_id: postId,
      automation_type: "social_share",
      status: "success",
      details: { 
        webhook_url: post.zapier_webhook_url,
        response_status: response.status
      }
    });

    return { triggered: true, message: "Social share webhook triggered" };
  } catch (webhookError: any) {
    // Log failure
    await supabase.from("automation_logs").insert({
      post_id: postId,
      automation_type: "social_share",
      status: "failed",
      details: { error: webhookError.message }
    });
    throw webhookError;
  }
}

async function sendNewsletterDigest(supabase: any, resend: any, digestType: "weekly" | "monthly") {
  // Calculate date range
  const now = new Date();
  const startDate = new Date();
  if (digestType === "weekly") {
    startDate.setDate(now.getDate() - 7);
  } else {
    startDate.setMonth(now.getMonth() - 1);
  }

  // Get published posts in date range
  const { data: posts, error: postsError } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("status", "published")
    .gte("published_at", startDate.toISOString())
    .order("published_at", { ascending: false });

  if (postsError) throw postsError;

  if (!posts || posts.length === 0) {
    return { sent: 0, message: "No posts to include in digest" };
  }

  // Get subscribers who want this type of digest
  const preferenceKey = digestType === "weekly" ? "weekly_digest" : "monthly_digest";
  const { data: subscribers, error: subError } = await supabase
    .from("subscribers")
    .select("*")
    .is("unsubscribed_at", null)
    .eq("confirmed", true);

  if (subError) throw subError;

  const eligibleSubscribers = subscribers?.filter((sub: any) => 
    sub.preferences?.[preferenceKey] === true
  ) || [];

  if (eligibleSubscribers.length === 0) {
    return { sent: 0, message: "No eligible subscribers for this digest" };
  }

  const emails = eligibleSubscribers.map((sub: any) => sub.email);

  try {
    const emailResponse = await resend.emails.send({
      from: "The Dream Work <newsletter@thedreamwork.space>",
      to: emails,
      subject: `${digestType === "weekly" ? "Weekly" : "Monthly"} Digest from The Dream Work`,
      html: generateDigestEmail(posts, digestType),
    });

    // Log success
    await supabase.from("automation_logs").insert({
      automation_type: "newsletter_digest",
      status: "success",
      details: { 
        digest_type: digestType,
        posts_count: posts.length,
        sent_count: emails.length,
        email_response: emailResponse 
      }
    });

    return { sent: emails.length, posts_included: posts.length };
  } catch (emailError: any) {
    // Log failure
    await supabase.from("automation_logs").insert({
      automation_type: "newsletter_digest",
      status: "failed",
      details: { 
        digest_type: digestType,
        error: emailError.message 
      }
    });
    throw emailError;
  }
}

function generateNewPostEmail(post: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; background: #faf8f5; color: #2d2d2d; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #8b7355; }
        .title { font-size: 28px; color: #2d2d2d; margin: 20px 0; line-height: 1.3; }
        .excerpt { font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 30px; }
        .cta { display: inline-block; background: linear-gradient(135deg, #8b7355, #a08060); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-size: 16px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e0d8; font-size: 12px; color: #888; text-align: center; }
        .image { width: 100%; max-width: 560px; border-radius: 12px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">✨ The Dream Work</div>
        </div>
        ${post.image_url ? `<img src="${post.image_url}" alt="${post.title}" class="image" />` : ''}
        <h1 class="title">${post.title}</h1>
        <p class="excerpt">${post.excerpt || 'A new reflection awaits you...'}</p>
        <a href="https://www.thedreamwork.space/blog/${post.slug}" class="cta">Read the Full Post</a>
        <div class="footer">
          <p>You're receiving this because you subscribed to The Dream Work newsletter.</p>
          <p><a href="https://www.thedreamwork.space/unsubscribe" style="color: #888;">Unsubscribe</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateDigestEmail(posts: any[], digestType: string): string {
  const postsHtml = posts.map(post => `
    <div style="margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #e5e0d8;">
      ${post.image_url ? `<img src="${post.image_url}" alt="${post.title}" style="width: 100%; max-width: 560px; border-radius: 8px; margin-bottom: 12px;" />` : ''}
      <h2 style="font-size: 20px; color: #2d2d2d; margin: 0 0 10px 0;">${post.title}</h2>
      <p style="font-size: 14px; color: #555; line-height: 1.5; margin: 0 0 12px 0;">${post.excerpt || ''}</p>
      <a href="https://www.thedreamwork.space/blog/${post.slug}" style="color: #8b7355; text-decoration: none; font-size: 14px;">Read more →</a>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Georgia', serif; background: #faf8f5; color: #2d2d2d; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { font-size: 24px; font-weight: bold; color: #8b7355; }
        .subtitle { font-size: 14px; color: #888; margin-top: 8px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e0d8; font-size: 12px; color: #888; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">✨ The Dream Work</div>
          <div class="subtitle">${digestType === "weekly" ? "Weekly" : "Monthly"} Digest</div>
        </div>
        <p style="font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Here's what we've shared recently. May these reflections bring you peace and inspiration.</p>
        ${postsHtml}
        <div class="footer">
          <p>You're receiving this ${digestType} digest because you subscribed to The Dream Work newsletter.</p>
          <p><a href="https://www.thedreamwork.space/unsubscribe" style="color: #888;">Unsubscribe</a> | <a href="https://www.thedreamwork.space/preferences" style="color: #888;">Update Preferences</a></p>
        </div>
      </div>
    </body>
    </html>
  `;
}
