import { startTransition, useEffect, useState } from 'react';

interface UseAnimateModalProps {
  isOpen: boolean;
  duration?: number;
}

const ANIMATION_DURATION = 200;

const useAnimateModal = ({ isOpen, duration = ANIMATION_DURATION }: UseAnimateModalProps) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      startTransition(() => {
        setIsAnimating(true);
      });
    } else if (shouldRender) {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isOpen, shouldRender, duration]);

  return { shouldRender, isAnimating };
};

export default useAnimateModal;
