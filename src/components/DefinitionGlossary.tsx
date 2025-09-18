import { useState } from "react";
import { Search, Book, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ContextualTooltip } from "./ContextualTooltip";

interface GlossaryTerm {
  term: string;
  definition: string;
  category: string;
  examples?: string[];
  relatedTerms?: string[];
  scientificBasis?: string;
  practicalApplication?: string;
  relatedLinks?: Array<{
    text: string;
    url: string;
    internal?: boolean;
  }>;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    term: "Mindfulness",
    definition: "A mental state of active, open attention on the present moment, characterized by awareness of thoughts and feelings without judgment.",
    category: "Core Concepts",
    examples: ["Mindful breathing", "Body scan meditation", "Mindful eating"],
    scientificBasis: "Research shows mindfulness practice increases gray matter density in areas associated with learning, memory, and emotional regulation.",
    practicalApplication: "Can be practiced through meditation, daily activities, or brief awareness exercises throughout the day.",
    relatedTerms: ["Present moment awareness", "Non-judgmental observation", "Meditation"],
    relatedLinks: [
      { text: "Meditation Practices", url: "/meditation", internal: true },
      { text: "Mindful Breathing Guide", url: "/blog/the-art-of-mindful-breathing-your-gateway-to-inner-peace", internal: true }
    ]
  },
  {
    term: "Dream Work",
    definition: "The practice of recording, analyzing, and working with dreams for psychological insight, spiritual growth, and personal development.",
    category: "Spiritual Practices",
    examples: ["Dream journaling", "Dream interpretation", "Lucid dreaming practice"],
    practicalApplication: "Involves keeping a dream journal, identifying recurring themes, and exploring symbolic meanings.",
    relatedTerms: ["Subconscious exploration", "Symbolic interpretation", "Dream journaling"],
    relatedLinks: [
      { text: "Dream Journal Tool", url: "/dream-journal", internal: true },
      { text: "Understanding Dream States", url: "/blog/understanding-dream-states-and-sleep-cycles", internal: true }
    ]
  },
  {
    term: "Pranayama",
    definition: "Ancient yogic breathing techniques designed to control and extend the life force energy (prana) through conscious breath regulation.",
    category: "Breathing Techniques",
    examples: ["4-7-8 breathing", "Box breathing", "Alternate nostril breathing"],
    scientificBasis: "Studies show pranayama practices activate the parasympathetic nervous system, reducing stress hormones and promoting relaxation.",
    practicalApplication: "Can be practiced daily for stress reduction, energy regulation, and meditation preparation.",
    relatedTerms: ["Breath control", "Life force energy", "Yogic breathing"],
    relatedLinks: [
      { text: "Breathwork Practices", url: "/breathwork", internal: true }
    ]
  },
  {
    term: "Sacred Space",
    definition: "A dedicated physical or mental environment set aside for spiritual practice, meditation, or contemplation.",
    category: "Environment",
    examples: ["Meditation corner", "Altar space", "Nature sanctuary"],
    practicalApplication: "Creating a consistent space for practice helps signal to the mind that it's time for spiritual work.",
    relatedTerms: ["Meditation space", "Spiritual sanctuary", "Practice environment"],
    relatedLinks: [
      { text: "Creating Sacred Space Guide", url: "/blog/creating-sacred-space-designing-your-personal-meditation-corner", internal: true }
    ]
  },
  {
    term: "Chakra Balancing",
    definition: "The practice of aligning and harmonizing the seven main energy centers (chakras) in the body through meditation, visualization, and energy work.",
    category: "Energy Work",
    examples: ["Root chakra grounding", "Heart chakra opening", "Crown chakra activation"],
    practicalApplication: "Uses color visualization, mantras, and specific meditations to balance each energy center.",
    relatedTerms: ["Energy centers", "Chakra meditation", "Energy healing"],
    relatedLinks: [
      { text: "Chakra Balancing Game", url: "/chakra-balancing", internal: true }
    ]
  },
  {
    term: "Sound Bath Meditation",
    definition: "A meditative experience using sound frequencies from instruments like singing bowls, gongs, and chimes to induce deep relaxation.",
    category: "Sound Healing",
    examples: ["Tibetan singing bowls", "Crystal bowl therapy", "Gong meditation"],
    scientificBasis: "Sound frequencies can alter brainwave patterns, promoting alpha and theta states associated with deep relaxation and healing.",
    practicalApplication: "Participants typically lie down and allow sound waves to wash over them, promoting stress relief and inner peace.",
    relatedTerms: ["Vibrational healing", "Sound therapy", "Frequency meditation"],
    relatedLinks: [
      { text: "Singing Bowls Experience", url: "/singing-bowls", internal: true }
    ]
  }
];

interface DefinitionGlossaryProps {
  compact?: boolean;
  categories?: string[];
  className?: string;
}

export const DefinitionGlossary = ({ compact = false, categories = [], className = "" }: DefinitionGlossaryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categories.length === 0 || categories.includes(term.category);
    const matchesSelected = !selectedCategory || term.category === selectedCategory;
    
    return matchesSearch && matchesCategory && matchesSelected;
  });

  const allCategories = [...new Set(glossaryTerms.map(term => term.category))];

  if (compact) {
    return (
      <div className={`space-y-2 ${className}`}>
        <h4 className="font-medium text-sm text-foreground flex items-center gap-2">
          <Book className="w-4 h-4 text-primary" />
          Key Terms
        </h4>
        <div className="space-y-1">
          {filteredTerms.slice(0, 3).map((term) => (
            <ContextualTooltip
              key={term.term}
              term={term.term}
              definition={term.definition}
              examples={term.examples}
              relatedLinks={term.relatedLinks}
              source={term.scientificBasis ? "Scientific Research" : "Traditional Practice"}
            >
              <span className="text-sm text-primary hover:text-primary/80">
                {term.term}
              </span>
            </ContextualTooltip>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className={`border-0 bg-card ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg font-heading flex items-center gap-2">
          <Book className="w-5 h-5 text-primary" />
          Glossary of Terms
        </CardTitle>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search terms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Badge>
            {allCategories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {filteredTerms.map((term) => (
          <div key={term.term} className="p-4 rounded-lg border border-border bg-muted/30">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h4 className="font-semibold text-foreground">{term.term}</h4>
              <Badge variant="outline" className="text-xs">
                {term.category}
              </Badge>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {term.definition}
            </p>
            
            {term.examples && term.examples.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-foreground mb-1">Examples:</p>
                <div className="flex flex-wrap gap-1">
                  {term.examples.map((example, index) => (
                    <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {term.scientificBasis && (
              <div className="mb-3">
                <p className="text-xs font-medium text-foreground mb-1">Scientific Basis:</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{term.scientificBasis}</p>
              </div>
            )}
            
            {term.relatedLinks && term.relatedLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {term.relatedLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target={link.internal ? "_self" : "_blank"}
                    rel={link.internal ? undefined : "noopener noreferrer"}
                    className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
                  >
                    {link.text}
                    <ArrowRight className="w-2 h-2" />
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
        
        {filteredTerms.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Book className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No terms found matching your search.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export { glossaryTerms };
export type { GlossaryTerm };