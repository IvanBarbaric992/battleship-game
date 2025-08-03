import { lazy, Suspense, useEffect, useState } from 'react';

import { LayoutSwitcher } from '@/components';
import {
  useBattleshipAccuracy,
  useBattleshipGameWon,
  useBattleshipShots,
} from '@/entities/board/store';

const Modal = lazy(async () => await import('@/components/Modal'));

const VictoryModal = () => {
  const gameWon = useBattleshipGameWon();
  const shots = useBattleshipShots();
  const accuracy = useBattleshipAccuracy();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(gameWon);
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
          <h2 className='mb-4 text-3xl font-extrabold text-victory-600'>Victory!</h2>
          <p className='mb-4 text-lg font-medium text-ship-600'>
            Congratulations! You have successfully destroyed all enemy ships!
          </p>
          <div
            className={`
              rounded-xl border border-victory-100 bg-victory-50 p-4 shadow-md
            `}
          >
            <p className='font-semibold text-victory-800'>
              <span className='font-extrabold'>Shots fired:</span> {shots}
            </p>
            <p className='font-semibold text-victory-800'>
              <span className='font-extrabold'>Accuracy:</span> {accuracy}%
            </p>
          </div>

          <div className='mt-6'>
            <LayoutSwitcher />
          </div>
        </div>
      </Modal>
    </Suspense>
  );
};

export default VictoryModal;
