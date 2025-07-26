import { memo } from 'react';

import { useBattleshipActions, useBattleshipGameWon } from '@/entities/board/store';
import { COLUMN_LABELS, EMOJI } from '@/shared/config/constants';

import type { CellState } from '../lib/types';
import { cn } from '../lib/utils';

interface CellProps {
  state: CellState;
  x: number;
  y: number;
}

const Cell = ({ state, x, y }: CellProps) => {
  const { fireShot } = useBattleshipActions();
  const gameWon = useBattleshipGameWon();

  const getCellContent = () => {
    if (state.isShipSunk ?? false) {
      return EMOJI.SUNK;
    }
    if (state.isHit && state.hasShip) {
      return EMOJI.HIT;
    }
    if (state.isHit && !state.hasShip) {
      return EMOJI.MISS;
    }
    return '';
  };

  const getCellStyle = () => {
    if (state.isShipSunk ?? false) {
      return 'bg-red-400';
    }
    if (state.isHit && state.hasShip) {
      return 'bg-red-200';
    }
    if (state.isHit && !state.hasShip) {
      return 'bg-gray-200';
    }
    return gameWon ? 'bg-blue-200' : 'bg-blue-200 hover:bg-blue-300';
  };

  return (
    <button
      disabled={Boolean(gameWon) || state.isHit}
      title={state.isHit ? '' : `Fire at ${COLUMN_LABELS[x]}${(y + 1).toString()}`}
      type='button'
      className={cn(
        `
          aspect-square h-7 w-7 border border-gray-400 text-xs transition-all
          duration-200
          sm:h-9 sm:w-9 sm:text-sm
          md:h-10 md:w-10 md:text-base
          lg:h-12 lg:w-12 lg:text-lg
        `,
        `
          flex cursor-crosshair items-center justify-center leading-none
          font-medium
          ${gameWon ? '' : 'hover:scale-105'}
          disabled:cursor-not-allowed disabled:hover:scale-100
        `,
        getCellStyle(),
      )}
      onClick={() => {
        fireShot(x, y);
      }}
    >
      <span className='flex h-full w-full items-center justify-center'>{getCellContent()}</span>
    </button>
  );
};

export default memo(Cell);
