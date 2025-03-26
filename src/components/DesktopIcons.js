import React from 'react';
import { 
  DesktopIcon,
  IconImage,
  IconText,
  SelectedIconOverlay
} from '../styles/StyledComponents';

const DesktopIcons = ({ icons, selectedDesktopIcon, handleIconClick, handleIconDoubleClick }) => {
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