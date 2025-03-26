import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop, faStepBackward, faStepForward, faRandom, faRedo, faEject } from '@fortawesome/free-solid-svg-icons';
import { Rnd } from 'react-rnd';
import toggleImage from '../assets/toggle.png';
import {
  WinampWrapper,
  WinampTitleBar,
  WinampLogoText,
  WinampButtons,
  WinampButton,
  WinampMainArea,
  WinampDisplay,
  WinampVisualizer,
  WinampPlayStatus,
  WinampPlayTime,
  WinampSongInfo,
  WinampSongTitle,
  WinampSongDetails,
  WinampDetail,
  WinampSliderContainer,
  WinampSliderTrack,
  WinampSliderProgress,
  WinampSliderThumb,
  WinampControls,
  WinampMainControls,
  WinampControlButton,
  WinampExtraControls,
  WinampExtraButton,
  HiddenYouTube,
  FontStyles
} from '../styles/WinampStyles';

// Updated to Linkin Park - In The End
const YOUTUBE_VIDEO_ID = 'eVTXPUF4Oz4'; // Linkin Park - In The End

const WinampPlayer = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [position, setPosition] = useState({ x: 250, y: 150 });
  const [currentTime, setCurrentTime] = useState('0:00');
  // eslint-disable-next-line no-unused-vars
  const [duration, setDuration] = useState('3:36'); // Hardcoded for In The End
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  const sliderRef = useRef(null);
  const songTitle = "1. Linkin Park - In The End.mp3";

  const opts = {
    height: '1',
    width: '1',
    playerVars: {
      autoplay: 0,
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
    // Song duration is hardcoded for this demo
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

  return (
    <Rnd
      default={{
        x: position.x,
        y: position.y,
        width: 375,
        height: 'auto'
      }}
      onDragStop={(e, d) => {
        setPosition({ x: d.x, y: d.y });
      }}
      enableResizing={false}
      dragHandleClassName="winamp-title-bar"
    >
      <WinampWrapper>
        <FontStyles />
        <WinampTitleBar className="winamp-title-bar">
          <WinampLogoText>WINAMP</WinampLogoText>
          <WinampButtons>
            <WinampButton close title="Close" onClick={onClose}>X</WinampButton>
          </WinampButtons>
        </WinampTitleBar>
        
        <WinampMainArea>
          <WinampDisplay>
            <div>
              <WinampVisualizer>
                <WinampPlayStatus>
                  {isPlaying ? <FontAwesomeIcon icon={faPlay} /> : "||"}
                </WinampPlayStatus>
                <WinampPlayTime>{currentTime} / {duration}</WinampPlayTime>
              </WinampVisualizer>
            </div>
            
            <WinampSongInfo>
              <WinampSongTitle isPlaying={isPlaying} title={songTitle} />
              
              <WinampSongDetails>
                <div>
                  <WinampDetail highlighted>128</WinampDetail> kbps
                  <WinampDetail highlighted>44</WinampDetail> kHz
                </div>
                <div>
                  <span>stereo</span> 
                  <WinampDetail highlighted>LLAMA</WinampDetail>
                </div>
              </WinampSongDetails>
            </WinampSongInfo>
          </WinampDisplay>
          
          <WinampSliderContainer 
            ref={sliderRef} 
            onClick={handleSliderClick}
          >
            <WinampSliderTrack />
            <WinampSliderProgress progress={progress} />
            <WinampSliderThumb 
              progress={progress} 
              style={{
                backgroundImage: `url(${toggleImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain'
              }}
            />
          </WinampSliderContainer>
          
          <WinampControls>
            <WinampMainControls>
              <WinampControlButton title="Previous" onClick={handlePrevious}>
                <FontAwesomeIcon icon={faStepBackward} />
              </WinampControlButton>
              <WinampControlButton title="Play" onClick={handlePlay}>
                <FontAwesomeIcon icon={faPlay} />
              </WinampControlButton>
              <WinampControlButton title="Pause" onClick={handlePause}>
                <FontAwesomeIcon icon={faPause} />
              </WinampControlButton>
              <WinampControlButton title="Stop" onClick={handleStop}>
                <FontAwesomeIcon icon={faStop} />
              </WinampControlButton>
              <WinampControlButton title="Next" onClick={handleNext}>
                <FontAwesomeIcon icon={faStepForward} />
              </WinampControlButton>
              <WinampControlButton title="Eject">
                <FontAwesomeIcon icon={faEject} />
              </WinampControlButton>
            </WinampMainControls>
            
            <WinampExtraControls>
              <WinampExtraButton title="Shuffle">
                <FontAwesomeIcon icon={faRandom} />
                SHUFFLE
              </WinampExtraButton>
              <WinampExtraButton title="Repeat">
                <FontAwesomeIcon icon={faRedo} />
                REPEAT
              </WinampExtraButton>
            </WinampExtraControls>
          </WinampControls>
        </WinampMainArea>

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
      </WinampWrapper>
    </Rnd>
  );
};

export default WinampPlayer; 