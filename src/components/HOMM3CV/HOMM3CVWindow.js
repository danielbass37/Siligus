import React, { useState, useEffect } from 'react';
import HOMM3CVDesktopView from './HOMM3CVDesktopView';
import HOMM3CVMobileView from './HOMM3CVMobileView';

const HOMM3CVWindow = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render either desktop or mobile view based on screen size
  return isMobile ? <HOMM3CVMobileView /> : <HOMM3CVDesktopView />;
};

export default HOMM3CVWindow; 