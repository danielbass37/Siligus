import { useState, useCallback } from 'react';
import useWindowSize from './useWindowSize';
import { pageview } from '../utils/analytics';

/**
 * Custom hook to manage window states
 * @returns {Object} - Window management methods and state
 */
const useWindowManager = () => {
  const [windows, setWindows] = useState({
    showWindow: false,
    selectedIcon: null,
    showSiligusWindow: false,
    showAboutWebsiteWindow: false,
    showGooseAmpWindow: false
  });
  
  const { width, height, isMobile } = useWindowSize();
  
  // Returns position and size for a window based on its type
  const getWindowPositionAndSize = useCallback((iconId) => {
    let initialWidth;
    let initialHeight;
    
    switch(true) {
      case iconId === 'videos':
        initialWidth = isMobile ? width * 0.95 : 800;
        initialHeight = 'auto';
        break;
      case iconId === 'blogs':
        initialWidth = isMobile ? width * 0.95 : 700;
        initialHeight = isMobile ? 'auto' : 391;
        break;
      case iconId === 'newsletter':
        initialWidth = isMobile ? width * 0.95 : 700;
        initialHeight = isMobile ? 'auto' : 400;
        break;
      case iconId === 'about':
        initialWidth = isMobile ? width * 0.95 : 650;
        initialHeight = isMobile ? 'auto' : 320;
        break;
      case iconId === 'cv':
        initialWidth = isMobile ? width * 0.95 : 850;
        initialHeight = isMobile ? 'auto' : 850;
        break;
      case iconId === 'hottakes':
        initialWidth = isMobile ? width * 0.95 : 765;
        initialHeight = isMobile ? 'auto' : 470;
        break;
      default:
        initialWidth = isMobile ? width * 0.95 : 600;
        initialHeight = 'auto';
    }
    
    // Calculate position
    let xPosition, yPosition;
    if (isMobile) {
      xPosition = width * 0.025;
      yPosition = height * 0.05;
    } else {
      xPosition = (width - initialWidth) / 2;
      yPosition = (height - (typeof initialHeight === 'number' ? initialHeight : 400)) / 2;
    }
    
    return {
      size: {
        width: initialWidth,
        height: initialHeight
      },
      position: {
        x: xPosition,
        y: yPosition
      }
    };
  }, [width, height, isMobile]);
  
  // Open a window
  const openWindow = useCallback((icon) => {
    setWindows(prev => {
      const newState = { ...prev };
      
      if (icon.id === 'gooseamp') {
        newState.showGooseAmpWindow = true;
      } else {
        newState.selectedIcon = icon;
        newState.showWindow = true;
      }
      
      // Track window open for analytics
      pageview(`/${icon.id}`);
      
      return newState;
    });
  }, []);
  
  // Close a window
  const closeWindow = useCallback((windowType) => {
    setWindows(prev => {
      const newState = { ...prev };
      
      switch(windowType) {
        case 'main':
          newState.showWindow = false;
          break;
        case 'siligus':
          newState.showSiligusWindow = false;
          break;
        case 'aboutWebsite':
          newState.showAboutWebsiteWindow = false;
          break;
        case 'gooseamp':
          newState.showGooseAmpWindow = false;
          break;
        default:
          // Close all windows
          newState.showWindow = false;
          newState.showSiligusWindow = false;
          newState.showAboutWebsiteWindow = false;
          newState.showGooseAmpWindow = false;
      }
      
      return newState;
    });
  }, []);
  
  // Special handlers for specific windows
  const openSiligusWindow = useCallback(() => {
    setWindows(prev => ({
      ...prev,
      showSiligusWindow: true
    }));
    pageview('/about-siligus');
  }, []);
  
  const openAboutWebsiteWindow = useCallback(() => {
    setWindows(prev => ({
      ...prev,
      showAboutWebsiteWindow: true
    }));
    pageview('/about-website');
  }, []);
  
  // Handle icon click based on mobile or desktop
  const handleIconClick = useCallback((icon) => {
    // Open window with a single click on both desktop and mobile
    openWindow(icon);
  }, [openWindow]);
  
  // Clear selected icon when clicking outside
  const handleOutsideClick = useCallback(() => {
    // No need to clear selected icon since we're not using it anymore
  }, []);
  
  return {
    ...windows,
    isMobile,
    openWindow,
    closeWindow,
    openSiligusWindow,
    openAboutWebsiteWindow,
    handleIconClick,
    handleOutsideClick,
    getWindowPositionAndSize
  };
};

export default useWindowManager; 