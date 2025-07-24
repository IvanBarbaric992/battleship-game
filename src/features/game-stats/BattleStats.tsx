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
      <div className='rounded-lg bg-white p-4 text-center shadow'>
        <div className='text-2xl font-bold text-blue-600'>{shots}</div>
        <div className='text-sm text-gray-600'>Shots</div>
      </div>
      <div className='rounded-lg bg-white p-4 text-center shadow'>
        <div className='text-2xl font-bold text-red-600'>{hits}</div>
        <div className='text-sm text-gray-600'>Hits</div>
      </div>
      <div className='rounded-lg bg-white p-4 text-center shadow'>
        <div className='text-2xl font-bold text-green-600'>{accuracy}%</div>
        <div className='text-sm text-gray-600'>Accuracy</div>
      </div>
      <div className='rounded-lg bg-white p-4 text-center shadow'>
        <div className='text-2xl font-bold text-purple-600'>{sunkShips.length}/5</div>
        <div className='text-sm text-gray-600'>Ships Sunk</div>
      </div>
    </div>
  );
};

export default BattleStats;
