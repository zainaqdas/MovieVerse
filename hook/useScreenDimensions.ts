"use client";
import { useState, useEffect } from 'react';

interface ScreenDimensions {
  width: number;
  height: number;
}

function useScreenDimensions(): ScreenDimensions {
  const [dimensions, setDimensions] = useState<ScreenDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
}

export default useScreenDimensions;
