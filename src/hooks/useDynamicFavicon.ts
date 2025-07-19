import { useEffect } from 'react';

export const useDynamicFavicon = () => {
  useEffect(() => {
    const updateFavicon = () => {
      const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const newFaviconUrl = isDarkMode ? '/favicon-dark.svg' : '/favicon-light.svg';
      
      console.log('Dark mode detected:', isDarkMode);
      console.log('Setting favicon to:', newFaviconUrl);
      
      // Find existing favicon
      let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
      
      // If no favicon exists, create one
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        favicon.type = 'image/svg+xml';
        document.head.appendChild(favicon);
        console.log('Created new favicon element');
      }
      
      // Force update by adding timestamp to prevent caching
      const timestamp = new Date().getTime();
      favicon.href = `${newFaviconUrl}?v=${timestamp}`;
      
      console.log('Favicon href set to:', favicon.href);
      
      // Force browser to refresh favicon by removing and re-adding
      const clone = favicon.cloneNode(true) as HTMLLinkElement;
      favicon.remove();
      setTimeout(() => {
        document.head.appendChild(clone);
        console.log('Favicon refreshed');
      }, 100);
    };

    // Update favicon immediately with a small delay to ensure DOM is ready
    setTimeout(updateFavicon, 100);

    // Listen for changes in color scheme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      console.log('Color scheme changed to:', e.matches ? 'dark' : 'light');
      updateFavicon();
    };

    // Add event listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else if (mediaQuery.addListener) {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);
};
