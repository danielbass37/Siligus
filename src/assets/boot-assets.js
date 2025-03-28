// Import the ASCII Gus image
import asciiGusImage from './ascii-gus.png';

// ASCII art for Pentium logo
export const pentiumLogo = `
   ▄████████  ▄█   ▄█        ▄█     ▄██████▄  ███    █▄     ▄████████ 
  ███    ███ ███  ███       ███    ███    ███ ███    ███   ███    ███ 
  ███    █▀  ███▌ ███       ███▌   ███    █▀  ███    ███   ███    █▀  
  ███        ███▌ ███       ███▌  ▄███        ███    ███   ███        
▀███████████ ███▌ ███       ███▌ ▀▀███ ████▄  ███    ███ ▀███████████ 
         ███ ███  ███       ███    ███    ███ ███    ███          ███ 
   ▄█    ███ ███  ███▌    ▄ ███    ███    ███ ███    ███    ▄█    ███ 
 ▄████████▀  █▀   █████▄▄██ █▀     ████████▀  ████████▀   ▄████████▀  
                  ▀                                                   
`;

// Export the ASCII Gus image
export { asciiGusImage };

// Boot sequence messages with goose facts
export const bootMessages = [
  { text: 'HONK BIOS 4.0 Release 6.0', delay: 70 },
  { text: 'Copyright (C) 1985-2024 Goose Technologies Ltd.', delay: 30 },
  { text: 'CPU: Anatidae(R) Anserini(R) @ 40 HONKS/sec', delay: 30 },
  { text: 'Memory Test: ', delay: 50, memCheck: true },
  { text: 'Initializing Flight Systems...', delay: 60, appendOK: true },
  { text: 'Establishing Gaggle', delay: 70 },
  { text: 'Deciding Primary Migratory Path', delay: 50 },
  { text: 'DANGER: Bread Module - DISABLED', delay: 50 },
  { text: 'Sewing Discontent', delay: 60 },
  { text: 'Inciting Violence', delay: 60 },
  { text: 'Smashing Patriarchy', delay: 120 },
  { text: 'Initializing Honk Drive...', delay: 60, appendOK: true },
  { text: 'HONK System Ready', delay: 30 },
  { text: 'Booting from HONK Drive...', delay: 60 },
];

// BIOS memory check speed (ms per MB check)
export const memoryCheckSpeed = 3; // Reduced from 5ms to 3ms per MB check (faster) 