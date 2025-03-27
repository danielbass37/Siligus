import React, { useEffect, useState } from 'react';
import { 
  DesktopIcon,
  IconImage,
  IconText,
  SelectedIconOverlay
} from '../styles/StyledComponents';

const DesktopIcons = ({ icons, selectedDesktopIcon, handleIconClick, handleIconDoubleClick }) => {
  const [gooseampPosition, setGooseampPosition] = useState({ bottom: '80px', right: '20px' });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update gooseamp icon position on window resize
  useEffect(() => {
    const updateGooseampPosition = () => {
      setGooseampPosition({ bottom: '80px', right: '20px' });
    };

    window.addEventListener('resize', updateGooseampPosition);
    return () => window.removeEventListener('resize', updateGooseampPosition);
  }, []);

  // Track mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Separate regular icons from the gooseamp icon
  const regularIcons = icons.filter(icon => icon.id !== 'gooseamp');
  const gooseampIcon = icons.find(icon => icon.id === 'gooseamp');

  return (
    <>
      {regularIcons.map((icon) => (
        <DesktopIcon 
          key={icon.id}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(icon);
          }}
          onDoubleClick={() => handleIconDoubleClick(icon)}
        >
          <div style={{ position: 'relative' }}>
            <IconImage src={icon.icon} alt={icon.label} />
            {selectedDesktopIcon === icon.id && <SelectedIconOverlay />}
          </div>
          <IconText 
            style={{
              backgroundColor: selectedDesktopIcon === icon.id ? '#08007F' : 'transparent',
              outline: selectedDesktopIcon === icon.id ? '1px dotted #FEFF00' : 'none',
            }}
          >
            {icon.label}
          </IconText>
        </DesktopIcon>
      ))}
      
      {gooseampIcon && (
        <DesktopIcon 
          key={gooseampIcon.id}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(gooseampIcon);
          }}
          onDoubleClick={() => handleIconDoubleClick(gooseampIcon)}
          style={{
            position: 'fixed',
            bottom: gooseampPosition.bottom,
            right: gooseampPosition.right,
            margin: 0
          }}
        >
          <div style={{ position: 'relative' }}>
            <IconImage src={gooseampIcon.icon} alt={gooseampIcon.label} />
            {selectedDesktopIcon === gooseampIcon.id && <SelectedIconOverlay />}
          </div>
          <IconText 
            style={{
              backgroundColor: selectedDesktopIcon === gooseampIcon.id ? '#08007F' : 'transparent',
              outline: selectedDesktopIcon === gooseampIcon.id ? '1px dotted #FEFF00' : 'none',
            }}
          >
            {gooseampIcon.label}
          </IconText>
        </DesktopIcon>
      )}
    </>
  );
};

export default DesktopIcons; 