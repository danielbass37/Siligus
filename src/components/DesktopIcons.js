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
  const [orderedIcons, setOrderedIcons] = useState(icons);

  // Update gooseamp icon position on window resize
  useEffect(() => {
    const updateGooseampPosition = () => {
      setGooseampPosition({ bottom: '80px', right: '20px' });
    };

    window.addEventListener('resize', updateGooseampPosition);
    return () => window.removeEventListener('resize', updateGooseampPosition);
  }, []);

  // Reorder icons on mobile to prevent Video Projects from being cut off
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      // Create a new array with video projects before developer marketing
      const newOrderedIcons = [...icons];
      
      // Find indexes of video projects and developer marketing
      const videoIndex = newOrderedIcons.findIndex(icon => icon.id === 'videos');
      const dmkIndex = newOrderedIcons.findIndex(icon => icon.id === 'hottakes');
      
      if (videoIndex > -1 && dmkIndex > -1) {
        // Swap the positions
        const temp = newOrderedIcons[videoIndex];
        newOrderedIcons[videoIndex] = newOrderedIcons[dmkIndex];
        newOrderedIcons[dmkIndex] = temp;
        setOrderedIcons(newOrderedIcons);
      }
    } else {
      setOrderedIcons(icons);
    }
  }, [isMobile, icons]);

  return (
    <>
      {orderedIcons.map((icon) => (
        <DesktopIcon 
          key={icon.id}
          onClick={(e) => {
            e.stopPropagation();
            handleIconClick(icon);
          }}
          onDoubleClick={() => handleIconDoubleClick(icon)}
          style={icon.id === 'gooseamp' ? {
            position: 'fixed',
            bottom: gooseampPosition.bottom,
            right: gooseampPosition.right,
            margin: 0
          } : {}}
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
    </>
  );
};

export default DesktopIcons; 