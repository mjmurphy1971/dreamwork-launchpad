import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";

interface IndexabilityCheckerProps {
  pageTitle: string;
  ensureIndexable?: boolean;
}

/**
 * Component to ensure pages are properly indexable and remove any blocking directives
 */
export const IndexabilityChecker = ({ 
  pageTitle, 
  ensureIndexable = true 
}: IndexabilityCheckerProps) => {
  const [debugInfo, setDebugInfo] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIndexability = () => {
      const issues: string[] = [];
      
      // Check for noindex in meta tags
      const metaTags = document.querySelectorAll('meta[name="robots"], meta[name="googlebot"]');
      metaTags.forEach(tag => {
        const content = tag.getAttribute('content');
        if (content && content.includes('noindex')) {
          issues.push(`Found noindex in meta tag: ${tag.outerHTML}`);
          if (ensureIndexable) {
            tag.remove();
            issues.push(`Removed noindex meta tag for indexability`);
          }
        }
      });

      // Check canonical tags point to correct URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        const href = canonical.getAttribute('href');
        const currentUrl = window.location.href;
        if (href !== currentUrl) {
          issues.push(`Canonical URL (${href}) differs from current URL (${currentUrl})`);
        }
      }

      // Report findings
      if (issues.length > 0) {
        console.log(`IndexabilityChecker for "${pageTitle}":`, issues);
        setDebugInfo(issues);
      }
    };

    // Run check after component mounts and DOM is ready
    setTimeout(checkIndexability, 100);
  }, [pageTitle, ensureIndexable]);

  return (
    <Helmet>
      {/* Explicitly ensure indexability */}
      {ensureIndexable && (
        <>
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index, follow" />
        </>
      )}
      
      {/* Add structured data to help search engines understand page purpose */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": pageTitle,
          "isAccessibleForFree": true,
          "audience": {
            "@type": "Audience",
            "audienceType": "General"
          }
        })}
      </script>
    </Helmet>
  );
};