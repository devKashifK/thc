'use client';

import { useState, useEffect } from 'react';
import ThemeProvider from '../theme/ThemeProvider';
import Navbar from '../navigation/Navbar';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
    
    // Force a repaint when component mounts
    document.documentElement.style.display = 'none';
    setTimeout(() => {
      document.documentElement.style.display = '';
    }, 5);
  }, []);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900"></div>;
  }

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen w-full flex flex-col transition-colors duration-300 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
        <Navbar />
        <style jsx global>{`
          /* Force dark mode styles */
          html.dark {
            color-scheme: dark;
          }
          
          html.dark body {
            background-color: #0a0a0a;
            color: #ededed;
          }
          
          /* This ensures all dark: variants work properly */
          html.dark * [class*="dark\\:"] {
            --tw-text-opacity: 1 !important;
            --tw-bg-opacity: 1 !important;
            --tw-border-opacity: 1 !important;
          }
          
          /* Fix for section stacking */
          section {
            position: relative;
            display: block;
            width: 100%;
          }
          
          /* Fix for main content area */
          body {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            width: 100%;
            overflow-x: hidden;
          }
          
          main {
            display: flex;
            flex-direction: column;
            width: 100%;
          }
        `}</style>
        {children}
      </div>
    </ThemeProvider>
  );
} 