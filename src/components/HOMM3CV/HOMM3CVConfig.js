import { Sounds } from '../../utils/soundUtils';

// Configuration for message text content by size
const messageTextConfig = {
  large: {
    text: "Daniel is a Product Marketing Manager with expertise in brand storytelling, technical documentation, and developer advocacy. With over 10 years of experience, he has helped multiple companies achieve their marketing goals through strategic planning and innovative content creation.",
    style: { 
      fontSize: '15px', 
      maxHeight: '150px', 
      overflowY: 'auto',
      width: '75%',
      textAlign: 'left',
      padding: '15px 25px',
      marginTop: '10px'
    },
    containerStyle: {
      alignItems: 'center',
      justifyContent: 'flex-start'
    }
  },
  small: {
    text: "This skill allows creating engaging content that resonates with both technical and non-technical audiences.",
    style: { 
      fontSize: '14px',
      width: '70%',
      textAlign: 'center',
      padding: '10px',
      fontStyle: 'italic'
    },
    containerStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  tiny: {
    text: "A specialized tool for technical marketing.",
    style: { 
      fontSize: '12px',
      width: '65%',
      textAlign: 'right',
      padding: '5px 15px',
      fontWeight: '700'
    },
    containerStyle: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingRight: '20px'
    }
  }
};

// Configuration for clickable areas in HOMM3CV
const areaConfig = {
  // Area 1: Character portrait - Large message
  1: {
    name: "Character Portrait",
    description: "Shows character information",
    sound: Sounds.BUTTON,
    messageSize: 'large',
    messageText: "From tavern tales to battlefield whispers, Daniel forges tomes, leaflets, and missives so true they make hardened barbarians cry. While others chase the cold promise of alchemy and automation, he gives the people what they truly need: warmth, wit, and words that heal."
  },
  
  // Areas 2-16: Social media icons - Tiny messages
  2: {
    name: "Armageddon's Blade",
    description: "Information about Armageddon's Blade",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Armageddon's Blade.\nI totally have one."
  },
  3: {
    name: "Reddit Icon",
    description: "Information about Reddit presence",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Creating engagement, dodging the haters."
  },
  4: {
    name: "Notion Icon",
    description: "Information about Notion usage",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Huge Notion simp."
  },
  5: {
    name: "ChatGPT Icon",
    description: "Information about ChatGPT",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Using AI tools for content creation without generating slop."
  },
  6: {
    name: "Cursor Icon",
    description: "Information about Cursor editor",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Built this thing with Cursor."
  },
  7: {
    name: "Hubspot Icon",
    description: "Information about Hubspot",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Using Hubspot for CRM and marketing automation."
  },
  8: {
    name: "KYM Icon",
    description: "Information about Know Your Meme",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Meme connoisseur and enthusiast."
  },
  9: {
    name: "Catapult Icon",
    description: "Information about marketing catapult",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "A Catapult."
  },
  10: {
    name: "Mailchimp Icon",
    description: "Information about Mailchimp",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Using Mailchimp for\nnon-spamy email marketing campaigns."
  },
  11: {
    name: "GitHub Icon",
    description: "Information about GitHub",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Not afraid of GitOps."
  },
  12: {
    name: "Substack Icon",
    description: "Information about Substack",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Using Substack for content management and distribution.",
  },
  13: {
    name: "Google Analytics Icon",
    description: "Information about Google Analytics",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Making data-driven marketing decisions based on analytics."
  },
  14: {
    name: "Grammarly Icon",
    description: "Information about Grammarly",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "Grammarly as my cape because it saves my a**."
  },
  
  // Area 15: Tucha icon - Small message
  15: {
    name: "Tucha Icon",
    description: "Information about Tucha",
    sound: Sounds.BUTTON,
    messageSize: 'small',
    messageText: "Tucha (From RU. Туча - Storm Cloud).\nMy feral beast (cat) - ruins every Zoom call."
  },
  
  16: {
    name: "Spell Book Icon",
    description: "Information about Spell Book",
    sound: Sounds.BUTTON,
    messageSize: 'tiny',
    messageText: "A spellbook idk I don't have a joke for this one."
  },
  
  // Area 17: Delete Hero icon - Small message
  17: {
    name: "Delete Hero Icon",
    description: "Information about deleting heroes",
    sound: Sounds.BUTTON,
    messageSize: 'small',
    messageText: "Jesus, what are you trying to do? Rude."
  },
  
  // Area 18: Bottom right checkmark - Close window
  18: {
    name: "Close Button",
    description: "Closes the HOMM3CV window",
    sound: Sounds.BUTTON,
    action: (props) => {
      // Close immediately - sound playback is handled separately with zero latency
      if (props.onClose) {
        props.onClose();
      }
    }
  },
};

export default areaConfig;
export { messageTextConfig }; 