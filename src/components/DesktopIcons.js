import React, { useEffect, useState } from 'react';
import { 
  DesktopIcon,
  IconImage,
  IconText
} from '../styles/StyledComponents';

const DesktopIcons = ({ icons, handleIconClick }) => {
  const [gooseampPosition, setGooseampPosition] = useState({ bottom: '80px', right: '20px' });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update gooseamp position and check screen size on resize
  useEffect(() => {
    const handleResize = () => {
      setGooseampPosition({ bottom: '80px', right: '20px' });
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Separate regular icons from the gooseamp icon
  const regularIcons = icons.filter(icon => icon.id !== 'gooseamp');
  const gooseampIcon = icons.find(icon => icon.id === 'gooseamp');

  // Split icons into two columns
  const leftColumnIcons = regularIcons.slice(0, 4); // 4 icons for desktop
  const rightColumnIcons = regularIcons.slice(4); // Rest of the icons

  return (
    <>
      {/* Left column icons */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {leftColumnIcons.map((icon) => (
          <div key={icon.id} style={{ position: 'relative' }}>
            <DesktopIcon
              onClick={() => handleIconClick(icon)}
              onTouchStart={() => handleIconClick(icon)}
            >
              <IconImage src={icon.icon} alt={icon.label} />
              <IconText>{icon.label}</IconText>
            </DesktopIcon>
          </div>
        ))}
      </div>

      {/* Right column icons */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {rightColumnIcons.map((icon, index) => (
          <div 
            key={icon.id} 
            style={{ 
              position: 'relative',
              // Only apply negative margin on mobile
              marginTop: index === 0 ? '0' : (isMobile ? '-18px' : '0')
            }}
          >
            <DesktopIcon
              onClick={() => handleIconClick(icon)}
              onTouchStart={() => handleIconClick(icon)}
            >
              <IconImage src={icon.icon} alt={icon.label} />
              <IconText>{icon.label}</IconText>
            </DesktopIcon>
          </div>
        ))}
      </div>

      {/* GooseAmp icon (fixed position) */}
      {gooseampIcon && (
        <div 
          style={{ 
            position: 'absolute', 
            bottom: gooseampPosition.bottom, 
            right: gooseampPosition.right,
            zIndex: 0
          }}
        >
          <DesktopIcon 
            onClick={() => handleIconClick(gooseampIcon)}
            onTouchStart={() => handleIconClick(gooseampIcon)}
            style={{ margin: '0' }}
          >
            <IconImage src={gooseampIcon.icon} alt={gooseampIcon.label} />
            <IconText>{gooseampIcon.label}</IconText>
          </DesktopIcon>
        </div>
      )}
    </>
  );
};

export default DesktopIcons; 