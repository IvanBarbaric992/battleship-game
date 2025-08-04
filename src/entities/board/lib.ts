/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { BOARD_SIZE, PLACEMENT_PREFERENCES } from '@/shared/config/constants';
import { ShipDirection, type CellState, type ShipType } from '@/shared/lib/types';

import shipsData from '../data/ships.json';

export const createEmptyBoard = (): CellState[][] =>
  Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      isHit: false,
      hasShip: false,
    })),
  );

const placeShipsOnBoard = (
  board: CellState[][],
  shipLayout: { ship: string; positions: number[][] }[],
): void => {
  shipLayout.forEach(({ ship, positions }) => {
    positions.forEach(([x, y]) => {
      board[y][x] = {
        isHit: false,
        hasShip: true,
        shipType: ship as ShipType,
      };
    });
  });
};

const createBoardWithShips = (
  shipLayout: { ship: string; positions: number[][] }[],
  updateCacheFn: () => void,
): CellState[][] => {
  const board = createEmptyBoard();
  updateCacheFn();
  placeShipsOnBoard(board, shipLayout);
  return board;
};

export const createFixedShipsBoard = (): CellState[][] =>
  createBoardWithShips(shipsData.layout, updateShipCacheForFixedLayout);

const shipPositionsCache = new Map<string, readonly number[][]>();
const shipPositionSetsCache = new Map<string, Set<string>>();
const allShipTypes = Object.freeze(shipsData.layout.map(({ ship }) => ship));
const totalShipsCount = shipsData.layout.length;

const updateShipCache = (shipLayout: { ship: string; positions: number[][] }[]): void => {
  shipPositionsCache.clear();
  shipPositionSetsCache.clear();

  // Populate cache with new positions
  shipLayout.forEach(({ ship, positions }) => {
    shipPositionsCache.set(ship, Object.freeze(positions as [number, number][]));
    shipPositionSetsCache.set(ship, new Set(positions.map(([x, y]) => `${x},${y}`)));
  });
};

updateShipCache(shipsData.layout);

const calculateShipPositions = (
  startX: number,
  startY: number,
  length: number,
  direction: ShipDirection,
): [number, number][] => {
  const positions: [number, number][] = [];

  for (let i = 0; i < length; i++) {
    const x = direction === ShipDirection.HORIZONTAL ? startX + i : startX;
    const y = direction === ShipDirection.VERTICAL ? startY + i : startY;
    positions.push([x, y]);
  }

  return positions;
};

export const isShipPlacementValid = (
  startX: number,
  startY: number,
  length: number,
  direction: ShipDirection,
  occupiedCells: Set<string>,
): boolean => {
  const positions = calculateShipPositions(startX, startY, length, direction);

  // Check if all positions are valid coordinates
  for (const [x, y] of positions) {
    if (!isValidCoordinate(x, y)) {
      return false;
    }
  }

  // Check if positions are free and have buffer space
  for (const [x, y] of positions) {
    if (occupiedCells.has(`${x},${y}`)) {
      return false;
    }

    // Check surrounding cells for spacing
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const checkX = x + dx;
        const checkY = y + dy;

        if (isValidCoordinate(checkX, checkY) && occupiedCells.has(`${checkX},${checkY}`)) {
          return false;
        }
      }
    }
  }

  return true;
};

interface RandomPlacedShip {
  ship: string;
  positions: [number, number][];
}

let shipLayoutCache: RandomPlacedShip[] | null = null;

export const generateRandomShipLayout = (): RandomPlacedShip[] => {
  if (shipLayoutCache) {
    return shipLayoutCache;
  }

  const ships: RandomPlacedShip[] = [];
  const occupiedCells = new Set<string>();

  // Get ship data from JSON and sort by size (larger first for better placement success)
  const sortedShips = [...shipsData.layout].sort((a, b) => b.positions.length - a.positions.length);

  for (const shipData of sortedShips) {
    const { ship: shipType } = shipData;
    const size = shipData.positions.length;
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < PLACEMENT_PREFERENCES.MAX_PLACEMENT_ATTEMPTS) {
      const direction =
        Math.random() < PLACEMENT_PREFERENCES.VERTICAL_PROBABILITY
          ? ShipDirection.VERTICAL
          : ShipDirection.HORIZONTAL;
      const startX = Math.floor(
        Math.random() *
          (direction === ShipDirection.HORIZONTAL ? BOARD_SIZE - size + 1 : BOARD_SIZE),
      );
      const startY = Math.floor(
        Math.random() * (direction === ShipDirection.VERTICAL ? BOARD_SIZE - size + 1 : BOARD_SIZE),
      );

      if (isShipPlacementValid(startX, startY, size, direction, occupiedCells)) {
        const positions = calculateShipPositions(startX, startY, size, direction);

        // Add positions to occupied cells
        positions.forEach(([x, y]) => {
          occupiedCells.add(`${x},${y}`);
        });

        ships.push({ ship: shipType, positions });
        placed = true;
      }

      attempts++;
    }

    if (!placed) {
      // Recursive retry if placement failed
      shipLayoutCache = null;
      return generateRandomShipLayout();
    }
  }

  shipLayoutCache = ships;
  return ships;
};

export const createRandomShipsBoard = (): CellState[][] => {
  // Clear cache and generate new layout
  shipLayoutCache = null;
  const shipLayout = generateRandomShipLayout();
  return createBoardWithShips(shipLayout, () => {
    updateShipCacheForRandomLayout(shipLayout);
  });
};

export const updateShipCacheForRandomLayout = (shipLayout: RandomPlacedShip[]): void => {
  updateShipCache(shipLayout);
};

export const updateShipCacheForFixedLayout = (): void => {
  updateShipCache(shipsData.layout);
};

export const getShipPositions = (shipType: string): readonly number[][] =>
  shipPositionsCache.get(shipType) ?? Object.freeze([]);

export const getAllShipTypes = (): readonly string[] => allShipTypes;

export const getTotalShipsCount = (): number => totalShipsCount;

export const markShipAsSunkMutation = (shipType: string, draft: CellState[][]): void => {
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
