import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import mobileGif from '../../assets/HOMM3CV/mobile.gif';
// Import the MP3 sound files instead of WAV
import systemSoundFile from '../../assets/HOMM3CV/SYSMSG.mp3';
import buttonSoundFile from '../../assets/HOMM3CV/BUTTON.mp3';

// Create actual audio elements to be reused
let systemSound, buttonSound;

// Initialize sounds on load
try {
  systemSound = new Audio(systemSoundFile);
  buttonSound = new Audio(buttonSoundFile);
  
  // Configure sounds
  systemSound.volume = 1.0;
  buttonSound.volume = 1.0;
  
  // Preload sounds
  systemSound.preload = 'auto';
  buttonSound.preload = 'auto';
} catch (error) {
  console.error("Error initializing sounds:", error);
}

const MobileGifContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% + 32px);
  width: calc(100% + 32px);
  background-color: #000;
  overflow: hidden;
  margin: -16px;
  box-sizing: border-box;
  position: relative;
`;

const StyledGif = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: fill;
  pointer-events: none; /* Prevent the GIF from receiving pointer events */
`;

const CheckmarkButton = styled.div`
  position: absolute;
  bottom: 14%;
  left: 50%;
  transform: translateX(-50%);
  width: calc(18vw + 10px); /* Responsive width based on viewport width */
  height: calc(4vh + 15px); /* Responsive height based on viewport height */
  min-width: 65px; /* Ensure minimum clickable size */
  min-height: 35px; /* Ensure minimum clickable size */
  max-width: 125px; /* Limit maximum size */
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

const HOMM3CVMobileView = () => {
  
  // Use a ref to track if the system sound has already played
  // Using a ref instead of state to avoid re-renders
  const systemSoundPlayed = useRef(false);
  
  // Simple function to play a sound
  const playSound = (sound, label, force = false) => {
    // For system sound, check if it's already been played unless forced
    if (label.includes("System") && systemSoundPlayed.current && !force) {
      return;
    }
    
    // Mark system sound as played
    if (label.includes("System") && !systemSoundPlayed.current) {
      systemSoundPlayed.current = true;
    }
    
    try {
      // Clone the audio to avoid overlap issues
      const soundToPlay = sound.cloneNode();
      soundToPlay.volume = 1.0;
      
      soundToPlay.play().catch(() => {
        // Silent failure - some browsers restrict autoplay
      });
    } catch (error) {
      // Silent failure
    }
  };
  
  // Try to play system sound when the component mounts (when window opens)
  useEffect(() => {
    // Only do this once on initial mount
    if (systemSoundPlayed.current) return;
    
    // Try to play system sound immediately with a very small delay
    setTimeout(() => {
      if (!systemSoundPlayed.current) {
        playSound(systemSound, "System sound (initial)");
      }
    }, 50);
    
    // Initialize sound system if needed
    const initAudio = () => {
      try {
        // Use a silent sound to initialize audio context
        const silentSound = new Audio("data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAABIgD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAQAAAAAAAAAAABQgJAUHQQAB4AAASCP/LWkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==");
        silentSound.volume = 0.001;
        silentSound.play().then(() => {
          
          // Try playing the system sound again if it hasn't played yet
          if (!systemSoundPlayed.current) {
            playSound(systemSound, "System sound (after init)");
          }
        }).catch(() => {
          // Silent failure
        });
      } catch (e) {
        // Silent failure
      }
    };
    
    // Initialize audio
    initAudio();
    
    // Add a one-time event listener for user interaction to initialize audio
    const handleUserInteraction = () => {
      initAudio();
      
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
    
    // Play button sound
    playSound(buttonSound, "Button sound");
    
    // Close window with a delay to allow sound to play
    setTimeout(closeWindow, 100);
  };
  
  // Function to close the window
  const closeWindow = () => {
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
      <BlockingOverlay 
        onClick={blockEvent} 
        onTouchStart={blockEvent} 
        onTouchEnd={blockEvent} 
      />
      <StyledGif src={mobileGif} alt="This section doesn't support mobile yet. Why would it? It's 2005." />
      <CheckmarkButton 
        onClick={handleDismiss} 
        onTouchStart={handleDismiss}
        onTouchMove={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        onTouchEnd={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }} 
        role="button" 
        aria-label="Dismiss window" 
      />
    </MobileGifContainer>
  );
};

export default HOMM3CVMobileView; 