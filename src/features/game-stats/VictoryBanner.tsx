import {
  useBattleshipAccuracy,
  useBattleshipGameWon,
  useBattleshipShots,
} from '@/entities/board/store';

const VictoryBanner = () => {
  const gameWon = useBattleshipGameWon();
  const shots = useBattleshipShots();
  const accuracy = useBattleshipAccuracy();

  if (!gameWon) {
    return null;
  }

  return (
    <div className='rounded-lg bg-green-100 p-6 text-center shadow'>
      <div className='mb-2 text-4xl'>🏆</div>
      <h2 className='mb-2 text-2xl font-bold text-green-800'>Victory!</h2>
      <p className='text-green-700'>
        All enemy ships destroyed in {shots} shots with {accuracy}% accuracy!
      </p>
    </div>
  );
};

export default VictoryBanner;
