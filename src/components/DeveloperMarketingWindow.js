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
import dmImage from '../assets/dmk.gif';

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
            Developer conferences are a huge part of what I do, and it's been a thrill to see how people react to them.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            Read a blog where I share some of my hot takes about developer conferences and developer marketing.
          </p>
          <QuoteContainer>
            <p style={{ fontStyle: 'italic' }}>
              "Try and tell developers that they suck at what they do, and that you know their software better than them. Also, please do it on Reddit from a company account, <BoldText>and send me pics</BoldText>."
            </p>
          </QuoteContainer>
        </div>
        <ButtonContainer isFixed>
          <StyledButton 
            onClick={() => window.open('https://permit.substack.com/p/oh-no-dont-look-its-developer-marketing', '_blank')}
          >
            Read the Blog
          </StyledButton>
        </ButtonContainer>
      </BlogContent>
    </BlogContainer>
  );
};

export default DeveloperMarketingWindow; 