import { useEffect, useState, useTransition } from 'react';

interface UseAnimateModalProps {
  isOpen: boolean;
  duration?: number;
}

const ANIMATION_DURATION = 200;

const useAnimateModal = ({ isOpen, duration = ANIMATION_DURATION }: UseAnimateModalProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen && !shouldRender) {
      setShouldRender(true);

      startTransition(() => {
        setIsAnimating(true);
      });
    } else if (!isOpen && shouldRender && !isPending) {
      setIsAnimating(false);
      const timeout = setTimeout(() => {
        setShouldRender(false);
      }, duration);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [isOpen, shouldRender, duration, isPending]);

  return {
    shouldRender,
    isAnimating: isAnimating || isPending,
  };
};

export default useAnimateModal;
