'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    // Validate email
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMessage('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setEmail('');
      }, 3000);
    }, 1500);
  };

  return (
    <div>
      <p className="text-gray-300 mb-4">
        Subscribe to our newsletter for the latest updates, exclusive content, and special offers.
      </p>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-lg bg-deep-navy/50 border border-electric-blue/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition-all"
            disabled={isSubmitting || isSuccess}
          />
          
          <motion.button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-electric-blue to-deep-purple rounded-md text-white font-medium text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting || isSuccess}
          >
            {isSubmitting ? (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              </svg>
            ) : (
              'Subscribe'
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
} 