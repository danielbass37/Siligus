import { useEffect, useCallback } from 'react';
import { GA_TRACKING_ID, pageview } from '../utils/analytics';

// Define gtag function at the top level
function gtag() {
  window.dataLayer.push(arguments);
}

/**
 * Custom hook to initialize and manage Google Analytics
 */
const useGoogleAnalytics = () => {
  /**
   * Initializes Google Analytics script and configuration
   */
  const initialize = useCallback(async () => {
    try {
      if (!GA_TRACKING_ID) {
        console.warn('Google Analytics tracking ID not found');
        return;
      }
      
      // Create a promise to handle script loading
      const loadScript = () => {
        return new Promise((resolve, reject) => {
          // Check if script already exists
          if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
            resolve();
            return;
          }
          
          // Load the GA script
          const script = document.createElement('script');
          script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
          script.async = true;
          
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to load Google Analytics script'));
          
          document.head.appendChild(script);
        });
      };
      
      // Wait for script to load
      await loadScript();
      
      // Initialize GA
      window.dataLayer = window.dataLayer || [];
      gtag('js', new Date());
      gtag('config', GA_TRACKING_ID);
      
      // Track initial page view
      pageview(window.location.pathname);
      
      console.log('Google Analytics initialized with tracking ID:', GA_TRACKING_ID);
    } catch (error) {
      console.error('Error loading Google Analytics:', error);
    }
  }, []);
  
  /**
   * Track navigation changes
   */
  const setupNavigationTracking = useCallback(() => {
    // Function to handle route changes
    const handleRouteChange = () => {
      pageview(window.location.pathname);
    };
    
    // Function to handle window changes (for custom navigation)
    const trackWindowChange = (icon) => {
      if (icon) {
        pageview(`/${icon.id}`);
      }
    };
    
    // Track initial page view
    pageview(window.location.pathname);
    
    // Listen for browser history changes (back/forward buttons)
    window.addEventListener('popstate', handleRouteChange);
    
    // Listen for custom window change events
    const handleWindowChange = (e) => trackWindowChange(e.detail);
    window.addEventListener('windowChange', handleWindowChange);
    
    // Create a MutationObserver to detect URL changes without page reloads
    const observer = new MutationObserver(() => {
      if (window.location.pathname !== window.lastTrackedPath) {
        window.lastTrackedPath = window.location.pathname;
        pageview(window.location.pathname);
      }
    });
    
    // Start observing the document body for changes
    observer.observe(document.body, { 
      subtree: true, 
      childList: true 
    });
    
    // Store the initial path to avoid duplicate tracking
    window.lastTrackedPath = window.location.pathname;
    
    // Return cleanup function
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      window.removeEventListener('windowChange', handleWindowChange);
      observer.disconnect();
    };
  }, []);
  
  // Initialize Google Analytics when the component mounts
  useEffect(() => {
    initialize();
  }, [initialize]);
  
  // Set up navigation tracking when the component mounts
  useEffect(() => {
    const cleanup = setupNavigationTracking();
    return cleanup;
  }, [setupNavigationTracking]);
  
  return {
    pageview
  };
};

export default useGoogleAnalytics; 