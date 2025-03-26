import React from 'react';
import { 
  BlogContainer, 
  BlogImage, 
  BlogContent, 
  ButtonContainer, 
  StyledButton,
  QuoteContainer 
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
};

export default BlogWindow; 