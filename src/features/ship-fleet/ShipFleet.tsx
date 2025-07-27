import { useBattleshipSunkShips } from '@/entities/board/store';
import { SHIP_ICONS } from '@/shared/config/constants';

import shipsData from '../../entities/data/ships.json';

const ShipFleet = () => {
  const sunkShips = useBattleshipSunkShips();

  return (
    <div className='mt-8 rounded-xl bg-white p-6 shadow-md'>
      <h3 className='mb-4 text-center text-lg font-extrabold text-ocean-800'>Fleet Status</h3>
      <div
        className={`
          grid grid-cols-1 gap-3
          xxs:grid-cols-2
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
                rounded-lg border p-3 text-center transition-all duration-200
                ${
                  isShipSunk
                    ? 'border-hit-200 bg-hit-50 text-hit-500'
                    : 'border-water-300 bg-water-50 text-ocean-700'
                }
              `}
            >
              <div className='mb-2 flex justify-center'>
                <img
                  alt={name}
                  src={shipIcon}
                  className={`
                    h-10 w-10 object-contain transition-all duration-200
                    sm:h-14 sm:w-14
                    ${isShipSunk ? 'opacity-50 grayscale' : ''}
                  `}
                />
              </div>
              <div className='font-semibold capitalize'>{name}</div>
              <div className='text-sm font-medium'>Size: {size}</div>
              <div className='text-xs font-extrabold'>{isShipSunk ? 'SUNK' : 'ACTIVE'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShipFleet;
