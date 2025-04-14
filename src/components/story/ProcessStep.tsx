'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import IconDisccover from '../icons/IconDiscover';
import IconConnect from '../icons/IconConnect';
import IconCollaborate from '../icons/IconCollaborate';
import IconAchieve from '../icons/IconAchieve';

interface ProcessStepProps {
  step: number;
  icon: string;
  title: string;
  description: string;
  color: string;
  position: 'left' | 'right';
  className?: string;
}

export default function ProcessStep({
  step,
  icon,
  title,
  description,
  color,
  position,
  className
}: ProcessStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'search':
        return <IconDisccover />;
      case 'connect':
        return <IconConnect />;
      case 'collaborate':
        return <IconCollaborate />;
      case 'achieve':
        return <IconAchieve />;
      default:
        return null;
    }
  };
  
  // Hover animation for the step
  const cardVariants = {
    initial: { y: 0 },
    hover: { y: -10, transition: { duration: 0.3, ease: 'easeInOut' } }
  };
  
  // Animation for the icon circle
  const circleVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.3, ease: 'easeInOut' } }
  };
  
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined' || !stepRef.current) return;
    
    // Create a glow effect that follows mouse within this step
    const handleMouseMove = (e: MouseEvent) => {
      const element = stepRef.current;
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      gsap.to(element.querySelector('.glow-effect'), {
        left: x,
        top: y,
        duration: 0.5,
        ease: 'power2.out'
      });
    };
    
    stepRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (stepRef.current) {
        stepRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);
  
  return (
    <motion.div 
      ref={stepRef}
      className={`relative ${className} ${position === 'left' ? 'md:ml-auto' : 'md:mr-auto'}`}
      initial="initial"
      whileHover="hover"
    >
      {/* Glow effect that follows mouse cursor */}
      <div className="glow-effect absolute w-40 h-40 rounded-full opacity-0 bg-gradient-to-r from-electric-blue to-purple-600 blur-xl -z-10 pointer-events-none">
      </div>
    </motion.div>
  );
} 