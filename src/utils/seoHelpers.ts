// SEO Helper functions for generating metadata and schema

export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

# AI-friendly crawling
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User  
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: FacebookBot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: LinkedInBot
Allow: /

User-agent: WhatsApp
Allow: /

User-agent: AppleBot
Allow: /

User-agent: BingBot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Slurp
Allow: /

# Prioritize important content for AI crawlers
Crawl-delay: 1

Sitemap: https://www.thedreamwork.space/sitemap.xml`;
};

export const generateSitemapXml = () => {
  const baseUrl = "https://www.thedreamwork.space";
  const currentDate = new Date().toISOString().split('T')[0];
  
  const pages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/meditation', priority: '0.9', changefreq: 'weekly' },
    { url: '/dream-journal', priority: '0.9', changefreq: 'monthly' },
    { url: '/weekly-stillness', priority: '0.8', changefreq: 'weekly' },
    { url: '/breathwork', priority: '0.8', changefreq: 'monthly' },
    { url: '/herbology', priority: '0.7', changefreq: 'monthly' },
    { url: '/homeopathic-healing', priority: '0.7', changefreq: 'monthly' },
    { url: '/morning-rituals', priority: '0.7', changefreq: 'monthly' },
    { url: '/work-transitions', priority: '0.7', changefreq: 'monthly' },
    { url: '/gratitude-garden', priority: '0.7', changefreq: 'monthly' },
    { url: '/mindful-coloring', priority: '0.6', changefreq: 'monthly' },
    { url: '/singing-bowls', priority: '0.6', changefreq: 'monthly' },
    { url: '/vlogs', priority: '0.8', changefreq: 'weekly' },
    { url: '/about', priority: '0.5', changefreq: 'monthly' }
  ];

  const urlElements = pages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};

export const generateMetaKeywords = (baseKeywords: string[], pageSpecific: string[]) => {
  const allKeywords = [...baseKeywords, ...pageSpecific];
  return allKeywords.join(', ');
};

export const formatDuration = (minutes: number): string => {
  if (minutes < 60) {
    return `PT${minutes}M`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `PT${hours}H${remainingMinutes}M` : `PT${hours}H`;
};

export const baseKeywords = [
  'meditation',
  'mindfulness', 
  'spiritual wellness',
  'consciousness',
  'inner peace',
  'self-discovery',
  'holistic healing',
  'mental health',
  'stress relief',
  'personal growth'
];