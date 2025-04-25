import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import mobileGif from '../../assets/HOMM3CV/mobile.gif';
import { playSound, initAudioSystem, Sounds } from '../../utils/soundUtils';

const MobileGifContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: #000;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
`;

const StyledGif = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
  pointer-events: none; /* Prevent the GIF from receiving pointer events */
  margin: 0 auto;
`;

const CheckmarkButton = styled.div`
  position: absolute;
  bottom: 14%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(18vw + 10px); /* Responsive width based on viewport width */
  height: calc(4vh + 15px); /* Responsive height based on viewport height */
  min-width: 80px; /* Ensure minimum clickable size */
  min-height: 40px; /* Ensure minimum clickable size */
  max-width: 140px; /* Limit maximum size */
  background-color: transparent;
  z-index: 20;
  cursor: pointer;
  
  /* Add visual feedback for touch devices */
  &:active {
    opacity: 0.7;
  }
`;

// Create a transparent overlay to capture and block all clicks outside the checkmark
const BlockingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
`;

const HOMM3CVMobileView = ({ onClose }) => {
  // Use a ref to track if the system sound has already played
  const systemSoundPlayed = useRef(false);
  // Track if dismiss is in progress to prevent double sound
  const dismissInProgress = useRef(false);
  
  // Try to play system sound when the component mounts (when window opens)
  useEffect(() => {
    // Initialize the audio system
    initAudioSystem();
    
    // Only play system sound once
    if (systemSoundPlayed.current) return;
    
    // Try to play system sound with a small delay
    setTimeout(() => {
      if (!systemSoundPlayed.current) {
        playSound(Sounds.SYSTEM);
        systemSoundPlayed.current = true;
      }
    }, 50);
    
    // Add a one-time event listener for user interaction to initialize audio
    const handleUserInteraction = () => {
      initAudioSystem();
      
      // Try playing the system sound again if it hasn't played yet
      if (!systemSoundPlayed.current) {
        playSound(Sounds.SYSTEM);
        systemSoundPlayed.current = true;
      }
      
      // Remove event listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
    
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const handleDismiss = (e) => {
    // Stop event propagation to prevent it from bubbling up
    e.stopPropagation();
    e.preventDefault();
    
    // Prevent double sound by checking if dismiss is already in progress
    if (dismissInProgress.current) return;
    dismissInProgress.current = true;
    
    // Play button sound
    playSound(Sounds.BUTTON);
    
    // Close window with a delay to allow sound to play
    setTimeout(closeWindow, 100);
  };
  
  // Function to close the window
  const closeWindow = () => {
    if (onClose) {
      onClose();
      return;
    }
    
    try {
      // Try multiple selectors to find the close button
      const closeButton = 
        document.querySelector('.window-header button') || // Main close button
        document.querySelector('.window button') ||       // Generic window button
        Array.from(document.querySelectorAll('button')).find(btn => {
          // Find button with × character
          const text = btn.textContent || btn.innerText;
          return text.includes('×');
        });
        
      if (closeButton) {
        closeButton.click();
      }
    } catch (error) {
      console.error('Failed to close window:', error);
    }
  };

  const blockEvent = (e) => {
    // Block all events on the overlay
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <MobileGifContainer>
      {/* The mobile GIF */}
      <StyledGif src={mobileGif} alt="Heroes of Might and Magic 3 mobile CV" />
      
      {/* Blocking overlay to prevent interaction with background */}
      <BlockingOverlay onClick={blockEvent} onTouchStart={blockEvent} />
      
      {/* Checkmark button - use both click and touchstart to ensure it works on all devices */}
      <CheckmarkButton
        onClick={handleDismiss}
        onTouchStart={handleDismiss}
        aria-label="Close CV"
      />
    </MobileGifContainer>
  );
};

export default HOMM3CVMobileView; 