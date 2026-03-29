import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // A subtle delay ensures compatibility with page transition animations 
    // (like Framer Motion) so the scroll doesn't jump abruptly before the new page mounts.
    const scrollTimeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 50);

    return () => clearTimeout(scrollTimeout);
  }, [pathname]);

  return null;
};
