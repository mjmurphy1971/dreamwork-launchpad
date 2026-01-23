import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schemas
const verifySchema = z.object({
  action: z.literal("verify"),
  password: z.string().min(1, "Password is required").max(100),
});

const createPostSchema = z.object({
  action: z.literal("create"),
  password: z.string().min(1).max(100),
  post: z.object({
    title: z.string().min(1, "Title is required").max(500),
    slug: z.string().min(1).max(500),
    excerpt: z.string().max(1000).nullable().optional(),
    content: z.string().min(1, "Content is required").max(100000),
    image_url: z.string().url().max(2000).nullable().optional(),
    category: z.string().max(100).nullable().optional(),
    tags: z.array(z.string().max(50)).nullable().optional(),
    status: z.enum(["draft", "scheduled", "published"]),
    scheduled_at: z.string().nullable().optional(),
    featured: z.boolean().optional(),
    social_share_enabled: z.boolean().optional(),
    email_notify_enabled: z.boolean().optional(),
    zapier_webhook_url: z.string().url().max(500).nullable().optional(),
  }),
});

const updatePostSchema = z.object({
  action: z.literal("update"),
  password: z.string().min(1).max(100),
  post_id: z.string().uuid(),
  post: z.object({
    title: z.string().min(1).max(500).optional(),
    slug: z.string().min(1).max(500).optional(),
    excerpt: z.string().max(1000).nullable().optional(),
    content: z.string().min(1).max(100000).optional(),
    image_url: z.string().url().max(2000).nullable().optional(),
    category: z.string().max(100).nullable().optional(),
    tags: z.array(z.string().max(50)).nullable().optional(),
    status: z.enum(["draft", "scheduled", "published"]).optional(),
    scheduled_at: z.string().nullable().optional(),
    featured: z.boolean().optional(),
    social_share_enabled: z.boolean().optional(),
    email_notify_enabled: z.boolean().optional(),
    zapier_webhook_url: z.string().url().max(500).nullable().optional(),
    published_at: z.string().nullable().optional(),
  }),
});

const deletePostSchema = z.object({
  action: z.literal("delete"),
  password: z.string().min(1).max(100),
  post_id: z.string().uuid(),
});

const listPostsSchema = z.object({
  action: z.literal("list"),
  password: z.string().min(1).max(100),
});

type RequestBody = 
  | z.infer<typeof verifySchema>
  | z.infer<typeof createPostSchema>
  | z.infer<typeof updatePostSchema>
  | z.infer<typeof deletePostSchema>
  | z.infer<typeof listPostsSchema>;

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const adminPassword = Deno.env.get("BLOG_ADMIN_PASSWORD");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    if (!adminPassword) {
      console.error("BLOG_ADMIN_PASSWORD not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Admin access not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    
    // Determine action and validate
    const action = body.action;
    
    if (!action) {
      return new Response(
        JSON.stringify({ success: false, error: "Action is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify password for all actions
    const password = body.password;
    if (!password || password !== adminPassword) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid admin password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    switch (action) {
      case "verify": {
        const result = verifySchema.safeParse(body);
        if (!result.success) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid request", details: result.error.errors }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        // Password already verified above
        return new Response(
          JSON.stringify({ success: true, message: "Password verified" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "list": {
        const result = listPostsSchema.safeParse(body);
        if (!result.success) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid request", details: result.error.errors }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { data, error } = await supabase
          .from("blog_posts")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("List error:", error);
          throw new Error("Failed to fetch posts");
        }

        return new Response(
          JSON.stringify({ success: true, posts: data }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "create": {
        const result = createPostSchema.safeParse(body);
        if (!result.success) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid request", details: result.error.errors }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const postData = {
          ...result.data.post,
          published_at: result.data.post.status === "published" ? new Date().toISOString() : null,
        };

        const { data, error } = await supabase
          .from("blog_posts")
          .insert(postData)
          .select("id")
          .single();

        if (error) {
          console.error("Create error:", error);
          throw new Error("Failed to create post");
        }

        return new Response(
          JSON.stringify({ success: true, post_id: data.id, message: "Post created successfully" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "update": {
        const result = updatePostSchema.safeParse(body);
        if (!result.success) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid request", details: result.error.errors }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { error } = await supabase
          .from("blog_posts")
          .update(result.data.post)
          .eq("id", result.data.post_id);

        if (error) {
          console.error("Update error:", error);
          throw new Error("Failed to update post");
        }

        return new Response(
          JSON.stringify({ success: true, message: "Post updated successfully" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "delete": {
        const result = deletePostSchema.safeParse(body);
        if (!result.success) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid request", details: result.error.errors }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        const { error } = await supabase
          .from("blog_posts")
          .delete()
          .eq("id", result.data.post_id);

        if (error) {
          console.error("Delete error:", error);
          throw new Error("Failed to delete post");
        }

        return new Response(
          JSON.stringify({ success: true, message: "Post deleted successfully" }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ success: false, error: "Unknown action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

  } catch (error: any) {
    console.error("Blog admin error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
