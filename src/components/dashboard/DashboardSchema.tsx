import { Helmet } from "react-helmet-async";

interface DashboardSchemaProps {
  dashboardName: string;
  description: string;
  url: string;
  sections: Array<{
    name: string;
    description: string;
    dataSource: string;
  }>;
  author: {
    name: string;
    organization: string;
    credentials?: string[];
  };
  lastUpdated: string;
  keywords: string[];
}

export const DashboardSchema = ({
  dashboardName,
  description,
  url,
  sections,
  author,
  lastUpdated,
  keywords
}: DashboardSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": dashboardName,
    "description": description,
    "url": url,
    "applicationCategory": "Analytics Dashboard",
    "keywords": keywords.join(', '),
    "dateModified": lastUpdated,
    "author": {
      "@type": "Person",
      "name": author.name,
      "worksFor": {
        "@type": "Organization",
        "name": author.organization
      },
      ...(author.credentials && {
        "hasCredential": author.credentials.map(credential => ({
          "@type": "EducationalOccupationalCredential",
          "name": credential
        }))
      })
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Website Performance Analytics"
      },
      {
        "@type": "Thing", 
        "name": "AI Integration Monitoring"
      },
      {
        "@type": "Thing",
        "name": "User Experience Optimization"
      }
    ],
    "hasPart": sections.map(section => ({
      "@type": "WebPageElement",
      "name": section.name,
      "description": section.description,
      "about": {
        "@type": "Thing",
        "name": section.dataSource
      }
    })),
    "isAccessibleForFree": true,
    "inLanguage": "en-US"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};