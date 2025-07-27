import { create } from 'zustand';

import type { CellState } from '../../shared/lib/types';
import shipsData from '../data/ships.json';

import { createInitialBoard, isShipCompletelyHit, markShipAsSunk } from './lib';

interface BattleshipState {
  board: CellState[][];
  shots: number;
  hits: number;
  accuracy: number;
  gameWon: boolean;
  sunkShips: string[];
  actions: {
    fireShot: (x: number, y: number) => void;
    resetGame: () => void;
  };
}

const initialState = {
  board: createInitialBoard(),
  shots: 0,
  hits: 0,
  accuracy: 0,
  gameWon: false,
  sunkShips: [],
};

export const useBattleshipStore = create<BattleshipState>((set, get) => ({
  ...initialState,

  actions: {
    fireShot: (x: number, y: number) => {
      const { board, gameWon } = get();
      const cell = board[y][x];

      if (cell.isHit || gameWon) {
        return;
      }

      const newBoard = board.map((row, rowIndex) =>
        row.map((cellState, colIndex) => {
          if (rowIndex === y && colIndex === x) {
            return { ...cellState, isHit: true };
          }
          return cellState;
        }),
      );

      if (cell.hasShip && cell.shipType) {
        if (isShipCompletelyHit(cell.shipType, newBoard)) {
          markShipAsSunk(cell.shipType, newBoard);
        }
      }

      const newSunkShips = shipsData.layout
        .filter(({ ship }) => isShipCompletelyHit(ship, newBoard))
        .map(s => s.ship);

      const newGameWon = newSunkShips.length === shipsData.layout.length;
      const currentState = get();
      const newShots = currentState.shots + 1;
      const newHits = currentState.hits + (cell.hasShip ? 1 : 0);
      const newAccuracy = newShots > 0 ? Math.round((newHits / newShots) * 100) : 0;

      set(() => ({
        board: newBoard,
        shots: newShots,
        hits: newHits,
        accuracy: newAccuracy,
        sunkShips: newSunkShips,
        gameWon: newGameWon,
      }));
    },

    resetGame: () => {
      set({
        ...initialState,
        board: createInitialBoard(),
      });
    },
  },
}));

export const useBattleshipBoard = () => useBattleshipStore(state => state.board);
export const useBattleshipShots = () => useBattleshipStore(state => state.shots);
export const useBattleshipHits = () => useBattleshipStore(state => state.hits);
export const useBattleshipAccuracy = () => useBattleshipStore(state => state.accuracy);
export const useBattleshipGameWon = () => useBattleshipStore(state => state.gameWon);
export const useBattleshipSunkShips = () => useBattleshipStore(state => state.sunkShips);
export const useBattleshipActions = () => useBattleshipStore(state => state.actions);
