import { lazy, Suspense, useEffect, useState } from 'react';

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

  useEffect(() => {
    if (gameWon) {
      setIsOpen(true);
    }
  }, [gameWon]);

  const handleClose = () => {
    setIsOpen(false);
  };

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
