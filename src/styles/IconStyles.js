import styled from 'styled-components';
import aboutMeIcon from '../assets/aboutme.png';
import cvIcon from '../assets/cv.png';
import blogsIcon from '../assets/blogs.png';
import newsletterIcon from '../assets/newsletter.png';
import vpIcon from '../assets/vp.png';
import dmIcon from '../assets/dm.png';
import soundIcon from '../assets/sound.png';
import homm3Icon from '../assets/homm3.png';

/* ===========================================
   ICON GRID CONFIGURATION
   =========================================== */

// Icon grid configuration - easily adjust these settings
export const CONFIG = {
  // Desktop icons
  DESKTOP: {
    // Layout properties
    ICONS_PER_COLUMN: 4,     // Number of icons per column
    ICON_WIDTH: 90,          // Width of icon container (px)
    ICON_HEIGHT: 105,        // Height of icon container (px)
    COLUMN_GAP: 40,          // Gap between columns (px)
    ICON_MARGIN_BOTTOM: 44,  // Space between icons (px)
    
    // Icon image properties
    ICON_IMAGE_SIZE: 60,     // Width/height of icon image (px)
    ICON_IMAGE_MARGIN: '0 auto', // CSS margin for image positioning
    ICON_IMAGE_ALIGN: 'center', // Alignment of image (center, flex-start, flex-end)
    ICON_IMAGE_TO_TEXT_GAP: 0, // Gap between image and text in pixels
    
    // Icon text properties
    ICON_TEXT_SIZE: 14,      // Font size for icon text (px)
    ICON_TEXT_HEIGHT: 50,    // Height of text container (px)
    ICON_TEXT_MARGIN: '10px 0 0 0', // Margin around text (top, right, bottom, left)
    ICON_TEXT_ALIGN: 'center', // Vertical alignment (flex-start, center, flex-end)
    ICON_TEXT_JUSTIFY: 'center', // Horizontal alignment (flex-start, center, flex-end)
    ICON_TEXT_MAX_LINES: 2,  // Maximum number of text lines
    ICON_TEXT_LINE_HEIGHT: 1.4, // Line height for text
    ICON_TEXT_MAX_WIDTH: 90, // Maximum width of text (px)
    TEXT_LINE_WIDTH: 85,     // Maximum width of each line of text (px)
    TEXT_BREAK_WORDS: false, // Whether to allow words to break across lines
  },
  
  // Mobile icons
  MOBILE: {
    // Layout properties
    ICONS_PER_COLUMN: 4,     // Number of icons per column
    ICON_WIDTH: 70,          // Width of icon container (px)
    ICON_HEIGHT: 90,         // Total height including grid gap
    COLUMN_GAP: 15,          // Gap between columns (px)
    ICON_MARGIN_BOTTOM: 22,  // Space between icons (px)
    ICON_GRID_GAP: 8,        // Gap between icon image and text in grid layout
    
    // Grid layout specific properties
    ICON_GRID_IMAGE_ROW_HEIGHT: 'auto', // Height for the image row in grid layout
    
    // Icon image properties
    ICON_IMAGE_SIZE: 45,     // Width/height of icon image (px)
    ICON_IMAGE_MARGIN: '0',  // CSS margin for image positioning
    ICON_IMAGE_ALIGN: 'end', // Alignment of image (center, flex-start, flex-end)
    
    // Icon text properties
    ICON_TEXT_SIZE: 12,      // Font size for icon text (px)
    ICON_TEXT_HEIGHT: 38,    // Height of text container (px) 
    ICON_TEXT_MARGIN: '4px 0 0 0', // Margin around text (top, right, bottom, left)
    ICON_TEXT_ALIGN: 'center', // Vertical alignment (flex-start, center, flex-end)
    ICON_TEXT_JUSTIFY: 'flex-start', // Horizontal alignment (flex-start, center, flex-end)
    ICON_TEXT_MAX_LINES: 3,  // Maximum number of text lines
    ICON_TEXT_LINE_HEIGHT: 1.2, // Line height for text
    ICON_TEXT_MAX_WIDTH: 70, // Maximum width of text (px)
    TEXT_LINE_WIDTH: 65,     // Maximum width of each line of text (px)
    TEXT_BREAK_WORDS: false, // Whether to allow words to break across lines
  },
  
  // GooseAmp
  GOOSEAMP: {
    // GooseAmp desktop
    DESKTOP: {
      // Position properties
      BOTTOM_POSITION: 100,  // Distance from bottom (px)
      RIGHT_POSITION: 20,    // Distance from right (px)
      WIDTH: 115,            // Width of container (px) - INCREASED FROM 90 to accommodate wider text
      
      // Image properties
      IMAGE_SIZE: 60,        // Width/height of icon image (px) - inherits from regular desktop if not specified
      IMAGE_MARGIN_BOTTOM: 0, // Space below image (px)
      IMAGE_MARGIN_LEFT: 14,  // Space to left of image (px)
      IMAGE_MARGIN_RIGHT: 0, // Space to right of image (px)
      IMAGE_ALIGN: 'center',  // Alignment of image (center, flex-start, flex-end)
      
      // Text properties
      ICON_TEXT_SIZE: 13,    // Font size for icon text (px) - REDUCED FROM 14 to fit more text
      TEXT_MAX_WIDTH: 115,   // Max width of text (px) - INCREASED FROM 90
      TEXT_MARGIN_TOP: 14,   // Space above text (px)
      TEXT_ALIGN: 'center',  // Vertical alignment (flex-start, center, flex-end)
      TEXT_JUSTIFY: 'center', // Horizontal alignment (flex-start, center, flex-end)
      TEXT_MAX_LINES: 2,     // Maximum number of text lines
      TEXT_LINE_HEIGHT: 1.2, // Line height for text
      TEXT_LINE_WIDTH: 110,  // Maximum width of each line of text (px) - INCREASED FROM 90
      TEXT_BREAK_WORDS: true, // Whether to allow words to break across lines
    },
    
    // GooseAmp mobile
    MOBILE: {
      // Position properties
      BOTTOM_POSITION: 70,   // Distance from bottom (px)
      RIGHT_POSITION: 35,    // Distance from right (px)
      WIDTH: 95,             // Width of container (px) - INCREASED FROM 80
      
      // Image properties
      IMAGE_SIZE: 45,        // Width/height of icon image (px) - inherits from regular mobile if not specified
      IMAGE_MARGIN_BOTTOM: 8, // Space below image (px)
      IMAGE_MARGIN_LEFT: 0,  // Space to left of image (px)
      IMAGE_MARGIN_RIGHT: 0, // Space to right of image (px)
      IMAGE_ALIGN: 'center',  // Alignment of image (center, flex-start, flex-end)
      
      // Text properties
      ICON_TEXT_SIZE: 11,    // Font size for icon text (px) - REDUCED FROM 12
      TEXT_MAX_WIDTH: 95,    // Max width of text (px) - REDUCED FROM 100
      TEXT_MARGIN_TOP: 4,    // Space above text (px)
      TEXT_ALIGN: 'center',  // Vertical alignment (flex-start, center, flex-end)
      TEXT_JUSTIFY: 'center', // Horizontal alignment (flex-start, center, flex-end)
      TEXT_MAX_LINES: 2,     // Maximum number of text lines
      TEXT_LINE_HEIGHT: 1.2, // Line height for text
      TEXT_LINE_WIDTH: 90,   // Maximum width of each line of text (px) - INCREASED FROM 75
      TEXT_BREAK_WORDS: true, // Whether to allow words to break across lines
    }
  }
};

// Desktop icons data
export const desktopIcons = [
  { 
    icon: aboutMeIcon, 
    label: 'About Me', 
    id: 'about', 
    title: 'Daniel Bass - Product Marketing Manager',
    visibility: {
      desktop: true,  // Show on desktop
      mobile: true    // Show on mobile
    }
  },
  { 
    icon: cvIcon, 
    label: 'Read My CV', 
    id: 'cv', 
    title: 'Read My CV',
    visibility: {
      desktop: true,  // Show on desktop
      mobile: true    // Show on mobile
    }
  },
  { 
    icon: blogsIcon, 
    label: 'Technical Blogs', 
    id: 'blogs', 
    title: 'Technical Blogs',
    visibility: {
      desktop: true,  // Show on desktop
      mobile: true    // Show on mobile
    }
  },
  { 
    icon: newsletterIcon, 
    label: 'Permit.io Newsletter', 
    id: 'newsletter', 
    title: 'Permit.io Newsletter',
    visibility: {
      desktop: true,  // Show on desktop
      mobile: true    // Show on mobile
    }
  },
  { 
    icon: dmIcon, 
    label: 'Developer Marketing', 
    id: 'hottakes', 
    title: 'Hot Developer Takes',
    visibility: {
      desktop: true,  // Show on desktop
      mobile: true    // Show on mobile
    }
  },
  { 
    icon: vpIcon, 
    label: 'Video Projects', 
    id: 'videos', 
    title: 'Video Projects',
    visibility: {
      desktop: true,  // Show on desktop
      mobile: true    // Show on mobile
    }
  },
  { 
    icon: homm3Icon,
    label: 'Heroes III', 
    id: 'homm3cv', 
    title: 'Heroes of Might and Magic III',
    visibility: {
      desktop: false,  // Show on desktop
      mobile: true    // Show on mobile
    }
  },
  {
    icon: soundIcon,
    label: 'LinKin_ParK-in_the_end.mp3',
    id: 'gooseamp',
    title: 'GooseAmp Music Player',
    visibility: {
      desktop: true,  // Show on desktop
      mobile: true    // Show on mobile
    }
  }
];

// For backward compatibility
export const DESKTOP_ICONS_PER_COLUMN = CONFIG.DESKTOP.ICONS_PER_COLUMN;
export const MOBILE_ICONS_PER_COLUMN = CONFIG.MOBILE.ICONS_PER_COLUMN;

/* ===========================================
   REGULAR ICON STYLES
   =========================================== */

// Main container for all icons
export const IconsContainer = styled.div`
  /* Layout properties */
  display: flex;
  flex-direction: row;
  width: auto;
  align-items: flex-start;
  justify-content: flex-start;
  
  /* Desktop specific by default */
  gap: ${CONFIG.DESKTOP.COLUMN_GAP}px;
  padding-top: 10px;
  
  /* Apply mobile styles with media queries for old code compatibility */
  @media (max-width: 768px) {
    gap: ${CONFIG.MOBILE.COLUMN_GAP}px;
    padding-top: 5px;
  }
`;

// Column container
export const IconColumn = styled.div`
  /* Layout properties */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0;
  
  /* Desktop specific by default */
  min-width: ${CONFIG.DESKTOP.ICON_WIDTH}px;
  width: ${CONFIG.DESKTOP.ICON_WIDTH}px;
  
  /* Apply mobile styles with media queries for old code compatibility */
  @media (max-width: 768px) {
    min-width: ${CONFIG.MOBILE.ICON_WIDTH}px;
    width: ${CONFIG.MOBILE.ICON_WIDTH}px;
    padding: 0;
    margin: 0;
  }
`;

// Wrapper for each individual icon
export const IconWrapper = styled.div`
  /* Layout properties */
  display: flex;
  justify-content: center;
  align-items: center;
  
  /* Use prop to determine styling */
  margin-bottom: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_MARGIN_BOTTOM : 
    CONFIG.DESKTOP.ICON_MARGIN_BOTTOM}px;
  
  /* Additional mobile styling */
  ${props => props.isMobile && `
    width: ${CONFIG.MOBILE.ICON_WIDTH}px;
    height: ${CONFIG.MOBILE.ICON_HEIGHT}px;
    padding: 0;
    display: grid;
    grid-template-rows: ${CONFIG.MOBILE.ICON_GRID_IMAGE_ROW_HEIGHT} ${CONFIG.MOBILE.ICON_TEXT_HEIGHT}px;
    grid-gap: ${CONFIG.MOBILE.ICON_GRID_GAP}px;
    justify-items: center;
    align-items: center;
  `}
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    margin-bottom: ${CONFIG.MOBILE.ICON_MARGIN_BOTTOM}px;
    width: ${CONFIG.MOBILE.ICON_WIDTH}px;
    height: ${CONFIG.MOBILE.ICON_HEIGHT}px;
    padding: 0;
    display: grid;
    grid-template-rows: ${CONFIG.MOBILE.ICON_GRID_IMAGE_ROW_HEIGHT} ${CONFIG.MOBILE.ICON_TEXT_HEIGHT}px;
    grid-gap: ${CONFIG.MOBILE.ICON_GRID_GAP}px;
    justify-items: center;
    align-items: center;
  }
`;

// Desktop icon component
export const DesktopIcon = styled.div`
  /* Common properties */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-align: center;
  transition: all 0.1s ease-in-out;
  
  /* Use prop to determine styling */
  width: ${props => props.isMobile ? '100%' : `${CONFIG.DESKTOP.ICON_WIDTH}px`};
  height: ${props => props.isMobile ? '100%' : `${CONFIG.DESKTOP.ICON_HEIGHT}px`};
  
  /* Additional mobile styling */
  ${props => props.isMobile && `
    margin: 0;
    padding: 0;
    display: contents;
  `}
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    display: contents; /* Let the grid handle the layout */
  }
`;

// Icon image
export const IconImage = styled.img`
  /* Common properties */
  display: block;
  image-rendering: pixelated;
  
  /* Use prop to determine styling */
  width: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_IMAGE_SIZE : 
    CONFIG.DESKTOP.ICON_IMAGE_SIZE}px;
  height: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_IMAGE_SIZE : 
    CONFIG.DESKTOP.ICON_IMAGE_SIZE}px;
  margin: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_IMAGE_MARGIN : 
    CONFIG.DESKTOP.ICON_IMAGE_MARGIN};
  align-self: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_IMAGE_ALIGN : 
    CONFIG.DESKTOP.ICON_IMAGE_ALIGN};
  margin-bottom: ${props => props.isMobile ? 
    0 : 
    CONFIG.DESKTOP.ICON_IMAGE_TO_TEXT_GAP}px;
    
  /* Additional mobile styling */
  ${props => props.isMobile && `
    padding: 0;
    grid-row: 1;
  `}
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    width: ${CONFIG.MOBILE.ICON_IMAGE_SIZE}px;
    height: ${CONFIG.MOBILE.ICON_IMAGE_SIZE}px;
    margin: ${CONFIG.MOBILE.ICON_IMAGE_MARGIN};
    padding: 0;
    grid-row: 1;
    align-self: ${CONFIG.MOBILE.ICON_IMAGE_ALIGN};
    margin-bottom: 0; /* Grid gap handles the spacing in mobile */
  }
`;

// Icon text
export const IconText = styled.span`
  /* Common properties */
  color: white;
  text-shadow: 1px 1px 1px black;
  text-align: center;
  box-sizing: border-box;
  
  /* Use prop to determine styling */
  font-size: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_SIZE : 
    CONFIG.DESKTOP.ICON_TEXT_SIZE}px;
  margin: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_MARGIN : 
    CONFIG.DESKTOP.ICON_TEXT_MARGIN};
  min-height: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_HEIGHT : 
    CONFIG.DESKTOP.ICON_TEXT_HEIGHT}px;
  height: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_HEIGHT : 
    CONFIG.DESKTOP.ICON_TEXT_HEIGHT}px;
  max-height: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_HEIGHT : 
    CONFIG.DESKTOP.ICON_TEXT_HEIGHT}px;
  line-height: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_LINE_HEIGHT : 
    CONFIG.DESKTOP.ICON_TEXT_LINE_HEIGHT};
  max-width: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_MAX_WIDTH : 
    CONFIG.DESKTOP.ICON_TEXT_MAX_WIDTH}px;
  justify-content: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_JUSTIFY : 
    CONFIG.DESKTOP.ICON_TEXT_JUSTIFY};
  align-items: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_ALIGN : 
    CONFIG.DESKTOP.ICON_TEXT_ALIGN};
  word-break: ${props => props.isMobile ? 
    (CONFIG.MOBILE.TEXT_BREAK_WORDS ? 'break-all' : 'normal') : 
    (CONFIG.DESKTOP.TEXT_BREAK_WORDS ? 'break-word' : 'normal')};
  hyphens: ${props => props.isMobile ? 
    (CONFIG.MOBILE.TEXT_BREAK_WORDS ? 'none' : 'auto') : 
    (CONFIG.DESKTOP.TEXT_BREAK_WORDS ? 'none' : 'auto')};
  -webkit-line-clamp: ${props => props.isMobile ? 
    CONFIG.MOBILE.ICON_TEXT_MAX_LINES : 
    CONFIG.DESKTOP.ICON_TEXT_MAX_LINES};
  width: ${props => props.isMobile ? 
    CONFIG.MOBILE.TEXT_LINE_WIDTH : 
    CONFIG.DESKTOP.TEXT_LINE_WIDTH}px;
  
  /* Additional desktop-specific styling */
  ${props => !props.isMobile && `
    padding: 2px 4px;
    width: 100%;
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    
    &::before {
      content: "";
      display: block;
      height: 0;
    }
  `}
  
  /* Additional mobile-specific styling */
  ${props => props.isMobile && `
    padding: 0;
    grid-row: 2;
    align-self: center;
  `}
  
  /* Common styles for both */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    font-size: ${CONFIG.MOBILE.ICON_TEXT_SIZE}px;
    min-height: ${CONFIG.MOBILE.ICON_TEXT_HEIGHT}px;
    height: ${CONFIG.MOBILE.ICON_TEXT_HEIGHT}px;
    max-height: ${CONFIG.MOBILE.ICON_TEXT_HEIGHT}px;
    margin: ${CONFIG.MOBILE.ICON_TEXT_MARGIN};
    padding: 0;
    line-height: ${CONFIG.MOBILE.ICON_TEXT_LINE_HEIGHT};
    max-width: ${CONFIG.MOBILE.ICON_TEXT_MAX_WIDTH}px;
    justify-content: ${CONFIG.MOBILE.ICON_TEXT_JUSTIFY};
    align-items: ${CONFIG.MOBILE.ICON_TEXT_ALIGN};
    grid-row: 2;
    align-self: center;
    
    /* Word break settings for mobile */
    word-break: ${CONFIG.MOBILE.TEXT_BREAK_WORDS ? 'break-all' : 'normal'};
    hyphens: ${CONFIG.MOBILE.TEXT_BREAK_WORDS ? 'none' : 'auto'};
    
    /* For mobile grid layout */
    display: -webkit-box;
    -webkit-line-clamp: ${CONFIG.MOBILE.ICON_TEXT_MAX_LINES};
    -webkit-box-orient: vertical;
    overflow: hidden;
    
    /* Control text wrapping with line width */
    width: ${CONFIG.MOBILE.TEXT_LINE_WIDTH}px;
  }
`;

/* ===========================================
   GOOSEAMP SPECIAL ICON STYLES
   =========================================== */

// Fixed position container for GooseAmp icon
export const FixedPositionIcon = styled.div`
  /* Common properties */
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1; /* Lower z-index so windows appear on top */
  
  /* Use prop to determine styling */
  bottom: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.BOTTOM_POSITION : 
    CONFIG.GOOSEAMP.DESKTOP.BOTTOM_POSITION}px;
  right: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.RIGHT_POSITION : 
    CONFIG.GOOSEAMP.DESKTOP.RIGHT_POSITION}px;
  width: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.WIDTH : 
    CONFIG.GOOSEAMP.DESKTOP.WIDTH}px;
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    bottom: ${CONFIG.GOOSEAMP.MOBILE.BOTTOM_POSITION}px;
    right: ${CONFIG.GOOSEAMP.MOBILE.RIGHT_POSITION}px;
    width: ${CONFIG.GOOSEAMP.MOBILE.WIDTH}px;
  }
`;

// Special styles for GooseAmp icon component
export const GooseAmpDesktopIcon = styled(DesktopIcon)`
  /* Common properties */
  cursor: pointer;
  height: auto; /* Override height to auto */
  
  /* Additional mobile styling */
  ${props => props.isMobile && `
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: ${CONFIG.GOOSEAMP.MOBILE.WIDTH}px;
  `}
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: ${CONFIG.GOOSEAMP.MOBILE.WIDTH}px;
    height: auto;
  }
`;

// Special styles for GooseAmp image
export const GooseAmpIconImage = styled(IconImage)`
  /* Use prop to determine styling */
  width: ${props => props.isMobile ? 
    (CONFIG.GOOSEAMP.MOBILE.IMAGE_SIZE || CONFIG.MOBILE.ICON_IMAGE_SIZE) : 
    (CONFIG.GOOSEAMP.DESKTOP.IMAGE_SIZE || CONFIG.DESKTOP.ICON_IMAGE_SIZE)}px;
  height: ${props => props.isMobile ? 
    (CONFIG.GOOSEAMP.MOBILE.IMAGE_SIZE || CONFIG.MOBILE.ICON_IMAGE_SIZE) : 
    (CONFIG.GOOSEAMP.DESKTOP.IMAGE_SIZE || CONFIG.DESKTOP.ICON_IMAGE_SIZE)}px;
  margin-bottom: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.IMAGE_MARGIN_BOTTOM : 
    CONFIG.GOOSEAMP.DESKTOP.IMAGE_MARGIN_BOTTOM}px;
  margin-left: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.IMAGE_MARGIN_LEFT : 
    CONFIG.GOOSEAMP.DESKTOP.IMAGE_MARGIN_LEFT}px;
  margin-right: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.IMAGE_MARGIN_RIGHT : 
    CONFIG.GOOSEAMP.DESKTOP.IMAGE_MARGIN_RIGHT}px;
  align-self: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.IMAGE_ALIGN : 
    CONFIG.GOOSEAMP.DESKTOP.IMAGE_ALIGN};
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    width: ${CONFIG.GOOSEAMP.MOBILE.IMAGE_SIZE || CONFIG.MOBILE.ICON_IMAGE_SIZE}px;
    height: ${CONFIG.GOOSEAMP.MOBILE.IMAGE_SIZE || CONFIG.MOBILE.ICON_IMAGE_SIZE}px;
    margin-bottom: ${CONFIG.GOOSEAMP.MOBILE.IMAGE_MARGIN_BOTTOM}px;
    margin-left: ${CONFIG.GOOSEAMP.MOBILE.IMAGE_MARGIN_LEFT}px;
    margin-right: ${CONFIG.GOOSEAMP.MOBILE.IMAGE_MARGIN_RIGHT}px;
    align-self: ${CONFIG.GOOSEAMP.MOBILE.IMAGE_ALIGN};
  }
`;

// Special styles for GooseAmp text
export const GooseAmpIconText = styled(IconText)`
  /* Use prop to determine styling */
  font-size: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.ICON_TEXT_SIZE : 
    CONFIG.GOOSEAMP.DESKTOP.ICON_TEXT_SIZE}px;
  margin-top: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.TEXT_MARGIN_TOP : 
    CONFIG.GOOSEAMP.DESKTOP.TEXT_MARGIN_TOP}px;
  max-width: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.TEXT_MAX_WIDTH : 
    CONFIG.GOOSEAMP.DESKTOP.TEXT_MAX_WIDTH}px;
  justify-content: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.TEXT_JUSTIFY : 
    CONFIG.GOOSEAMP.DESKTOP.TEXT_JUSTIFY};
  align-items: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.TEXT_ALIGN : 
    CONFIG.GOOSEAMP.DESKTOP.TEXT_ALIGN};
  line-height: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.TEXT_LINE_HEIGHT : 
    CONFIG.GOOSEAMP.DESKTOP.TEXT_LINE_HEIGHT};
  word-break: ${props => props.isMobile ? 
    (CONFIG.GOOSEAMP.MOBILE.TEXT_BREAK_WORDS ? 'break-word' : 'normal') : 
    (CONFIG.GOOSEAMP.DESKTOP.TEXT_BREAK_WORDS ? 'break-word' : 'normal')};
  hyphens: ${props => props.isMobile ? 
    (CONFIG.GOOSEAMP.MOBILE.TEXT_BREAK_WORDS ? 'none' : 'auto') : 
    (CONFIG.GOOSEAMP.DESKTOP.TEXT_BREAK_WORDS ? 'none' : 'auto')};
  -webkit-line-clamp: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.TEXT_MAX_LINES : 
    CONFIG.GOOSEAMP.DESKTOP.TEXT_MAX_LINES};
  width: ${props => props.isMobile ? 
    CONFIG.GOOSEAMP.MOBILE.TEXT_LINE_WIDTH : 
    CONFIG.GOOSEAMP.DESKTOP.TEXT_LINE_WIDTH}px;
    
  /* Common GooseAmp text overrides */
  min-height: unset;
  height: auto;
  max-height: none;
  overflow-wrap: break-word;
  white-space: normal;
  text-align: center;
  
  /* Media query fallback for old code compatibility */
  @media (max-width: 768px) {
    font-size: ${CONFIG.GOOSEAMP.MOBILE.ICON_TEXT_SIZE}px;
    line-height: ${CONFIG.GOOSEAMP.MOBILE.TEXT_LINE_HEIGHT};
    margin-top: ${CONFIG.GOOSEAMP.MOBILE.TEXT_MARGIN_TOP}px;
    max-width: ${CONFIG.GOOSEAMP.MOBILE.TEXT_MAX_WIDTH}px;
    justify-content: ${CONFIG.GOOSEAMP.MOBILE.TEXT_JUSTIFY};
    align-items: ${CONFIG.GOOSEAMP.MOBILE.TEXT_ALIGN};
    
    /* Word break settings for GooseAmp mobile */
    word-break: ${CONFIG.GOOSEAMP.MOBILE.TEXT_BREAK_WORDS ? 'break-word' : 'normal'};
    hyphens: ${CONFIG.GOOSEAMP.MOBILE.TEXT_BREAK_WORDS ? 'none' : 'auto'};
    
    /* Override height settings from base component for flexible height */
    min-height: unset;
    height: auto;
    max-height: none;
    
    /* Special handling for mobile GooseAmp text */
    white-space: normal;
    -webkit-line-clamp: ${CONFIG.GOOSEAMP.MOBILE.TEXT_MAX_LINES};
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-align: center;
    
    /* Control text wrapping with line width */
    width: ${CONFIG.GOOSEAMP.MOBILE.TEXT_LINE_WIDTH}px;
    
    /* Additional text control for long filenames */
    overflow-wrap: break-word;
  }
`; 