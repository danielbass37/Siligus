import React, { useState, useEffect } from 'react';
import { WindowHeader, WindowContent, Button } from 'react95';
import { Rnd } from 'react-rnd';
import { WindowWrapper } from '../styles/StyledComponents';
import AboutWindow from './AboutWindow';
import BlogWindow from './BlogWindow';
import VideoProjectsWindow from './VideoProjectsWindow';
import CVWindow from './CVWindow';
import HOMM3CVWindow from './HOMM3CV/HOMM3CVWindow';
import DeveloperMarketingWindow from './DeveloperMarketingWindow';
import useWindowSize from '../hooks/useWindowSize';

const WindowManager = ({ showWindow, selectedIcon, setShowWindow }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: 'auto',
    height: 'auto'
  });
  
  // Use our custom hook for window size
  const { width: screenWidth, height: screenHeight, isMobile } = useWindowSize();

  // Set initial position based on window size
  useEffect(() => {
    if (!selectedIcon) return;
    
    // Adjust position based on icon type and screen size
    let initialWidth;
    let initialHeight;
    
    switch(true) {
      case selectedIcon.id === 'videos':
        initialWidth = isMobile ? screenWidth * 0.95 : 800;
        initialHeight = 'auto';
        break;
      case selectedIcon.id === 'blogs':
        initialWidth = isMobile ? screenWidth * 0.95 : 700;
        initialHeight = isMobile ? 'auto' : 391;
        break;
      case selectedIcon.id === 'newsletter':
        initialWidth = isMobile ? screenWidth * 0.95 : 700;
        initialHeight = isMobile ? 'auto' : 400;
        break;
      case selectedIcon.id === 'about':
        initialWidth = isMobile ? screenWidth * 0.95 : 650;
        initialHeight = isMobile ? 'auto' : 320;
        break;
      case selectedIcon.id === 'cv':
        initialWidth = isMobile ? screenWidth * 0.95 : 850;
        initialHeight = isMobile ? 'auto' : 850;
        break;
      case selectedIcon.id === 'homm3cv':
        // Desktop only sizing for HOMM3CV (mobile is handled by MobileView.js)
        // Preserve the exact aspect ratio of 1100:973
        const homm3Ratio = 1100 / 973;
        
        // For desktop: scale down proportionally if screen is too small
        const maxWidth = Math.min(screenWidth * 0.9, 1100);
        const maxHeight = Math.min(screenHeight * 0.9, 973);
        
        // Determine which dimension is the limiting factor
        if (maxWidth / homm3Ratio <= maxHeight) {
          // Width is limiting
          initialWidth = maxWidth;
          initialHeight = maxWidth / homm3Ratio;
        } else {
          // Height is limiting
          initialHeight = maxHeight;
          initialWidth = maxHeight * homm3Ratio;
        }
        break;
      case selectedIcon.id === 'hottakes':
        initialWidth = isMobile ? screenWidth * 0.95 : 765;
        initialHeight = isMobile ? 'auto' : 470;
        break;
      default:
        initialWidth = isMobile ? screenWidth * 0.95 : 600;
        initialHeight = 'auto';
    }

    setWindowSize({
      width: initialWidth,
      height: initialHeight
    });

    // Position in the center of the screen
    if (isMobile) {
      setPosition({
        x: screenWidth * 0.025,
        y: screenHeight * 0.05
      });
    } else {
      setPosition({
        x: (screenWidth - initialWidth) / 2,
        y: (screenHeight - (typeof initialHeight === 'number' ? initialHeight : 400)) / 2
      });
    }
  }, [selectedIcon, screenWidth, screenHeight, isMobile]);
  
  // Additional effect to handle window resizing
  useEffect(() => {
    if (!selectedIcon) return;
    
    if (isMobile) {
      setWindowSize(prev => ({
        ...prev,
        width: screenWidth * 0.95,
        height: 'auto'
      }));
      setPosition(prev => ({
        ...prev,
        x: screenWidth * 0.025,
        y: screenHeight * 0.05
      }));
    }
  }, [screenWidth, screenHeight, isMobile, selectedIcon]);

  if (!showWindow) return null;

  const renderWindowContent = (icon) => {
    switch (icon.id) {
      case 'about':
        return <AboutWindow />;
      case 'blogs':
        return <BlogWindow type="blogs" />;
      case 'newsletter':
        return <BlogWindow type="newsletter" />;
      case 'videos':
        return <VideoProjectsWindow />;
      case 'cv':
        return <CVWindow />;
      case 'homm3cv':
        return <HOMM3CVWindow />;
      case 'hottakes':
        return <DeveloperMarketingWindow />;
      default:
        return (
          <>
            <h2>{icon?.title}</h2>
            <p style={{ marginBottom: '1.5rem' }}>
              {icon?.content}
            </p>
          </>
        );
    }
  };

  return (
    <Rnd
      position={position}
      size={windowSize}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      enableResizing={false}
      dragHandleClassName="window-header"
      bounds="parent"
      style={{ zIndex: 10 }}
    >
      <WindowWrapper 
        isVideo={selectedIcon?.id === 'videos'}
        isBlogs={selectedIcon?.id === 'blogs'}
        isNewsletter={selectedIcon?.id === 'newsletter'}
        isAbout={selectedIcon?.id === 'about'}
        isCv={selectedIcon?.id === 'cv'}
        isHomm3Cv={selectedIcon?.id === 'homm3cv'}
        isDmk={selectedIcon?.id === 'hottakes'}
        style={{ 
          position: 'static', 
          transform: 'none',
          width: '100%',
          height: '100%',
          maxWidth: 'none',
          maxHeight: windowSize.height === 'auto' ? '80vh' : 'none',
          padding: selectedIcon?.id === 'homm3cv' ? '0' : undefined,
          margin: selectedIcon?.id === 'homm3cv' ? '0' : undefined
        }}
      >
        <WindowHeader 
          className="window-header"
          style={{ 
            position: 'sticky', 
            top: 0, 
            zIndex: 10,
            width: '100%',
            boxSizing: 'border-box',
            paddingTop: '3px',
            height: '33px',
            cursor: 'move' // Indicate it's draggable
          }}
        >
          <span style={{ position: 'relative', top: '-4px' }}>
            {selectedIcon?.id === 'about' 
              ? 'Daniel Bass - Product Marketing Manager'
              : selectedIcon?.label}
          </span>
          <Button 
            style={{ 
              position: 'absolute', 
              right: '5px', 
              top: '3px',
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 999,
              cursor: 'pointer',
              padding: '0',
              minWidth: '0'
            }}
            size="sm"
            square
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              setShowWindow(false);
            }}
            onTouchStart={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              setShowWindow(false);
            }}
          >
            <span style={{ 
              fontWeight: 'bold',
              fontSize: '20px',
              lineHeight: 1,
              display: 'block',
              transform: 'translateY(-1px)'
            }}>
              ×
            </span>
          </Button>
        </WindowHeader>
        <WindowContent style={{ 
          padding: selectedIcon?.id === 'videos' || selectedIcon?.id === 'homm3cv' ? '0' : undefined,
          overflow: selectedIcon?.id === 'videos' || selectedIcon?.id === 'homm3cv' ? 'visible' : 'auto',
          maxHeight: selectedIcon?.id === 'homm3cv' ? 'none' : 'calc(80vh - 33px)',
          overflowY: selectedIcon?.id === 'homm3cv' ? 'hidden' : 'auto'
        }}
        onClick={(e) => {
          // Stop propagation to prevent interference with other click handlers
          e.stopPropagation();
        }}
        >
          {renderWindowContent(selectedIcon)}
        </WindowContent>
      </WindowWrapper>
    </Rnd>
  );
};

export default WindowManager; 