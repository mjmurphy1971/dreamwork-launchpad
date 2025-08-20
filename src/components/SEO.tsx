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
  const url = canonical || `https://www.thedreamwork.space${window.location.pathname}`;

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
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
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