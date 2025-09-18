// Enhanced Schema markup components for meditation sessions and tools
import { Helmet } from "react-helmet-async";

export interface MeditationSessionSchemaProps {
  name: string;
  description: string;
  duration: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  keywords: string[];
  benefits: string[];
  instructor?: string;
  technique: string;
  url: string;
}

export const MeditationSessionSchema = ({ 
  name, 
  description, 
  duration, 
  difficulty, 
  keywords, 
  benefits, 
  instructor, 
  technique, 
  url 
}: MeditationSessionSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "@id": "${url}",
          "name": "${name}",
          "description": "${description}",
          "duration": "${duration}",
          "genre": "Meditation",
          "keywords": "${keywords.join(', ')}",
          "audience": {
            "@type": "Audience",
            "audienceType": "${difficulty || 'All Levels'}"
          },
          "teaches": [
            ${benefits.map(benefit => `{
              "@type": "Thing",
              "name": "${benefit}"
            }`).join(', ')}
          ],
          "about": [
            {
              "@type": "Thing",
              "name": "${technique}"
            },
            {
              "@type": "Thing",
              "name": "Meditation Practice"
            },
            {
              "@type": "Thing",
              "name": "Mindfulness"
            }
          ],
          ${instructor ? `"author": {
            "@type": "Person",
            "name": "${instructor}"
          },` : ''}
          "publisher": {
            "@type": "Organization",
            "name": "The Dream Work",
            "url": "https://www.thedreamwork.space"
          },
          "isAccessibleForFree": true,
          "inLanguage": "en-US",
          "learningResourceType": "Guided Meditation",
          "educationalUse": "Stress Relief, Mindfulness Training, Spiritual Development"
        }
      `}
    </script>
  </Helmet>
);

export interface CollectionPageSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
  itemCount: number;
  keywords: string[];
}

export const CollectionPageSchema = ({ 
  name, 
  description, 
  url, 
  category, 
  itemCount, 
  keywords 
}: CollectionPageSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "${name}",
          "description": "${description}",
          "url": "${url}",
          "about": [
            {
              "@type": "Thing",
              "name": "${category}"
            },
            {
              "@type": "Thing",
              "name": "Meditation"
            },
            {
              "@type": "Thing",
              "name": "Mindfulness"
            }
          ],
          "keywords": "${keywords.join(', ')}",
          "numberOfItems": ${itemCount},
          "publisher": {
            "@type": "Organization",
            "name": "The Dream Work",
            "url": "https://www.thedreamwork.space"
          },
          "isPartOf": {
            "@type": "WebSite",
            "name": "The Dream Work",
            "url": "https://www.thedreamwork.space"
          }
        }
      `}
    </script>
  </Helmet>
);

export interface BreadcrumbSchemaProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            ${items.map((item, index) => `{
              "@type": "ListItem",
              "position": ${index + 1},
              "name": "${item.name}",
              "item": "${item.url}"
            }`).join(', ')}
          ]
        }
      `}
    </script>
  </Helmet>
);

export interface WebApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  features: string[];
  category: string;
  operatingSystem?: string;
  requirements?: string;
}

export const WebApplicationSchema = ({ 
  name, 
  description, 
  url, 
  features, 
  category, 
  operatingSystem, 
  requirements 
}: WebApplicationSchemaProps) => (
  <Helmet>
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "${name}",
          "description": "${description}",
          "url": "${url}",
          "applicationCategory": "${category}",
          "featureList": [
            ${features.map(feature => `"${feature}"`).join(', ')}
          ],
          ${operatingSystem ? `"operatingSystem": "${operatingSystem}",` : ''}
          ${requirements ? `"requirements": "${requirements}",` : ''}
          "isAccessibleForFree": true,
          "author": {
            "@type": "Organization",
            "name": "The Dream Work"
          },
          "publisher": {
            "@type": "Organization",
            "name": "The Dream Work",
            "url": "https://www.thedreamwork.space"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        }
      `}
    </script>
  </Helmet>
);