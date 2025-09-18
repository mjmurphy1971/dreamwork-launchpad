import { Helmet } from "react-helmet-async";

interface BrandStorySchemaProps {
  organizationName: string;
  description: string;
  founder: {
    name: string;
    credentials: string[];
    bio: string;
    image?: string;
  };
  establishedYear?: string;
  mission: string;
  values: string[];
  achievements: Array<{
    title: string;
    description: string;
    date?: string;
  }>;
  testimonials?: Array<{
    text: string;
    author: string;
    role?: string;
  }>;
  className?: string;
}

export const BrandStorySchema = ({
  organizationName,
  description,
  founder,
  establishedYear,
  mission,
  values,
  achievements,
  testimonials = [],
  className = ""
}: BrandStorySchemaProps) => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "description": description,
    "foundingDate": establishedYear,
    "mission": mission,
    "url": "https://www.thedreamwork.space",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.thedreamwork.space/images/logo.png"
    },
    "founder": {
      "@type": "Person",
      "name": founder.name,
      "description": founder.bio,
      "hasCredential": founder.credentials.map(credential => ({
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": credential
      })),
      "image": founder.image,
      "sameAs": [
        "https://www.thedreamwork.space/about"
      ]
    },
    "knowsAbout": [
      "Meditation",
      "Mindfulness", 
      "Spiritual Wellness",
      "Stress Management",
      "Breathwork",
      "Dream Work",
      "Sound Healing"
    ],
    "serviceType": [
      "Meditation Instruction",
      "Mindfulness Training",
      "Wellness Coaching",
      "Spiritual Guidance"
    ],
    "areaServed": "Global",
    "availableLanguage": "English",
    "sameAs": [
      "https://www.instagram.com/thedreamworkspace",
      "https://www.facebook.com/thedreamworkspace",
      "https://twitter.com/thedreamworkspace"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Meditation & Mindfulness Resources",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Guided Meditation Sessions",
            "description": "Curated collection of meditation practices for various needs"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Dream Journal Tools",
            "description": "Interactive platform for recording and exploring dreams"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Mindfulness Articles",
            "description": "Evidence-based content on meditation and spiritual wellness"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is The Dream Work approach to meditation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The Dream Work focuses on making meditation accessible through evidence-based practices, authentic community connection, and integration of traditional wisdom with modern research. Founded by certified instructor Mary Murphy, we provide curated resources for practitioners at every level.`
        }
      },
      {
        "@type": "Question", 
        "name": "What qualifications does Mary Murphy have as a meditation teacher?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Mary Murphy is a certified MBSR (Mindfulness-Based Stress Reduction) instructor with 15+ years of experience in meditation and spiritual wellness. She holds multiple certifications in meditation teaching and has trained in various contemplative traditions.`
        }
      },
      {
        "@type": "Question",
        "name": "How can meditation help with anxiety and stress?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Research shows that regular meditation practice can reduce cortisol levels, activate the parasympathetic nervous system, and increase gray matter in areas associated with emotional regulation. Our guided practices specifically target anxiety relief through proven techniques like mindful breathing and body awareness.`
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};