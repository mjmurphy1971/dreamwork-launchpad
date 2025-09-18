import { Helmet } from "react-helmet-async";

// Blog Post Schema with enhanced E-E-A-T signals
interface BlogPostSchemaProps {
  title: string;
  description: string;
  content: string;
  author: {
    name: string;
    credentials: string[];
    bio: string;
    url?: string;
  };
  datePublished: string;
  dateModified: string;
  url: string;
  image: string;
  category: string;
  keywords: string[];
  citations?: Array<{
    title: string;
    url: string;
    type: string;
  }>;
  readTime: string;
  wordCount: number;
}

export const BlogPostSchema = ({
  title,
  description,
  content,
  author,
  datePublished,
  dateModified,
  url,
  image,
  category,
  keywords,
  citations = [],
  readTime,
  wordCount
}: BlogPostSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "articleBody": content,
    "url": url,
    "image": {
      "@type": "ImageObject",
      "url": image,
      "width": "1200",
      "height": "630"
    },
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Person",
      "name": author.name,
      "description": author.bio,
      "hasCredential": author.credentials.map(credential => ({
        "@type": "EducationalOccupationalCredential",
        "name": credential
      })),
      ...(author.url && { "url": author.url })
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
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": category,
    "keywords": keywords.join(", "),
    "wordCount": wordCount,
    "timeRequired": readTime,
    "about": keywords.map(keyword => ({
      "@type": "Thing",
      "name": keyword
    })),
    ...(citations.length > 0 && {
      "citation": citations.map(citation => ({
        "@type": "CreativeWork",
        "name": citation.title,
        "url": citation.url
      }))
    }),
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

// Person Schema with enhanced credentials and expertise
interface PersonSchemaProps {
  name: string;
  bio: string;
  credentials: string[];
  expertise: string[];
  experience: string;
  url?: string;
  sameAs?: string[];
  worksFor?: string;
  image?: string;
}

export const PersonSchema = ({
  name,
  bio,
  credentials,
  expertise,
  experience,
  url,
  sameAs = [],
  worksFor,
  image
}: PersonSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "description": bio,
    "hasCredential": credentials.map(credential => ({
      "@type": "EducationalOccupationalCredential",
      "name": credential
    })),
    "knowsAbout": expertise.map(area => ({
      "@type": "Thing",
      "name": area
    })),
    "hasOccupation": {
      "@type": "Occupation",
      "name": experience
    },
    ...(url && { "url": url }),
    ...(sameAs.length > 0 && { "sameAs": sameAs }),
    ...(worksFor && {
      "worksFor": {
        "@type": "Organization", 
        "name": worksFor
      }
    }),
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

// Enhanced Meditation Session Schema
interface MeditationSessionSchemaProps {
  name: string;
  description: string;
  duration?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  keywords: string[];
  benefits?: string[];
  instructor?: string;
  technique?: string;
  url: string;
}

export const MeditationSessionSchema = ({
  name,
  description,
  duration,
  difficulty,
  keywords,
  benefits = [],
  instructor,
  technique,
  url
}: MeditationSessionSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": name,
    "description": description,
    "url": url,
    "keywords": keywords.join(', '),
    "creator": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    },
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
    "audience": {
      "@type": "Audience",
      "audienceType": "People interested in meditation and mindfulness"
    },
    ...(duration && {
      "timeRequired": duration
    }),
    ...(difficulty && {
      "skillLevel": difficulty
    }),
    ...(benefits.length > 0 && {
      "about": benefits.map(benefit => ({
        "@type": "Thing",
        "name": benefit
      }))
    }),
    ...(instructor && {
      "author": {
        "@type": "Person",
        "name": instructor
      }
    }),
    ...(technique && {
      "teaches": {
        "@type": "Thing",
        "name": technique
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

// Enhanced Collection Page Schema
interface CollectionPageSchemaProps {
  name: string;
  description: string;
  url: string;
  category: string;
  itemCount?: number;
  keywords: string[];
}

export const CollectionPageSchema = ({
  name,
  description,
  url,
  category,
  itemCount,
  keywords
}: CollectionPageSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": name,
    "description": description,
    "url": url,
    "about": {
      "@type": "Thing",
      "name": category
    },
    "keywords": keywords.join(', '),
    "publisher": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    },
    "isAccessibleForFree": true,
    "inLanguage": "en-US",
    ...(itemCount && {
      "numberOfItems": itemCount
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

// Enhanced Web Application Schema for interactive tools
interface EnhancedWebApplicationSchemaProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  features: string[];
  operatingSystem?: string;
  requirements?: string[];
  offers?: {
    price: string;
    priceCurrency: string;
  };
  author: {
    name: string;
    credentials: string[];
  };
  dateCreated: string;
  dateModified: string;
  inLanguage: string;
  keywords: string[];
}

export const EnhancedWebApplicationSchema = ({
  name,
  description,
  url,
  applicationCategory,
  features,
  operatingSystem = "Web Browser",
  requirements = [],
  offers,
  author,
  dateCreated,
  dateModified,
  inLanguage = "en-US",
  keywords
}: EnhancedWebApplicationSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": name,
    "description": description,
    "url": url,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "featureList": features,
    "requirements": requirements.join(", "),
    "author": {
      "@type": "Person",
      "name": author.name,
      "hasCredential": author.credentials.map(credential => ({
        "@type": "EducationalOccupationalCredential",
        "name": credential
      }))
    },
    "dateCreated": dateCreated,
    "dateModified": dateModified,
    "inLanguage": inLanguage,
    "keywords": keywords.join(", "),
    "isAccessibleForFree": !offers,
    ...(offers && {
      "offers": {
        "@type": "Offer",
        "price": offers.price,
        "priceCurrency": offers.priceCurrency
      }
    }),
    "publisher": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

// FAQ Schema for improved conversational AI targeting
interface FAQSchemaProps {
  questions: Array<{
    question: string;
    answer: string;
    category?: string;
  }>;
}

export const EnhancedFAQSchema = ({ questions }: FAQSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      },
      ...(item.category && {
        "about": {
          "@type": "Thing",
          "name": item.category
        }
      })
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

// HowTo Schema for practice guides
interface HowToSchemaProps {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
  supply?: string[];
  tool?: string[];
  category: string;
  keywords: string[];
}

export const EnhancedHowToSchema = ({
  name,
  description,
  steps,
  totalTime,
  supply = [],
  tool = [],
  category,
  keywords
}: HowToSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && {
        "image": {
          "@type": "ImageObject",
          "url": step.image
        }
      })
    })),
    ...(totalTime && { "totalTime": totalTime }),
    ...(supply.length > 0 && {
      "supply": supply.map(item => ({
        "@type": "HowToSupply",
        "name": item
      }))
    }),
    ...(tool.length > 0 && {
      "tool": tool.map(item => ({
        "@type": "HowToTool",
        "name": item
      }))
    }),
    "about": {
      "@type": "Thing",
      "name": category
    },
    "keywords": keywords.join(", "),
    "publisher": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

// Interactive Tool Schema - Replaces the older version
interface InteractiveToolSchemaProps {
  toolName: string;
  description: string;
  features: string[];
  category: string;
  difficulty?: string;
  estimatedTime?: string;
  instructions?: string;
  url: string;
}

export const InteractiveToolSchema = ({
  toolName,
  description,
  features,
  category,
  difficulty,
  estimatedTime,
  instructions,
  url
}: InteractiveToolSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "description": description,
    "url": url,
    "applicationCategory": category,
    "featureList": features,
    "operatingSystem": "Web Browser",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    },
    ...(difficulty && {
      "skillLevel": difficulty
    }),
    ...(estimatedTime && {
      "timeRequired": estimatedTime
    }),
    ...(instructions && {
      "instructions": {
        "@type": "HowToStep",
        "text": instructions
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData, null, 2)}
      </script>
    </Helmet>
  );
};

// Pre-configured schema components for specific tools
export const DreamJournalSchema = () => (
  <InteractiveToolSchema
    toolName="Dream Journal"
    description="Digital dream journaling tool for recording, analyzing, and tracking dreams with pattern recognition and symbol interpretation features."
    features={[
      "Dream entry recording with rich text editor",
      "Emotion and symbol tagging system", 
      "Pattern recognition across dream entries",
      "Symbol dictionary and interpretation guide",
      "Dream trend visualization and analytics",
      "Lucid dreaming progress tracking",
      "Export capabilities for dream data"
    ]}
    category="Personal Development"
    difficulty="beginner"
    estimatedTime="5-15 minutes per entry"
    instructions="Record your dreams immediately upon waking, tag emotions and symbols, review patterns weekly"
    url="https://www.thedreamwork.space/dream-journal"
  />
);

export const PracticeTrackerSchema = () => (
  <InteractiveToolSchema
    toolName="Meditation Practice Tracker"
    description="Comprehensive meditation and mindfulness practice tracking system with habit building features and progress analytics."
    features={[
      "Daily practice logging with duration tracking",
      "Multiple meditation technique support",
      "Habit streak counting and motivational rewards",
      "Weekly and monthly progress visualization",
      "Custom practice goal setting",
      "Mindfulness reminder notifications",
      "Community sharing and challenges"
    ]}
    category="Health & Wellness" 
    difficulty="beginner"
    estimatedTime="2-3 minutes for daily logging"
    instructions="Log each meditation session immediately after practice, set weekly goals, review progress monthly"
    url="https://www.thedreamwork.space/weekly-stillness"
  />
);

export const MeditationToolsSchema = () => (
  <InteractiveToolSchema
    toolName="Guided Meditation Collection"
    description="Curated collection of AI-assisted guided meditation sessions for various purposes including stress relief, sleep, focus, and emotional healing."
    features={[
      "AI-generated personalized meditation scripts",
      "Multiple voice options and background sounds",
      "Session customization based on mood and goals",
      "Progress tracking across different meditation types",
      "Offline download capabilities for sessions",
      "Integration with practice tracker",
      "Community-contributed meditation techniques"
    ]}
    category="Health & Wellness"
    difficulty="beginner"
    estimatedTime="5-60 minutes per session"
    instructions="Choose a session based on current needs, find comfortable position, follow guided instructions"
    url="https://www.thedreamwork.space/meditation"
  />
);