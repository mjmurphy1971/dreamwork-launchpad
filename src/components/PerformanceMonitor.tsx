import { useEffect } from 'react';

interface PerformanceMonitorProps {
  pageName: string;
}

const PerformanceMonitor = ({ pageName }: PerformanceMonitorProps) => {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      // This would integrate with actual web vitals library
      console.log(`Performance monitoring for: ${pageName}`);
    }

    // Monitor page load time
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming;
          console.log(`Page load time for ${pageName}: ${navEntry.loadEventEnd - navEntry.fetchStart}ms`);
        }
      }
    });

    observer.observe({ entryTypes: ['navigation'] });

    return () => observer.disconnect();
  }, [pageName]);

  return null;
};

export default PerformanceMonitor;