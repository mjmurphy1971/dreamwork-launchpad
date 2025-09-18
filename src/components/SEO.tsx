import { Helmet } from "react-helmet-async";

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  schemaType?: 'Article' | 'BlogPosting' | 'WebPage' | 'VideoObject' | 'AudioObject' | 'HowTo' | 'FAQPage' | 'CollectionPage' | 'WebApplication';
  schemaData?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = "https://www.thedreamwork.space/og-image.jpg",
  schemaType = 'WebPage',
  schemaData,
  breadcrumbs
}: SEOProps) => {
  const fullTitle = `${title} | The Dream Work - Meditation & Mindfulness`;
  
  // Fix canonical URL generation to avoid window.location issues
  const getCurrentPath = () => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '';
  };
  
  const url = canonical || `https://www.thedreamwork.space${getCurrentPath()}`;
  
  // Ensure description is within optimal length (150-160 characters)
  const optimizedDescription = description.length > 160 
    ? description.substring(0, 157) + '...' 
    : description;

  // Base schema for all pages
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "name": title,
    "description": description,
    "url": url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thedreamwork.space/logo.png"
      }
    },
    "author": {
      "@type": "Person",
      "name": "The Dream Work"
    }
  };

  // Merge with custom schema data
  const finalSchema = schemaData ? { ...baseSchema, ...schemaData } : baseSchema;

  // Breadcrumb schema
  const breadcrumbSchema = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Essential Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={optimizedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={schemaType === 'Article' || schemaType === 'BlogPosting' ? 'article' : 'website'} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="The Dream Work" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card - Fix: Use 'name' instead of 'property' */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@thedreamworkspace" />
      <meta name="twitter:creator" content="@thedreamworkspace" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional SEO Meta */}
      <meta name="author" content="The Dream Work" />
      <meta name="theme-color" content="#8B5CF6" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
      
      {/* Breadcrumb Schema */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;