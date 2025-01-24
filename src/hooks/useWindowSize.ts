import { useState, useEffect } from 'react';

interface WindowProperties {
  width: number;
  height: number;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
}

export const useWindowSize = (): WindowProperties => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const calculateBreakpoints = (width: number) => ({
    isSm: width < 1024,
    isMd: width >= 1024 && width < 1150,
    isLg: width >= 1150 && width < 1370,
    isXl: width >= 1370 && width < 1440,
    is2xl: width >= 1440,
  });

  const [breakpoints, setBreakpoints] = useState(calculateBreakpoints(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      setBreakpoints(calculateBreakpoints(width));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { ...windowSize, ...breakpoints };
};
