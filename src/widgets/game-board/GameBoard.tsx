import { Fragment } from 'react';

import { useBattleshipBoard } from '@/entities/board/store';
import { COLUMN_LABELS, ROW_LABELS } from '@/shared/config/constants';
import { Cell } from '@/shared/ui';

const GameBoard = () => {
  const board = useBattleshipBoard();

  return (
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
};

export default GameBoard;
