import { Button } from '@/components';
import { useBattleshipActions } from '@/entities/board/store';

import GameBoard from './GameBoard';

const BattleField = () => {
  const { resetGame } = useBattleshipActions();

  return (
    <div className='mb-6 flex justify-center'>
      <div
        className={`
          rounded-xl bg-white p-4 shadow-2xl
          sm:p-6
        `}
      >
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-extrabold text-ocean-800'>Battle Grid</h2>
          <Button size='sm' variant='secondary' onClick={resetGame}>
            New Game
          </Button>
        </div>
        <GameBoard />
      </div>
    </div>
  );
};

export default BattleField;
