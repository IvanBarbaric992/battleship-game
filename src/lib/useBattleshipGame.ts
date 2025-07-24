import { useCallback, useMemo, useState } from 'react';

import { createInitialBoard, isShipCompletelyHit, markShipAsSunk } from '@/lib/game';

import shipsData from '../data/ships.json';

import type { CellState } from './types';

const useBattleshipGame = () => {
  const [board, setBoard] = useState<CellState[][]>(createInitialBoard);
  const [shots, setShots] = useState(0);
  const [hits, setHits] = useState(0);

  const sunkShips = useMemo(
    () =>
      shipsData.layout
        .filter(({ positions }) => positions.every(([x, y]) => board[y][x].isHit))
        .map(s => s.ship),
    [board],
  );

  const gameWon = useMemo(() => sunkShips.length === shipsData.layout.length, [sunkShips]);

  const handleShotClick = useCallback(
    (x: number, y: number) => {
      const cell = board[y][x];

      if (cell.isHit || gameWon) {
        return;
      }

      setBoard(prevBoard => {
        const newBoard = prevBoard.map(row => [...row]);
        newBoard[y][x] = { ...newBoard[y][x], isHit: true };

        if (cell.hasShip && cell.shipType != null) {
          if (isShipCompletelyHit(cell.shipType, newBoard)) {
            markShipAsSunk(cell.shipType, newBoard);
          }
        }

        return newBoard;
      });

      setShots(prev => prev + 1);
      if (cell.hasShip) {
        setHits(prev => prev + 1);
      }
    },
    [board, gameWon],
  );

  const resetGame = useCallback(() => {
    setBoard(createInitialBoard);
    setShots(0);
    setHits(0);
  }, []);

  return {
    board,
    shots,
    hits,
    sunkShips,
    gameWon,
    handleShotClick,
    resetGame,
  };
};

export default useBattleshipGame;
