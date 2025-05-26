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
import blogImage from '../assets/blog.png';
import newsletterImage from '../assets/e.jpg';

const BlogWindow = ({ type }) => {
  const isNewsletter = type === 'newsletter';
  
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
                Newsletter authored by me, dedicated to providing an engaging take on Identity and Access Management (IAM).
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Hosted on Substack, it includes in-depth articles, practical advice, useful resources, the <i>spiciest</i> of memes, and a recurring comic strip (Illustrated by <a href="https://www.danayeva.com/" target="_blank" rel="noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>Dana Petrov</a>).
              </p>
              <QuoteContainer>
                <p style={{ fontStyle: 'italic' }}>
                  "I don't care if GPT tries to replicate my writing style and steal my memes. Good luck, buddy."
                </p>
              </QuoteContainer>
            </>
          ) : (
            <>
              <p style={{ marginBottom: '1rem' }}>
                A collection of all thought leadership and technical tutorials I wrote is available on the Permit.io blog.
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Written as part of our content strategy, they comprise <BoldText>~50% of total website traffic.</BoldText>
              </p>
              <p style={{ marginBottom: '1rem' }}>
                Yeah.
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
            {isNewsletter ? 'Read Here' : 'Take a Look'}
          </StyledButton>
        </ButtonContainer>
      </BlogContent>
    </BlogContainer>
  );
};

export default BlogWindow; 