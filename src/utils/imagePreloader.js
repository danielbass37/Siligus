// Image preloader utility for better performance
import messageTiny from '../assets/HOMM3CV/message_tiny.png';
import messageSmall from '../assets/HOMM3CV/message_small.png';
import messageLarge from '../assets/HOMM3CV/message_large.png';

// Track preloading status
let preloadingComplete = false;
let preloadingInProgress = false;

/**
 * Preload a single image
 * @param {string} src - Image source URL
 * @returns {Promise} - Promise that resolves when image is loaded
 */
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      console.log(`✓ Preloaded: ${src.split('/').pop()}`);
      resolve(img);
    };
    
    img.onerror = (error) => {
      console.warn(`✗ Failed to preload: ${src.split('/').pop()}`, error);
      reject(error);
    };
    
    img.src = src;
  });
};

/**
 * Preload all HOMM3CV message background images
 * @returns {Promise} - Promise that resolves when all images are loaded
 */
export const preloadHOMM3CVImages = async () => {
  if (preloadingComplete) {
    console.log('🖼️ HOMM3CV images already preloaded');
    return Promise.resolve();
  }
  
  if (preloadingInProgress) {
    console.log('🖼️ HOMM3CV images preloading in progress, waiting...');
    // Wait for existing preloading to complete
    return new Promise((resolve) => {
      const checkComplete = () => {
        if (preloadingComplete) {
          resolve();
        } else {
          setTimeout(checkComplete, 100);
        }
      };
      checkComplete();
    });
  }
  
  preloadingInProgress = true;
  
  try {
    console.log('🖼️ Starting HOMM3CV message images preload...');
    
    const images = [messageTiny, messageSmall, messageLarge];
    const startTime = performance.now();
    
    await Promise.all(images.map(preloadImage));
    
    const endTime = performance.now();
    preloadingComplete = true;
    console.log(`✅ All HOMM3CV images preloaded successfully in ${Math.round(endTime - startTime)}ms`);
    
    return Promise.resolve();
  } catch (error) {
    console.error('❌ Error preloading HOMM3CV images:', error);
    preloadingInProgress = false;
    return Promise.reject(error);
  }
};

/**
 * Check if HOMM3CV images are preloaded
 * @returns {boolean} - True if preloading is complete
 */
export const areHOMM3CVImagesPreloaded = () => {
  return preloadingComplete;
};

/**
 * Force preload images synchronously (fire and forget)
 * This is useful for immediate preloading without waiting
 */
export const preloadHOMM3CVImagesSync = () => {
  if (preloadingComplete || preloadingInProgress) {
    console.log('🖼️ HOMM3CV images already preloaded or in progress');
    return;
  }
  
  const images = [messageTiny, messageSmall, messageLarge];
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  console.log('🖼️ Started synchronous preloading of HOMM3CV images');
};

// Auto-preload when module is imported (fire and forget)
console.log('🖼️ Image preloader module loaded, starting auto-preload...');
preloadHOMM3CVImagesSync(); 