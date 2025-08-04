import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { BattleField, LayoutSwitcher } from '@/features/battle-field';
import GameInstructions from '@/features/game-instructions';
import { BattleStats, VictoryModal } from '@/features/game-stats';
import ShipFleet from '@/features/ship-fleet';

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4'>
      <div className='mx-auto max-w-4xl'>
        <header className='relative mb-8 text-center'>
          <Button
            className='absolute top-0 left-0'
            variant='secondary'
            onClick={() => void navigate('/')}
          >
            Game mode
          </Button>
          <h1
            className={`
              mb-2 text-4xl font-bold text-blue-900
              sm:text-5xl
            `}
          >
            ⚓ Battleship
          </h1>
          <p className='text-lg text-blue-700'>Hunt down the enemy fleet!</p>
        </header>

        <VictoryModal />

        <div className={`col-span-full`}>
          <div className='mt-2 space-y-6'>
            <BattleStats />
            <div className='flex justify-center'>
              <LayoutSwitcher />
            </div>
            <BattleField />
            <ShipFleet />
            <GameInstructions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
