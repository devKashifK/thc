'use client';

import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeDebug() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [rootClasses, setRootClasses] = useState('');
  
  useEffect(() => {
    setMounted(true);
    const updateClasses = () => {
      setRootClasses(document.documentElement.classList.toString());
    };
    
    updateClasses();
    
    // Create a MutationObserver to watch for class changes on html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          updateClasses();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="theme-debug">
      <div>Theme: {theme}</div>
      <div>Root classes: {rootClasses}</div>
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="mt-1 px-2 py-0.5 bg-blue-500 text-white rounded text-xs"
      >
        Toggle
      </button>
    </div>
  );
} 