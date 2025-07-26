import { useCallback, useEffect } from 'react';

const useKeyPressClose = (onClose: (() => void) | null) => {
  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        e.preventDefault();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!onClose) {
      return;
    }

    document.addEventListener('keydown', handleKeyPress, { passive: false });
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, onClose]);
};

export default useKeyPressClose;
