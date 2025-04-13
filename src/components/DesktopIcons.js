import React, { useEffect, useState } from 'react';
import {
  // Icon grid configuration
  DESKTOP_ICONS_PER_COLUMN,
  MOBILE_ICONS_PER_COLUMN,
  CONFIG,
  
  // Regular icon styles
  IconsContainer,
  IconColumn,
  IconWrapper,
  DesktopIcon,
  IconImage,
  IconText,
  
  // GooseAmp specific styles
  FixedPositionIcon,
  GooseAmpDesktopIcon,
  GooseAmpIconImage,
  GooseAmpIconText
} from '../styles/IconStyles';

const DesktopIcons = ({ icons, handleIconClick }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update screen size on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      console.log(`Device type: ${mobile ? 'Mobile' : 'Desktop'}`);
      console.log(`Using ICONS_PER_COLUMN: ${mobile ? CONFIG.MOBILE.ICONS_PER_COLUMN : CONFIG.DESKTOP.ICONS_PER_COLUMN}`);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Filter icons based on device type and visibility settings
  const getVisibleIcons = (iconsArray) => {
    const filtered = iconsArray.filter(icon => {
      // If visibility is not defined, show by default
      if (!icon.visibility) return true;
      
      // Show based on device type
      return isMobile ? icon.visibility.mobile : icon.visibility.desktop;
    });
    
    console.log(`Filtered icons (${isMobile ? 'Mobile' : 'Desktop'}):`, filtered.map(i => i.id));
    return filtered;
  };

  // Get visible icons
  const visibleIcons = getVisibleIcons(icons);
  
  // Filter out the gooseampIcon since it has special positioning
  const regularIcons = visibleIcons.filter(icon => icon.id !== 'gooseamp');
  const gooseampIcon = visibleIcons.find(icon => icon.id === 'gooseamp');
  
  // Organize icons into columns based on the configuration constants
  const organizeIcons = () => {
    const maxIconsPerColumn = isMobile ? MOBILE_ICONS_PER_COLUMN : DESKTOP_ICONS_PER_COLUMN;
    const columns = [];
    
    // First column always has maximum number of icons (or fewer if there aren't enough)
    columns.push(regularIcons.slice(0, maxIconsPerColumn));
    
    // Distribute remaining icons according to rules
    const remaining = regularIcons.slice(maxIconsPerColumn);
    
    // Second column always has max icons initially (or up to maxIconsPerColumn, if fewer)
    const secondColumnSize = Math.min(remaining.length, maxIconsPerColumn);
    if (secondColumnSize > 0) {
      columns.push(remaining.slice(0, secondColumnSize));
    }
    
    // If there are more icons, create additional columns as needed
    const extraIcons = remaining.slice(secondColumnSize);
    if (extraIcons.length > 0) {
      for (let i = 0; i < extraIcons.length; i += maxIconsPerColumn) {
        columns.push(extraIcons.slice(i, i + maxIconsPerColumn));
      }
    }
    
    console.log(`Created ${columns.length} columns with max ${maxIconsPerColumn} icons per column`);
    return columns;
  };
  
  const iconColumns = organizeIcons();

  return (
    <>
      {/* Regular desktop icons in grid layout */}
      <IconsContainer>
        {iconColumns.map((column, columnIndex) => (
          <IconColumn key={`column-${columnIndex}`}>
            {column.map(icon => (
              <IconWrapper key={icon.id} isMobile={isMobile}>
                <DesktopIcon
                  onClick={() => handleIconClick(icon)}
                  onTouchStart={() => handleIconClick(icon)}
                  isMobile={isMobile}
                >
                  <IconImage src={icon.icon} alt={icon.label} isMobile={isMobile} />
                  <IconText isMobile={isMobile}>{icon.label}</IconText>
                </DesktopIcon>
              </IconWrapper>
            ))}
          </IconColumn>
        ))}
      </IconsContainer>

      {/* GooseAmp icon with special positioning */}
      {gooseampIcon && (
        <FixedPositionIcon isMobile={isMobile}>
          <GooseAmpDesktopIcon
            onClick={() => handleIconClick(gooseampIcon)}
            onTouchStart={() => handleIconClick(gooseampIcon)}
            isMobile={isMobile}
          >
            <GooseAmpIconImage 
              src={gooseampIcon.icon} 
              alt={gooseampIcon.label}
              isMobile={isMobile}
            />
            <GooseAmpIconText isMobile={isMobile}>
              {gooseampIcon.label}
            </GooseAmpIconText>
          </GooseAmpDesktopIcon>
        </FixedPositionIcon>
      )}
    </>
  );
};

export default DesktopIcons; 