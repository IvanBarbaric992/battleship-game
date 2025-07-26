import { lazy, Suspense, useEffect, useRef, useState } from 'react';

import {
  useBattleshipAccuracy,
  useBattleshipGameWon,
  useBattleshipShots,
} from '@/entities/board/store';

const Modal = lazy(async () => await import('@/shared/ui/Modal'));

const VictoryModal = () => {
  const gameWon = useBattleshipGameWon();
  const shots = useBattleshipShots();
  const accuracy = useBattleshipAccuracy();
  const [isOpen, setIsOpen] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (gameWon && !hasTriggeredRef.current) {
      hasTriggeredRef.current = true;
      setIsOpen(true);
    }
  }, [gameWon]);

  // Reset trigger when game is reset (gameWon becomes false)
  useEffect(() => {
    if (!gameWon && hasTriggeredRef.current) {
      hasTriggeredRef.current = false;
      setIsOpen(false);
    }
  }, [gameWon]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Don't render anything if game hasn't been won yet
  if (!hasTriggeredRef.current) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Modal
        closeOnBackdropClick={true}
        isOpen={isOpen}
        showCloseButton={true}
        onClose={handleClose}
      >
        <div className='text-center'>
          <div className='mb-4 text-6xl'>🏆</div>
          <h2 className='mb-4 text-3xl font-bold text-green-600'>Victory!</h2>
          <p className='mb-4 text-lg text-gray-700'>
            Congratulations! You have successfully destroyed all enemy ships!
          </p>
          <div className='rounded-lg bg-green-50 p-4'>
            <p className='text-green-800'>
              <span className='font-semibold'>Shots fired:</span> {shots}
            </p>
            <p className='text-green-800'>
              <span className='font-semibold'>Accuracy:</span> {accuracy}%
            </p>
          </div>
        </div>
      </Modal>
    </Suspense>
  );
};

export default VictoryModal;
