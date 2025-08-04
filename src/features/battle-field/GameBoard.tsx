import { Fragment, memo } from 'react';

import { Cell } from '@/components';
import { useBattleshipBoard } from '@/entities/board/store';
import { BOARD_SIZE, COLUMN_LABELS, ROW_LABELS } from '@/shared/config/constants';

const GameBoard = () => {
  const board = useBattleshipBoard();

  return (
    <div className='inline-block'>
      <div
        className={`
          grid gap-1
          xxs:gap-1.5
          sm:gap-2
          md:gap-3
        `}
        style={{
          gridTemplateColumns: `auto repeat(${BOARD_SIZE.toString()}, 1fr)`,
        }}
      >
        <div />

        {COLUMN_LABELS.slice(0, BOARD_SIZE).map(label => (
          <div
            key={`col-${label}`}
            className={`
              text-center text-xs font-semibold
              sm:text-sm
              md:text-base
            `}
          >
            {label}
          </div>
        ))}

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
