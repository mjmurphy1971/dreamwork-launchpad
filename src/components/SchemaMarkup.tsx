// Specific Schema markup components for different content types

export interface ArticleSchemaProps {
  title: string;
  description: string;
  content: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  category: string;
  keywords: string[];
  readingTime?: string;
}

export const createArticleSchema = (props: ArticleSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": props.title,
  "description": props.description,
  "articleBody": props.content,
  "author": {
    "@type": "Person",
    "name": props.author
  },
  "datePublished": props.datePublished,
  "dateModified": props.dateModified || props.datePublished,
  "image": props.image || "https://www.thedreamwork.space/og-image.jpg",
  "articleSection": props.category,
  "keywords": props.keywords,
  "readingTime": props.readingTime,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": window.location.href
  },
  "publisher": {
    "@type": "Organization",
    "name": "The Dream Work",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.thedreamwork.space/logo.png"
    }
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Meditation"
    },
    {
      "@type": "Thing", 
      "name": "Mindfulness"
    },
    {
      "@type": "Thing",
      "name": "Spiritual Wellness"
    }
  ]
});

export interface VideoSchemaProps {
  title: string;
  description: string;
  duration: string;
  uploadDate: string;
  thumbnailUrl: string;
  embedUrl: string;
  category: string;
  keywords: string[];
}

export const createVideoSchema = (props: VideoSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": props.title,
  "description": props.description,
  "duration": props.duration,
  "uploadDate": props.uploadDate,
  "thumbnailUrl": props.thumbnailUrl,
  "embedUrl": props.embedUrl,
  "contentUrl": props.embedUrl,
  "genre": props.category,
  "keywords": props.keywords.join(", "),
  "publisher": {
    "@type": "Organization",
    "name": "The Dream Work",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.thedreamwork.space/logo.png"
    }
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Meditation Practice"
    },
    {
      "@type": "Thing",
      "name": "Mindfulness Techniques"
    }
  ]
});

export interface AudioSchemaProps {
  title: string;
  description: string;
  duration: string;
  contentUrl: string;
  category: string;
  keywords: string[];
  transcript?: string;
}

export const createAudioSchema = (props: AudioSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "AudioObject",
  "name": props.title,
  "description": props.description,
  "duration": props.duration,
  "contentUrl": props.contentUrl,
  "genre": props.category,
  "keywords": props.keywords.join(", "),
  "transcript": props.transcript,
  "publisher": {
    "@type": "Organization",
    "name": "The Dream Work",
    "logo": {
      "@type": "ImageObject", 
      "url": "https://www.thedreamwork.space/logo.png"
    }
  },
  "about": [
    {
      "@type": "Thing",
      "name": "Guided Meditation"
    },
    {
      "@type": "Thing",
      "name": "Mindfulness Practice"
    },
    {
      "@type": "Thing",
      "name": "Relaxation Techniques"
    }
  ]
});

export interface HowToSchemaProps {
  title: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string;
  difficulty?: string;
  category: string;
}

export const createHowToSchema = (props: HowToSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": props.title,
  "description": props.description,
  "totalTime": props.totalTime,
  "difficulty": props.difficulty,
  "step": props.steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image
  })),
  "about": [
    {
      "@type": "Thing",
      "name": props.category
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
  "publisher": {
    "@type": "Organization",
    "name": "The Dream Work",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.thedreamwork.space/logo.png"
    }
  }
});

export interface FAQSchemaProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const createFAQSchema = (props: FAQSchemaProps) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": props.faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});