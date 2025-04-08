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

    updateGooseampPosition();
    
    return () => {};
  }, []);

  // Separate regular icons from the gooseamp icon
  const regularIcons = icons.filter(icon => icon.id !== 'gooseamp');
  const gooseampIcon = icons.find(icon => icon.id === 'gooseamp');

  return (
    <>
      {/* Regular desktop icons */}
      <div style={{ padding: '20px', display: 'flex', flexWrap: 'wrap' }}>
        {regularIcons.map((icon) => (
          <div key={icon.id} style={{ position: 'relative' }}>
            <DesktopIcon
              onClick={() => handleIconClick(icon)}
              onDoubleClick={() => handleIconDoubleClick(icon)}
              onTouchStart={() => handleIconClick(icon)}
              selected={selectedDesktopIcon === icon.id}
              style={{ margin: '10px' }}
            >
              <IconImage src={icon.icon} alt={icon.label} />
              <IconText>{icon.label}</IconText>
              {selectedDesktopIcon === icon.id && <SelectedIconOverlay />}
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
            zIndex: 4
          }}
        >
          <DesktopIcon 
            onClick={() => handleIconClick(gooseampIcon)}
            onDoubleClick={() => handleIconDoubleClick(gooseampIcon)}
            onTouchStart={() => handleIconClick(gooseampIcon)}
            selected={selectedDesktopIcon === gooseampIcon.id}
            style={{ margin: '0' }}
          >
            <IconImage src={gooseampIcon.icon} alt={gooseampIcon.label} />
            <IconText>{gooseampIcon.label}</IconText>
            {selectedDesktopIcon === gooseampIcon.id && <SelectedIconOverlay />}
          </DesktopIcon>
        </div>
      )}
    </>
  );
};

export default DesktopIcons; 