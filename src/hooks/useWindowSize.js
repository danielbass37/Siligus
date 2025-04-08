import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to handle window resizing
 * @param {number} mobileBreakpoint - Width in pixels below which is considered mobile
 * @returns {Object} - Object containing window width, height, and isMobile flag
 */
const useWindowSize = (mobileBreakpoint = 768) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: window.innerWidth <= mobileBreakpoint
  });

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setWindowSize({
      width,
      height,
      isMobile: width <= mobileBreakpoint
    });
  }, [mobileBreakpoint]);

  useEffect(() => {
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away to initialize state with current window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return windowSize;
};

export default useWindowSize; 