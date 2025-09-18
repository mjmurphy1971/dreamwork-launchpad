// SEO Validation Utilities
export const validateSEO = {
  // Validate title length (ideal: 50-60 characters)
  title: (title: string) => ({
    isValid: title.length >= 30 && title.length <= 60,
    length: title.length,
    recommendation: title.length < 30 ? 'Title too short' : title.length > 60 ? 'Title too long' : 'Optimal length'
  }),

  // Validate description length (ideal: 150-160 characters)
  description: (description: string) => ({
    isValid: description.length >= 120 && description.length <= 160,
    length: description.length,
    recommendation: description.length < 120 ? 'Description too short' : description.length > 160 ? 'Description too long' : 'Optimal length'
  }),

  // Validate canonical URL format
  canonical: (url: string) => ({
    isValid: /^https:\/\/(?:www\.)?thedreamwork\.space/.test(url) && !url.includes('?') && !url.endsWith('/'),
    recommendation: 'Should be absolute HTTPS URL without query params or trailing slash'
  }),

  // Check for duplicate content issues
  duplicateContent: (content: string, existingContent: string[]) => ({
    isDuplicate: existingContent.some(existing => 
      existing.toLowerCase().includes(content.toLowerCase()) || 
      content.toLowerCase().includes(existing.toLowerCase())
    ),
    recommendation: 'Ensure unique content for each page'
  })
};

// Schema validation
export const validateSchema = {
  // Validate required schema properties
  requiredProperties: (schema: any, type: string) => {
    const required = {
      'WebPage': ['@type', 'name', 'description', 'url'],
      'Article': ['@type', 'headline', 'author', 'datePublished', 'publisher'],
      'BlogPosting': ['@type', 'headline', 'author', 'datePublished', 'publisher'],
      'Organization': ['@type', 'name', 'url']
    };

    const requiredFields = required[type as keyof typeof required] || [];
    const missing = requiredFields.filter(field => !schema[field]);
    
    return {
      isValid: missing.length === 0,
      missingFields: missing,
      recommendation: missing.length > 0 ? `Add missing fields: ${missing.join(', ')}` : 'Schema complete'
    };
  }
};

// URL structure validation
export const validateURL = {
  structure: (pathname: string) => ({
    isValid: /^\/[a-z0-9-]*(?:\/[a-z0-9-]*)*\/?$/.test(pathname),
    recommendation: 'Use lowercase letters, numbers, and hyphens only'
  }),
  
  length: (pathname: string) => ({
    isValid: pathname.length <= 100,
    length: pathname.length,
    recommendation: pathname.length > 100 ? 'URL too long, aim for under 100 characters' : 'Optimal length'
  })
};