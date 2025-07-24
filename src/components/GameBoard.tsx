import { Fragment } from 'react';

import { COLUMN_LABELS, ROW_LABELS } from '@/lib/constants';

import type { CellState } from '../lib/types';

import Cell from './Cell';

interface GameBoardProps {
  board: CellState[][];
  onCellClick: (x: number, y: number) => void;
  disabled?: boolean;
}

const GameBoard = ({ board, onCellClick, disabled }: GameBoardProps) => (
  <div className='inline-block'>
    <div
      className={`
        mb-2 grid grid-cols-11 gap-0.5
        sm:gap-1
        md:gap-1.5
      `}
    >
      <div />
      {COLUMN_LABELS.map(label => (
        <div
          key={label}
          className={`
            text-center text-xs font-semibold
            sm:text-sm
            md:text-base
          `}
        >
          {label}
        </div>
      ))}
    </div>

    <div
      className={`
        grid grid-cols-11 gap-0.5
        sm:gap-1
        md:gap-1.5
      `}
    >
      {board.map((row, y) => (
        <Fragment key={`row-${ROW_LABELS[y]}`}>
          <div
            className={`
              flex items-center justify-center text-xs font-semibold
              sm:text-sm
              md:text-base
            `}
          >
            {ROW_LABELS[y]}
          </div>
          {row.map((cellState, x) => (
            <Cell
              key={`${COLUMN_LABELS[x]}${ROW_LABELS[y]}`}
              disabled={disabled}
              state={cellState}
              x={x}
              y={y}
              onClick={onCellClick}
            />
          ))}
        </Fragment>
      ))}
    </div>
  </div>
);

export default GameBoard;
