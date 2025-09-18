import { ReactNode } from 'react';
import SEO, { SEOProps } from './SEO';
import PerformanceMonitor from './PerformanceMonitor';

interface SEOEnhancerProps extends SEOProps {
  children: ReactNode;
  pageName: string;
  h1Text?: string;
  hideH1?: boolean;
}

const SEOEnhancer = ({ 
  children, 
  pageName, 
  h1Text, 
  hideH1 = false,
  ...seoProps 
}: SEOEnhancerProps) => {
  return (
    <>
      <SEO {...seoProps} />
      <PerformanceMonitor pageName={pageName} />
      
      {/* Semantic HTML5 Structure */}
      <div className="seo-enhanced-page" role="main">
        {/* Hidden H1 for SEO if not visually displayed */}
        {h1Text && hideH1 && (
          <h1 className="sr-only" itemProp="name">
            {h1Text}
          </h1>
        )}
        
        {/* Microdata for enhanced semantic markup */}
        <div 
          itemScope 
          itemType="https://schema.org/WebPage"
          itemProp="mainContentOfPage"
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SEOEnhancer;