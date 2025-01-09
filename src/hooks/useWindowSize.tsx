import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface WindowProperties extends WindowSize {
  isVertical: boolean;
}

export const useWindowSize = (): WindowProperties => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isVertical, setIsVertical] = useState<boolean>(window.innerWidth < 1110);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsVertical(window.innerWidth < 1110);
  }, [windowSize.width]);

  return { ...windowSize, isVertical };
};
