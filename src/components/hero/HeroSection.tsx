'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';

export default function HeroSection() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDark, setIsDark] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideTexts = ["Top Influencers", "Brand Growth", "Higher ROI"];

  useEffect(() => {
    setIsDark(theme === 'light');
  }, [theme]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center overflow-hidden py-20 md:py-24 min-h-screen"
      style={{ position: 'relative', zIndex: 1 }}
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 via-white to-blue-50"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:60px_60px] opacity-[0.03]"></div>
        
        {/* Large gradient orbs */}
        <motion.div
          className="absolute -top-20 -right-20 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-300/30 via-indigo-400/20 to-transparent opacity-80 blur-3xl"
          animate={{
            x: mousePosition.x * -50,
            y: mousePosition.y * -50,
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            x: { type: 'spring', damping: 20 },
            y: { type: 'spring', damping: 20 },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-purple-300/30 via-pink-300/20 to-transparent opacity-70 blur-3xl"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
            scale: [1, 1.15, 1],
          }}
          transition={{ 
            x: { type: 'spring', damping: 15 },
            y: { type: 'spring', damping: 15 },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        />
        
        {/* Enhanced particle effects */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 1 + 'px',
                height: Math.random() * 6 + 1 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                background: index % 3 === 0 ? 'rgba(99, 102, 241, 0.4)' : 
                           index % 3 === 1 ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255, 255, 255, 0.7)'
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0, 0.8, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: Math.random() * 6 + 8,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content with enhanced layout */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          {/* Hero content with improved animations */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Advanced badge with animation */}
            <div className="inline-flex items-center px-6 py-2.5 border border-indigo-200 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 text-sm font-medium shadow-md relative overflow-hidden mb-10">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-90"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <div className="relative z-10 flex items-center">
                <span className="flex w-3 h-3 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full mr-3 shadow-inner"></span>
                <span className="tracking-wide uppercase">THE ULTIMATE INFLUENCER PLATFORM</span>
              </div>
            </div>
            
            {/* Animated headline sequence */}
            <div className="space-y-4">
              <motion.h2 
                className="text-xl md:text-2xl font-medium text-indigo-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Influence marketing redefined
              </motion.h2>
              
              <div className="overflow-hidden">
                <motion.h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex flex-col gap-2">
                    <span>Connect with</span>
                    <div className="h-24 md:h-28 overflow-hidden relative">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSlide}
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -100, opacity: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute"
                        >
                          <span className="relative z-10 bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 bg-clip-text text-transparent">
                            {slideTexts[currentSlide]}
                          </span>
                          <motion.div 
                            className="absolute -bottom-2 left-0 h-4 w-full bg-indigo-100 rounded-full -z-0 opacity-70"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.h1>
              </div>
            </div>
            
            {/* Enhanced description with animation */}
            <motion.div 
              className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed border-l-4 border-indigo-100 pl-6 py-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Build <span className="font-semibold text-gray-800">authentic partnerships</span> and drive <span className="font-semibold text-gray-800">exceptional ROI</span> with our AI-powered platform tailored for modern brands.
            </motion.div>
            
            {/* Improved metrics section with animations */}
            <motion.div
              className="grid grid-cols-3 gap-5 pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              {[
                { value: '327%', label: 'Average ROI', icon: '📈' },
                { value: '10K+', label: 'Creators', icon: '👥' },
                { value: '24/7', label: 'Support', icon: '🔆' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-gray-100 shadow-lg hover:shadow-xl transition-all"
                  whileHover={{ y: -5, scale: 1.03 }}
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-xl md:text-2xl font-bold bg-gradient-to-br from-indigo-600 to-blue-600 bg-clip-text text-transparent">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Modern CTA buttons with improved effects */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <motion.button
                className="px-8 py-4 rounded-xl font-medium text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 shadow-xl shadow-indigo-200/50 flex items-center justify-center space-x-2 hover:shadow-2xl transition-all overflow-hidden relative"
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.3), 0 10px 10px -5px rgba(79, 70, 229, 0.2)" 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="relative z-10">Start Collaborating</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
              <motion.button
                className="group px-8 py-4 rounded-xl font-medium border border-indigo-200 text-indigo-700 bg-white/80 backdrop-blur-sm hover:bg-indigo-50 flex items-center justify-center gap-3 transition-all shadow-md"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.1)" }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="h-6 w-6 bg-indigo-100 rounded-full flex items-center justify-center group-hover:bg-indigo-200 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <span>Watch Demo</span>
              </motion.button>
            </motion.div>
            
            {/* Trusted by section with improved layout */}
            <motion.div 
              className="pt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="flex flex-col space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-indigo-100 to-transparent"></div>
                  <p className="text-sm font-medium text-indigo-800 px-4 py-1 bg-indigo-50 rounded-full">TRUSTED BY BRANDS WORLDWIDE</p>
                  <div className="h-px flex-grow bg-gradient-to-r from-transparent via-indigo-100 to-transparent"></div>
                </div>
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 items-center">
                  {['Nike', 'Adidas', 'Apple', 'Spotify', 'Netflix'].map((brand, index) => (
                    <motion.div 
                      key={index}
                      className="text-gray-500 font-bold tracking-tight opacity-80 hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1 + (index * 0.1) }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {brand}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Hero image with advanced effects */}
          <motion.div 
            className="w-full lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative">
              {/* Main image with 3D effect */}
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 1, 0], 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                {/* Glass card container */}
                <div className="relative z-10 bg-white/70 backdrop-blur-xl p-3.5 rounded-3xl shadow-2xl border border-white/50">
                  {/* Image container with enhanced gradient */}
                  <div className="aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 relative">
                    {/* Enhanced overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent z-10"></div>
                    
                    {/* Main image with better hover effect */}
                    <img 
                      src="/hero-image.jpg" 
                      alt="Influencer collaboration" 
                      className="w-full h-full object-cover transition-all duration-700 hover:scale-105 hover:rotate-1"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80";
                      }}
                    />
                    
                    {/* Image corner decorations */}
                    <div className="absolute top-4 left-4 h-10 w-10 border-t-2 border-l-2 border-white/40 rounded-tl-lg"></div>
                    <div className="absolute bottom-4 right-4 h-10 w-10 border-b-2 border-r-2 border-white/40 rounded-br-lg"></div>
                  </div>
                  
                  {/* Interaction indicator with improved animation */}
                  <motion.div
                    className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg z-20 border border-indigo-100"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
              
              {/* Enhanced decorative elements */}
              <motion.div 
                className="absolute -top-8 -right-8 w-64 h-64 rounded-full border-8 border-indigo-100/50 -z-10"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <motion.div 
                className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full border-8 border-blue-100/50 -z-10"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              
              {/* Enhanced Stats cards */}
              <motion.div 
                className="absolute -left-12 top-1/4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 border border-indigo-100"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs font-medium">Average ROI</div>
                    <div className="text-gray-900 font-bold text-lg">+327%</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -right-12 bottom-1/4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 border border-indigo-100"
                initial={{ x: 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -5, scale: 1.05 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center shadow-inner">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-gray-600 text-xs font-medium">Active Creators</div>
                    <div className="text-gray-900 font-bold text-lg">10,000+</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Improved floating badge */}
              <motion.div 
                className="absolute top-1/2 -right-16 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl shadow-lg p-3"
                initial={{ y: 40, opacity: 0, rotate: 5 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ delay: 1.2, type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <div className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm font-bold">Verified Partners</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Improved scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
      >
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-indigo-100 cursor-pointer hover:bg-indigo-50 transition-colors group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:stroke-indigo-600 transition-colors">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </motion.div>
    </section>
  );
} 