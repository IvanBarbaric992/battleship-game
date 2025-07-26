import { useEffect, useState, useTransition } from 'react';

interface UseAnimateModalProps {
  isOpen: boolean;
  duration?: number;
}

const ANIMATION_DURATION = 200;

const useAnimateModal = ({ isOpen, duration = ANIMATION_DURATION }: UseAnimateModalProps) => {
  const [modalState, setModalState] = useState({
    shouldRender: isOpen,
    isAnimating: isOpen,
  });
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (isOpen) {
      setModalState(prevState => ({
        ...prevState,
        shouldRender: true,
      }));
      startTransition(() => {
        setModalState(prevState => ({
          ...prevState,
          isAnimating: true,
        }));
      });
    } else {
      setModalState(prevState => ({
        ...prevState,
        isAnimating: false,
      }));
      setTimeout(() => {
        setModalState(prevState => ({
          ...prevState,
          shouldRender: false,
        }));
      }, duration);
    }
  }, [isOpen, duration]);

  return {
    ...modalState,
  };
};

export default useAnimateModal;
