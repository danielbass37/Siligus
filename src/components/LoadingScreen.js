import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { 
  pentiumLogo, 
  bootMessages, 
  memoryCheckSpeed,
  asciiGusImage
} from '../assets/boot-assets';
// Import Win95 startup sound
import win95StartupSound from '../assets/win95.mp3';

// Add MS Sans Serif font styles specific to this component
const MsSansSerifFont = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
`;

// Styled components for the loading screen
const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #aaa;
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  box-sizing: border-box;
  z-index: 9999;
  overflow: hidden;
  letter-spacing: 0;
  transition: none;
  opacity: ${props => (props.visible ? 1 : 0)};
`;

const ConsoleText = styled.div`
  white-space: pre-wrap;
  line-height: 1.3;
  font-size: 1.1rem;
  font-family: 'IBM Plex Mono', 'Courier New', monospace;
  width: 100%;
  font-weight: 400;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const BlinkingCursor = styled.span`
  display: inline-block;
  width: 0.6em;
  height: 1em;
  background-color: ${props => (props.visible ? '#aaa' : 'transparent')};
  margin-left: 2px;
  vertical-align: middle;
`;

const PentiumScreen = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'ms_sans_serif', 'Pixelated MS Sans Serif', Arial;
  transition: none;
  opacity: ${props => (props.visible ? 1 : 0)};
  z-index: ${props => (props.visible ? 1000 : -1)};
  cursor: ${props => (props.showStartPrompt ? 'pointer' : 'default')};
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-bottom: 60px; /* Space for the start prompt */
`;

const PentiumLogo = styled.pre`
  font-family: monospace;
  font-size: 0.8rem;
  color: white;
  text-align: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    font-size: 0.5rem;
  }
`;

const AsciiGusImg = styled.img`
  max-width: 300px;
  margin-bottom: 10px;
  image-rendering: pixelated;
  filter: invert(100%);
  
  @media (max-width: 768px) {
    max-width: 200px;
  }
`;

const BrandText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: 'ms_sans_serif', 'Pixelated MS Sans Serif', Arial;
  letter-spacing: 1px;
  color: #FF7F00;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const StartPrompt = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 1rem;
  font-family: 'ms_sans_serif', 'Pixelated MS Sans Serif', Arial;
  color: white;
  animation: blink 1s infinite;
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ClickableOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: ${props => (props.visible ? 'block' : 'none')};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.03);
  }
`;

// Main LoadingScreen component
const LoadingScreen = ({ onLoadingComplete }) => {
  const [consoleOutput, setConsoleOutput] = useState('');
  const [showBiosBoot, setShowBiosBoot] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [memoryCheck, setMemoryCheck] = useState(0);
  const [showPentiumScreen, setShowPentiumScreen] = useState(false);
  const [showStartPrompt, setShowStartPrompt] = useState(false);
  const [currentBootMessage, setCurrentBootMessage] = useState(0);
  const bootSequenceComplete = useRef(false);
  const [soundPlayed, setSoundPlayed] = useState(false);
  
  // Speed factor for the BIOS boot sequence (higher = faster)
  const speedFactor = 15;
  
  // Simulates typing text in console
  const typeText = useCallback((text, delay = 10) => {
    return new Promise(resolve => {
      // Ensure the text is not empty
      if (!text || text.length === 0) {
        resolve();
        return;
      }
      
      // Create an array of progressively longer substrings
      const textChunks = [];
      for (let i = 1; i <= text.length; i++) {
        textChunks.push(text.substring(0, i));
      }
      
      // Start with the first character immediately
      setConsoleOutput(prev => prev + textChunks[0]);
      
      if (text.length === 1) {
        resolve();
        return;
      }
      
      // Initialize index for the remaining characters
      let i = 1;
      
      // Add the remaining characters with delay
      const intervalId = setInterval(() => {
        // Get the entire typed message up to this point
        const nextChunk = textChunks[i];
        
        // Replace the previous output plus the new character to ensure all letters are shown
        setConsoleOutput(prev => {
          // Find the last line (the one we're currently typing)
          const lines = prev.split('\n');
          
          // Remove the last line and add the new, more complete chunk
          lines.pop();
          lines.push(nextChunk);
          
          return lines.join('\n');
        });
        
        i++;
        if (i >= textChunks.length) {
          clearInterval(intervalId);
          resolve();
        }
      }, delay);
    });
  }, []);

  // Adds a new line to console output
  const newLine = useCallback((count = 1) => {
    setConsoleOutput(prev => prev + '\n'.repeat(count));
  }, []);

  // Simple handler for key presses
  const handleKeyPress = useCallback(() => {
    if (showStartPrompt && !bootSequenceComplete.current && !soundPlayed) {
      // Mark as complete and continue regardless of sound
      setSoundPlayed(true);
      bootSequenceComplete.current = true;
      setShowPentiumScreen(false);
      
      // Attempt to play sound but don't block progress
      try {
        const audio = new Audio(win95StartupSound);
        audio.play().catch(() => {});
      } catch (err) {
        console.log('Audio error:', err);
      }
    }
  }, [showStartPrompt, soundPlayed]);

  // Set up key press event listener - keeping it simple
  useEffect(() => {
    if (showStartPrompt) {
      window.addEventListener('keydown', handleKeyPress);
      window.addEventListener('click', handleKeyPress);
      
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
        window.removeEventListener('click', handleKeyPress);
      };
    }
    
    return () => {};
  }, [showStartPrompt, handleKeyPress]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);

  // Memory check animation
  useEffect(() => {
    if (memoryCheck < 64 && showBiosBoot && bootMessages[currentBootMessage]?.memCheck) {
      const timer = setTimeout(() => {
        // Jump by larger increments for faster memory check
        setMemoryCheck(prev => Math.min(prev + (speedFactor * 1.5), 64));
      }, memoryCheckSpeed / speedFactor);
      
      return () => clearTimeout(timer);
    }
  }, [memoryCheck, showBiosBoot, currentBootMessage, speedFactor]);

  // Handle BIOS boot message sequence
  useEffect(() => {
    if (!showBiosBoot || bootSequenceComplete.current) return;
    
    const processBootMessage = async () => {
      if (currentBootMessage >= bootMessages.length) {
        // BIOS boot sequence complete - directly switch to Pentium screen without any fade
        setShowBiosBoot(false);
        setShowPentiumScreen(true);
        return;
      }
      
      const message = bootMessages[currentBootMessage];
      
      // Make sure we're starting on a clean line if needed
      if (currentBootMessage > 0) {
        newLine();
      }
      
      if (message.text) {
        // Small delay for stability
        await new Promise(resolve => setTimeout(resolve, 20));
        await typeText(message.text, 1);
      }
      
      if (message.memCheck) {
        // Wait for memory check to complete
        await new Promise(resolve => {
          const interval = setInterval(() => {
            if (memoryCheck >= 64) {
              clearInterval(interval);
              resolve();
            }
          }, 50);
        });
        
        await typeText(' 64MB OK');
      }
      
      if (message.appendOK) {
        await new Promise(resolve => setTimeout(resolve, message.delay / speedFactor));
        await typeText(' OK');
      }
      
      setCurrentBootMessage(prev => prev + 1);
    };
    
    const timer = setTimeout(() => {
      processBootMessage();
    }, (bootMessages[currentBootMessage]?.delay || 100) / speedFactor);
    
    return () => clearTimeout(timer);
  }, [currentBootMessage, showBiosBoot, typeText, newLine, memoryCheck, speedFactor]);

  // Handle Pentium logo screen
  useEffect(() => {
    if (showPentiumScreen && !bootSequenceComplete.current) {
      // Show "Press any key to start" after a short delay
      const timer = setTimeout(() => {
        setShowStartPrompt(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showPentiumScreen]);
  
  // Handle final transition to the desktop
  useEffect(() => {
    if (bootSequenceComplete.current && !showPentiumScreen && soundPlayed) {
      // Transition immediately without waiting for the sound
      // The sound will continue playing in the background
      onLoadingComplete();
    }
  }, [showPentiumScreen, onLoadingComplete, soundPlayed]);
  
  return (
    <>
      <MsSansSerifFont />
      {/* BIOS boot screen */}
      {showBiosBoot && (
        <LoadingContainer visible={true}>
          <ConsoleText>
            {consoleOutput}
            {bootMessages[currentBootMessage]?.memCheck && 
              memoryCheck > 0 && 
              memoryCheck < 64 && 
              !consoleOutput.includes('64MB OK') && (
                <>
                  {memoryCheck} MB
                  <BlinkingCursor visible={cursorVisible} />
                </>
              )
            }
          </ConsoleText>
          {!consoleOutput.includes('64MB OK') && bootMessages[currentBootMessage]?.memCheck ? null : (
            <BlinkingCursor visible={cursorVisible} />
          )}
        </LoadingContainer>
      )}
      
      {/* Pentium logo screen with start prompt */}
      <PentiumScreen 
        visible={showPentiumScreen}
        showStartPrompt={showStartPrompt}
      >
        <LogoContainer>
          <AsciiGusImg src={asciiGusImage} alt="ASCII Gus" />
          <PentiumLogo>{pentiumLogo}</PentiumLogo>
          <BrandText>HONK Inside®</BrandText>
          {showStartPrompt && (
            <StartPrompt>Press Any Key to Start</StartPrompt>
          )}
        </LogoContainer>
        
        {showStartPrompt && (
          <ClickableOverlay 
            visible={showStartPrompt} 
            onClick={handleKeyPress}
          />
        )}
      </PentiumScreen>
    </>
  );
};

export default LoadingScreen; 