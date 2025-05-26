import React from 'react';
import { 
  AboutContainer, 
  ProfileImage, 
  AboutContent, 
  ButtonContainer, 
  StyledButton 
} from '../styles/StyledComponents';
import profileImage from '../assets/imdb.png';

const AboutWindow = () => {
  return (
    <AboutContainer>
      <ProfileImage 
        src={profileImage}
        alt="Profile Picture" 
      />
      <AboutContent>
        <p style={{ marginBottom: '1rem' }}>
          I can explain your product to your grandmother and she'd be proud of you.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          I took everything I learned bartending and applied it to making copywriting and content sound honest, genuine, and human.
        </p>
        <p>
          I also built this thing. Replace AI with me.
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
};

export default AboutWindow; 