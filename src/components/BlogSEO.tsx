import SEO from "./SEO";
import { createArticleSchema, ArticleSchemaProps } from "./SchemaMarkup";
import { baseKeywords } from "@/utils/seoHelpers";

interface BlogSEOProps {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  featured?: boolean;
  image?: string;
}

const BlogSEO = ({
  title,
  excerpt,
  content,
  author,
  date,
  category,
  readTime,
  featured = false,
  image
}: BlogSEOProps) => {
  // Generate category-specific keywords
  const categoryKeywords = {
    "Meditation": ["meditation techniques", "mindfulness practice", "inner peace", "meditation guide"],
    "Mindfulness": ["mindful living", "present moment awareness", "mindfulness exercises", "conscious breathing"],
    "Dreams": ["dream interpretation", "lucid dreaming", "dream symbols", "subconscious mind"],
    "Wellness": ["holistic health", "natural healing", "wellness practices", "self-care"],
    "Healing": ["energy healing", "spiritual healing", "emotional healing", "healing practices"]
  };

  const specificKeywords = categoryKeywords[category as keyof typeof categoryKeywords] || [];
  const keywords = [...baseKeywords, ...specificKeywords, category.toLowerCase()].join(", ");

  const articleSchemaProps: ArticleSchemaProps = {
    title,
    description: excerpt,
    content,
    author,
    datePublished: date,
    dateModified: date,
    image: image || "https://www.thedreamwork.space/og-image.jpg",
    category,
    keywords: [...baseKeywords, ...specificKeywords],
    readingTime: readTime
  };

  const schemaData = createArticleSchema(articleSchemaProps);

  // Enhanced meta description for better AI understanding
  const enhancedDescription = `${excerpt} Learn about ${category.toLowerCase()} through evidence-based practices and spiritual wisdom. ${readTime} read.`;

  return (
    <SEO
      title={title}
      description={enhancedDescription}
      keywords={keywords}
      schemaType="BlogPosting"
      schemaData={schemaData}
      ogImage={image}
      breadcrumbs={[
        { name: "Home", url: "https://www.thedreamwork.space/" },
        { name: "Blog", url: "https://www.thedreamwork.space/blog" },
        { name: title, url: window.location.href }
      ]}
    />
  );
};

export default BlogSEO;