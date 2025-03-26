import React from 'react';
import { 
  VideoContainer, 
  VideoWrapper, 
  VideoDescription, 
  VideoTitle 
} from '../styles/StyledComponents';

const VideoProjectsWindow = () => {
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
};

export default VideoProjectsWindow; 