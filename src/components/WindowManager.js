import React from 'react';
import { WindowHeader, WindowContent, Button } from 'react95';
import { WindowWrapper } from '../styles/StyledComponents';
import AboutWindow from './AboutWindow';
import BlogWindow from './BlogWindow';
import VideoProjectsWindow from './VideoProjectsWindow';
import CVWindow from './CVWindow';
import DeveloperMarketingWindow from './DeveloperMarketingWindow';

const WindowManager = ({ showWindow, selectedIcon, setShowWindow }) => {
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
    <WindowWrapper 
      isVideo={selectedIcon?.id === 'videos'}
      isBlogs={selectedIcon?.id === 'blogs'}
      isNewsletter={selectedIcon?.id === 'newsletter'}
      isAbout={selectedIcon?.id === 'about'}
      isCv={selectedIcon?.id === 'cv'}
      isDmk={selectedIcon?.id === 'hottakes'}
    >
      <WindowHeader style={{ position: 'relative', zIndex: 10 }}>
        <span>
          {selectedIcon?.id === 'about' 
            ? 'Daniel Bass - Product Marketing Manager'
            : selectedIcon?.label}
        </span>
        <Button 
          style={{ 
            position: 'absolute', 
            right: '5px', 
            top: '5px',
            width: '24px',
            height: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 20
          }}
          size="sm"
          square
          onClick={() => setShowWindow(false)}
        >
          <span style={{ 
            fontWeight: 'bold',
            fontSize: '25px',
            lineHeight: 1,
            display: 'block',
            transform: 'translateY(-2px)'
          }}>
            ×
          </span>
        </Button>
      </WindowHeader>
      <WindowContent style={{ 
        padding: selectedIcon?.id === 'videos' ? '0' : undefined,
        overflow: selectedIcon?.id === 'videos' ? 'visible' : 'auto'
      }}>
        {renderWindowContent(selectedIcon)}
      </WindowContent>
    </WindowWrapper>
  );
};

export default WindowManager; 