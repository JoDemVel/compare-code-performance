import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface WindowProperties extends WindowSize {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
}

export const useWindowSize = (): WindowProperties => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isSmall, setIsSmall] = useState<boolean>(window.innerWidth < 1110);
  const [isMedium, setIsMedium] = useState<boolean>(
    window.innerWidth >= 1110 && window.innerWidth < 1440
  );
  const [isLarge, setIsLarge] = useState<boolean>(window.innerWidth >= 1440);

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
    setIsSmall(windowSize.width < 1024);
    setIsMedium(windowSize.width >= 1024 && windowSize.width < 1440);
    setIsLarge(windowSize.width >= 1440);
  }, [windowSize.width]);

  return { ...windowSize, isSmall, isMedium, isLarge };
};
