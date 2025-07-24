import { useMemo } from 'react';

import { EMOJI, SHIP_ICONS } from '@/lib/constants';

import Button from './components/Button';
import GameBoard from './components/GameBoard';
import shipsData from './data/ships.json';
import useBattleshipGame from './lib/useBattleshipGame';

const App = () => {
  const { board, shots, hits, gameWon, sunkShips, handleCellClick, resetGame } =
    useBattleshipGame();

  const accuracy = useMemo(() => (shots > 0 ? Math.round((hits / shots) * 100) : 0), [shots, hits]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-4'>
      <div className='mx-auto max-w-4xl'>
        <header className='mb-8 text-center'>
          <h1
            className={`
              mb-2 text-4xl font-bold text-blue-900
              sm:text-5xl
            `}
          >
            ⚓ Battleship ⚓
          </h1>
          <p className='text-lg text-blue-700'>Sink all enemy ships to win!</p>
        </header>

        <div
          className={`
            mb-6 grid grid-cols-2 gap-4
            sm:grid-cols-4
          `}
        >
          <div className='rounded-lg bg-white p-4 text-center shadow'>
            <div className='text-2xl font-bold text-blue-600'>{shots}</div>
            <div className='text-sm text-gray-600'>Shots</div>
          </div>
          <div className='rounded-lg bg-white p-4 text-center shadow'>
            <div className='text-2xl font-bold text-red-600'>{hits}</div>
            <div className='text-sm text-gray-600'>Hits</div>
          </div>
          <div className='rounded-lg bg-white p-4 text-center shadow'>
            <div className='text-2xl font-bold text-green-600'>{accuracy}%</div>
            <div className='text-sm text-gray-600'>Accuracy</div>
          </div>
          <div className='rounded-lg bg-white p-4 text-center shadow'>
            <div className='text-2xl font-bold text-purple-600'>
              {sunkShips.length}/{Object.keys(shipsData.shipTypes).length}
            </div>
            <div className='text-sm text-gray-600'>Ships Sunk</div>
          </div>
        </div>

        <div className='mb-6 flex justify-center'>
          <div className='rounded-lg bg-white p-6 shadow-lg'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-xl font-bold text-gray-800'>Battle Grid</h2>
              <Button size='sm' variant='secondary' onClick={resetGame}>
                New Game
              </Button>
            </div>
            <GameBoard board={board} disabled={gameWon} onCellClick={handleCellClick} />
          </div>
        </div>

        {gameWon && (
          <div className='rounded-lg bg-green-100 p-6 text-center shadow'>
            <div className='mb-2 text-4xl'>🏆</div>
            <h2 className='mb-2 text-2xl font-bold text-green-800'>Victory!</h2>
            <p className='text-green-700'>
              All enemy ships destroyed in {shots} shots with {accuracy}% accuracy!
            </p>
          </div>
        )}

        <div className='mt-8 rounded-lg bg-white p-6 shadow'>
          <h3 className='mb-4 text-center text-lg font-bold text-gray-800'>Fleet Status</h3>
          <div
            className={`
              grid grid-cols-1 gap-3
              sm:grid-cols-2
              lg:grid-cols-5
            `}
          >
            {Object.entries(shipsData.shipTypes).map(([name, { size }]) => {
              const shipIcon = SHIP_ICONS[name] || SHIP_ICONS.battleship;

              const isShipSunk = sunkShips.includes(name);

              return (
                <div
                  key={name}
                  className={`
                    rounded border p-3 text-center
                    ${
                      isShipSunk
                        ? 'border-red-300 bg-red-50 text-red-800'
                        : 'border-blue-300 bg-blue-50 text-blue-800'
                    }
                  `}
                >
                  <div className='mb-2 flex justify-center'>
                    <img
                      alt={name}
                      src={shipIcon}
                      className={`
                        h-10 w-10 object-contain
                        sm:h-14 sm:w-14
                        ${isShipSunk ? 'opacity-50 grayscale' : ''}
                      `}
                    />
                  </div>
                  <div className='font-medium capitalize'>{name}</div>
                  <div className='text-sm'>Size: {size}</div>
                  <div className='text-xs'>{isShipSunk ? 'SUNK' : 'ACTIVE'}</div>
                </div>
              );
            })}
          </div>
        </div>

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
      </div>
    </div>
  );
};

export default App;
