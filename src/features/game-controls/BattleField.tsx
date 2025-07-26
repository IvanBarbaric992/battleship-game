import { useBattleshipActions, useBattleshipBoard } from '@/entities/board/store';
import { Button } from '@/shared/ui';
import GameBoard from '@/widgets/game-board/GameBoard';

const BattleField = () => {
  const board = useBattleshipBoard();

  const { resetGame } = useBattleshipActions();

  return (
    <div className='mb-6 flex justify-center'>
      <div className='rounded-xl bg-white p-6 shadow-2xl'>
        <div className='mb-4 flex items-center justify-between'>
          <h2 className='text-xl font-extrabold text-ocean-800'>Battle Grid</h2>
          <Button size='sm' variant='secondary' onClick={resetGame}>
            New Game
          </Button>
        </div>
        <GameBoard board={board} />
      </div>
    </div>
  );
};

export default BattleField;
