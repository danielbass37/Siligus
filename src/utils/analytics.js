// Google Analytics initialization and tracking utilities
export const GA_TRACKING_ID = process.env.REACT_APP_GA_TRACKING_ID;

// Initialize Google Analytics
export const initGA = () => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        send_page_view: false, // We'll handle page views manually
        page_location: window.location.href,
        page_path: window.location.pathname,
      });
    } else {
      console.warn('Google Analytics not available (gtag not found)');
    }
  } catch (error) {
    console.error('Error initializing Google Analytics:', error);
  }
};

// Track page views
export const pageview = (url) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
        page_location: window.location.origin + url,
      });
    }
  } catch (error) {
    console.error('Error tracking pageview:', error);
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      });
    }
  } catch (error) {
    console.error('Error tracking event:', error);
  }
}; 