import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const BLOG_TOPICS = [
  "morning meditation rituals for inner peace",
  "mindfulness practices for daily stress relief",
  "connecting with your inner power through breathwork",
  "sacred stillness and the art of presence",
  "gratitude journaling for spiritual growth",
  "the healing power of sound and vibration",
  "embracing change with mindful awareness",
  "cultivating self-compassion through meditation",
  "the dream work journey to self-discovery",
  "finding balance in a chaotic world",
  "awakening intuition through quiet reflection",
  "the spiritual benefits of nature immersion",
  "transforming fear into faith through stillness",
  "building a sacred morning routine",
  "the power of intention setting",
  "releasing limiting beliefs through mindfulness",
  "connecting body mind and spirit",
  "the art of letting go and trusting the universe",
  "creating space for inner wisdom",
  "healing the heart through meditation",
  "manifesting abundance with mindful practices",
  "the journey inward discovering your true self",
  "peaceful living in the modern world",
  "embracing the present moment fully",
  "spiritual renewal and self-care practices"
];

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Pick a random topic
    const topic = BLOG_TOPICS[Math.floor(Math.random() * BLOG_TOPICS.length)];
    console.log("Generating blog post about:", topic);

    // Generate blog content using AI
    const contentResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are a spiritual wellness writer for "The Dream Work" blog. Write in a warm, inviting, and insightful tone. Your posts should feel personal yet universal, blending practical wisdom with spiritual depth. Use poetic language sparingly but effectively. Always aim to inspire and empower readers on their journey of self-discovery and inner peace.`
          },
          {
            role: "user",
            content: `Write a blog post about "${topic}". 

Requirements:
1. Create an engaging, SEO-friendly title (don't use the topic verbatim)
2. Write a compelling excerpt (1-2 sentences for preview)
3. Write the full blog content (400-600 words)
4. Include practical takeaways or reflection prompts
5. End with an inspiring closing thought

Format your response as JSON with this structure:
{
  "title": "Your Creative Title Here",
  "excerpt": "A brief compelling excerpt...",
  "content": "The full blog post content with paragraphs separated by \\n\\n",
  "category": "One of: Meditation, Mindfulness, Spiritual Growth, Self-Care, Inner Peace",
  "tags": ["tag1", "tag2", "tag3"]
}`
          }
        ],
      }),
    });

    if (!contentResponse.ok) {
      const errorText = await contentResponse.text();
      console.error("AI content generation error:", contentResponse.status, errorText);
      throw new Error(`AI gateway error: ${contentResponse.status}`);
    }

    const contentData = await contentResponse.json();
    const aiResponse = contentData.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No content generated from AI");
    }

    // Parse the JSON response
    let blogData;
    try {
      // Clean up the response - remove markdown code blocks if present
      let cleanedResponse = aiResponse.trim();
      if (cleanedResponse.startsWith("```json")) {
        cleanedResponse = cleanedResponse.slice(7);
      }
      if (cleanedResponse.startsWith("```")) {
        cleanedResponse = cleanedResponse.slice(3);
      }
      if (cleanedResponse.endsWith("```")) {
        cleanedResponse = cleanedResponse.slice(0, -3);
      }
      blogData = JSON.parse(cleanedResponse.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      throw new Error("Failed to parse AI-generated content");
    }

    // Generate slug from title
    const slug = blogData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
      .slice(0, 60);

    // Get the default Zapier webhook URL from the most recent post
    const { data: recentPost } = await supabase
      .from("blog_posts")
      .select("zapier_webhook_url")
      .not("zapier_webhook_url", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const zapierWebhookUrl = recentPost?.zapier_webhook_url || null;

    // Create the blog post
    const { data: newPost, error: insertError } = await supabase
      .from("blog_posts")
      .insert({
        title: blogData.title,
        slug: slug + "-" + Date.now().toString(36), // Add unique suffix
        excerpt: blogData.excerpt,
        content: blogData.content,
        category: blogData.category,
        tags: blogData.tags,
        status: "published",
        published_at: new Date().toISOString(),
        social_share_enabled: true,
        email_notify_enabled: false, // Don't spam subscribers with auto posts
        zapier_webhook_url: zapierWebhookUrl,
        featured: false,
      })
      .select("id, title, slug, excerpt, category")
      .single();

    if (insertError) {
      console.error("Failed to create post:", insertError);
      throw insertError;
    }

    console.log("Created blog post:", newPost.id, newPost.title);

    // Generate image for the post
    try {
      const imagePrompt = `A beautiful, ethereal blog header image for an article titled "${newPost.title}". The theme is ${newPost.category || "spiritual wellness"}. Style: dreamy, spiritual, mindful, soft warm colors, sacred geometry elements, meditation and wellness aesthetic. Professional blog header image, 16:9 aspect ratio, soft lighting, peaceful atmosphere. Ultra high resolution.`;

      const imageResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash-image-preview",
          messages: [{ role: "user", content: imagePrompt }],
          modalities: ["image", "text"],
        }),
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        const generatedImage = imageData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (generatedImage) {
          await supabase
            .from("blog_posts")
            .update({ image_url: generatedImage })
            .eq("id", newPost.id);
          console.log("Image generated for post:", newPost.id);
        }
      }
    } catch (imageError) {
      console.error("Image generation failed:", imageError);
      // Continue without image
    }

    // Trigger Zapier webhook if configured
    if (zapierWebhookUrl) {
      try {
        await fetch(zapierWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: newPost.title,
            excerpt: newPost.excerpt,
            slug: newPost.slug,
            url: `https://www.thedreamwork.space/blog/${newPost.slug}`,
            category: newPost.category,
            published_at: new Date().toISOString(),
            auto_generated: true,
          }),
        });
        console.log("Zapier webhook triggered for post:", newPost.id);

        // Log the automation
        await supabase.from("automation_logs").insert({
          post_id: newPost.id,
          automation_type: "auto_generate_and_share",
          status: "success",
          details: { 
            topic,
            title: newPost.title,
            zapier_triggered: true
          }
        });
      } catch (webhookError) {
        console.error("Zapier webhook failed:", webhookError);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Blog post auto-generated successfully",
        post: {
          id: newPost.id,
          title: newPost.title,
          slug: newPost.slug,
          category: newPost.category
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Auto-generate blog error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
