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
import WinampPlayer from './components/WinampPlayer';

// Import constants
import { desktopIcons } from './utils/constants';

const App = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openStartMenu, setOpenStartMenu] = useState(false);
  const [showSiligusWindow, setShowSiligusWindow] = useState(false);
  const [showAboutWebsiteWindow, setShowAboutWebsiteWindow] = useState(false);
  const [showWinampWindow, setShowWinampWindow] = useState(false);
  const [colonVisible, setColonVisible] = useState(true);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
  };

  const handleIconDoubleClick = (icon) => {
    if (icon.id === 'winamp') {
      setShowWinampWindow(true);
    } else {
      setSelectedIcon(icon);
      setShowWindow(true);
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
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
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

          {showWinampWindow && (
            <WinampPlayer 
              onClose={() => setShowWinampWindow(false)}
            />
          )}
        </Wrapper>
      </ThemeProvider>
    </div>
  );
};

export default App;