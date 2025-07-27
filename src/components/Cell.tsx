import { memo } from 'react';

import { useBattleshipActions, useBattleshipGameWon } from '@/entities/board/store';
import { BATTLE_ICONS, COLUMN_LABELS } from '@/shared/config/constants';

import type { CellState } from '../shared/lib/types';
import { cn } from '../shared/lib/utils';

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
      return (
        <img
          alt='Ship sunk'
          className='h-full w-full rounded-md object-contain'
          src={BATTLE_ICONS.SUNK}
        />
      );
    }
    if (state.isHit && state.hasShip) {
      return (
        <img alt='Hit' className='h-full w-full rounded-md object-contain' src={BATTLE_ICONS.HIT} />
      );
    }
    if (state.isHit && !state.hasShip) {
      return (
        <img
          alt='Miss'
          className={`h-full w-full rounded-md object-contain`}
          src={BATTLE_ICONS.MISS}
        />
      );
    }
    return '';
  };

  const getCellStyle = () => {
    if (state.isShipSunk ?? false) {
      return 'bg-hit-500 ship-sink-animation';
    }
    if (state.isHit && state.hasShip) {
      return 'bg-hit-200 cell-hit-animation';
    }
    if (state.isHit && !state.hasShip) {
      return 'bg-miss-200';
    }
    return gameWon ? 'bg-water-200' : 'bg-water-200 hover:bg-water-300';
  };

  return (
    <button
      disabled={Boolean(gameWon) || state.isHit}
      title={state.isHit ? '' : `Fire at ${COLUMN_LABELS[x]}${(y + 1).toString()}`}
      type='button'
      className={cn(
        `
          aspect-square rounded-md border border-ship-400 text-xs font-semibold
          shadow-sm transition-all duration-200
          sm:text-sm
          md:text-base
          lg:text-lg
        `,
        `
          flex cursor-crosshair items-center justify-center leading-none
          ${gameWon ? '' : 'hover:scale-105'}
          disabled:cursor-not-allowed disabled:hover:scale-100
        `,
        `
          size-5
          xxs:size-6
          sm:size-9
          md:size-10
          lg:size-12
        `,
        getCellStyle(),
      )}
      onClick={() => {
        fireShot(x, y);
      }}
    >
      <span className='flex size-full items-center justify-center'>{getCellContent()}</span>
    </button>
  );
};

export default memo(Cell);
