import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import original from 'react95/dist/themes/original';

// Import custom hooks
import useWindowManager from './hooks/useWindowManager';
import useGoogleAnalytics from './hooks/useGoogleAnalytics';

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
import { desktopIcons } from './styles/IconStyles';

const App = () => {
  // Initialize Google Analytics
  useGoogleAnalytics();
  
  // Use our custom window manager hook
  const {
    showWindow,
    selectedIcon,
    showSiligusWindow,
    showAboutWebsiteWindow,
    showGooseAmpWindow,
    isMobile,
    handleIconClick,
    handleOutsideClick,
    openSiligusWindow,
    openAboutWebsiteWindow,
    closeWindow
  } = useWindowManager();
  
  // UI animation states
  const [colonVisible, setColonVisible] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [openStartMenu, setOpenStartMenu] = useState(false);

  // Toggle start menu
  const toggleStartMenu = () => {
    setOpenStartMenu(prev => !prev);
  };

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

  const handleTaskbarOutsideClick = () => {
    // This will clear selected icon when clicking outside
    handleOutsideClick();
    
    // Close the start menu when clicking outside
    if (openStartMenu) {
      setOpenStartMenu(false);
    }
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
      onClick={handleTaskbarOutsideClick}
    >
      <GlobalStylesWithNoScroll />
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Wrapper>
          <DesktopLayout>
            <DesktopIcons 
              icons={desktopIcons}
              handleIconClick={handleIconClick}
            />
          </DesktopLayout>

          <WindowManager 
            showWindow={showWindow}
            selectedIcon={selectedIcon}
            setShowWindow={() => closeWindow('main')}
          />

          <Taskbar 
            openStartMenu={openStartMenu}
            toggleStartMenu={toggleStartMenu}
            handleAboutSiligusClick={openSiligusWindow}
            handleAboutWebsiteClick={openAboutWebsiteWindow}
          />

          {showSiligusWindow && (
            <SiligusInfoWindow 
              onClose={() => closeWindow('siligus')}
              isMobile={isMobile}
            />
          )}

          {showAboutWebsiteWindow && (
            <AboutWebsiteWindow 
              onClose={() => closeWindow('aboutWebsite')}
              colonVisible={colonVisible}
            />
          )}

          {showGooseAmpWindow && (
            <GooseAmpPlayer 
              onClose={() => closeWindow('gooseamp')}
            />
          )}
        </Wrapper>
      </ThemeProvider>
    </div>
  );
};

export default App;