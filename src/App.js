import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

// Import styles
import {
  GlobalStyles,
  GlobalStylesWithNoScroll,
  Wrapper,
  DesktopLayout
} from './styles/StyledComponents';

// Import components
import WindowManager from './components/WindowManager';
import DesktopIcons from './components/DesktopIcons';
import Taskbar from './components/Taskbar';
import SiligusInfoWindow from './components/SiligusInfoWindow';
import AboutWebsiteWindow from './components/AboutWebsiteWindow';
import GooseAmpPlayer from './components/GooseAmpPlayer';

// Import constants
import { desktopIcons } from './utils/constants';

const App = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openStartMenu, setOpenStartMenu] = useState(false);
  const [showSiligusWindow, setShowSiligusWindow] = useState(false);
  const [showAboutWebsiteWindow, setShowAboutWebsiteWindow] = useState(false);
  const [showGooseAmpWindow, setShowGooseAmpWindow] = useState(false);
  const [colonVisible, setColonVisible] = useState(true);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [fadeIn, setFadeIn] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  // Handle window resize and update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Fade in the desktop after loading screen
  useEffect(() => {
    // First set the background color to black to match the loading screen
    // Wait a tiny bit then fade in the content
    setTimeout(() => {
      setFadeIn(true);
      // After content has faded in, then transition the background color
      setTimeout(() => {
        setShowBackground(true);
      }, 500); // Wait for the content fade-in transition to complete
    }, 50);
    
    return () => {};
  }, []);

  // Blinking animation for the clock in About Website window
  useEffect(() => {
    let interval;
    
    if (showAboutWebsiteWindow) {
      interval = setInterval(() => {
        setColonVisible(prev => !prev);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showAboutWebsiteWindow]);

  const handleIconClick = (icon) => {
    setSelectedDesktopIcon(icon.id);  // Set the selected icon on single click
    
    // On mobile devices, open windows with a single click
    if (window.innerWidth <= 768) {
      if (icon.id === 'gooseamp') {
        setShowGooseAmpWindow(true);
      } else {
        setSelectedIcon(icon);
        setShowWindow(true);
      }
    }
  };

  const handleIconDoubleClick = (icon) => {
    // This function will only be used on desktop now
    if (window.innerWidth > 768) {
      if (icon.id === 'gooseamp') {
        setShowGooseAmpWindow(true);
      } else {
        setSelectedIcon(icon);
        setShowWindow(true);
      }
    }
  };

  const toggleStartMenu = () => {
    setOpenStartMenu(!openStartMenu);
  };

  const handleOutsideClick = () => {
    if (openStartMenu) {
      setOpenStartMenu(false);
    }
    // Clear selected icon when clicking outside
    setSelectedDesktopIcon(null);
  };

  const handleAboutSiligusClick = () => {
    setShowSiligusWindow(true);
    setOpenStartMenu(false);
  };

  const handleAboutWebsiteClick = () => {
    setShowAboutWebsiteWindow(true);
    setOpenStartMenu(false);
  };

  return (
    <div 
      style={{ 
        position: 'relative', 
        height: '100vh', 
        overflow: 'hidden',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 0.5s ease-in, background-color 0.8s ease-in',
        backgroundColor: showBackground ? '#008080' : '#000000' // Start with black background to match loading screen
      }}
      onClick={handleOutsideClick}
    >
      <GlobalStylesWithNoScroll />
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Wrapper>
          <DesktopLayout>
            <DesktopIcons 
              icons={desktopIcons}
              selectedDesktopIcon={selectedDesktopIcon}
              handleIconClick={handleIconClick}
              handleIconDoubleClick={handleIconDoubleClick}
            />
          </DesktopLayout>

          <WindowManager 
            showWindow={showWindow}
            selectedIcon={selectedIcon}
            setShowWindow={setShowWindow}
          />

          <Taskbar 
            openStartMenu={openStartMenu}
            toggleStartMenu={toggleStartMenu}
            handleAboutSiligusClick={handleAboutSiligusClick}
            handleAboutWebsiteClick={handleAboutWebsiteClick}
          />

          {showSiligusWindow && (
            <SiligusInfoWindow 
              onClose={() => setShowSiligusWindow(false)}
              isMobile={isMobile}
            />
          )}

          {showAboutWebsiteWindow && (
            <AboutWebsiteWindow 
              onClose={() => setShowAboutWebsiteWindow(false)}
              colonVisible={colonVisible}
            />
          )}

          {showGooseAmpWindow && (
            <GooseAmpPlayer 
              onClose={() => setShowGooseAmpWindow(false)}
            />
          )}
        </Wrapper>
      </ThemeProvider>
    </div>
  );
};

export default App;