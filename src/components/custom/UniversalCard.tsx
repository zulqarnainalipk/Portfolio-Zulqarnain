import React, { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedCard from './AnimatedCard';

interface UniversalCardProps {
  children: ReactNode;
  index?: number;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  headerColor?: string;
  onClick?: () => void;
  animationType?: 'default' | 'float' | 'bounce' | 'slide' | 'fade' | 'pulse';
  glowColor?: string;
  borderColor?: string;
}

// This component provides a standardized card design used throughout the portfolio
// with consistent animations and styling
const UniversalCard = forwardRef<HTMLDivElement, UniversalCardProps>(({
  children,
  index = 0,
  className = '',
  title,
  subtitle,
  icon,
  headerColor = 'text-primary',
  onClick,
  animationType = 'default',
  glowColor,
  borderColor
}, ref) => {
  const { ref: inViewRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Map animation type to appropriate AnimatedCard props
  const getAnimationProps = () => {
    switch (animationType) {
      case 'float':
        return {
          hoverEffect: 'float' as const,
          continuousAnimation: 'float' as const
        };
      case 'bounce':
        return {
          hoverEffect: 'scale' as const,
          continuousAnimation: 'bounce' as const
        };
      case 'slide':
        return {
          hoverEffect: 'scale' as const,
          entranceAnimation: 'slide' as const
        };
      case 'fade':
        return {
          hoverEffect: 'scale' as const,
          entranceAnimation: 'fade' as const
        };
      case 'pulse':
        return {
          hoverEffect: 'scale' as const,
          continuousAnimation: 'pulse' as const
        };
      default:
        return {
          hoverEffect: 'scale' as const,
          continuousAnimation: 'none' as const
        };
    }
  };
  
  // Combine the forwarded ref with our internal ref
  const combinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
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
  
  const animationProps = getAnimationProps();
  
  return (
    <AnimatedCard
      ref={combinedRef}
      index={index}
      className={`h-full ${className}`}
      onClick={onClick}
      glowColor={glowColor}
      borderColor={borderColor}
      {...animationProps}
    >
      {/* Optional header section */}
      {(title || subtitle || icon) && (
        <div className="px-6 pt-6 pb-3">
          {/* Title with icon */}
          {(title || icon) && (
            <div className="flex items-center space-x-3 mb-1">
              {icon && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className={headerColor}
                >
                  {icon}
                </motion.div>
              )}
              
              {title && (
                <motion.h3
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className={`text-lg font-semibold ${headerColor}`}
                >
                  {title}
                </motion.h3>
              )}
            </div>
          )}
          
          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="text-muted-foreground text-sm"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      )}
      
      {/* Card content */}
      <div className={`${(title || subtitle || icon) ? 'px-6 pb-6' : 'p-6'}`}>
        {children}
      </div>
    </AnimatedCard>
  );
});

UniversalCard.displayName = 'UniversalCard';

export default UniversalCard;