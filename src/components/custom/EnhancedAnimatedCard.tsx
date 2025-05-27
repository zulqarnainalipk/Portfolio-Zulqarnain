import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedAnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hoverable?: boolean;
  floating?: boolean;
}

const EnhancedAnimatedCard: React.FC<EnhancedAnimatedCardProps> = ({
  children,
  className = "",
  delay = 0,
  hoverable = true,
  floating = true
}) => {
  const floatingAnimation = floating ? {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay * 0.2
    }
  } : {};

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: delay * 0.1,
        ease: "easeOut"
      }
    }
  };

  const hoverVariants = hoverable ? {
    scale: 1.05,
    y: -5,
    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.3,
      ease: "easeInOut"
    }
  } : {};

  return (
    <motion.div
      className={`bg-card border border-border rounded-xl p-6 backdrop-blur-sm ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      whileHover={hoverVariants}
      animate={floatingAnimation}
    >
      {children}
    </motion.div>
  );
};

export default EnhancedAnimatedCard;