import { BOARD_SIZE } from '@/shared/config/constants';
import type { CellState, ShipType } from '@/shared/lib/types';

import shipsData from '../data/ships.json';

export const createInitialBoard = (): CellState[][] => {
  const board: CellState[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() =>
      Array(BOARD_SIZE)
        .fill(null)
        .map(() => ({
          isHit: false,
          hasShip: false,
        })),
    );

  shipsData.layout.forEach(({ ship, positions }) => {
    positions.forEach(([x, y]) => {
      board[y][x] = {
        isHit: false,
        hasShip: true,
        shipType: ship as ShipType,
      };
    });
  });

  return board;
};

export const getShipPositions = (shipType: string) =>
  shipsData.layout.find(s => s.ship === shipType)?.positions ?? [];

export const markShipAsSunk = (shipType: string, newBoard: CellState[][]) => {
  const shipPositions = getShipPositions(shipType);
  shipPositions.forEach(([sx, sy]) => {
    newBoard[sy][sx] = { ...newBoard[sy][sx], isShipSunk: true };
  });
};

export const isShipCompletelyHit = (shipType: string, newBoard: CellState[][]): boolean => {
  const shipPositions = getShipPositions(shipType);
  return shipPositions.every(([sx, sy]) => newBoard[sy][sx].isHit);
};
