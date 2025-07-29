import { Fragment, memo } from 'react';

import { Cell } from '@/components';
import { useBattleshipBoard } from '@/entities/board/store';
import { COLUMN_LABELS, ROW_LABELS } from '@/shared/config/constants';

const GameBoard = () => {
  const board = useBattleshipBoard();

  return (
    <div className='inline-block'>
      <div
        className={`
          mb-2 grid grid-cols-12 gap-1
          xxs:gap-1.5
          sm:gap-2
          md:gap-3
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
          grid grid-cols-11 gap-1
          sm:gap-1.5
          md:gap-2
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

export default memo(GameBoard);
