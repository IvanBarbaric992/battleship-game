import { BOARD_SIZE } from '@/shared/config/constants';
import type { CellState, ShipType } from '@/shared/lib/types';

import shipsData from '../data/ships.json';

export const createInitialBoard = (): CellState[][] => {
  const board: CellState[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
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

const shipPositionsCache = new Map<string, readonly number[][]>();

shipsData.layout.forEach(({ ship, positions }) => {
  shipPositionsCache.set(ship, Object.freeze(positions));
});

export const getShipPositions = (shipType: string): readonly number[][] =>
  shipPositionsCache.get(shipType) ?? [];

export const getTotalShipsCount = (): number => shipsData.layout.length;

export const markShipAsSunk = (shipType: string, draft: CellState[][]): void => {
  const positions = getShipPositions(shipType);

  for (const [x, y] of positions) {
    draft[y][x].isShipSunk = true;
  }
};

export const isShipCompletelyHit = (shipType: string, board: CellState[][]): boolean => {
  const shipPositions = getShipPositions(shipType);

  for (const [sx, sy] of shipPositions) {
    if (!board[sy][sx].isHit) {
      return false;
    }
  }
  return true;
};

export const isValidCoordinate = (x: number, y: number): boolean =>
  x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE;

export const calculateAccuracy = (hits: number, shots: number): number =>
  shots > 0 ? Math.round((hits / shots) * 100) : 0;
