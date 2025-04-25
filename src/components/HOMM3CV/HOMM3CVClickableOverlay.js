import React from 'react';
import styled from 'styled-components';

const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
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
`;

const HOMM3CVClickableOverlay = ({ onAreaClick }) => {
  // Define clickable areas based on the HOMM3CV interface
  const clickableAreas = [
    // 1. Character portrait and header area
    { id: 1, left: '7%', top: '6%', width: '37.5%', height: '10%' },

    // 2. Armageddon's Blade icon
    { id: 2, left: '46.8%', top: '12.8%', width: '5.8%', height: '7%' },

    // 3. Reddit icon
    { id: 3, left: '53.5%', top: '12.8%', width: '5.8%', height: '7%' },
    
    // 4. Notion icon
    { id: 4, left: '64.2%', top: '6.7%', width: '5.8%', height: '7%' },

    // 5. ChatGPT icon
    { id: 5, left: '71.7%', top: '6.7%', width: '5.8%', height: '7%' },

    // 6. Cursor icon
    { id: 6, left: '78%', top: '6.7%', width: '5.8%', height: '7%' },

    // 7. Hubspot icon
    { id: 7, left: '47%', top: '24.7%', width: '6%', height: '7%' },
    
    // 8. KYM icon
    { id: 8, left: '64.2%', top: '22.7%', width: '6%', height: '7%' },

    // 9. Catapult icon
    { id: 9, left: '78%', top: '21.3%', width: '6%', height: '7%' },
    
    // 10. Mailchimp icon
    { id: 10, left: '49%', top: '32.7%', width: '6%', height: '7%' },

    // 11. GitHub icon
    { id: 11, left: '71.4%', top: '31.4%', width: '6%', height: '7%' },
    
    // 12. Substack icon
    { id: 12, left: '78%', top: '31.4%', width: '6%', height: '7%' },

    // 13. Google Analytics icon
    { id: 13, left: '51.1%', top: '41%', width: '6%', height: '7%' },
    
    // 14. Grammarly icon
    { id: 14, left: '72.1%', top: '40.5%', width: '6%', height: '7%' },

    // 15. Tucha icon
    { id: 15, left: '6.2%', top: '79.6%', width: '7.8%', height: '10.4%' },
    
    // 16. Spell Book icon
    { id: 16, left: '78%', top: '51.6%', width: '6%', height: '7%' },
    
    // 17. Delete Hero icon
    { id: 17, left: '76.8%', top: '71%', width: '7%', height: '5.5%' },
    
    // 18. Bottom right checkmark
    { id: 18, left: '86.7%', top: '84.6%', width: '6.8%', height: '6%' },
  ];

  const handleMouseDown = (areaId, e) => {
    e.preventDefault(); // Prevent any default behavior
    if (onAreaClick) {
      onAreaClick(areaId);
    }
  };

  return (
    <OverlayContainer>
      {clickableAreas.map((area) => (
        <ClickableArea
          key={area.id}
          style={{
            left: area.left,
            top: area.top,
            width: area.width,
            height: area.height,
          }}
          onMouseDown={(e) => handleMouseDown(area.id, e)}
        >
          {area.id}
        </ClickableArea>
      ))}
    </OverlayContainer>
  );
};

export default HOMM3CVClickableOverlay; 