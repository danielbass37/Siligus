import React from 'react';
import { 
  BlogContainer, 
  BlogImage, 
  BlogContent, 
  ButtonContainer, 
  StyledButton,
  QuoteContainer,
  BoldText
} from '../styles/StyledComponents';
import dmImage from '../assets/dmk.webp';

const DeveloperMarketingWindow = () => {
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
};

export default DeveloperMarketingWindow; 