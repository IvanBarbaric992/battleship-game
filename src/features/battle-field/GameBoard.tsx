import { Fragment, memo } from 'react';

import { Cell } from '@/components';
import { useBattleshipBoard, useBattleshipBoardSize } from '@/entities/board/store';
import { COLUMN_LABELS, ROW_LABELS } from '@/shared/config/constants';

const GameBoard = () => {
  const board = useBattleshipBoard();
  const boardSize = useBattleshipBoardSize();

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
          gridTemplateColumns: `auto repeat(${boardSize.toString()}, 1fr)`,
        }}
      >
        <div />

        {COLUMN_LABELS.slice(0, boardSize).map(label => (
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
