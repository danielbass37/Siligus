import React from 'react';
import { 
  StyledAppBar, 
  TaskBar as TaskBarStyled, 
  StartButtonStyled 
} from '../styles/StyledComponents';
import siligusIcon from '../assets/siligus.png';
import StartMenu from './StartMenu';
import styled from 'styled-components';
import { Button } from 'react95';

// Styled component for the sound button
const SoundButton = styled(Button)`
  margin-left: auto; /* Push to the right side */
  margin-right: 10px; /* Add space from the right edge */
  padding: 0 8px 0 8px; /* More padding on the right (16px) than left (8px) */
  display: flex;
  align-items: center;
  justify-content: center;
`;

// SVG icons for sound states
const VolumeOnIcon = () => (
  <svg width="20" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9H7L12 4V20L7 15H3V9Z" fill="black" />
    <path d="M16.5 12C16.5 10.2 15.3 8.7 13.7 8.2V15.8C15.3 15.3 16.5 13.8 16.5 12Z" fill="black" />
    <path d="M13.7 5.2V6.8C16.5 7.4 18.5 9.5 18.5 12C18.5 14.5 16.5 16.6 13.7 17.2V18.8C17.4 18.1 20 15.3 20 12C20 8.7 17.4 5.9 13.7 5.2Z" fill="black" />
  </svg>
);

const VolumeOffIcon = () => (
  <svg width="20" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9H7L12 4V20L7 15H3V9Z" fill="black" />
    <path d="M16.5 12L20 15.5" stroke="black" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 8.5L16.5 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Taskbar = ({ 
  openStartMenu, 
  toggleStartMenu, 
  handleAboutSiligusClick, 
  handleAboutWebsiteClick,
  isMuted,
  handleToggleMute
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
        
        {/* Add sound toggle button to the right */}
        <SoundButton
          onClick={(e) => {
            e.stopPropagation();
            handleToggleMute();
          }}
          title={isMuted ? "Unmute sounds" : "Mute sounds"}
        >
          {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
        </SoundButton>
      </TaskBarStyled>
    </StyledAppBar>
  );
};

export default Taskbar; 