import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import messageTiny from '../../assets/HOMM3CV/message_tiny.png';
import messageSmall from '../../assets/HOMM3CV/message_small.png';
import messageLarge from '../../assets/HOMM3CV/message_large.png';
import W95FAFont from '../../assets/HOMM3CV/W95FA.otf';
import { playSound, Sounds } from '../../utils/soundUtils';
import areaConfig from './HOMM3CVConfig';

// Import the W95FA font
const FontImport = createGlobalStyle`
  @font-face {
    font-family: 'W95FA';
    src: url(${W95FAFont}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }
`;

// Container for the message window with proper positioning
const MessageContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.5);
`;

// Wrapper to ensure proper centering and sizing
const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 500px;
  max-height: 400px;
`;

// The actual message window background
const MessageImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  user-select: none;
  display: block;
`;

// Text content container with a background for better visibility
const TextContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
`;

// The actual text that appears on the message window
const MessageText = styled.div`
  background-color: transparent;
  color: rgb(255, 255, 255);
  font-family: 'W95FA', 'Times New Roman', serif;
  font-weight: 600;
  line-height: 1.4;
  z-index: 15;
  white-space: pre-wrap;
`;

// Close button that appears on the message
const CloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 20;
  background-color: transparent;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

/**
 * MessageWindow component displays a message window of different sizes
 * 
 * @param {Object} props Component props
 * @param {string} props.size Size of the message ('tiny', 'small', or 'large')
 * @param {function} props.onClose Function to call when closing the message
 * @param {number} props.areaId The ID of the area being clicked
 */
const MessageWindow = ({ size, onClose, areaId }) => {
  const handleClose = () => {
    // Play button sound when closing
    playSound(Sounds.BUTTON);
    
    // Call the onClose callback
    if (onClose) {
      onClose();
    }
  };
  
  // Determine which message image to use based on size
  const getMessageImage = () => {
    switch (size) {
      case 'large':
        return messageLarge;
      case 'small':
        return messageSmall;
      case 'tiny':
      default:
        return messageTiny;
    }
  };
  
  // Get appropriate wrapper size based on message type
  const getWrapperStyles = () => {
    switch (size) {
      case 'large':
        return { maxWidth: '450px', maxHeight: '350px' };
      case 'small':
        return { maxWidth: '350px', maxHeight: '300px' };
      case 'tiny':
      default:
        return { maxWidth: '250px', maxHeight: '200px' };
    }
  };
  
  // Get appropriate text style based on message type
  const getTextStyle = () => {
    switch (size) {
      case 'large':
        return { 
          fontSize: '16px', 
          maxHeight: '150px', 
          overflowY: 'auto',
          width: '80%',
          textAlign: 'center',
          padding: '15px',
          paddingBottom: '75px',
          fontWeight: '100'
        };
      case 'small':
        return { 
          fontSize: '14px',
          width: '70%',
          textAlign: 'center',
          padding: '10px',
          paddingBottom: '60px',
          fontWeight: '100'
        };
      case 'tiny':
      default:
        return { 
          fontSize: '18px',
          width: '70%',
          textAlign: 'center',
          padding: '5px',
          fontWeight: '100'
        };
    }
  };
  
  // Get appropriate container style based on message type
  const getContainerStyle = () => {
    switch (size) {
      case 'large':
        return {
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'small':
        return {
          alignItems: 'center',
          justifyContent: 'center'
        };
      case 'tiny':
      default:
        return {
          alignItems: 'center',
          justifyContent: 'center'
        };
    }
  };
  
  // Get the message text from areaConfig if available
  const getMessageText = () => {
    if (areaId && areaConfig[areaId] && areaConfig[areaId].messageText) {
      return areaConfig[areaId].messageText;
    }
    
    // Default messages if not found in config
    switch (size) {
      case 'large':
        return "Daniel is a Product Marketing Manager with expertise in brand storytelling and technical documentation.";
      case 'small':
        return "Marketing content for technical and non-technical audiences.";
      case 'tiny':
      default:
        return "A tool for marketing.";
    }
  };
  
  // Get close button position based on message type
  const getCloseButtonStyle = () => {
    switch (size) {
      case 'large':
        return {
          bottom: '23.5%',
          right: '40%',
          width: '88px',
          height: '42px'
        };
      case 'small':
        return {
          bottom: '35%',
          right: '37%',
          width: '88px',
          height: '38px'
        };
      case 'tiny':
      default:
        return {
          bottom: '12%',
          right: '25%',
          width: '60px',
          height: '30px'
        };
    }
  };
  
  return (
    <MessageContainer onClick={size !== 'tiny' ? handleClose : undefined}>
      <FontImport />
      <ImageWrapper 
        style={getWrapperStyles()}
        onClick={e => e.stopPropagation()}
      >
        <MessageImage 
          src={getMessageImage()} 
          alt={`${size} message`}
        />
        
        <TextContainer style={getContainerStyle()}>
          <MessageText style={getTextStyle()}>
            {getMessageText()}
          </MessageText>
        </TextContainer>
        
        {/* Only render close button for large and small windows */}
        {size !== 'tiny' && (
          <CloseButton 
            onClick={handleClose} 
            style={getCloseButtonStyle()}
          />
        )}
      </ImageWrapper>
    </MessageContainer>
  );
};

export default MessageWindow; 