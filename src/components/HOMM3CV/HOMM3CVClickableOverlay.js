import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import tooltipImage from '../../assets/HOMM3CV/tooltip.png';

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

// Subtle glow animation for hover effect
const subtleGlow = keyframes`
  0% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
  50% { box-shadow: 0 0 15px rgba(255, 215, 0, 0.6); }
  100% { box-shadow: 0 0 5px rgba(255, 215, 0, 0.3); }
`;

// Sparkle animation for periodic hints
const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
`;

const ClickableArea = styled.div`
  position: absolute;
  background: transparent;
  border: none;
  pointer-events: auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0;
  color: transparent;
  text-shadow: none;
  transition: all 0.2s ease;
  border-radius: 3px;
  
  /* Subtle hover effect */
  &:hover {
    background: rgba(183, 153, 0, 0.1);
    animation: ${subtleGlow} 1.5s ease-in-out infinite;
  }
  
  /* Periodic sparkle hint - only for smaller icons */
  &.sparkle-hint::after {
    content: '✨';
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 12px;
    opacity: 0;
    animation: ${sparkle} 3s ease-in-out infinite;
    animation-delay: ${props => props.sparkleDelay || '0s'};
    pointer-events: none;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-image: url(${tooltipImage});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color:rgb(255, 255, 255);
  padding: 8px 12px;
  font-size: 12px;
  font-family: 'Times New Roman', serif;
  white-space: nowrap;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
  min-width: 80px;
  min-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${ClickableArea}:hover & {
    opacity: 1;
  }
`;

const HOMM3CVClickableOverlay = ({ onAreaClick }) => {
  const [hoveredArea, setHoveredArea] = useState(null);
  
  // Define clickable areas based on the HOMM3CV interface
  const clickableAreas = [
    // 1. Character portrait and header area
    { id: 1, left: '7%', top: '6%', width: '37.5%', height: '10%', name: 'Character Info' },

    // 2. Armageddon's Blade icon
    { id: 2, left: '46.8%', top: '12.8%', width: '5.8%', height: '7%', name: "Armageddon's Blade", sparkle: true },

    // 3. Reddit icon
    { id: 3, left: '53.5%', top: '12.8%', width: '5.8%', height: '7%', name: 'Reddit', sparkle: true },
    
    // 4. Notion icon
    { id: 4, left: '64.2%', top: '6.7%', width: '5.8%', height: '7%', name: 'Notion', sparkle: true },

    // 5. ChatGPT icon
    { id: 5, left: '71.7%', top: '6.7%', width: '5.8%', height: '7%', name: 'ChatGPT', sparkle: true },

    // 6. Cursor icon
    { id: 6, left: '78%', top: '6.7%', width: '5.8%', height: '7%', name: 'Cursor', sparkle: true },

    // 7. Hubspot icon
    { id: 7, left: '47%', top: '24.7%', width: '6%', height: '7%', name: 'HubSpot', sparkle: true },
    
    // 8. KYM icon
    { id: 8, left: '64.2%', top: '22.7%', width: '6%', height: '7%', name: 'Know Your Meme', sparkle: true },

    // 9. Catapult icon
    { id: 9, left: '78%', top: '21.3%', width: '6%', height: '7%', name: 'Catapult', sparkle: true },
    
    // 10. Mailchimp icon
    { id: 10, left: '49%', top: '32.7%', width: '6%', height: '7%', name: 'Mailchimp', sparkle: true },

    // 11. GitHub icon
    { id: 11, left: '71.4%', top: '31.4%', width: '6%', height: '7%', name: 'GitHub', sparkle: true },
    
    // 12. Substack icon
    { id: 12, left: '78%', top: '31.4%', width: '6%', height: '7%', name: 'Substack', sparkle: true },

    // 13. Google Analytics icon
    { id: 13, left: '51.1%', top: '41%', width: '6%', height: '7%', name: 'Google Analytics', sparkle: true },
    
    // 14. Grammarly icon
    { id: 14, left: '72.1%', top: '40.5%', width: '6%', height: '7%', name: 'Grammarly', sparkle: true },

    // 15. Tucha icon
    { id: 15, left: '6.2%', top: '79.6%', width: '7.8%', height: '10.4%', name: 'Tucha (Cat)' },
    
    // 16. Spell Book icon
    { id: 16, left: '78%', top: '51.6%', width: '6%', height: '7%', name: 'Spell Book', sparkle: true },
    
    // 17. Delete Hero icon
    { id: 17, left: '76.8%', top: '71%', width: '7%', height: '5.5%', name: 'Delete Hero' },
    
    // 18. Bottom right checkmark
    { id: 18, left: '86.7%', top: '84.6%', width: '6.8%', height: '6%', name: 'Close' },
  ];

  const handleMouseDown = (areaId, e) => {
    e.preventDefault(); // Prevent any default behavior
    if (onAreaClick) {
      onAreaClick(areaId);
    }
  };

  const handleMouseEnter = (areaId) => {
    setHoveredArea(areaId);
  };

  const handleMouseLeave = () => {
    setHoveredArea(null);
  };

  return (
    <OverlayContainer>
      {clickableAreas.map((area, index) => (
        <ClickableArea
          key={area.id}
          className={area.sparkle ? 'sparkle-hint' : ''}
          sparkleDelay={`${index * 0.5}s`}
          style={{
            left: area.left,
            top: area.top,
            width: area.width,
            height: area.height,
          }}
          onMouseDown={(e) => handleMouseDown(area.id, e)}
          onMouseEnter={() => handleMouseEnter(area.id)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredArea === area.id && (
            <Tooltip>
              {area.name}
            </Tooltip>
          )}
          {area.id}
        </ClickableArea>
      ))}
    </OverlayContainer>
  );
};

export default HOMM3CVClickableOverlay; 