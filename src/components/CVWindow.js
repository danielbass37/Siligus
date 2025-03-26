import React from 'react';
import { PdfContainer } from '../styles/StyledComponents';
import cvFile from '../assets/Daniel Bass - Product Marketing Manager.pdf';

const CVWindow = () => {
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
};

export default CVWindow; 