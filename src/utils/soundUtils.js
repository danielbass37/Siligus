// Import sound files
import buttonSoundFile from '../assets/HOMM3CV/BUTTON.mp3';
import systemSoundFile from '../assets/HOMM3CV/SYSMSG.mp3';
import bgmFile from '../assets/HOMM3CV/bgm.mp3';

// Web Audio API context
let audioContext;
let buttonBuffer = null;
let systemBuffer = null;
let bgmBuffer = null;
let bgmSource = null;
let bgmGainNode = null;
let isInitialized = false;

// Volume settings
const MASTER_VOLUME = 0.25;
const SYSTEM_VOLUME = 0.125; // Half of master volume for SYSMSG
const BGM_VOLUME = 0.15;     // Background music volume

// Initialize the audio context
const initAudioContext = () => {
  if (!audioContext) {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
    } catch (e) {
      console.error('Web Audio API not supported', e);
    }
  }
  return audioContext;
};

// Load a sound file into buffer
const loadSound = async (url) => {
  try {
    const context = initAudioContext();
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return await context.decodeAudioData(arrayBuffer);
  } catch (e) {
    console.error('Error loading sound', e);
    return null;
  }
};

// Initialize audio system - preload all sounds
export const initAudioSystem = async () => {
  if (isInitialized) return true;
  
  try {
    const context = initAudioContext();
    
    // Resume audio context (needed for Chrome)
    if (context.state === 'suspended') {
      await context.resume();
    }
    
    // Load all sounds in parallel
    [buttonBuffer, systemBuffer, bgmBuffer] = await Promise.all([
      loadSound(buttonSoundFile),
      loadSound(systemSoundFile),
      loadSound(bgmFile)
    ]);
    
    isInitialized = true;
    return true;
  } catch (e) {
    console.error('Error initializing audio system', e);
    return false;
  }
};

// Try to initialize immediately
initAudioSystem().catch(() => {
  // Silent failure is OK - will try again on user interaction
});

// Play a sound with minimal latency
export const playSound = (sound) => {
  if (!audioContext) {
    initAudioContext();
  }
  
  // If audio context is suspended (browser policy), resume it
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Determine which buffer to use
  const buffer = sound === Sounds.BUTTON ? buttonBuffer : systemBuffer;
  
  // If buffer isn't loaded yet, do nothing
  if (!buffer) return;
  
  // Create a sound source
  const source = audioContext.createBufferSource();
  source.buffer = buffer;
  
  // Create a gain node for volume control
  const gainNode = audioContext.createGain();
  
  // Set appropriate volume based on sound type
  gainNode.gain.value = sound === Sounds.BUTTON ? MASTER_VOLUME : SYSTEM_VOLUME;
  
  // Connect source → gain → destination
  source.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Play immediately
  source.start(0);
};

// Start playing background music with looping
export const startBackgroundMusic = () => {
  if (!audioContext) {
    initAudioContext();
  }
  
  // If audio context is suspended (browser policy), resume it
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  // Don't start a new instance if one is already playing
  if (bgmSource) {
    return;
  }
  
  // If buffer isn't loaded yet, do nothing
  if (!bgmBuffer) {
    console.warn('BGM buffer not loaded yet');
    return;
  }
  
  // Create a sound source for BGM
  bgmSource = audioContext.createBufferSource();
  bgmSource.buffer = bgmBuffer;
  bgmSource.loop = true; // Enable looping
  
  // Create a gain node for volume control
  bgmGainNode = audioContext.createGain();
  bgmGainNode.gain.value = BGM_VOLUME;
  
  // Connect source → gain → destination
  bgmSource.connect(bgmGainNode);
  bgmGainNode.connect(audioContext.destination);
  
  // Start playing
  bgmSource.start(0);
  
  // Handle when the source ends (shouldn't happen with loop=true)
  bgmSource.onended = () => {
    bgmSource = null;
    bgmGainNode = null;
  };
};

// Stop background music
export const stopBackgroundMusic = () => {
  if (bgmSource) {
    // Fade out over 1 second
    if (bgmGainNode && audioContext) {
      // Create a fade-out effect
      const now = audioContext.currentTime;
      bgmGainNode.gain.setValueAtTime(BGM_VOLUME, now);
      bgmGainNode.gain.linearRampToValueAtTime(0, now + 1);
      
      // Stop the source after the fade
      setTimeout(() => {
        if (bgmSource) {
          bgmSource.stop();
          bgmSource = null;
          bgmGainNode = null;
        }
      }, 1000);
    } else {
      // No fade, just stop
      bgmSource.stop();
      bgmSource = null;
      bgmGainNode = null;
    }
  }
};

// Sound references
export const Sounds = {
  BUTTON: 'button',
  SYSTEM: 'system',
  BGM: 'bgm'
};

// Add a function to immediately play button click on DOM events
// This can be attached to elements for zero-latency response
export const attachInstantSound = (element, sound = Sounds.BUTTON) => {
  if (!element) return;
  
  const playOnInteract = () => {
    // Resume context if suspended
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    // Immediately play sound
    playSound(sound);
  };
  
  element.addEventListener('mousedown', playOnInteract);
  element.addEventListener('touchstart', playOnInteract);
  
  // Return function to remove listeners
  return () => {
    element.removeEventListener('mousedown', playOnInteract);
    element.removeEventListener('touchstart', playOnInteract);
  };
}; 