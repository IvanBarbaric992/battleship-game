import BattleField from '@/features/game-controls/BattleField';
import { BattleStats, VictoryModal } from '@/features/game-stats';
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

      <VictoryModal />

      <div className={`col-span-full`}>
        <div className='mt-2 space-y-6'>
          <BattleStats />
          <BattleField />
          <ShipFleet />
          <GameInstructions />
        </div>
      </div>
    </div>
  </div>
);

export default GamePage;
