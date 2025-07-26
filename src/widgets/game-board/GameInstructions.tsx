import { EMOJI } from '@/shared/config/constants';

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
      <p> {EMOJI.HIT} = Hit on enemy ship</p>
      <p> {EMOJI.MISS} = Miss (water)</p>
      <p> {EMOJI.SUNK} = Ship completely destroyed</p>
    </div>
  </div>
);

export default GameInstructions;
