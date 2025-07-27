import { memo } from 'react';

import {
  useBattleshipAccuracy,
  useBattleshipHits,
  useBattleshipShots,
  useBattleshipSunkShips,
} from '@/entities/board/store';

const BattleStats = () => {
  const shots = useBattleshipShots();
  const hits = useBattleshipHits();
  const sunkShips = useBattleshipSunkShips();
  const accuracy = useBattleshipAccuracy();

  return (
    <div
      className={`
        mb-6 grid grid-cols-2 gap-4
        sm:grid-cols-4
      `}
    >
      <div className='rounded-xl bg-white p-4 text-center shadow-md'>
        <div className='text-2xl font-extrabold text-ocean-600'>{shots}</div>
        <div className='text-sm font-medium text-ship-600'>Shots</div>
      </div>
      <div className='rounded-xl bg-white p-4 text-center shadow-md'>
        <div className='text-2xl font-extrabold text-hit-400'>{hits}</div>
        <div className='text-sm font-medium text-ship-600'>Hits</div>
      </div>
      <div className='rounded-xl bg-white p-4 text-center shadow-md'>
        <div className='text-2xl font-extrabold text-victory-600'>{accuracy}%</div>
        <div className='text-sm font-medium text-ship-600'>Accuracy</div>
      </div>
      <div className='rounded-xl bg-white p-4 text-center shadow-md'>
        <div className='text-2xl font-extrabold text-ship-800'>{sunkShips.length}/5</div>
        <div className='text-sm font-medium text-ship-600'>Ships Sunk</div>
      </div>
    </div>
  );
};

export default memo(BattleStats);
