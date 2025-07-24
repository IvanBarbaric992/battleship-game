import { useBattleshipSunkShips } from '@/entities/board/store';
import { SHIP_ICONS } from '@/shared/config/constants';

import shipsData from '../../entities/data/ships.json';

const ShipFleet = () => {
  const sunkShips = useBattleshipSunkShips();

  return (
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
  );
};

export default ShipFleet;
