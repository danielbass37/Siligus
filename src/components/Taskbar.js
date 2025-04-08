import React from 'react';
import { 
  StyledAppBar, 
  TaskBar as TaskBarStyled, 
  StartButtonStyled 
} from '../styles/StyledComponents';
import siligusIcon from '../assets/siligus.png';
import StartMenu from './StartMenu';

const Taskbar = ({ 
  openStartMenu, 
  toggleStartMenu, 
  handleAboutSiligusClick, 
  handleAboutWebsiteClick 
}) => {
  // Function to close the start menu
  const closeMenu = () => {
    if (openStartMenu) {
      toggleStartMenu();
    }
  };

  return (
    <StyledAppBar>
      <TaskBarStyled>
        <div style={{ position: 'relative' }}>
          <StartButtonStyled 
            active={openStartMenu}
            onClick={(e) => {
              e.stopPropagation();
              toggleStartMenu();
            }}
          >
            <img 
              src={siligusIcon} 
              alt="Siligus" 
              style={{ 
                width: '20px', 
                height: '20px', 
                marginRight: '4px',
                marginLeft: '4px',
                marginBottom: '3px',
                display: 'block',
                objectFit: 'contain'
              }} 
            />
            <span>Siligus</span>
          </StartButtonStyled>
          
          <StartMenu 
            openStartMenu={openStartMenu}
            handleAboutSiligusClick={handleAboutSiligusClick}
            handleAboutWebsiteClick={handleAboutWebsiteClick}
            closeMenu={closeMenu}
          />
        </div>
      </TaskBarStyled>
    </StyledAppBar>
  );
};

export default Taskbar; 