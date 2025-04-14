'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function FooterSection() {
  const footerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });
  
  const footerLinks = [
    {
      title: "Company",
      links: [
        { text: "About Us", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Our Team", url: "#" },
        { text: "Blog", url: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Knowledge Base", url: "#" },
        { text: "Guides", url: "#" },
        { text: "Support", url: "#" },
        { text: "API Docs", url: "#" }
      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Terms of Service", url: "#" },
        { text: "Privacy Policy", url: "#" },
        { text: "Cookie Policy", url: "#" },
        { text: "Disclaimers", url: "#" }
      ]
    }
  ];
  
  const socialLinks = [
    { name: "Twitter", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>, url: "#" },
    { name: "LinkedIn", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>, url: "#" },
    { name: "Instagram", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path></svg>, url: "#" },
    { name: "YouTube", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path></svg>, url: "#" }
  ];

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-white pt-24 pb-12 border-t border-gray-100"
      id="footer"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-300 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-50/40 rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-50/40 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Upper section with logo and tagline */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center justify-center mb-5">
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              The Halo Circle
            </span>
          </div>
          <p className="text-gray-600 max-w-xl mx-auto text-lg">
            Connecting brands and influencers through technology, creativity, and data-driven insights.
          </p>
        </motion.div>
      
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-12 mb-16">
          {/* Newsletter column */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-gray-900 mb-5">Stay updated</h3>
            <p className="text-gray-600 mb-6">
              Get the latest news, updates and influencer marketing insights delivered straight to your inbox.
            </p>
            
            {/* Enhanced newsletter subscription */}
            <div className="bg-white p-1 rounded-full border border-gray-200 shadow-sm flex">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-5 py-3 bg-transparent focus:outline-none text-gray-700"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full transition-all hover:shadow-md hover:shadow-indigo-200">
                Subscribe
              </button>
            </div>
            
            {/* Social links */}
            <div className="mt-8">
              <h4 className="text-gray-800 font-semibold mb-4">Follow us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 hover:text-white hover:border-transparent transition-all duration-300"
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Links columns with improved layout */}
          <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-12">
            {footerLinks.map((column, colIndex) => (
              <motion.div
                key={colIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * (colIndex + 2) }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-5 pb-2 border-b border-gray-100">
                  {column.title}
                </h3>
                <ul className="space-y-3.5">
                  {column.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.url}
                        className="text-gray-600 hover:text-indigo-600 transition-colors flex items-center group"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-2.5 group-hover:bg-indigo-500 transition-colors"></span>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Enhanced bottom bar with better separation */}
        <motion.div
          className="pt-8 border-t border-gray-200"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-5 md:mb-0 text-sm text-gray-500">
              © {new Date().getFullYear()} The Halo Circle. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-8 justify-center text-sm font-medium">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Terms</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Cookies</a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">Contact</a>
            </div>
          </div>
          
          {/* Added tagline */}
          <div className="text-center mt-8 text-xs text-gray-400">
            Made with 💙 for creators and brands around the world
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 