import { Helmet } from "react-helmet-async";
import { BlogPost } from "@/data/blogContent";

interface BlogPostSEOProps {
  post: BlogPost;
  postUrl: string;
}

/**
 * Enhanced SEO component specifically for blog posts with:
 * - Optimized Open Graph tags for social sharing
 * - Twitter Cards for better previews
 * - Comprehensive structured data for AI crawlers
 * - Article-specific metadata
 */
const BlogPostSEO = ({ post, postUrl }: BlogPostSEOProps) => {
  // Ensure image URL is absolute for social media
  const imageUrl = post.image.startsWith('http') 
    ? post.image 
    : `https://www.thedreamwork.space${post.image}`;

  // Extract plain text excerpt for better social previews
  const plainTextExcerpt = post.excerpt.replace(/[#*_]/g, '').trim();
  
  // Create rich description for AI understanding
  const richDescription = `${plainTextExcerpt} Published ${new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}. ${post.readTime}.`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{post.title} | The Dream Work</title>
      <meta name="title" content={post.title} />
      <meta name="description" content={richDescription} />
      <meta name="keywords" content={post.keywords.join(', ')} />
      <meta name="author" content={post.author} />
      <link rel="canonical" href={postUrl} />

      {/* Open Graph / Facebook - Enhanced for sharing */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={postUrl} />
      <meta property="og:site_name" content="The Dream Work" />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={plainTextExcerpt} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:alt" content={post.title} />
      <meta property="og:locale" content="en_US" />
      
      {/* Article-specific OG tags */}
      <meta property="article:published_time" content={`${post.date}T00:00:00Z`} />
      <meta property="article:modified_time" content={`${post.lastModified || post.date}T00:00:00Z`} />
      <meta property="article:author" content={post.author} />
      <meta property="article:section" content={post.category} />
      {post.keywords.map(keyword => (
        <meta key={keyword} property="article:tag" content={keyword} />
      ))}

      {/* Twitter Card - Optimized for maximum engagement */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thedreamworkspace" />
      <meta name="twitter:creator" content="@thedreamworkspace" />
      <meta name="twitter:url" content={postUrl} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={plainTextExcerpt} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={post.title} />
      <meta name="twitter:label1" content="Reading time" />
      <meta name="twitter:data1" content={post.readTime} />
      <meta name="twitter:label2" content="Written by" />
      <meta name="twitter:data2" content={post.author} />

      {/* Additional meta for AI crawlers */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Semantic web metadata */}
      <meta property="dc:title" content={post.title} />
      <meta property="dc:creator" content={post.author} />
      <meta property="dc:date" content={post.date} />
      <meta property="dc:description" content={plainTextExcerpt} />

      {/* Enhanced Article/BlogPosting Schema with comprehensive data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": postUrl,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": postUrl
          },
          headline: post.title,
          alternativeHeadline: plainTextExcerpt,
          description: richDescription,
          image: {
            "@type": "ImageObject",
            url: imageUrl,
            width: 1920,
            height: 1080,
            caption: post.title
          },
          author: {
            "@type": "Person",
            name: post.author,
            url: "https://www.thedreamwork.space/about",
            sameAs: [
              "https://www.instagram.com/thedreamworkspace",
              "https://www.facebook.com/thedreamworkspace",
              "https://twitter.com/thedreamworkspace"
            ]
          },
          publisher: {
            "@type": "Organization",
            name: "The Dream Work",
            url: "https://www.thedreamwork.space",
            logo: {
              "@type": "ImageObject",
              url: "https://www.thedreamwork.space/images/logo.png",
              width: 200,
              height: 60
            },
            sameAs: [
              "https://www.instagram.com/thedreamworkspace",
              "https://www.facebook.com/thedreamworkspace",
              "https://twitter.com/thedreamworkspace"
            ]
          },
          datePublished: `${post.date}T00:00:00Z`,
          dateModified: `${post.lastModified || post.date}T00:00:00Z`,
          articleSection: post.category,
          keywords: post.keywords.join(', '),
          wordCount: post.content.split(' ').length,
          timeRequired: `PT${post.readTime.replace(' min read', 'M')}`,
          inLanguage: "en-US",
          about: post.keywords.slice(0, 3).map(keyword => ({
            "@type": "Thing",
            name: keyword
          })),
          isAccessibleForFree: true,
          isPartOf: {
            "@type": "Blog",
            "@id": "https://www.thedreamwork.space/blog",
            name: "The Dream Work Blog"
          },
          copyrightHolder: {
            "@type": "Organization",
            name: "The Dream Work"
          },
          copyrightYear: new Date(post.date).getFullYear(),
          discussionUrl: postUrl,
          commentCount: 0
        })}
      </script>

      {/* BreadcrumbList Schema for better navigation understanding */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.thedreamwork.space/"
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Blog",
              item: "https://www.thedreamwork.space/blog"
            },
            {
              "@type": "ListItem",
              position: 3,
              name: post.title,
              item: postUrl
            }
          ]
        })}
      </script>

      {/* WebPage Schema for additional context */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": postUrl,
          url: postUrl,
          name: post.title,
          description: richDescription,
          inLanguage: "en-US",
          isPartOf: {
            "@type": "WebSite",
            "@id": "https://www.thedreamwork.space/#website",
            url: "https://www.thedreamwork.space",
            name: "The Dream Work"
          },
          about: {
            "@type": "Thing",
            name: post.category
          },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: imageUrl
          }
        })}
      </script>
    </Helmet>
  );
};

export default BlogPostSEO;
