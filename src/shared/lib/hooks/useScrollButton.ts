import { useCallback, useEffect, useRef, useState } from "react";

interface UseScrollButtonParams {
  appearsAfterScrolledPixels: number;
}

interface UseScrollButtonResult {
  windowRef: any;
  isFocusingWindow: boolean;
  isButtonVisible: boolean;
  scrollWindow: (behavior: 'smooth' | 'auto') => void;
}

export const useScrollButton = ({appearsAfterScrolledPixels}: UseScrollButtonParams): UseScrollButtonResult => {
  const windowRef = useRef<HTMLElement | null>(null);

  const [ isFocusingWindow, setFocusingWindow ] = useState(true);
  const [ isButtonVisible, setButtonVisible ] = useState(false);

  const changeVisibility = () => {
    const windowElement = windowRef.current;

    if (windowElement) {
      const scrolledFromBottom = windowElement.scrollHeight - (windowElement.scrollTop + windowElement.offsetHeight);

      if (scrolledFromBottom > appearsAfterScrolledPixels) {
        setButtonVisible(true);
      } else {
        setButtonVisible(false);
      }
    }
  };

  const focus = () => {
    setFocusingWindow(true);
  }

  const blur = () => {
    setFocusingWindow(false);
  }

  const scrollWindow = useCallback(
    (behavior: 'smooth' | 'auto' = 'smooth') => {
      if (windowRef.current) {
        windowRef.current.scrollTo({
          top: windowRef.current.scrollHeight,
          behavior
        });

        setButtonVisible(false);
      }
    },
    [windowRef.current]
  );

  useEffect(() => {
    const windowElement = windowRef?.current;

    if (windowElement) {
      changeVisibility();

      windowElement.addEventListener('scroll', changeVisibility);
      windowElement.addEventListener('touchmove', changeVisibility);
      windowElement.addEventListener('mouseenter', focus);
      windowElement.addEventListener('mouseleave', blur);

      return () => {
        windowElement.removeEventListener('scroll', changeVisibility);
        windowElement.removeEventListener('touchmove', changeVisibility);
        windowElement.removeEventListener('mouseenter', focus);
        windowElement.removeEventListener('mouseleave', blur);
      };
    }

  }, [windowRef.current]);

  return { windowRef , isFocusingWindow, isButtonVisible, scrollWindow };
};