import styled, { createGlobalStyle } from 'styled-components';

export const GooseAmpWrapper = styled.div`
  width: 375px;
  position: relative;
  font-family: 'Arial', sans-serif;
  user-select: none;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to right, #15151F, #383958, #1F1E2E);
  border: 2px ridge #4d5278;
  box-sizing: border-box;
`;

export const GooseAmpTitleBar = styled.div`
  height: 23px;
  background: linear-gradient(to right, #15151F, #383958, #1F1E2E);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  user-select: none;
  cursor: move;
  color: white;
  font-weight: bold;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #000;
`;

export const GooseAmpLogoText = styled.div`
  width: 100%;
  text-align: center;
  color: #b3c1e1;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const GooseAmpButtons = styled.div`
  display: flex;
  gap: 2px;
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
`;

export const GooseAmpButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 10px;
  width: 12px;
  height: 12px;
  line-height: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const GooseAmpMainArea = styled.div`
  background: linear-gradient(to right, #15151F, #383958, #1F1E2E);
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const GooseAmpDisplay = styled.div`
  background: #000;
  color: #0DAB12;
  padding: 6px;
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 8px;
  border: 1px inset #444;
  margin: 6px;
`;

export const GooseAmpVisualizer = styled.div`
  background: #000;
  position: relative;
  height: 90px;
  width: 100px;
  display: grid;
  grid-template-rows: 2fr 1fr;
  border-right: 1px solid #333;

  &:after {
    content: '';
    display: block;
    background-image: 
      repeating-linear-gradient(
        to bottom,
        #0DAB12 0px,
        #0DAB12 1px,
        transparent 1px,
        transparent 4px
      );
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.3;
  }
`;

export const GooseAmpPlayStatus = styled.div`
  position: absolute;
  left: 8px;
  top: 8px;
  color: #0DAB12;
  font-size: 14px;
  z-index: 2;
`;

// Digital/LCD font style for the clock
export const GooseAmpPlayTime = styled.div`
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: #0DAB12;
  font-size: 18px;
  font-family: 'Digital-7', 'LCD', monospace;
  text-shadow: 0 0 2px #0DAB12;
  letter-spacing: 2px;
  z-index: 2;
`;

// Add custom font styles
export const FontStyles = createGlobalStyle`
  @font-face {
    font-family: 'Digital-7';
    src: url('https://cdn.jsdelivr.net/npm/digital-7-font@1.0.0/digital-7.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;

export const GooseAmpSongInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90px;
`;

export const GooseAmpSongTitle = styled.div`
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  height: 20px;
  line-height: 20px;
  color: #0DAB12;
  padding: 0 6px;
  margin-right: 5px;
  text-shadow: 0 0 2px #0DAB12;
  
  &:before {
    content: "${props => props.isPlaying ? props.title : '== PAUSED =='}";
    position: absolute;
    left: 0;
    top: 0;
    white-space: nowrap;
    animation: ${props => props.isPlaying ? 'marquee 15s linear infinite' : 'none'};
  }
  
  @keyframes marquee {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

export const GooseAmpSongDetails = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #0DAB12;
  line-height: 1.2;
  align-items: center;
`;

export const GooseAmpDetail = styled.span`
  display: inline-block;
  padding: 0 3px;
  margin: 0 2px;
  background: ${props => props.highlighted ? '#0DAB12' : 'transparent'};
  color: ${props => props.highlighted ? '#000' : '#0DAB12'};
`;

export const GooseAmpSliderContainer = styled.div`
  height: 8px;
  margin: 7px 15px 10px;
  position: relative;
  background: #111;
  border: 1px inset #444;
  cursor: pointer;
`;

export const GooseAmpSliderTrack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(to right, #242442, #283243);
`;

export const GooseAmpSliderProgress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => `${props.progress}%`};
  background: linear-gradient(to right, #1a5e1e, #0DAB12);
  opacity: 0.3;
  pointer-events: none;
`;

export const GooseAmpSliderThumb = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  top: -1px;
  left: ${props => `calc(${props.progress}% - 7px)`};
  cursor: pointer;
  pointer-events: none;
  z-index: 2;
`;

export const GooseAmpControls = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px 10px;
  background: linear-gradient(to right, #15151F, #383958, #1F1E2E);
  gap: 6px;
`;

export const GooseAmpMainControls = styled.div`
  display: flex;
  gap: 3px;
`;

export const GooseAmpControlButton = styled.button`
  width: 30px;
  height: 23px;
  background: #d8d8d8;
  background-image: linear-gradient(to bottom, #eeeeee, #bbbbbb);
  border: 1px outset #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #333;
  font-size: 12px;
  padding: 0;
  margin: 0;
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    border-style: inset;
    filter: brightness(0.9);
  }
`;

export const GooseAmpExtraControls = styled.div`
  display: flex;
  gap: 5px;
  margin-left: auto;
`;

export const GooseAmpExtraButton = styled.button`
  background: #d8d8d8;
  background-image: linear-gradient(to bottom, #eeeeee, #bbbbbb);
  border: 1px outset #ddd;
  padding: 2px 4px;
  font-size: 9px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  color: #222;
  height: 23px;

  svg {
    margin-right: 2px;
    font-size: 9px;
  }

  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    border-style: inset;
    filter: brightness(0.9);
  }
`;

export const HiddenYouTube = styled.div`
  position: absolute;
  top: -9999px;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`; 