import GameBoard from './GameBoard';

const BattleField = () => (
  <div className='mb-6 flex justify-center'>
    <div
      className={`
        rounded-xl bg-white p-4 shadow-2xl
        sm:p-6
      `}
    >
      <div className='mb-4 flex flex-col items-center justify-center gap-4'>
        <h2 className='text-xl font-extrabold text-ocean-800'>Battle Grid</h2>
      </div>
      <GameBoard />
    </div>
  </div>
);

export default BattleField;
