import { useState, useEffect } from 'react';

/**
 * useScroll Hook: Monitors the window scroll position and returns a boolean 
 * indicating if the scroll has passed a certain threshold.
 * Useful for changing header styles or triggering animations on scroll.
 */
export const useScroll = (threshold = 20) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Determine if scroll position exceeds the defined threshold
      setIsScrolled(window.scrollY > threshold);
    };

    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};
