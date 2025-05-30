import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { styleReset, Window, Button, ListItem, AppBar } from 'react95';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

export const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;

export const GlobalStylesWithNoScroll = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  padding: 1rem;
  padding-bottom: 60px; /* Increase padding to account for AppBar */
  background: ${({ theme }) => theme.desktopBackground};
  height: 100vh;
  max-height: 100vh;
  position: relative;
  overflow-y: auto; /* Allow vertical scrolling */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 0.5rem; /* Reduce padding on mobile */
    padding-bottom: 60px; /* Keep bottom padding for AppBar */
    height: 100%;
    min-height: 100vh;
    -webkit-overflow-scrolling: touch; /* Improve scrolling on iOS */
  }
`;

export const DesktopLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 30px 20px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  position: relative;
  
  @media (max-width: 768px) {
    padding: 20px 10px;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
    align-items: flex-start;
    justify-content: flex-start;
  }
`;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 12px); /* Account for 6px margins on each side */
  margin: 6px;
  padding: 0;
`;

export const VideoWrapper = styled.div`
  border: none;
  padding: 0;
  margin: 0;
  line-height: 0;
  width: 100%;
  max-width: 760px;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 0;
    
    iframe {
      width: 100% !important;
      height: auto !important;
      aspect-ratio: 16/9;
    }
  }
`;

export const VideoDescription = styled.div`
  width: 100%;
  max-width: 760px;
  text-align: center;
  padding: 16px 0;
  margin: 0;
`;

export const VideoTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const WindowWrapper = styled(Window)`
  width: ${props => {
    switch(true) {
      case props.isVideo:
        return '800px';
      case props.isBlogs:
        return '700px';
      case props.isNewsletter:
        return '700px';
      case props.isAbout:
        return '650px';
      case props.isCv:
        return '850px';
      case props.isHomm3Cv:
        return '1200px';
      case props.isDmk:
        return '765px';
      default:
        return '600px';
    }
  }};
  height: ${props => {
    switch(true) {
      case props.isVideo:
        return 'auto';
      case props.isBlogs:
        return '391px';
      case props.isNewsletter:
        return '400px';
      case props.isAbout:
        return '320px';
      case props.isCv:
        return '850px';
      case props.isHomm3Cv:
        return '1024px';
      case props.isDmk:
        return '470px';
      default:
        return 'auto';
    }
  }};
  max-width: 95vw;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add a subtle shadow for draggable windows */
  
  /* Set position only for case when not used with Rnd */
  &:not(.draggable) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  @media (max-width: 768px) {
    width: 95vw !important;
    height: auto !important;
    max-height: 80vh;
    
    /* Set position only for case when not used with Rnd */
    &:not(.draggable) {
      top: 8%;
      transform: translateX(-50%);
    }
  }
`;

export const StyledAppBar = styled(AppBar)`
  && {
    position: fixed; /* Change from absolute to fixed */
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    width: 100%;
    height: 48px;
    z-index: 9999;
  }
`;

export const TaskBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4px;
  justify-content: flex-start; /* Ensure alignment to the left */
`;

export const StartButtonStyled = styled(Button)`
  font-weight: bold;
  margin-right: 6px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 8px;
`;

export const AboutContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

export const ProfileImage = styled.img`
  width: 164px;
  height: 164px;
  border: 2px solid ${({ theme }) => theme.borderDark};
  padding: 2px;
  background: white;
`;

export const AboutContent = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: auto;
  position: ${props => props.isFixed ? 'static' : 'absolute'};
  bottom: ${props => props.isFixed ? 'auto' : '22px'};
  right: ${props => props.isFixed ? 'auto' : '22px'};
  
  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
    margin-bottom: 10px;
    justify-content: center;
    width: 100%;
  }
`;

export const StyledButton = styled(Button)`
  padding: 0 16px;
  min-width: 120px;
`;

export const BlogContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: ${props => props.isNewsletter ? 'center' : 'flex-start'};
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    overflow-y: auto;
    padding-bottom: 20px; /* Add padding to bottom for better spacing */
  }
`;

export const BlogContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 768px) {
    margin-top: 10px;
    width: 100%;
  }
`;

export const BlogImage = styled.img`
  width: ${props => {
    if (props.isNewsletter) return '200px';
    if (props.isHottakes) return '275px';  // Add specific size for hottakes
    return '300px';  // Default size
  }};
  height: ${props => {
    if (props.isNewsletter) return '200px';
    if (props.isHottakes) return '357px';  // Add specific size for hottakes
    return '300px';  // Default size
  }};
  border: ${props => props.isHottakes ? '2px inset #c0c0c0' : `2px solid ${props.theme.borderDark}`};
  padding: ${props => props.isHottakes ? '2px' : '2px'};
  background: ${props => props.isHottakes ? 'transparent' : props.theme.desktopBackground};
  
  @media (max-width: 768px) {
    width: ${props => {
      if (props.isNewsletter) return '150px';
      if (props.isHottakes) return '200px';
      return '200px';
    }};
    height: ${props => {
      if (props.isNewsletter) return '150px';
      if (props.isHottakes) return '260px';
      return '200px';
    }};
    max-width: 80%;
    height: auto;
    aspect-ratio: ${props => props.isHottakes ? '275/357' : '1/1'};
  }
`;

export const QuoteContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.material};
  border: 2px solid ${({ theme }) => theme.borderDark};
`;

export const PdfContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 6px;
  right: 6px;
  bottom: 12px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(80vh - 50px);
    min-height: 500px;
  }
`;

export const BoldText = styled.span`
  font-weight: bold;
`;

export const StyledListItem = styled(ListItem)`
  && {
    text-align: left !important;
    justify-content: flex-start !important;
    padding-left: 10px !important;
  }
`; 