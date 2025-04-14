'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function InteractionsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const features = [
    {
      title: "AI-Powered Matching",
      description: "Our proprietary algorithm analyzes creator content, audience demographics, and engagement patterns to suggest perfect brand-influencer matches.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Advanced Analytics",
      description: "Track campaign performance in real-time with comprehensive dashboards showing reach, engagement, conversions, and ROI metrics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Smart Contracts",
      description: "Securely manage partnerships with automated contracts, milestone tracking, and seamless payment processing.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "from-indigo-500 to-blue-600"
    },
    {
      title: "Content Approval",
      description: "Streamline the content review process with collaborative approval workflows and version control.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Audience Insights",
      description: "Access detailed demographic data and behavioral insights to better understand creator audiences.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-rose-500 to-pink-600"
    },
    {
      title: "Campaign Hub",
      description: "Manage all your influencer campaigns in one centralized dashboard with task tracking and scheduling tools.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="interactions"
      className="py-32 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.015] -z-10"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-b from-indigo-100/40 to-blue-100/30 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-indigo-100/40 to-purple-100/30 rounded-full blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header with enhanced design */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-indigo-50 border border-indigo-100 shadow-sm"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 mr-2">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-700 to-blue-700 bg-clip-text text-transparent">
              PLATFORM ADVANTAGES
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 bg-clip-text text-transparent"
          >
            Powerful Features for Successful Collaborations
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Our comprehensive suite of tools helps brands and creators build meaningful partnerships that drive real results.
          </motion.p>
        </motion.div>

        {/* Main feature display with enhanced mockup */}
        <motion.div
          className="relative mx-auto mb-32 max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 rounded-3xl p-8 md:p-12 shadow-xl border border-indigo-100/50 relative overflow-hidden">
            {/* Animated highlight effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -z-0"
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
              <div className="md:col-span-5 space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-indigo-600/10 to-blue-600/10 text-indigo-700 rounded-full text-sm font-medium mb-2">
                  <span className="flex w-2.5 h-2.5 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full mr-2"></span>
                  Featured Capability
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">
                  <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Smart Match™</span> Technology
                </h3>
                
                <p className="text-gray-600 text-lg">
                  Our AI-driven platform analyzes thousands of data points to suggest the perfect influencer partners for your brand, ensuring authentic connections and maximum campaign impact.
                </p>
                
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm border border-indigo-50 px-10">
                  <ul className="space-y-4 ">
                    {[
                      "Advanced audience matching algorithms",
                      "Engagement quality assessment",
                      "Brand affinity scoring",
                      "Content performance predictions"
                    ].map((item, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 flex items-center justify-center mr-3 shadow-sm">
                          <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <motion.button 
                  className="px-8 py-4 mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white rounded-xl font-medium shadow-lg inline-flex items-center transition-all overflow-hidden relative group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Learn More</span>
                  <motion.span
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="relative z-10 ml-2 flex items-center"
                  >
                    <svg className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.span>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-0"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                  />
                </motion.button>
              </div>
              
              <div className="md:col-span-7 relative">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="relative rounded-xl overflow-hidden">
                    {/* Screen glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-blue-600/10 z-10"></div>
                    
                    {/* Main dashboard image */}
                    <div className="bg-gradient-to-tr from-gray-900 to-gray-800 p-4 pb-6 rounded-xl shadow-2xl">
                      {/* Top app bar */}
                      <div className="flex items-center mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="h-3 w-3 rounded-full bg-red-500"></div>
                          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="mx-auto bg-gray-700/50 rounded-md px-4 py-1 text-xs text-gray-300">
                          Smart Match™ Dashboard
                        </div>
                      </div>
                      
                      <div className="relative">
                        <Image
                          src="/dashboard-mockup.jpg"
                          alt="Smart Match Dashboard"
                          className="w-full rounded-lg shadow-inner object-cover"
                          width={500}
                          height={500}
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";
                          }}
                        />
                        
                        {/* Dashboard overlay elements */}
                        <div className="absolute top-3 right-3 bg-indigo-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                          Live Demo
                        </div>
                      </div>
                      
                      {/* Bottom app bar */}
                      <div className="flex justify-center mt-4">
                        <div className="h-1.5 w-20 bg-gray-700 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -z-10 blur-sm"></div>
                  <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -z-10 blur-sm"></div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced features grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group bg-white backdrop-blur-sm rounded-2xl p-8 px-10 border border-gray-100 shadow-lg hover:shadow-xl transition-all overflow-hidden relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Colored gradient accent */}
              <div className={`absolute top-0 left-0 h-2 w-full bg-gradient-to-r ${feature.color}`}></div>
              
              {/* Feature icon with gradient */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-0.5 mb-8 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
                        index === 0 ? "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" :
                        index === 1 ? "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" :
                        index === 2 ? "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" :
                        index === 3 ? "M5 13l4 4L19 7" :
                        index === 4 ? "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" :
                        "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      } />
                    </svg>
                  </div>
                </div>
              </div>
              
              {/* Feature content */}
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-indigo-700 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 mb-8">{feature.description}</p>
              
              {/* Learn more link */}
              <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-indigo-600 transition-colors">
                <span className="mr-2">Learn more</span>
                <span className="w-5 h-5 flex items-center justify-center bg-gray-100 group-hover:bg-indigo-100 rounded-full transition-colors group-hover:translate-x-1 duration-300">
                  <svg className="h-3 w-3 text-gray-400 group-hover:text-indigo-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
              
              {/* Background decoration */}
              <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            </motion.div>
          ))}
        </div>
        
        {/* Enhanced Banner/CTA with better visual design */}
        <motion.div
          className="mt-32 relative overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl -z-10"></div>
          
          {/* Decorative elements */}
          <div className="absolute bottom-0 left-0 w-full h-full overflow-hidden -z-10">
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03] -z-10"></div>
          
          <div className="px-10 py-16 md:py-20 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to revolutionize your influencer marketing?
              </h3>
              <p className="text-indigo-100 max-w-2xl mx-auto mb-10 text-lg">
                Join thousands of brands and creators already using The Halo Circle to create authentic partnerships and drive exceptional results.
              </p>
            </motion.div>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <motion.button
                className="group px-9 py-4 bg-white text-indigo-600 rounded-xl font-medium shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Get Started For Free</span>
                  <svg className="ml-2 h-5 w-5 text-indigo-600 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white via-indigo-50 to-white opacity-0 group-hover:opacity-100 transition-opacity -z-0"></div>
              </motion.button>
              
              <motion.button
                className="group px-9 py-4 bg-transparent border-2 border-white/80 text-white rounded-xl font-medium hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <span className="flex items-center justify-center">
                  <svg className="mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Request a Demo</span>
                </span>
              </motion.button>
            </div>
            
            {/* Additional trust indicator */}
            <motion.div
              className="mt-12 flex items-center justify-center gap-2 text-white/80 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure, trusted by 10,000+ brands and influencers</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}