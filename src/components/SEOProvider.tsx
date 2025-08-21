import { Helmet, HelmetProvider } from "react-helmet-async";
import { ReactNode } from "react";

interface SEOProviderProps {
  children: ReactNode;
}

const SEOProvider = ({ children }: SEOProviderProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        {/* Organization Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Dream Work",
              "url": "https://dreamwork-launchpad.lovable.app/",
              "logo": "https://dreamwork-launchpad.lovable.app/images/logo.png",
              "sameAs": [
                "https://www.facebook.com/thedreamworkspace",
                "https://www.instagram.com/thedreamworkspace",
                "https://twitter.com/thedreamworkspace",
                "https://www.youtube.com/channel/UC-your-youtube-channel-id"
              ]
            }
          `}
        </script>

        {/* WebSite Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "url": "https://dreamwork-launchpad.lovable.app/",
              "name": "The Dream Work",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://dreamwork-launchpad.lovable.app/blog?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>
      {children}
    </HelmetProvider>
  );
};

export default SEOProvider;


