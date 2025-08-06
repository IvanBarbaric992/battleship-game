import { lazy, Suspense } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { GameContentLoader } from '@/components/Loader';
import { LayoutSwitcher } from '@/features/battle-field';

const BattleField = lazy(async () => await import('@/features/battle-field/BattleField'));
const BattleStats = lazy(async () => await import('@/features/game-stats/BattleStats'));
const ShipFleet = lazy(async () => await import('@/features/ship-fleet/ShipFleet'));
const GameInstructions = lazy(
  async () => await import('@/features/game-instructions/GameInstructions'),
);
const VictoryModal = lazy(async () => await import('@/features/game-stats/VictoryModal'));

const GamePage = () => {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4'>
      <div className='mx-auto max-w-4xl'>
        <header
          className={`
            relative mb-8 flex flex-col items-center justify-center text-center
            md:flex-row
          `}
        >
          <Button
            variant='secondary'
            className={`
              mb-2 w-auto
              md:absolute md:top-0 md:left-0 md:mb-0
            `}
            onClick={() => void navigate('/')}
          >
            Game mode
          </Button>
          <div className='flex flex-col'>
            <h1
              className={`
                mb-2 text-4xl font-bold text-blue-900
                sm:text-5xl
              `}
            >
              ⚓ Battleship
            </h1>
            <p className='text-lg text-blue-700'>Hunt down the enemy fleet!</p>
          </div>
        </header>

        <Suspense fallback={<GameContentLoader message='Loading victory modal...' />}>
          <VictoryModal />
        </Suspense>

        <div className={`col-span-full`}>
          <div className='mt-2 space-y-6'>
            <Suspense fallback={<GameContentLoader message='Loading battle stats...' />}>
              <BattleStats />
            </Suspense>

            <div className='flex justify-center'>
              <LayoutSwitcher />
            </div>

            <Suspense fallback={<GameContentLoader message='Loading battle field...' />}>
              <BattleField />
            </Suspense>

            <Suspense fallback={<GameContentLoader message='Loading ship fleet...' />}>
              <ShipFleet />
            </Suspense>

            <Suspense fallback={<GameContentLoader message='Loading instructions...' />}>
              <GameInstructions />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
