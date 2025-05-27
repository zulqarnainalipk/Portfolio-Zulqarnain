import React, { ReactNode, useState, useRef, forwardRef } from 'react';
import { motion, MotionProps, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  cardEntrance, 
  enhancedFloatingAnimation, 
  enhancedShine,
  staggeredCardEntrance
} from '../../lib/animation';

interface AnimatedCardProps extends MotionProps {
  children: ReactNode;
  index?: number;
  delay?: number;
  className?: string;
  hoverEffect?: 'scale' | 'float' | 'tilt' | 'glow' | 'magnetic' | 'rotate' | 'none';
  continuousAnimation?: 'float' | 'pulse' | 'shine' | 'bounce' | 'wave' | 'breathe' | 'none';
  entranceAnimation?: 'fade' | 'slide' | 'pop' | 'stagger' | 'none';
  onClick?: () => void;
  borderColor?: string;
  glowColor?: string;
  transformPerspective?: number;
  magneticStrength?: number;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

// Using forwardRef to properly handle ref forwarding
const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(({
  children,
  index = 0,
  delay = 0,
  className = '',
  hoverEffect = 'scale',
  continuousAnimation = 'none',
  entranceAnimation = 'fade',
  onClick,
  borderColor = 'rgba(var(--primary), 0.3)',
  glowColor = 'rgba(var(--primary), 0.2)',
  transformPerspective = 1000,
  magneticStrength = 30,
  onHoverStart,
  onHoverEnd,
  ...motionProps
}, ref) => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const cardRef = useRef<HTMLDivElement>(null);

  // For magnetic effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-magneticStrength, magneticStrength], [5, -5]);
  const rotateY = useTransform(x, [-magneticStrength, magneticStrength], [-5, 5]);

  // Calculate delay based on index and provided delay
  const calculatedDelay = delay + (index * 0.1);

  // Handle mouse move for magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || hoverEffect !== 'magnetic') return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  // Handle hover start
  const handleHoverStart = () => {
    setIsHovered(true);
    if (onHoverStart) onHoverStart();
  };

  // Reset position when mouse leaves
  const handleHoverEnd = () => {
    if (hoverEffect === 'magnetic') {
      x.set(0);
      y.set(0);
    }
    setIsHovered(false);
    if (onHoverEnd) onHoverEnd();
  };

  // Get entrance animation variants based on entranceAnimation prop
  const getEntranceAnimation = () => {
    switch (entranceAnimation) {
      case 'slide':
        return cardEntrance(calculatedDelay, 0.5);
      case 'pop':
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delay: calculatedDelay,
              duration: 0.5,
              type: 'spring',
              stiffness: 300,
              damping: 20
            }
          }
        };
      case 'stagger':
        return staggeredCardEntrance.child(index);
      case 'none':
        return {};
      case 'fade':
      default:
        return {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { delay: calculatedDelay, duration: 0.5 }
          }
        };
    }
  };

  // Define hover animations based on hoverEffect prop
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case 'scale':
        return {
          scale: 1.03,
          y: -5,
          boxShadow: `0 15px 30px -5px ${glowColor}`,
          borderColor,
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'float':
        return {
          y: -10,
          boxShadow: `0 20px 25px -5px ${glowColor}`,
          borderColor,
          transition: { duration: 0.4, ease: 'easeOut' }
        };
      case 'tilt':
        return {
          rotateX: 5,
          rotateY: 5,
          y: -5,
          boxShadow: `0 15px 30px -5px ${glowColor}`,
          borderColor,
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'glow':
        return {
          boxShadow: `0 0 20px ${glowColor}`,
          borderColor,
          y: -3,
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'rotate':
        return {
          rotate: 2,
          scale: 1.02,
          boxShadow: `0 15px 30px -5px ${glowColor}`,
          borderColor,
          transition: { duration: 0.3, ease: 'easeOut' }
        };
      case 'magnetic':
        // The magnetic effect is handled in the style attribute
        return {
          boxShadow: `0 15px 30px -5px ${glowColor}`,
          borderColor,
          transition: { duration: 0.2, ease: 'easeOut' }
        };
      case 'none':
      default:
        return {};
    }
  };

  // Define continuous animations based on continuousAnimation prop
  const getContinuousAnimation = () => {
    switch (continuousAnimation) {
      case 'float':
        return enhancedFloatingAnimation;
      case 'pulse':
        return {
          animate: {
            scale: [1, 1.02, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut"
            }
          }
        };
      case 'bounce':
        return {
          animate: {
            y: [0, -8, 0],
            transition: {
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut"
            }
          }
        };
      case 'wave':
        return {
          animate: {
            rotateZ: [0, 1, 0, -1, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut"
            }
          }
        };
      case 'breathe':
        return {
          animate: {
            boxShadow: [
              `0 4px 6px -1px rgba(0, 0, 0, 0.1)`,
              `0 10px 15px -3px ${glowColor}`,
              `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
            ],
            transition: {
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror" as const,
              ease: "easeInOut"
            }
          }
        };
      case 'shine':
        return {
          initial: "initial",
          animate: "animate",
          variants: enhancedShine
        };
      case 'none':
      default:
        return {};
    }
  };

  // Prepare magnetic style props
  const magneticProps = hoverEffect === 'magnetic' ? {
    style: {
      rotateX: isHovered ? rotateX : 0,
      rotateY: isHovered ? rotateY : 0,
      transformPerspective,
      transformStyle: "preserve-3d" as const,
      willChange: "transform"
    }
  } : {};

  // Combine the forwarded ref with our internal refs
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      // Handle cardRef
      cardRef.current = node;
      
      // Handle inViewRef
      inViewRef(node);
      
      // Handle forwarded ref
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [inViewRef, ref]
  );

  return (
    <motion.div
      ref={combinedRef}
      className={`bg-card rounded-xl shadow-md border border-border overflow-hidden transition-all ${className}`}
      variants={getEntranceAnimation()}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={getHoverAnimation()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      onClick={onClick}
      {...getContinuousAnimation()}
      {...magneticProps}
      {...motionProps}
      style={{
        ...magneticProps.style,
        minHeight: '200px',
        display: 'block', // Ensure display is block
        visibility: 'visible', // Ensure visibility is set
        opacity: 1, // Ensure opacity is set
        position: 'relative' // Ensure position is relative
      }}
    >
      {children}
      
      {/* Optional shine effect when hovered */}
      {(continuousAnimation === 'shine' || hoverEffect === 'glow') && isHovered && (
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          variants={enhancedShine}
          animate="animate"
          style={{
            backgroundSize: '300% 100%',
            zIndex: 2
          }}
        />
      )}
    </motion.div>
  );
});

// Display name for better debugging
AnimatedCard.displayName = 'AnimatedCard';

export default AnimatedCard;