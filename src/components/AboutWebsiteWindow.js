import React, { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { Rnd } from 'react-rnd';
import webIcon from '../assets/web.png';

const AboutWebsiteWindow = ({ onClose, colonVisible }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: 500,
    height: 260
  });

  // Set initial position
  useEffect(() => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const isMobile = window.innerWidth <= 768;
    const width = isMobile ? screenWidth * 0.95 : 500;
    const height = 260;
    
    setWindowSize({
      width: isMobile ? screenWidth * 0.95 : 500,
      height: height
    });
    
    // Center the window on the screen
    setPosition({
      x: (screenWidth - width) / 2,
      y: (screenHeight - height) / 2
    });
    
    // Adjust on window resize
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      if (mobile) {
        const newWidth = window.innerWidth * 0.95;
        setWindowSize({
          width: newWidth,
          height: 260
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
  }, []);

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
              src={webIcon} 
              alt="About Website" 
              style={{ width: '20px', height: '20px', marginRight: '4px', marginBottom: '4px' }} 
            />
            About This Website
          </span>
          <Button
            onClick={(e) => {
              e.stopPropagation(); // Prevent event bubbling
              onClose();
            }}
            style={{
              marginRight: '1px',
              marginTop: '1px',
              zIndex: 999,
              width: '32px',
              height: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <span style={{ 
              fontWeight: 'bold', 
              transform: 'translateY(-1px)',
              display: 'block',
              height: '30px',
              fontSize: '25px'
            }}>×</span>
          </Button>
        </WindowHeader>
        <WindowContent 
          style={{ 
            height: 'calc(100% - 33px)', 
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto'
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <p>
              This website was built by me using <a href="https://react.dev/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#0000EE', textDecoration: 'underline' }}>React</a>, the <a href="https://github.com/arturbien/React95" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#0000EE', textDecoration: 'underline' }}>React95</a> component library, and <a href="https://cursor.sh/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#0000EE', textDecoration: 'underline' }}>Cursor</a>.
            </p>
          </div>
          
          <div>
            <p>
              Time I've spent on building this thing so far:
            </p>
            <p style={{ textAlign: 'center', margin: '15px 0' }}>
              <span style={{ 
                fontFamily: 'monospace', 
                backgroundColor: '#000', 
                color: '#0f0',
                padding: '2px 6px', 
                borderRadius: '3px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                fontSize: '20px'
              }}>
                12H{colonVisible ? ':' : ' '}22M{colonVisible ? ':' : ' '}34S
              </span>
            </p>
            
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
              The GitHub Repo for it is available <a href="https://github.com/danielbass37/Siligus" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#0000EE', textDecoration: 'underline' }}>here</a>.
            </p>
          </div>
        </WindowContent>
      </Window>
    </Rnd>
  );
};

export default AboutWebsiteWindow; 