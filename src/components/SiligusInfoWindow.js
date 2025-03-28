import React, { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { Rnd } from 'react-rnd';
import { QuoteContainer } from '../styles/StyledComponents';
import siligusIcon from '../assets/siligus.png';
import bigSiligusImage from '../assets/bignsili.png';

const SiligusInfoWindow = ({ onClose, isMobile }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 'auto'
  });

  // Set initial position
  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const width = isMobile ? screenWidth * 0.95 : 500;
    
    setWindowSize({
      width: isMobile ? screenWidth * 0.95 : 500,
      height: 'auto'
    });
    
    // Center the window on the screen
    setPosition({
      x: (screenWidth - width) / 2,
      y: screenHeight / 2 - 200
    });
    
    // Adjust on window resize
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      if (mobile) {
        const newWidth = window.innerWidth * 0.95;
        setWindowSize({
          width: newWidth,
          height: 'auto'
        });
        setPosition(prev => ({
          x: window.innerWidth * 0.025,
          y: prev.y
        }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

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
      style={{ zIndex: 100 }}
    >
      <Window
        className="window"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <WindowHeader
          className="window-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'move'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={siligusIcon} 
              alt="Siligus" 
              style={{ width: '20px', height: '20px', marginRight: '4px', marginBottom: '4px' }} 
            />
            About Siligus
          </span>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onClose();
            }}
            onTouchStart={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onClose();
            }}
            style={{
              marginRight: '1px',
              marginTop: '1px',
              zIndex: 999,
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0',
              minWidth: '0'
            }}
          >
            <span style={{ 
              fontWeight: 'bold', 
              transform: 'translateY(-1px)',
              display: 'block',
              height: '24px',
              fontSize: '20px'
            }}>×</span>
          </Button>
        </WindowHeader>
        <WindowContent 
          style={{ 
            padding: '16px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '16px',
              padding: '10px'
            }}>
              <img 
                src={bigSiligusImage} 
                alt="Siligus" 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  maxHeight: '120px',
                  objectFit: 'contain'
                }} 
              />
            </div>
            
            <QuoteContainer style={{ 
              overflow: 'visible',
              fontSize: isMobile ? '14px' : '16px',
              marginBottom: '16px'
            }}>
              <p style={{ marginBottom: '8px' }}>
                <span style={{ fontWeight: 'bold' }}>Goose, noun, plural geese.</span>
                <span style={{ fontStyle: 'italic' }}> "A large waterfowl proverbially noted, I know not why, for foolishness."</span>
              </p>
              <p style={{ 
                fontSize: isMobile ? '12px' : '14px',
                textAlign: 'right' 
              }}>
                - Samuel Johnson, <a 
                  href="https://johnsonsdictionaryonline.com/views/search.php?term=goose"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0000EE', textDecoration: 'underline' }}
                >
                  A Dictionary of the English Language, 1755
                </a>
              </p>
            </QuoteContainer>
            
            <div style={{ 
              padding: '8px', 
              fontSize: isMobile ? '11px' : '12px',
              textAlign: 'center',
              color: '#444'
            }}>
              Honestly, I have no idea. I just made this up. It's my &nbsp;<span style={{ fontStyle: 'italic' }}>Brand</span>&nbsp; now.
            </div>
          </div>
        </WindowContent>
      </Window>
    </Rnd>
  );
};

export default SiligusInfoWindow; 