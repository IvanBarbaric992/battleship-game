import { EMOJI } from '@/shared/config/constants';

const GameInstructions = () => (
  <div className='mt-6 rounded-lg bg-white p-6 shadow'>
    <h3 className='mb-3 text-center text-lg font-bold text-gray-800'>How to Play</h3>
    <p>Click grid cells to fire shots</p>
    <div
      className={`
        mt-2 flex flex-wrap items-center justify-between gap-2 text-sm
        text-gray-600
      `}
    >
      <p> {EMOJI.HIT} = Hit on enemy ship</p>
      <p> {EMOJI.MISS} = Miss (water)</p>
      <p> {EMOJI.SUNK} = Ship completely destroyed</p>
    </div>
  </div>
);

export default GameInstructions;
