import React, { useEffect, useState } from 'react';
import { 
  DesktopIcon,
  IconImage,
  IconText,
  SelectedIconOverlay
} from '../styles/StyledComponents';

const DesktopIcons = ({ icons, selectedDesktopIcon, handleIconClick, handleIconDoubleClick }) => {
  const [gooseampPosition, setGooseampPosition] = useState({ bottom: '80px', right: '20px' });

  // Update gooseamp icon position on window resize
  useEffect(() => {
    const updateGooseampPosition = () => {
      setGooseampPosition({ bottom: '80px', right: '20px' });
    };

    window.addEventListener('resize', updateGooseampPosition);
    return () => window.removeEventListener('resize', updateGooseampPosition);
  }, []);

  return (
    <>
      {icons.map((icon) => (
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