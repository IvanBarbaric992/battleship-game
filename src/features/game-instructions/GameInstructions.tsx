import { BATTLE_ICONS } from '@/shared/config/constants';

const GameInstructions = () => (
  <div className='mt-6 rounded-xl bg-white p-6 shadow-md'>
    <h3 className='mb-3 text-center text-lg font-extrabold text-ocean-800'>How to Play</h3>
    <p className='font-medium text-ship-600'>Click grid cells to fire shots</p>
    <div
      className={`
        mt-2 flex flex-wrap items-center justify-between gap-2 text-sm
        font-semibold text-ship-600
      `}
    >
      <p className='flex items-center gap-1'>
        <img alt='Hit' className='h-4 w-4 object-contain' src={BATTLE_ICONS.HIT} />= Hit on enemy
        ship
      </p>
      <p className='flex items-center gap-1'>
        <img alt='Miss' className='h-4 w-4 object-contain' src={BATTLE_ICONS.MISS} />= Miss (water)
      </p>
      <p className='flex items-center gap-1'>
        <img alt='Ship sunk' className='h-4 w-4 object-contain' src={BATTLE_ICONS.SUNK} />= Ship
        completely destroyed
      </p>
    </div>
  </div>
);

export default GameInstructions;
