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

const shipPositionsCache = new Map<string, number[][]>();
const shipPositionSetsCache = new Map<string, Set<string>>();
const allShipTypes = shipsData.layout.map(({ ship }) => ship);
const totalShipsCount = shipsData.layout.length;

shipsData.layout.forEach(({ ship, positions }) => {
  shipPositionsCache.set(ship, positions);
  shipPositionSetsCache.set(
    ship,
    new Set(positions.map(([x, y]) => `${x.toString()},${y.toString()}`)),
  );
});

export const getShipPositions = (shipType: string): number[][] =>
  shipPositionsCache.get(shipType) ?? [];

export const getShipPositionSet = (shipType: string): Set<string> =>
  shipPositionSetsCache.get(shipType) ?? new Set();

export const getAllShipTypes = (): string[] => allShipTypes;
export const getTotalShipsCount = (): number => totalShipsCount;

export const markShipAsSunk = (shipType: string, board: CellState[][]): CellState[][] => {
  const positionSet = getShipPositionSet(shipType);

  return board.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (positionSet.has(`${colIndex.toString()},${rowIndex.toString()}`)) {
        return { ...cell, isShipSunk: true };
      }
      return cell;
    }),
  );
};

export const isShipCompletelyHit = (shipType: string, newBoard: CellState[][]): boolean => {
  const shipPositions = getShipPositions(shipType);
  return shipPositions.every(([sx, sy]) => newBoard[sy][sx].isHit);
};
