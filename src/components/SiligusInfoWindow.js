import React from 'react';
import { Window, WindowHeader, WindowContent, Button } from 'react95';
import { QuoteContainer } from '../styles/StyledComponents';
import siligusIcon from '../assets/siligus.png';
import bigSiligusImage from '../assets/bignsili.png';

const SiligusInfoWindow = ({ onClose, isMobile }) => {
  return (
    <Window
      className="window"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: 'auto',
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
            src={siligusIcon} 
            alt="Siligus" 
            style={{ width: '20px', height: '20px', marginRight: '4px', marginBottom: '4px' }} 
          />
          About Siligus
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
  );
};

export default SiligusInfoWindow; 