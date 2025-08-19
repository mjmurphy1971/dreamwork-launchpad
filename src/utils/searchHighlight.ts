// Search highlighting utility
export const highlightSearchTerm = (searchTerm: string) => {
  if (!searchTerm) return;
  
  // Remove existing highlights
  const existingHighlights = document.querySelectorAll('.search-highlight');
  existingHighlights.forEach(el => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent || ''), el);
      parent.normalize();
    }
  });

  // Find and highlight new search term
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null
  );

  const textNodes: Text[] = [];
  let node;
  while (node = walker.nextNode()) {
    textNodes.push(node as Text);
  }

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  
  textNodes.forEach(textNode => {
    const text = textNode.textContent;
    if (text && regex.test(text)) {
      const highlightedHTML = text.replace(regex, '<span class="search-highlight bg-yellow-300 text-black px-1 rounded">$1</span>');
      
      const wrapper = document.createElement('div');
      wrapper.innerHTML = highlightedHTML;
      
      const parent = textNode.parentNode;
      if (parent) {
        while (wrapper.firstChild) {
          parent.insertBefore(wrapper.firstChild, textNode);
        }
        parent.removeChild(textNode);
      }
    }
  });

  // Scroll to first highlight
  const firstHighlight = document.querySelector('.search-highlight');
  if (firstHighlight) {
    firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

// Extract search term from URL parameters
export const getSearchTermFromURL = (): string | null => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('search');
};