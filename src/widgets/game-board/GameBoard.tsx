import { Fragment } from 'react';

import { COLUMN_LABELS, ROW_LABELS } from '@/shared/config/constants';
import type { CellState } from '@/shared/lib/types';
import { Cell } from '@/shared/ui';

interface GameBoardProps {
  board: CellState[][];
}

const GameBoard = ({ board }: GameBoardProps) => (
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
            <Cell key={`${COLUMN_LABELS[x]}${ROW_LABELS[y]}`} state={cellState} x={x} y={y} />
          ))}
        </Fragment>
      ))}
    </div>
  </div>
);

export default GameBoard;
