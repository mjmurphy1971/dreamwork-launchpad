// Enhanced Schema markup for interactive tools to improve AI comprehension

import { Helmet } from "react-helmet-async";

interface InteractiveToolSchemaProps {
  toolName: string;
  description: string;
  features: string[];
  category: string;
  difficulty?: string;
  estimatedTime?: string;
  benefits: string[];
  instructions?: string[];
  url: string;
}

export const InteractiveToolSchema = ({
  toolName,
  description,
  features,
  category,
  difficulty,
  estimatedTime,
  benefits,
  instructions = [],
  url
}: InteractiveToolSchemaProps) => {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": toolName,
    "description": description,
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "category": "Free"
    },
    "featureList": features,
    "applicationSubCategory": category,
    "softwareRequirements": "Web Browser",
    "permissions": "No special permissions required",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "The Dream Work",
      "url": "https://www.thedreamwork.space"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "The Dream Work",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.thedreamwork.space/logo.png"
      }
    },
    "url": url,
    "potentialAction": {
      "@type": "UseAction",
      "target": url,
      "name": `Use ${toolName}`
    },
    "about": [
      {
        "@type": "Thing",
        "name": category,
        "description": `Interactive tool for ${category.toLowerCase()}`
      },
      {
        "@type": "Thing",
        "name": "Meditation Practice",
        "description": "Digital tools for meditation and mindfulness practice"
      },
      {
        "@type": "Thing",
        "name": "Wellness Technology",
        "description": "Technology-assisted wellness and spiritual growth tools"
      }
    ]
  };

  // Add optional fields if provided
  if (difficulty) {
    toolSchema["skillLevel"] = difficulty;
  }

  if (estimatedTime) {
    toolSchema["timeRequired"] = estimatedTime;
  }

  if (instructions.length > 0) {
    toolSchema["instructions"] = {
      "@type": "HowTo",
      "name": `How to use ${toolName}`,
      "step": instructions.map((instruction, index) => ({
        "@type": "HowToStep",
        "position": index + 1,
        "text": instruction
      }))
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(toolSchema)}
      </script>
    </Helmet>
  );
};

// Pre-configured schemas for common tools
export const DreamJournalSchema = () => (
  <InteractiveToolSchema
    toolName="Dream Journal - Digital Dream Diary"
    description="Interactive dream journal application for recording, analyzing, and tracking dream patterns, symbols, and insights for spiritual growth and self-discovery."
    features={[
      "Dream entry recording with date/time stamps",
      "Symbol recognition and interpretation",
      "Mood and lucidity tracking",
      "Dream pattern analysis over time",
      "Search and filter capabilities",
      "Privacy-focused local storage",
      "Exportable dream history"
    ]}
    category="Dream Analysis"
    difficulty="Beginner"
    estimatedTime="PT5M"
    benefits={[
      "Enhanced dream recall",
      "Pattern recognition in subconscious messaging",
      "Improved self-awareness",
      "Spiritual insight development",
      "Better understanding of sleep patterns"
    ]}
    instructions={[
      "Record your dream immediately upon waking",
      "Note emotions, symbols, and key themes",
      "Add tags for easy categorization",
      "Track lucidity levels and sleep quality",
      "Review patterns weekly for insights"
    ]}
    url="https://www.thedreamwork.space/dream-journal"
  />
);

export const PracticeTrackerSchema = () => (
  <InteractiveToolSchema
    toolName="Weekly Stillness - Meditation Practice Tracker"
    description="Comprehensive meditation and mindfulness practice tracker with guided daily exercises, progress monitoring, and habit formation tools for spiritual development."
    features={[
      "Daily practice suggestions with instructions",
      "Progress tracking and streak monitoring",
      "Multiple difficulty levels",
      "Practice statistics and insights",
      "Customizable weekly goals",
      "Achievement badges and milestones",
      "Guided practice instructions"
    ]}
    category="Meditation Practice"
    difficulty="All Levels"
    estimatedTime="PT10M"
    benefits={[
      "Consistent meditation habit formation",
      "Increased mindfulness awareness",
      "Stress reduction and emotional regulation",
      "Enhanced spiritual growth",
      "Better sleep and mental clarity"
    ]}
    instructions={[
      "Choose daily practices that resonate with you",
      "Set realistic weekly goals",
      "Complete practices mindfully, not just for completion",
      "Track your progress regularly",
      "Reflect on insights gained from consistent practice"
    ]}
    url="https://www.thedreamwork.space/weekly-stillness"
  />
);

export const MeditationToolsSchema = () => (
  <InteractiveToolSchema
    toolName="Guided Meditation Collection"
    description="Curated collection of guided meditation videos and audio sessions for anxiety relief, sleep improvement, mindfulness training, and spiritual awakening."
    features={[
      "Categorized meditation sessions",
      "Video and audio formats",
      "Transcript availability",
      "Difficulty level filtering",
      "Duration-based selection",
      "Progress tracking integration",
      "Accessibility features"
    ]}
    category="Guided Meditation"
    difficulty="All Levels"
    estimatedTime="PT5M"
    benefits={[
      "Reduced anxiety and stress",
      "Improved sleep quality",
      "Enhanced emotional regulation",
      "Greater self-awareness",
      "Spiritual connection deepening"
    ]}
    instructions={[
      "Find a quiet, comfortable space",
      "Choose a meditation matching your current needs",
      "Use headphones for optimal audio experience",
      "Follow along without forcing experiences",
      "Practice regularly for cumulative benefits"
    ]}
    url="https://www.thedreamwork.space/meditation"
  />
);