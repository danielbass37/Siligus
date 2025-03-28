import React, { useEffect, useState } from 'react';
import { PdfContainer } from '../styles/StyledComponents';
import cvFile from '../assets/Daniel Bass - Product Marketing Manager.pdf';

const CVWindow = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Detect mobile on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <PdfContainer>
      <iframe
        src={cvFile}
        style={{ 
          width: '100%',
          height: isMobile ? 'calc(80vh - 50px)' : '100%', // Adjust height for mobile
          minHeight: isMobile ? '500px' : 'auto', // Ensure minimum height on mobile
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
};

export default CVWindow; 