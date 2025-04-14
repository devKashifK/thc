'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default function ThemeProvider({
  children,
  defaultTheme = 'light',
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  // Apply the theme to HTML element
  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      
      // Force update by removing both classes first
      root.classList.remove('light', 'dark');
      
      // Add the new theme class
      root.classList.add(newTheme);
      
      // Store in localStorage
      localStorage.setItem('theme', newTheme);
      
      // Force a repaint to ensure styles are applied
      document.body.style.display = 'none';
      setTimeout(() => {
        document.body.style.display = '';
      }, 5);
      
      console.log('Theme applied:', newTheme, 'Classes now:', root.classList.toString());
    }
  };

  // Theme toggle function with force repaint
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    // Set mounted to true to indicate client-side
    setMounted(true);
    
    // Check if user has a preference stored
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine theme
    let initialTheme: Theme;
    if (storedTheme) {
      initialTheme = storedTheme;
    } else if (systemPrefersDark) {
      initialTheme = 'dark';
    } else {
      initialTheme = defaultTheme;
    }
    
    console.log('Initial theme set to:', initialTheme);
    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Add mutation observer to detect if other scripts change the class
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const htmlElement = document.documentElement;
          const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
          if (currentTheme !== theme) {
            console.log('Theme class changed externally, updating state');
            setTheme(currentTheme);
          }
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, [defaultTheme]);

  // Avoid rendering with wrong theme on first render
  if (!mounted) {
    return null;
  }

  const value = {
    theme,
    setTheme: handleSetTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
} 