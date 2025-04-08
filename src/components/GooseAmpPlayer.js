import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faStepBackward, faStepForward, faRandom, faRedo, faEject } from '@fortawesome/free-solid-svg-icons';
import { Rnd } from 'react-rnd';
import toggleImage from '../assets/toggle.png';
import {
  GooseAmpWrapper,
  GooseAmpTitleBar,
  GooseAmpLogoText,
  GooseAmpButtons,
  GooseAmpButton,
  GooseAmpMainArea,
  GooseAmpDisplay,
  GooseAmpVisualizer,
  GooseAmpPlayStatus,
  GooseAmpPlayTime,
  GooseAmpSongInfo,
  GooseAmpSongTitle,
  GooseAmpSongDetails,
  GooseAmpDetail,
  GooseAmpSliderContainer,
  GooseAmpSliderTrack,
  GooseAmpSliderProgress,
  GooseAmpSliderThumb,
  GooseAmpControls,
  GooseAmpMainControls,
  GooseAmpControlButton,
  GooseAmpExtraControls,
  GooseAmpExtraButton,
  HiddenYouTube,
  FontStyles
} from '../styles/GooseAmpStyles';

// Updated to Linkin Park - In The End
const YOUTUBE_VIDEO_ID = 'eVTXPUF4Oz4'; // Linkin Park - In The End

const GooseAmpPlayer = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('3:36'); // Default duration for "In The End"
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const sliderRef = useRef(null);
  const songTitle = "1. Linkin Park - In The End.mp3";

  // Detect mobile device and set position
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    // Setup position based on device
    if (isMobile) {
      // For mobile devices, position more to the left
      setPosition({ x: 20, y: 100 });
    } else {
      // For desktop, use the original position
      setPosition({ x: 250, y: 150 });
    }
    
    // Listen for window resize
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 768;
      if (isMobileView) {
        setPosition(prev => ({ ...prev, x: Math.min(prev.x, 20) }));
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const opts = {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleReady = (event) => {
    playerRef.current = event.target;
    setIsReady(true);
    // Set the actual duration when the video is ready
    const totalTime = event.target.getDuration();
    const minutes = Math.floor(totalTime / 60);
    const seconds = Math.floor(totalTime % 60);
    setDuration(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    
    // Start playing immediately when ready
    event.target.playVideo();
    setIsPlaying(true);
  };

  useEffect(() => {
    let timeUpdateInterval;
    
    if (isPlaying && playerRef.current) {
      timeUpdateInterval = setInterval(() => {
        const time = Math.floor(playerRef.current.getCurrentTime());
        const totalTime = playerRef.current.getDuration();
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        
        // Update progress
        if (totalTime) {
          setProgress((time / totalTime) * 100);
        }
      }, 500);
    }
    
    return () => {
      if (timeUpdateInterval) clearInterval(timeUpdateInterval);
    };
  }, [isPlaying]);

  const handlePlay = () => {
    if (!isReady) return;
    playerRef.current.playVideo();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!isReady) return;
    playerRef.current.pauseVideo();
    setIsPlaying(false);
  };

  const handleStop = () => {
    if (!isReady) return;
    playerRef.current.stopVideo();
    setIsPlaying(false);
    setCurrentTime('0:00');
    setProgress(0);
  };

  // These functions are mocks since we only have one song
  const handlePrevious = () => {
    handleStop();
    setTimeout(handlePlay, 500);
  };

  const handleNext = () => {
    handleStop();
    setTimeout(handlePlay, 500);
  };

  const handleSliderClick = (e) => {
    if (!isReady || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const percentage = clickPosition / rect.width;
    
    // Ensure percentage is between 0 and 1
    const cappedPercentage = Math.max(0, Math.min(1, percentage));
    
    if (playerRef.current) {
      const duration = playerRef.current.getDuration();
      const newTime = duration * cappedPercentage;
      
      playerRef.current.seekTo(newTime);
      setProgress(cappedPercentage * 100);
      
      if (!isPlaying) {
        handlePlay();
      }
    }
  };

  // Handle close button click/touch with multiple event handlers
  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add a small timeout to ensure the event has time to be processed
    setTimeout(() => {
      if (onClose) onClose();
    }, 10);
  };

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: 375,
        height: 'auto'
      }}
      position={position}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      enableResizing={false}
      dragHandleClassName="gooseamp-title-bar"
    >
      <GooseAmpWrapper>
        <FontStyles />
        <GooseAmpTitleBar className="gooseamp-title-bar">
          <GooseAmpLogoText>GOOSEAMP</GooseAmpLogoText>
          <GooseAmpButtons>
            <GooseAmpButton 
              close 
              title="Close" 
              onClick={handleCloseClick}
              onTouchStart={handleCloseClick}
            >
              X
            </GooseAmpButton>
          </GooseAmpButtons>
        </GooseAmpTitleBar>
        
        <GooseAmpMainArea>
          <GooseAmpDisplay>
            <div>
              <GooseAmpVisualizer>
                <GooseAmpPlayStatus>
                  {isPlaying ? <FontAwesomeIcon icon={faPlay} /> : "||"}
                </GooseAmpPlayStatus>
                <GooseAmpPlayTime>{currentTime} / {duration}</GooseAmpPlayTime>
              </GooseAmpVisualizer>
            </div>
            
            <GooseAmpSongInfo>
              <GooseAmpSongTitle isPlaying={isPlaying} title={songTitle} />
              
              <GooseAmpSongDetails>
                <div>
                  <GooseAmpDetail highlighted>128</GooseAmpDetail> kbps
                  <GooseAmpDetail highlighted>44</GooseAmpDetail> kHz
                </div>
                <div>
                  <span>stereo</span> 
                  <GooseAmpDetail highlighted>HONK</GooseAmpDetail>
                </div>
              </GooseAmpSongDetails>
            </GooseAmpSongInfo>
          </GooseAmpDisplay>
          
          <GooseAmpSliderContainer 
            ref={sliderRef} 
            onClick={handleSliderClick}
          >
            <GooseAmpSliderTrack />
            <GooseAmpSliderProgress progress={progress} />
            <GooseAmpSliderThumb 
              progress={progress} 
              style={{
                backgroundImage: `url(${toggleImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }}
            />
          </GooseAmpSliderContainer>
          
          <GooseAmpControls>
            <GooseAmpMainControls>
              <GooseAmpControlButton title="Previous" onClick={handlePrevious}>
                <FontAwesomeIcon icon={faStepBackward} />
              </GooseAmpControlButton>
              <GooseAmpControlButton title="Play" onClick={handlePlay}>
                <FontAwesomeIcon icon={faPlay} />
              </GooseAmpControlButton>
              <GooseAmpControlButton title="Pause" onClick={handlePause}>
                <FontAwesomeIcon icon={faPause} />
              </GooseAmpControlButton>
              <GooseAmpControlButton title="Stop" onClick={handleStop}>
                <FontAwesomeIcon icon={faStop} />
              </GooseAmpControlButton>
              <GooseAmpControlButton title="Next" onClick={handleNext}>
                <FontAwesomeIcon icon={faStepForward} />
              </GooseAmpControlButton>
              <GooseAmpControlButton title="Eject">
                <FontAwesomeIcon icon={faEject} />
              </GooseAmpControlButton>
            </GooseAmpMainControls>
            
            <GooseAmpExtraControls>
              <GooseAmpExtraButton title="Shuffle">
                <FontAwesomeIcon icon={faRandom} />
                SHUFFLE
              </GooseAmpExtraButton>
              <GooseAmpExtraButton title="Repeat">
                <FontAwesomeIcon icon={faRedo} />
                REPEAT
              </GooseAmpExtraButton>
            </GooseAmpExtraControls>
          </GooseAmpControls>
        </GooseAmpMainArea>

        <HiddenYouTube>
          <YouTube 
            videoId={YOUTUBE_VIDEO_ID}
            opts={opts}
            onReady={handleReady}
            onStateChange={(e) => {
              if (e.data === 0) { // Ended
                setIsPlaying(false);
                setProgress(0);
              }
            }}
          />
        </HiddenYouTube>
      </GooseAmpWrapper>
    </Rnd>
  );
};

export default GooseAmpPlayer; 