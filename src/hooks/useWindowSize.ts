import { useState, useEffect } from 'react';

interface WindowSize {
  width: number;
  height: number;
}

interface WindowProperties extends WindowSize {
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  is2xl: boolean;
}

export const useWindowSize = (): WindowProperties => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isSm, setIsSm] = useState<boolean>(false);
  const [isMd, setIsMd] = useState<boolean>(false);
  const [isLg, setIsLg] = useState<boolean>(false);
  const [isXl, setIsXl] = useState<boolean>(false);
  const [is2xl, setIs2xl] = useState<boolean>(false);

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
    setIs2xl(windowSize.width >= 1440);
    setIsXl(windowSize.width >= 1370 && windowSize.width < 1440);
    setIsLg(windowSize.width >= 1150 && windowSize.width < 1370);
    setIsMd(windowSize.width >= 1024 && windowSize.width < 1150);
    setIsSm(windowSize.width < 1024);
  }, [windowSize.width]);

  return { ...windowSize, isSm, isMd, isLg, isXl, is2xl };
};
