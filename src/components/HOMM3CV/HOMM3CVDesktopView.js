import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import homm3cvImage from '../../assets/HOMM3CV/HOMM3CV.png';
import HOMM3CVClickableOverlay from './HOMM3CVClickableOverlay';
import MessageWindow from './MessageWindow';
import areaConfig from './HOMM3CVConfig';
import { playSound, initAudioSystem, startBackgroundMusic, stopBackgroundMusic } from '../../utils/soundUtils';

// Styled components for HOMM3 desktop view
const HOMM3Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background: transparent;
`;

const HOMM3Background = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  margin: 0;
`;

const HOMM3Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
`;

const DebugPanel = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 14px;
  z-index: 1000;
`;

const HOMM3CVDesktopView = ({ onClose }) => {
  const [lastClickedArea, setLastClickedArea] = useState(null);
  const [showDebugPanel, setShowDebugPanel] = useState(true);
  const [messageWindow, setMessageWindow] = useState(null);
  const [debugMessage, setDebugMessage] = useState("");
  // Keep track of whether we're holding down on a tiny area
  const tinyMouseDownRef = useRef(false);
  const clickedAreaRef = useRef(null);
  
  // Initialize audio system and start background music
  useEffect(() => {
    // Initialize audio system first
    const init = async () => {
      await initAudioSystem();
      
      // Start background music with a slight delay to ensure audio context is ready
      setTimeout(() => {
        startBackgroundMusic();
      }, 300);
    };
    
    init();
    
    // Clean up - stop background music when component unmounts
    return () => {
      stopBackgroundMusic();
    };
  }, []);
  
  // Set up global mouseup handler
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      // If we're in hold mode for a tiny area, close the window
      if (tinyMouseDownRef.current && messageWindow === 'tiny') {
        setDebugMessage("Global mouse up detected, closing tiny window");
        tinyMouseDownRef.current = false;
        setMessageWindow(null);
      }
    };
    
    // Add document level handlers
    document.addEventListener('mouseup', handleGlobalMouseUp);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [messageWindow]);

  // Handle all area clicks in one place with proper handling for tiny areas
  const handleAreaClick = (areaId) => {
    setDebugMessage(`Area ${areaId} clicked`);
    
    // Record click
    setLastClickedArea(areaId);
    clickedAreaRef.current = areaId;
    
    // Check if this area has a configuration
    if (areaConfig[areaId]) {
      const config = areaConfig[areaId];
      
      // Play sound FIRST (immediately)
      if (config.sound) {
        playSound(config.sound);
      }
      
      // Special handling for tiny windows - mousedown only
      if (config.messageSize === 'tiny') {
        setDebugMessage(`Tiny area ${areaId} clicked, entering hold mode`);
        // Enter hold mode
        tinyMouseDownRef.current = true;
        setMessageWindow('tiny');
        
        // Prevent default behaviors that might interfere
        return false;
      }
      
      // Regular window handling for non-tiny
      if (config.messageSize) {
        setMessageWindow(config.messageSize);
        return true;
      }
      
      // Then perform action if applicable
      if (config.action) {
        config.action({ onClose });
      }
    }
    
    return true;
  };

  // Handle closing non-tiny message windows
  const handleCloseMessage = () => {
    // Don't close tiny windows this way - they close on mouseup
    if (messageWindow !== 'tiny') {
      setMessageWindow(null);
    }
  };
  
  return (
    <HOMM3Container>
      <HOMM3Background>
        <HOMM3Image src={homm3cvImage} alt="Heroes of Might and Magic 3 style CV" />
        <HOMM3CVClickableOverlay 
          onAreaClick={handleAreaClick}
        />
        
        {showDebugPanel && (
          <DebugPanel>
            {lastClickedArea 
              ? `Last clicked area: ${lastClickedArea}${areaConfig[lastClickedArea] ? ` (${areaConfig[lastClickedArea].name})` : ''}` 
              : 'Click on a numbered area'}
            <div>
              <button onClick={() => setShowDebugPanel(false)}>
                Hide Debug Panel
              </button>
            </div>
            {debugMessage && <div style={{color: 'yellow'}}>{debugMessage}</div>}
          </DebugPanel>
        )}
        
        {/* Render message window if needed */}
        {messageWindow && (
          <MessageWindow 
            size={messageWindow} 
            onClose={handleCloseMessage} 
            areaId={clickedAreaRef.current}
          />
        )}
      </HOMM3Background>
    </HOMM3Container>
  );
};

export default HOMM3CVDesktopView;
