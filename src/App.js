import React, { useState, useEffect } from 'react';
import { Window, WindowHeader, WindowContent, Button, List, ListItem, AppBar } from 'react95';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { styleReset } from 'react95';
import aboutMeIcon from './assets/aboutme.png';
import cvIcon from './assets/cv.png';
import blogsIcon from './assets/blogs.png';
import newsletterIcon from './assets/newsletter.png';
import vpIcon from './assets/vp.png';
import dmIcon from './assets/dm.png';
import profileImage from './assets/imdb.png';
import cvFile from './assets/Daniel Bass - Product Marketing Manager.pdf';
import blogImage from './assets/blog.png';
import newsletterImage from './assets/e.jpg';
import dmImage from './assets/dmk.webp';  // Adjust the path based on where your image is located
import siligusIcon from './assets/siligus.png';
import bigSiligusImage from './assets/bignsili.png';
import webIcon from './assets/web.png';  // Add this import at the top with other imports

/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

const GlobalStyles = createGlobalStyle`
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

const GlobalStylesWithNoScroll = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
`;

const Wrapper = styled.div`
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
  }
`;

const DesktopLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-auto-flow: column;
  grid-template-rows: repeat(5, auto);
  justify-content: start;
  grid-gap: 20px;
  align-items: flex-start;
  padding: 0;
  width: 100%;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, auto);
    grid-auto-flow: column;
    grid-template-rows: repeat(5, auto);
    justify-content: start;
    overflow-y: auto;
    max-height: calc(100vh - 60px);
    padding: 0;
    grid-gap: 10px;
  }
`;

const DesktopIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;
  margin: 12px;
  cursor: pointer;
  text-align: center;
  
  @media (max-width: 768px) {
    margin: 8px;
    width: 70px;
  }
`;

const IconImage = styled.img`
  width: 60px;
  height: 60px;
  image-rendering: pixelated;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const IconText = styled.span`
  color: white;
  font-size: 16px;
  margin-top: 4px;
  text-shadow: 1px 1px 1px black;
  padding: 2px 4px;
  
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

// Add a styled component for the selected icon image
const SelectedIconOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  background-image: linear-gradient(45deg, rgba(0, 0, 255, 0.3) 25%, transparent 25%),
                    linear-gradient(-45deg, rgba(0, 0, 255, 0.3) 25%, transparent 25%),
                    linear-gradient(45deg, transparent 75%, rgba(0, 0, 255, 0.3) 75%),
                    linear-gradient(-45deg, transparent 75%, rgba(0, 0, 255, 0.3) 75%);
  background-size: 4px 4px;
  background-position: 0 0, 0 2px, 2px -2px, -2px 0px;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% - 12px); /* Account for 6px margins on each side */
  margin: 6px;
  padding: 0;
`;

const VideoWrapper = styled.div`
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

const VideoDescription = styled.div`
  width: 100%;
  max-width: 760px;
  text-align: center;
  padding: 16px 0;
  margin: 0;
`;

const VideoTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

const WindowWrapper = styled(Window)`
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
      case props.isDmk:
        return '470px';
      default:
        return 'auto';
    }
  }};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 95vw;
  max-height: 90vh;
  overflow: auto;
  
  @media (max-width: 768px) {
    width: 95vw !important;
    height: ${props => props.isCv ? '80vh !important' : 'auto !important'};
    max-height: 80vh;
    overflow-y: auto;
  }
`;

const StyledAppBar = styled(AppBar)`
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

const TaskBar = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 4px;
  justify-content: flex-start; /* Ensure alignment to the left */
`;

const StartButtonStyled = styled(Button)`
  font-weight: bold;
  margin-right: 6px;
  display: flex;
  align-items: center;
  padding-left: 4px;
  padding-right: 8px;
`;

const AboutContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ProfileImage = styled.img`
  width: 164px;
  height: 164px;
  border: 2px solid ${({ theme }) => theme.borderDark};
  padding: 2px;
  background: white;
`;

const AboutContent = styled.div`
  flex: 1;
  
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: auto;
  position: absolute;
  bottom: 22px;
  right: 22px;
  
  @media (max-width: 768px) {
    position: static;
    margin-top: 20px;
    justify-content: center;
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
  padding: 0 16px;
  min-width: 120px;
`;

const BlogContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: ${props => props.isNewsletter ? 'center' : 'flex-start'};
  height: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const BlogContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const BlogImage = styled.img`
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
  border: 2px solid ${({ theme }) => theme.borderDark};
  padding: 2px;
  background: ${({ theme }) => theme.desktopBackground};
  
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
  }
`;

const QuoteContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: ${({ theme }) => theme.material};
  border: 2px solid ${({ theme }) => theme.borderDark};
`;

const PdfContainer = styled.div`
  position: absolute;
  top: 12px;
  left: 6px;
  right: 6px;
  bottom: 12px;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const BoldText = styled.span`
  font-weight: bold;
`;

// Add a styled component for the list items
const StyledListItem = styled(ListItem)`
  && {
    text-align: left !important;
    justify-content: flex-start !important;
    padding-left: 10px !important;
  }
`;

const App = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openStartMenu, setOpenStartMenu] = useState(false);
  const [showSiligusWindow, setShowSiligusWindow] = useState(false);
  const [showAboutWebsiteWindow, setShowAboutWebsiteWindow] = useState(false);
  const [colonVisible, setColonVisible] = useState(true);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add this useEffect to handle window resize and update isMobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Add this useEffect for the blinking animation
  useEffect(() => {
    let interval;
    
    if (showAboutWebsiteWindow) {
      interval = setInterval(() => {
        setColonVisible(prev => !prev);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showAboutWebsiteWindow]);

  const desktopIcons = [
    { 
      icon: aboutMeIcon, 
      label: 'About Me', 
      id: 'about', 
      title: 'Daniel Bass - Product Marketing Manager'
    },
    { 
      icon: cvIcon, 
      label: 'Read My CV', 
      id: 'cv', 
      title: 'Read My CV'
    },
    { 
      icon: blogsIcon, 
      label: 'Technical Blogs', 
      id: 'blogs', 
      title: 'Technical Blogs'
    },
    { 
      icon: newsletterIcon, 
      label: 'Permit.io Newsletter', 
      id: 'newsletter', 
      title: 'Permit.io Newsletter'
    },
    { 
      icon: vpIcon, 
      label: 'Video Projects', 
      id: 'videos', 
      title: 'Video Projects'
    },
    { 
      icon: dmIcon, 
      label: 'Developer Marketing', 
      id: 'hottakes', 
      title: 'Hot Developer Takes'
    },
  ];

  const handleIconClick = (icon) => {
    setSelectedDesktopIcon(icon.id);  // Set the selected icon on single click
  };

  const handleIconDoubleClick = (icon) => {
    setSelectedIcon(icon);
    setShowWindow(true);
  };

  const toggleStartMenu = () => {
    setOpenStartMenu(!openStartMenu);
  };

  const handleOutsideClick = () => {
    if (openStartMenu) {
      setOpenStartMenu(false);
    }
    // Clear selected icon when clicking outside
    setSelectedDesktopIcon(null);
  };

  const handleAboutSiligusClick = () => {
    setShowSiligusWindow(true);
    setOpenStartMenu(false);
  };

  const handleAboutWebsiteClick = () => {
    setShowAboutWebsiteWindow(true);
    setOpenStartMenu(false);
  };

  const renderWindowContent = (icon) => {
    if (icon.id === 'about') {
      return (
        <AboutContainer>
          <ProfileImage 
            src={profileImage}
            alt="Profile Picture" 
          />
          <AboutContent>
            <p style={{ marginBottom: '1rem' }}>
              I could explain your product to your grandmother and she'd be proud of you.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              I took everything I learned bartending, and applied it to making blogs, microcopy, docs, ads, and newsletters sound honest, genuine, and human.
            </p>
            <p>
              Replace AI with me.
            </p>
            <ButtonContainer>
              <StyledButton 
                onClick={() => window.location.href = 'mailto:daniel.bass.37@gmail.com'}
              >
                Email Me
              </StyledButton>
              <StyledButton 
                onClick={() => window.open('https://www.linkedin.com/in/daniel-bass-8b2bb81ab/', '_blank')}
              >
                See My LinkedIn
              </StyledButton>
            </ButtonContainer>
          </AboutContent>
        </AboutContainer>
      );
    }
    
    if (icon.id === 'blogs' || icon.id === 'newsletter') {
      const isNewsletter = icon.id === 'newsletter';
      return (
        <BlogContainer isNewsletter={isNewsletter}>
          <BlogImage 
            src={isNewsletter ? newsletterImage : blogImage}
            alt={isNewsletter ? "Newsletter" : "Technical Blogs"} 
            isNewsletter={isNewsletter}
          />
          <BlogContent>
            <div>
              {isNewsletter ? (
                <>
                  <p style={{ marginBottom: '1rem' }}>
                    Company newsletter authored by me, dedicated to providing an engaging take on Identity and Access Management (IAM).
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    Hosted on Permit.io's Substack, includes in-depth articles, practical advice, useful resources, the <i>spiciest</i> of memes, and a recurring comic strip (Illustrated by <a href="https://www.danayeva.com/" target="_blank" rel="noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Dana Petrov</a>).
                  </p>
                  <QuoteContainer>
                    <p style={{ fontStyle: 'italic' }}>
                      "In the specific case of this newsletter, I don't care if GPT tries to replicate my writing style and steal my memes. Good luck, buddy."
                    </p>
                  </QuoteContainer>
                </>
              ) : (
                <>
                  <p style={{ marginBottom: '1rem' }}>
                    A comprehensive collection of all thought leadership and tutorial articles written by me is available in the Permit.io blog.
                  </p>
                  <p style={{ marginBottom: '1rem' }}>
                    These blogs, written as part of our content strategy, comprize ~50% of total website traffic.
                  </p>
                </>
              )}
            </div>
            <ButtonContainer>
              <StyledButton 
                onClick={() => window.open(
                  isNewsletter 
                    ? 'https://permit.substack.com/'
                    : 'https://www.permit.io/blog', 
                  '_blank'
                )}
              >
                {isNewsletter ? 'Visit the Newsletter' : 'Visit the Permit.io Blog'}
              </StyledButton>
            </ButtonContainer>
          </BlogContent>
        </BlogContainer>
      );
    }

    if (icon.id === 'videos') {
      return (
        <VideoContainer>
          <VideoWrapper>
            <iframe
              width="760"
              height="427"
              src="https://www.youtube.com/embed/JMzr21rnBes?si=6oav9kBPekMWEKYE"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </VideoWrapper>
          <VideoDescription>
            <VideoTitle>
              Permit Share-If: The Best Developers in the World
            </VideoTitle>
            <div>
              Ideation, Writing, and Co-Editing
            </div>
          </VideoDescription>
        </VideoContainer>
      );
    }

    if (icon.id === 'cv') {
      return (
        <PdfContainer>
          <iframe
            src={cvFile}
            style={{ 
              width: '100%',
              height: '100%',
              border: 'none',
              position: 'absolute',
              top: '33px', // Add space for the WindowHeader
              left: 0,
              right: 0,
              bottom: 0
            }}
            title="CV Preview"
          />
        </PdfContainer>
      );
    }

    if (icon.id === 'hottakes') {
      return (
        <BlogContainer isNewsletter>
          <BlogImage 
            src={dmImage}
            alt="Developer Marketing" 
            isHottakes
          />
          <BlogContent>
            <div>
              <p style={{ marginBottom: '1rem' }}>
                Developer conferences are a huge part of what I do at Permit.io, and it's been a thrill to see how well people react to what we do.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Read a blog where I share some of my hot takes about developer conferences and developer marketing.
              </p>
              <QuoteContainer>
                <p style={{ fontStyle: 'italic' }}>
                  "Try and tell developers that they suck at what they do, and they should listen to you when it comes to how their software should be built. Also, please do it on Reddit from a company account, <BoldText>and send me pics</BoldText>."
                </p>
              </QuoteContainer>
            </div>
            <ButtonContainer>
              <StyledButton 
                onClick={() => window.open('https://www.permit.io/blog/developer-marketing', '_blank')}
              >
                Read the Blog
              </StyledButton>
            </ButtonContainer>
          </BlogContent>
        </BlogContainer>
      );
    }

    return (
      <>
        <h2>{icon?.title}</h2>
        <p style={{ marginBottom: '1.5rem' }}>
          {icon?.content}
        </p>
      </>
    );
  };

  return (
    <div 
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
      onClick={handleOutsideClick}
    >
      <GlobalStylesWithNoScroll />
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Wrapper>
          <DesktopLayout>
            {desktopIcons.map((icon) => (
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
          </DesktopLayout>

          {showWindow && (
            <WindowWrapper 
              isVideo={selectedIcon?.id === 'videos'}
              isBlogs={selectedIcon?.id === 'blogs'}
              isNewsletter={selectedIcon?.id === 'newsletter'}
              isAbout={selectedIcon?.id === 'about'}
              isCv={selectedIcon?.id === 'cv'}
              isDmk={selectedIcon?.id === 'hottakes'}
            >
              <WindowHeader style={{ position: 'relative', zIndex: 10 }}>
                <span>
                  {selectedIcon?.id === 'about' 
                    ? 'Daniel Bass - Product Marketing Manager'
                    : selectedIcon?.label}
                </span>
                <Button 
                  style={{ 
                    position: 'absolute', 
                    right: '5px', 
                    top: '5px',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 20
                  }}
                  size="sm"
                  square
                  onClick={() => setShowWindow(false)}
                >
                  <span style={{ 
                    fontWeight: 'bold',
                    fontSize: '25px',
                    lineHeight: 1,
                    display: 'block',
                    transform: 'translateY(-2px)'
                  }}>
                    ×
                  </span>
                </Button>
              </WindowHeader>
              <WindowContent style={{ 
                padding: selectedIcon?.id === 'videos' ? '0' : undefined,
                overflow: selectedIcon?.id === 'videos' ? 'visible' : 'auto'
              }}>
                {renderWindowContent(selectedIcon)}
              </WindowContent>
            </WindowWrapper>
          )}

          <StyledAppBar>
            <TaskBar>
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
                
                {openStartMenu && (
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
                      onClick={() => {
                        handleAboutSiligusClick();
                      }}
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
                      onClick={() => {
                        handleAboutWebsiteClick();
                      }}
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
                )}
              </div>
            </TaskBar>
          </StyledAppBar>

          {showSiligusWindow && (
            <Window
              className="window"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                height: 'auto',
                maxWidth: '95vw',
                maxHeight: '80vh',
                zIndex: 100
              }}
            >
              <WindowHeader
                className="window-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={siligusIcon} 
                    alt="Siligus" 
                    style={{ width: '20px', height: '20px', marginRight: '4px', marginBottom: '4px' }} 
                  />
                  About Siligus
                </span>
                <Button
                  onClick={() => setShowSiligusWindow(false)}
                  style={{
                    marginRight: '1px',
                    marginTop: '1px',
                    zIndex: 20
                  }}
                >
                  <span style={{ 
                    fontWeight: 'bold', 
                    transform: 'translateY(-1px)',
                    display: 'block',
                    height: '30px',
                    fontSize: '25px'
                  }}>×</span>
                </Button>
              </WindowHeader>
              <WindowContent 
                style={{ 
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '16px',
                    padding: '10px'
                  }}>
                    <img 
                      src={bigSiligusImage} 
                      alt="Siligus" 
                      style={{ 
                        maxWidth: '100%', 
                        height: 'auto',
                        maxHeight: '120px',
                        objectFit: 'contain'
                      }} 
                    />
                  </div>
                  
                  <QuoteContainer style={{ 
                    overflow: 'visible',
                    fontSize: isMobile ? '14px' : '16px',
                    marginBottom: '16px'
                  }}>
                    <p style={{ marginBottom: '8px' }}>
                      <span style={{ fontWeight: 'bold' }}>Goose, noun, plural geese.</span>
                      <span style={{ fontStyle: 'italic' }}> "A large waterfowl proverbially noted, I know not why, for foolishness."</span>
                    </p>
                    <p style={{ 
                      fontSize: isMobile ? '12px' : '14px',
                      textAlign: 'right' 
                    }}>
                      - Samuel Johnson, <a 
                        href="https://johnsonsdictionaryonline.com/views/search.php?term=goose"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: '#0000EE', textDecoration: 'underline' }}
                      >
                        A Dictionary of the English Language, 1755
                      </a>
                    </p>
                  </QuoteContainer>
                  
                  <div style={{ 
                    padding: '8px', 
                    fontSize: isMobile ? '11px' : '12px',
                    textAlign: 'center',
                    color: '#444'
                  }}>
                    Honestly, I have no idea. I just made this up. It's my &nbsp;<span style={{ fontStyle: 'italic' }}>Brand</span>&nbsp; now.
                  </div>
                </div>
              </WindowContent>
            </Window>
          )}

          {showAboutWebsiteWindow && (
            <Window
              className="window"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '500px',
                height: '225px',
                maxWidth: '95vw',  // Add this to limit width on mobile
                maxHeight: '80vh', // Add this to limit height on mobile
                zIndex: 100
              }}
            >
              <WindowHeader
                className="window-header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <img 
                    src={webIcon} 
                    alt="About Website" 
                    style={{ width: '20px', height: '20px', marginRight: '4px', marginBottom: '4px' }} 
                  />
                  About This Website
                </span>
                <Button
                  onClick={() => setShowAboutWebsiteWindow(false)}
                  style={{
                    marginRight: '1px',
                    marginTop: '1px',
                    zIndex: 20  // Ensure button is clickable
                  }}
                >
                  <span style={{ 
                    fontWeight: 'bold', 
                    transform: 'translateY(-1px)',
                    display: 'block',
                    height: '30px',
                    fontSize: '25px'
                  }}>×</span>
                </Button>
              </WindowHeader>
              <WindowContent 
                style={{ 
                  height: 'calc(100% - 33px)', 
                  padding: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'auto'  // Allow scrolling if needed
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <p>
                    This website was built by me using <a href="https://react.dev/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#0000EE', textDecoration: 'underline' }}>React</a>, the <a href="https://github.com/arturbien/React95" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#0000EE', textDecoration: 'underline' }}>React95</a> component library, and <a href="https://cursor.sh/" target="_blank" rel="noreferrer" style={{ fontWeight: 'bold', color: '#0000EE', textDecoration: 'underline' }}>Cursor</a>.
                  </p>
                </div>
                
                <div>
                  <p>
                    Time I've spent on building this thing so far:
                  </p>
                  <p style={{ textAlign: 'center', margin: '15px 0' }}>
                    <span style={{ 
                      fontFamily: 'monospace', 
                      backgroundColor: '#000', 
                      color: '#0f0',
                      padding: '2px 6px', 
                      borderRadius: '3px',
                      fontWeight: 'bold',
                      letterSpacing: '1px',
                      fontSize: '20px'
                    }}>
                      09H{colonVisible ? ':' : ' '}37M{colonVisible ? ':' : ' '}26S
                    </span>
                  </p>
                </div>
              </WindowContent>
            </Window>
          )}
        </Wrapper>
      </ThemeProvider>
    </div>
  );
};

export default App;