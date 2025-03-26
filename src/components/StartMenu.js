import React from 'react';
import { List } from 'react95';
import { StyledListItem } from '../styles/StyledComponents';
import siligusIcon from '../assets/siligus.png';
import webIcon from '../assets/web.png';

const StartMenu = ({ openStartMenu, handleAboutSiligusClick, handleAboutWebsiteClick }) => {
  if (!openStartMenu) return null;

  return (
    <List
      style={{
        position: 'absolute',
        bottom: '100%',
        left: 0,
        width: '200px',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <StyledListItem 
        onClick={handleAboutSiligusClick}
      >
        <img 
          src={siligusIcon} 
          alt="Siligus" 
          style={{ 
            width: '16px', 
            height: '16px', 
            marginRight: '8px', 
            display: 'inline-block',
            verticalAlign: 'middle',
            position: 'relative',
            top: '-2.5px'
          }} 
        />
        <span>About Siligus</span>
      </StyledListItem>
      <StyledListItem 
        onClick={handleAboutWebsiteClick}
      >
        <img 
          src={webIcon} 
          alt="About Website" 
          style={{ 
            width: '16px', 
            height: '16px', 
            marginRight: '8px', 
            display: 'inline-block',
            verticalAlign: 'middle',
            position: 'relative',
            top: '-2.5px'
          }} 
        />
        <span>About This Website</span>
      </StyledListItem>
    </List>
  );
};

export default StartMenu; 