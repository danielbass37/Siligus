import React from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import webIcon from '../assets/web.png';

const AboutWebsiteWindow = ({ onClose, colonVisible }) => {
  return (
    <Window
      className="window"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '225px',
        maxWidth: '95vw',
        maxHeight: '80vh',
        zIndex: 100
      }}
    >
      <WindowHeader
        className="window-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
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
          onClick={onClose}
          style={{
            marginRight: '1px',
            marginTop: '1px',
            zIndex: 20
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
              09H{colonVisible ? ':' : ' '}37M{colonVisible ? ':' : ' '}26S
            </span>
          </p>
        </div>
      </WindowContent>
    </Window>
  );
};

export default AboutWebsiteWindow; 