'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const steps = [
    {
      number: "01",
      title: "Discover",
      description: "Our AI analyzes thousands of influencer profiles to find perfect matches for your brand's unique needs and target audience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      features: [
        "Demographics analysis & audience matching",
        "Engagement rate verification",
        "Content quality assessment",
        "Brand alignment scoring"
      ],
      color: "from-sky-400 to-blue-600",
      lightColor: "bg-blue-50",
      darkColor: "bg-blue-900"
    },
    {
      number: "02",
      title: "Connect",
      description: "Build relationships with ideal creators through our secure messaging platform and smart contract system.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      features: [
        "Secure messaging platform",
        "Automated outreach tools",
        "Smart contract negotiation",
        "Real-time collaboration space"
      ],
      color: "from-violet-500 to-purple-600",
      lightColor: "bg-purple-50",
      darkColor: "bg-purple-900"
    },
    {
      number: "03",
      title: "Create",
      description: "Collaborate on content creation with powerful workflow tools to ensure quality and brand consistency.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      features: [
        "Content briefs & guidelines",
        "Collaborative feedback system",
        "Version control & approval flow",
        "Content calendar integration"
      ],
      color: "from-pink-500 to-rose-600",
      lightColor: "bg-rose-50",
      darkColor: "bg-rose-900"
    },
    {
      number: "04",
      title: "Analyze",
      description: "Measure campaign performance with detailed analytics and actionable insights to optimize your strategy.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
          <line x1="2" y1="20" x2="22" y2="20"></line>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      features: [
        "Real-time performance tracking",
        "Audience growth measurement",
        "ROI & conversion analytics",
        "Competitor benchmarking"
      ],
      color: "from-amber-500 to-orange-600",
      lightColor: "bg-amber-50",
      darkColor: "bg-amber-900"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
    >
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        {/* Section header */}
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-6">
            <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Our Streamlined Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
            How The Halo Circle Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our data-driven approach helps brands and creators build authentic partnerships 
            that deliver exceptional results and maximize ROI.
          </p>
        </motion.div>

        {/* Process cards */}
        <div className="relative mx-6 md:mx-12 lg:mx-20">
          {/* 3D floating elements */}
          <div className="absolute w-64 h-64 top-1/4 -left-32 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 opacity-70 blur-3xl -z-10"></div>
          <div className="absolute w-64 h-64 bottom-1/4 -right-32 rounded-full bg-gradient-to-r from-purple-100 to-indigo-50 opacity-70 blur-3xl -z-10"></div>
          
          {/* Steps container */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <div className={`absolute top-0 left-0 w-20 h-20 flex items-center justify-center rounded-2xl transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br ${step.color} shadow-xl text-white font-bold text-xl z-10`}>
                  {step.number}
                </div>
                
                <div className={`rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100 transform ${index % 2 === 0 ? 'lg:translate-x-10' : 'lg:-translate-x-10'}`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image section - alternating sides */}
                    <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} relative h-64 lg:h-auto overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/40 z-10"></div>
                      
                      <img 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Overlay text */}
                      <div className="absolute inset-0 flex flex-col justify-center px-8 z-10 text-white">
                        <h3 className="text-3xl font-bold mb-2">{step.title}</h3>
                        <div className="h-1 w-20 bg-white/70 rounded mb-4"></div>
                        <p className="text-white/90 max-w-xs">{step.description}</p>
                      </div>
                    </div>
                    
                    {/* Content section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${step.color} text-white`}>
                          {step.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      
                      <p className="text-gray-600">{step.description}</p>
                      
                      <div className="pt-4">
                        <h4 className="text-sm uppercase tracking-wider text-gray-500 font-medium mb-3">Key Features</h4>
                        <ul className="space-y-3">
                          {step.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start">
                              <div className={`flex-shrink-0 p-1 rounded-full bg-gradient-to-r ${step.color} mt-1 mr-3`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4">
                        <motion.button
                          className={`px-5 py-3 rounded-lg bg-gradient-to-r ${step.color} text-white flex items-center space-x-2 shadow-md hover:shadow-lg text-sm font-medium transition-shadow`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span>Learn more about {step.title}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Connector to next step */}
                {index < steps.length - 1 && (
                  <div className="h-32 w-0.5 bg-gradient-to-b from-gray-200 to-gray-300 absolute left-0 top-full ml-9 z-0"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* CTA section */}
        <motion.div
          className="mt-32 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-1 scale-105 opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform -rotate-1 scale-105 opacity-10"></div>
          
          <div className="relative bg-white border border-blue-100 rounded-3xl shadow-xl p-12 text-center">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ready to transform your influencer marketing?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of brands already using The Halo Circle to build authentic 
              influencer partnerships that deliver exceptional results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Your Journey
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Schedule a Demo
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 