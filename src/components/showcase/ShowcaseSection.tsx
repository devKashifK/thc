'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All Categories");

  const categories = ["All Categories", "Lifestyle", "Fashion", "Tech", "Fitness", "Food", "Travel"];

  const influencers = [
    {
      name: "Alex Morgan",
      category: "Lifestyle & Fashion",
      followers: "2.4M",
      engagement: "4.8%",
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      verified: true,
      testimonial: "Working with brands through The Halo Circle has been incredible for my growth.",
      brandsWorkedWith: ["Nike", "Lululemon", "Glossier"]
    },
    {
      name: "Marcus Chen",
      category: "Tech & Gaming",
      followers: "1.8M",
      engagement: "5.2%",
      image: "https://images.unsplash.com/photo-1520155707862-5b32817388d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      verified: true,
      testimonial: "I've doubled my collaboration opportunities since joining The Halo Circle.",
      brandsWorkedWith: ["Samsung", "Razer", "Twitch"]
    },
    {
      name: "Sophia Patel",
      category: "Fitness & Wellness",
      followers: "3.6M",
      engagement: "6.1%",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      verified: true,
      testimonial: "The analytics tools have helped me optimize my content strategy.",
      brandsWorkedWith: ["Adidas", "Gymshark", "FitBit"]
    },
    {
      name: "Jordan Taylor",
      category: "Food & Cooking",
      followers: "1.2M",
      engagement: "5.7%",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      verified: false,
      testimonial: "The Halo Circle's partnership matchmaking is unmatched in the industry.",
      brandsWorkedWith: ["HelloFresh", "KitchenAid", "Whole Foods"]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="py-28 relative overflow-hidden"
    >
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-blue-50 -z-10"></div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
      <div className="absolute w-96 h-96 bg-blue-100/30 rounded-full blur-3xl -top-48 -left-48 -z-10"></div>
      <div className="absolute w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl -bottom-48 -right-48 -z-10"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.02] -z-10"></div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        {/* Section header - Enhanced */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center px-4 py-2 border border-blue-100 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 text-sm font-medium shadow-sm relative overflow-hidden mb-4">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-80"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
            />
            <span className="flex w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mr-2 shadow-inner"></span>
            <span className="relative z-10 tracking-wide">FEATURED CREATORS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mt-6 mb-8 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            Exceptional Influencers in Our Network
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Connect with carefully vetted creators who deliver stunning content and measurable results. Our platform matches you with the perfect partners for your brand.
          </p>
        </motion.div>

        {/* Regular filter tabs - Original version */}
        <motion.div
          className="relative max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Glowing background for active tab */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-md rounded-2xl -z-10 shadow-lg"></div>
          
          <div className="flex flex-wrap justify-center p-2 gap-2">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={`relative px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 overflow-hidden ${
                  category === activeCategory
                    ? "text-white shadow-md" 
                    : "bg-white/50 backdrop-blur-sm text-gray-600 border border-gray-100 hover:border-blue-200 hover:bg-blue-50"
                }`}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {category === activeCategory && (
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 -z-10"
                    layoutId="activeCategoryBackground"
                    initial={false}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Original influencer cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-8">
          {influencers.map((influencer, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.7, 
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <div className="relative bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-gray-100/40 transition-all duration-500 h-full group-hover:shadow-2xl group-hover:translate-y-[-4px]">
                
                {/* Premium badge - conditional */}
                {influencer.verified && (
                  <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm py-1 px-2 rounded-full shadow-md flex items-center gap-1">
                    <svg className="h-3 w-3 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 5.901-5.753 1.414 1.414-7.329 7.171z" />
                    </svg>
                    <span className="text-xs font-semibold text-blue-600">Verified</span>
                  </div>
                )}
                
                {/* Influencer Image with overlay */}
                <div className="relative h-72 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
                  
                  <Image
                    src={influencer.image}
                    alt={influencer.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    width={500}
                    height={500}
                  />
                  
                  {/* Content overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                    <div className="text-sm font-medium text-white/90 bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-full inline-block mb-2">
                      {influencer.category}
                    </div>
                    <h3 className="text-2xl font-bold text-white">{influencer.name}</h3>
                  </div>
                </div>
                
                {/* Enhanced stats section */}
                <div className="p-6">
                  {/* Metrics cards */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 transition-transform hover:scale-105">
                      <div className="text-sm text-gray-500 mb-1">Followers</div>
                      <div className="flex items-end gap-1">
                        <div className="text-xl font-bold text-gray-900">{influencer.followers}</div>
                        <div className="text-xs text-blue-600 mb-1">Verified</div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 transition-transform hover:scale-105">
                      <div className="text-sm text-gray-500 mb-1">Engagement</div>
                      <div className="flex items-end gap-1">
                        <div className="text-xl font-bold text-emerald-600">{influencer.engagement}</div>
                        <div className="text-xs text-emerald-600 mb-1">Top 5%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quote */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-5 relative">
                    <svg className="h-6 w-6 text-blue-200 absolute top-3 left-3 opacity-30" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                    </svg>
                    <p className="text-sm text-gray-600 ml-5">
                      &quot;{influencer.testimonial}&quot;
                    </p>
                  </div>
                  
                  {/* Brands worked with */}
                  <div className="mb-6">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Recent Collaborations</div>
                    <div className="flex flex-wrap gap-2">
                      {influencer.brandsWorkedWith.map((brand, idx) => (
                        <span key={idx} className="text-xs font-medium bg-white border border-gray-200 rounded-full px-2 py-1">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <motion.button 
                      className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all text-sm"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      View Profile
                    </motion.button>
                    <motion.button 
                      className="p-3 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced view more section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.button
            className="px-10 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl font-medium text-gray-800 shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 relative overflow-hidden"
            whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-50"
              initial={{ x: '-100%' }}
              whileHover={{ x: '200%' }}
              transition={{ duration: 1.5 }}
            />
            <span className="relative z-10">Explore All Creators</span>
            <svg className="relative z-10 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
        
        {/* Enhanced testimonial - Premium version */}
        <motion.div
          className="mt-28 relative mx-4 md:mx-10 lg:mx-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {/* Modern background effects with improved contrast */}
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-600/20 via-indigo-600/15 to-purple-600/20 rounded-3xl blur-3xl -z-10 transform scale-105"></div>
          <div className="absolute inset-0 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 -z-5"></div>
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 rounded-t-3xl"></div>
          
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            {/* Top pattern */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-[url('/grid.svg')] bg-center opacity-[0.05]"></div>
            
            {/* Main content container with glass effect - improved contrast */}
            <div className="bg-gradient-to-br from-white/90 via-white/95 to-white/90 backdrop-blur-md rounded-3xl overflow-hidden border border-indigo-100">
              <div className="lg:flex">
                {/* Left testimonial content section - Larger on desktop */}
                <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                  {/* Decorative quote mark - improved visibility */}
                  <div className="absolute top-4 left-5 md:top-8 md:left-8 text-indigo-200 opacity-60">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 60C24 51.1634 31.1634 44 40 44V44C48.8366 44 56 51.1634 56 60V84C56 92.8366 48.8366 100 40 100V100C31.1634 100 24 92.8366 24 84V60Z" fill="currentColor"/>
                      <path d="M64 60C64 51.1634 71.1634 44 80 44V44C88.8366 44 96 51.1634 96 60V84C96 92.8366 88.8366 100 80 100V100C71.1634 100 64 92.8366 64 84V60Z" fill="currentColor"/>
                    </svg>
                  </div>
                  
                  {/* Company logo - more vibrant */}
                  <div className="mb-10 z-10 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-xl">
                      T
                    </div>
                    <div className="ml-4">
                      <span className="text-2xl font-bold text-gray-900 block">TechVision Inc.</span>
                      <span className="text-sm text-indigo-600 font-medium">Industry leader in SaaS solutions</span>
                    </div>
                  </div>
                  
                  {/* Main quote - improved typography */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={isInView ? { opacity: 1 } : {}}
                      transition={{ duration: 1, delay: 1 }}
                    >
                      <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 leading-relaxed">
                        <span className="relative">
                          <span className="relative z-10">"The Halo Circle completely <span className="italic text-indigo-700 font-bold">transformed</span> our influencer marketing strategy. The platform made it easy to find the perfect partners..."</span>
                          <motion.span 
                            className="absolute bottom-0 left-0 h-3 bg-indigo-200 w-full -z-0"
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100%" } : {}}
                            transition={{ duration: 0.8, delay: 1.5 }}
                          ></motion.span>
                        </span>
                      </p>
                    </motion.div>
                    
                    {/* Stats cards - enhanced styling */}
                    <div className="mt-10 flex items-center flex-wrap gap-4">
                      <div className="flex flex-col p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-50 border-2 border-blue-200 shadow">
                        <span className="text-xl md:text-3xl font-extrabold text-blue-700">347%</span>
                        <span className="text-sm font-medium text-gray-700">ROI Increase</span>
                      </div>
                      
                      <div className="flex flex-col p-4 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-50 border-2 border-green-200 shadow">
                        <span className="text-xl md:text-3xl font-extrabold text-green-700">30 days</span>
                        <span className="text-sm font-medium text-gray-700">Implementation</span>
                      </div>
                      
                      <div className="flex flex-col p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-violet-50 border-2 border-purple-200 shadow">
                        <span className="text-xl md:text-3xl font-extrabold text-purple-700">4.5x</span>
                        <span className="text-sm font-medium text-gray-700">Engagement</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial author - enhanced presentation */}
                  <div className="mt-12 flex items-center gap-5 z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                      alt="Michael Rodriguez"
                      className="w-20 h-20 rounded-full border-4 border-white shadow-xl object-cover"
                    />
                    <div>
                      <div className="font-bold text-xl text-gray-900">Michael Rodriguez</div>
                      <div className="text-sm font-semibold text-blue-700">VP of Marketing, TechVision Inc.</div>
                      
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Call to action - enhanced button */}
                  <motion.div
                    className="mt-12 z-10"
                    whileHover={{ x: 5 }}
                  >
                    <a href="#" className="inline-flex items-center gap-2 text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors shadow-md">
                      <span>Read full success story</span>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </motion.div>
                </div>
                
                {/* Right visual section - Improved design with better contrast */}
                <div className="lg:w-2/5 relative hidden lg:block">
                  {/* Vibrant gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800"></div>
                  
                  {/* Decorative pattern overlay */}
                  <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col items-center justify-center p-12">
                    {/* Enhanced decorative elements */}
                    <div className="absolute top-12 right-12 w-28 h-28 rounded-full bg-white/20 backdrop-blur-md"></div>
                    <div className="absolute bottom-16 left-8 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md"></div>
                    
                    {/* Floating testimonial cards - IMPROVED CONTRAST */}
                    <div className="space-y-6 z-10 w-full max-w-sm">
                      {[
                        { text: "The platform's AI matching saved us countless hours.", delay: 0.9 },
                        { text: "We saw conversion rates double in just two weeks.", delay: 1.1 },
                        { text: "Customer acquisition cost reduced by 40%.", delay: 1.3 }
                      ].map((quote, index) => (
                        <motion.div
                          key={index}
                          className="bg-white/30 backdrop-blur-md rounded-xl p-5 border-2 border-white/50 shadow-xl"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5, delay: quote.delay }}
                        >
                          <p className="text-white text-base font-medium">{quote.text}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Stats highlight - improved contrast */}
                    <motion.div
                      className="absolute bottom-12 right-12 bg-white/30 backdrop-blur-md rounded-xl p-5 flex items-center gap-4 border-2 border-white/50 shadow-xl"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 1.5 }}
                    >
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <div>
                        <div className="text-white font-bold text-2xl">2.5x</div>
                        <div className="text-white text-sm font-medium">Revenue Growth</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Mobile testimonial additional content - improved contrast */}
              <div className="lg:hidden bg-gradient-to-br from-blue-700 to-indigo-800 p-8 rounded-b-3xl">
                <div className="text-center">
                  <div className="text-white font-bold text-xl mb-2">Key Results</div>
                  <div className="text-blue-100 mb-6 font-medium">What TechVision Inc. achieved</div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 border-2 border-white/50">
                      <div className="text-white font-bold text-xl">2.5x</div>
                      <div className="text-white text-xs font-medium">Revenue</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 border-2 border-white/50">
                      <div className="text-white font-bold text-xl">40%</div>
                      <div className="text-white text-xs font-medium">Lower CAC</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-md rounded-xl p-4 border-2 border-white/50">
                      <div className="text-white font-bold text-xl">12</div>
                      <div className="text-white text-xs font-medium">New Partners</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 