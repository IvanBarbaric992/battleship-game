import { memo } from 'react';

import StatCard from '@/components/StatCard';
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
      <StatCard colorClass='text-ocean-600' label='Shots' value={shots} />
      <StatCard colorClass='text-hit-400' label='Hits' value={hits} />
      <StatCard colorClass='text-victory-600' label='Accuracy' value={`${accuracy.toString()}%`} />
      <StatCard
        colorClass='text-ship-800'
        label='Ships Sunk'
        value={`${sunkShips.length.toString()}/5`}
      />
    </div>
  );
};

export default memo(BattleStats);
