import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * Component to handle 301 redirects for moved content
 */
export const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Define redirect rules for moved content
    const redirectRules: Record<string, string> = {
      // Natural healing restructure
      '/herbology': '/natural-healing/herbology',
      '/homeopathic-healing': '/natural-healing/homeopathy',
      
      // Potential legacy blog URLs that might exist in external links
      '/blog/mindful-breathing': '/blog/the-art-of-mindful-breathing-your-gateway-to-inner-peace',
      '/blog/sacred-space': '/blog/creating-sacred-space-designing-your-personal-meditation-corner',
      '/blog/dream-states': '/blog/understanding-dream-states-and-sleep-cycles',
      '/blog/sound-baths': '/blog/exploring-the-healing-power-of-sound-baths',
      '/blog/dream-interpretation': '/blog/working-with-your-dreams-a-beginners-guide-to-dream-interpretation',
      
      // Potential old page names that might be linked externally
      '/meditations': '/meditation',
      '/practices': '/meditation',
      '/tools': '/weekly-stillness',
      '/journal': '/dream-journal',
      
      // Dashboard variations
      '/dashboard': '/phase4-dashboard',
      '/analytics': '/phase4-dashboard'
    };

    if (redirectRules[currentPath]) {
      // Perform 301 redirect equivalent (replace in history)
      navigate(redirectRules[currentPath], { replace: true });
    }
  }, [location.pathname, navigate]);

  return null; // This component doesn't render anything
};