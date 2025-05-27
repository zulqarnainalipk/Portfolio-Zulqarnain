// Enhanced Animation utility functions and variants for use with framer-motion
// This file contains reusable animations for the entire portfolio

import { Variants } from 'framer-motion';

// Basic fade in animation
export const fadeIn = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      delay,
      duration
    }
  }
});

// Fade in animation with upward movement
export const fadeInUp = (delay: number = 0, duration: number = 0.5, y: number = 20): Variants => ({
  hidden: { opacity: 0, y },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      delay,
      duration,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
});

// Staggered animation for list items
export const staggerContainer = (staggerChildren: number = 0.1, delayChildren: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});

// Item variant for staggered containers
export const staggerItem = (duration: number = 0.5, y: number = 20): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
});

// Pop-in animation for elements that should appear with a subtle scaling effect
export const popIn = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      delay,
      duration,
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
});

// Slide in from the left
export const slideInLeft = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay,
      duration,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
});

// Slide in from the right
export const slideInRight = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      delay,
      duration,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
});

// Typewriter effect
export const typewriter = (delay: number = 0, duration: number = 1.5): Variants => ({
  hidden: { width: '0%' },
  visible: { 
    width: '100%',
    transition: {
      delay,
      duration,
      ease: 'easeInOut'
    }
  }
});

// Pulse animation for drawing attention
export const pulse = (delay: number = 0, duration: number = 2): Variants => ({
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      delay,
      duration,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
});

// Animation for progress bars
export const progressBar = (delay: number = 0, duration: number = 0.8): Variants => ({
  hidden: { width: '0%' },
  visible: (value: number) => ({ 
    width: `${value}%`,
    transition: {
      delay,
      duration,
      ease: 'easeOut'
    }
  })
});

// Path drawing animation for SVG elements
export const drawPath = (delay: number = 0, duration: number = 1.5): Variants => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: {
      delay,
      duration,
      ease: 'easeInOut'
    }
  }
});

// Create a bounce effect
export const bounce = (delay: number = 0, duration: number = 0.6): Variants => ({
  hidden: { y: 0 },
  visible: {
    y: [0, -15, 0],
    transition: {
      delay,
      duration,
      repeat: Infinity,
      repeatType: 'loop',
      ease: 'easeInOut'
    }
  }
});

// Enhanced bounce effect with different heights and timing
export const bouncyAnimation = {
  animate: {
    y: [0, -8, 0, -4, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'loop',
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Universal card animation - hover effect
export const cardHover = {
  rest: { 
    scale: 1, 
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: { duration: 0.2, ease: 'easeInOut' }
  },
  hover: { 
    scale: 1.03, 
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

// Enhanced card hover with tilt effect
export const enhancedCardHover = {
  rest: { 
    scale: 1,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    transition: { duration: 0.3, ease: 'easeOut' }
  },
  hover: { 
    scale: 1.03,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// Floating/breathing animation
export const floatingAnimation = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  }
};

// Enhanced floating animation with subtle rotation
export const enhancedFloatingAnimation = {
  initial: { y: 0, rotate: 0 },
  animate: {
    y: [0, -7, 0],
    rotate: [-0.5, 0.5, -0.5],
    transition: {
      duration: 5,
      repeat: Infinity,
      repeatType: 'mirror',
      ease: 'easeInOut'
    }
  }
};

// Card flip animation
export const cardFlip = {
  front: { 
    rotateY: 0,
    transition: { duration: 0.4 }
  },
  back: { 
    rotateY: 180,
    transition: { duration: 0.4 }
  }
};

// Enhanced card flip with easing
export const enhancedCardFlip = {
  front: { 
    rotateY: 0,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  back: { 
    rotateY: 180,
    transition: { 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

// Staggered skill tags animation
export const skillTagsContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
};

// Skill tag item animation
export const skillTagItem = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 200,
      damping: 10
    }
  }
};

// Enhanced skill tag with bounce
export const enhancedSkillTag = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 200,
      damping: 10
    }
  },
  hover: {
    y: -5,
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// Animated counter for percentages and numbers
export const animatedCounter = (delay: number = 0, duration: number = 1.5): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay,
      duration
    }
  }
});

// Background gradient shift animation
export const gradientShift = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 15,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

// Enhanced gradient shift with multiple colors
export const enhancedGradientShift = {
  animate: {
    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Card entrance animation
export const cardEntrance = (delay: number = 0, duration: number = 0.5): Variants => ({
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      delay,
      duration,
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
});

// Staggered card entrance from different directions
export const staggeredCardEntrance = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  },
  child: (index: number) => ({
    hidden: { 
      opacity: 0, 
      y: 50, 
      x: index % 3 === 0 ? -20 : index % 3 === 2 ? 20 : 0 
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: index * 0.05
      }
    }
  })
};

// Typing animation for text
export const typingContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i }
  })
};

export const typingCharacter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200
    }
  }
};

// Enhanced typing with cursor effect
export const enhancedTypingContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.02 * i }
  })
};

export const enhancedTypingCharacter = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 300
    }
  }
};

// Shine/glow effect for certifications/badges
export const shine = {
  animate: {
    background: [
      'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 55%, rgba(255,255,255,0) 100%)',
      'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 5%, rgba(255,255,255,0.5) 10%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 100%)'
    ],
    backgroundSize: '200% 100%',
    backgroundPosition: ['100% 0%', '0% 0%'],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 3
    }
  }
};

// Enhanced shine with more vibrant effect
export const enhancedShine = {
  animate: {
    background: [
      'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 60%, rgba(255,255,255,0) 100%)',
      'linear-gradient(45deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 10%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 100%)'
    ],
    backgroundSize: '300% 100%',
    backgroundPosition: ['100% 0%', '0% 0%'],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatDelay: 5
    }
  }
};

// Button animations
export const buttonAnimation = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

// Magnetic effect for cards and buttons
export const magneticEffect = (strength: number = 0.5) => {
  return {
    hover: (x: number, y: number) => ({
      x: x * strength,
      y: y * strength,
      transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }
    })
  };
};

// Wave animation for skills background
export const waveAnimation = {
  animate: {
    y: [0, 15, -15, 10, -10, 5, -5, 0],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// Progress circle animation
export const progressCircle = (percentage: number) => ({
  hidden: { pathLength: 0 },
  visible: {
    pathLength: percentage / 100,
    transition: { duration: 1.5, ease: 'easeOut' }
  }
});

// Radar chart animation for skills
export const radarChartAnimation = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: 'easeOut' }
  }
};

// Particles effect animation
export const particleEffect = {
  animate: (i: number) => ({
    x: Math.sin(i) * 30,
    y: Math.cos(i) * 30,
    transition: {
      repeat: Infinity,
      duration: 3 + i * 0.5,
      ease: 'easeInOut',
      repeatType: 'mirror'
    }
  })
};

// Confetti animation
export const confettiAnimation = (i: number) => ({
  initial: { 
    opacity: 0,
    y: -10,
    x: (i % 2 === 0) ? -10 : 10
  },
  animate: {
    opacity: [0, 1, 0],
    y: 50,
    x: (i % 2 === 0) ? -30 : 30,
    rotate: (i % 2 === 0) ? -120 : 120,
    transition: {
      duration: 1.5,
      ease: 'easeOut'
    }
  }
});