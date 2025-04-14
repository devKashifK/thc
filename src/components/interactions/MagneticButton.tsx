'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  text: string;
}

export default function MagneticButton({ text }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Reset position when not hovering
  useEffect(() => {
    if (!isHovered) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isHovered]);
  
  // Handle mouse move for magnetic effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from mouse to center of button
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate magnetic pull (stronger when closer to center)
    const magneticPull = 0.3; // Adjust for stronger/weaker effect
    
    // Set new position with magnetic pull
    setPosition({
      x: distanceX * magneticPull,
      y: distanceY * magneticPull
    });
  };
  
  return (
    <motion.div
      ref={buttonRef}
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      <motion.button
        className="relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-electric-blue to-deep-purple text-white font-bold text-lg z-10"
        whileTap={{ scale: 0.95 }}
        initial={{ borderRadius: "9999px" }}
        animate={{
          scale: isHovered ? 1.05 : 1,
          boxShadow: isHovered 
            ? "0 0 25px rgba(79, 195, 247, 0.5)" 
            : "0 0 0px rgba(79, 195, 247, 0)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Text with shine effect */}
        <span className="relative z-10">{text}</span>
        
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-electric-blue via-purple-600 to-deep-purple"
          style={{ backgroundSize: "200% 100%" }}
          animate={{
            backgroundPosition: isHovered ? ["0% center", "100% center"] : "0% center"
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Shine effect */}
        <motion.div
          className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 z-20"
          animate={{
            left: isHovered ? ["0%", "100%"] : "-100%"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </motion.button>
    </motion.div>
  );
} 