import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface GenerateImageRequest {
  post_id: string;
  title: string;
  excerpt?: string;
  category?: string;
}

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
    const { post_id, title, excerpt, category }: GenerateImageRequest = await req.json();

    if (!post_id || !title) {
      throw new Error("post_id and title are required");
    }

    console.log("Generating image for post:", title);

    // Create a rich prompt for the blog image
    const imagePrompt = `A beautiful, ethereal blog header image for an article titled "${title}". ${
      category ? `The theme is ${category}.` : ""
    } ${
      excerpt ? `The article is about: ${excerpt.slice(0, 100)}` : ""
    } Style: dreamy, spiritual, mindful, soft warm colors, sacred geometry elements, meditation and wellness aesthetic. Professional blog header image, 16:9 aspect ratio, soft lighting, peaceful atmosphere. Ultra high resolution.`;

    // Call Lovable AI with image generation model
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: imagePrompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ success: false, error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ success: false, error: "AI credits exhausted. Please add more credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    // Extract the generated image
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageData) {
      console.error("No image in response:", JSON.stringify(data));
      throw new Error("No image generated from AI");
    }

    // For now, we'll store the base64 data URL directly
    // In production, you'd want to upload to Supabase Storage
    const imageUrl = imageData;

    // Update the blog post with the generated image
    const { error: updateError } = await supabase
      .from("blog_posts")
      .update({ image_url: imageUrl })
      .eq("id", post_id);

    if (updateError) {
      console.error("Failed to update post with image:", updateError);
      throw updateError;
    }

    console.log("Successfully generated and saved image for post:", post_id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Image generated successfully",
        image_url: imageUrl.slice(0, 100) + "..." // Don't send full base64 back
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error: any) {
    console.error("Generate image error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
