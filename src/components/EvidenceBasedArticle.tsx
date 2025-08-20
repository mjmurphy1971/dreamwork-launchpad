// Component for rendering evidence-based articles with proper structure and citations

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CitationFooter } from "./CitationFooter";
import { ContentClusterNavigation } from "./ContentClusterNavigation";
import { TextToSpeech } from "./TextToSpeech";
import { Citation, ContentCluster, CITATIONS } from "@/data/evidenceBasedContent";
import ReactMarkdown from "react-markdown";

interface EvidenceBasedArticleProps {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  citations: string[]; // Citation IDs
  keywords: string[];
  readTime: string;
  category: string;
  lastUpdated: string;
  cluster?: ContentCluster;
  relatedClusters?: ContentCluster[];
  author?: string;
  onBack?: () => void;
  onNavigate?: (target: string) => void;
}

export const EvidenceBasedArticle = ({
  id,
  title,
  content,
  excerpt,
  citations: citationIds,
  keywords,
  readTime,
  category,
  lastUpdated,
  cluster,
  relatedClusters = [],
  author = "The Dream Work Team",
  onBack,
  onNavigate
}: EvidenceBasedArticleProps) => {
  // Get citation objects from IDs
  const citations = citationIds.map(id => 
    CITATIONS.find(citation => citation.id === id)
  ).filter(Boolean) as Citation[];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back Navigation */}
      {onBack && (
        <Button variant="ghost" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Articles
        </Button>
      )}

      {/* Article Header */}
      <header className="space-y-6">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{category}</Badge>
            <Badge variant="outline">Evidence-Based</Badge>
            {citations.length > 0 && (
              <Badge variant="outline">{citations.length} Citations</Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight">
            {title}
          </h1>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            {excerpt}
          </p>
        </div>

        {/* Article Meta */}
        <Card className="bg-muted/30">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>{author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span>{readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>{new Date(lastUpdated).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <TextToSpeech 
                  text={content.replace(/[#*]/g, "")}
                  title={title}
                  description={excerpt}
                  category={category}
                  keywords={keywords}
                  includeSchema={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Keywords */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Key Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-heading font-bold text-foreground mt-8 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-heading font-semibold text-foreground mt-6 mb-3">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg font-heading font-semibold text-foreground mt-4 mb-2">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-foreground leading-relaxed mb-4">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2 text-foreground mb-4">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2 text-foreground mb-4">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-foreground">{children}</li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-foreground">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="italic text-foreground">{children}</em>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
                {children}
              </blockquote>
            )
          }}
        >
          {content}
        </ReactMarkdown>
      </article>

      {/* Citation Footer */}
      <CitationFooter 
        citations={citations}
        lastUpdated={lastUpdated}
      />

      {/* Content Cluster Navigation */}
      {cluster && (
        <ContentClusterNavigation
          currentCluster={cluster}
          relatedClusters={relatedClusters}
          onNavigate={onNavigate}
        />
      )}

      {/* Structured Data for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": excerpt,
            "articleBody": content,
            "author": {
              "@type": "Organization",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Dream Work",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.thedreamwork.space/logo.png"
              }
            },
            "datePublished": lastUpdated,
            "dateModified": lastUpdated,
            "keywords": keywords.join(", "),
            "articleSection": category,
            "isBasedOn": citations.map(citation => ({
              "@type": "ScholarlyArticle",
              "name": citation.title,
              "author": citation.authors.map(author => ({
                "@type": "Person",
                "name": author
              })),
              "datePublished": citation.year.toString(),
              "publication": citation.journal
            })),
            "about": keywords.map(keyword => ({
              "@type": "Thing",
              "name": keyword
            })),
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.thedreamwork.space/articles/${id}`
            }
          })
        }}
      />
    </div>
  );
};