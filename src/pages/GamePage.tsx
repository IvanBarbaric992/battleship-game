import BattleField from '@/features/game-controls/BattleField';
import { BattleStats, VictoryBanner } from '@/features/game-stats';
import GameInstructions from '@/widgets/game-board/GameInstructions';
import ShipFleet from '@/widgets/ship-fleet/ShipFleet';

const GamePage = () => (
  <div className='min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4'>
    <div className='mx-auto max-w-4xl'>
      <header className='mb-8 text-center'>
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

      <VictoryBanner />

      <div
        className={`
          grid grid-cols-1 gap-8
          lg:grid-cols-3
        `}
      >
        <div className='lg:col-span-2'>
          <BattleField />
        </div>

        <div className='space-y-6'>
          <BattleStats />
          <ShipFleet />
          <GameInstructions />
        </div>
      </div>
    </div>
  </div>
);

export default GamePage;
