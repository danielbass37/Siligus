import React, { useState, useEffect } from 'react';
import HOMM3CVDesktopView from './HOMM3CVDesktopView';
import HOMM3CVMobileView from './HOMM3CVMobileView';
import { initAudioSystem } from '../../utils/soundUtils';
import { preloadHOMM3CVImages } from '../../utils/imagePreloader';

const HOMM3CVWindow = ({ onClose }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    
    // Initialize audio system and preload images early
    initAudioSystem();
    preloadHOMM3CVImages().catch(console.warn);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Render either desktop or mobile view based on screen size
  return isMobile ? <HOMM3CVMobileView onClose={onClose} /> : <HOMM3CVDesktopView onClose={onClose} />;
};

export default HOMM3CVWindow; 