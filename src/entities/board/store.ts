import { create } from 'zustand';

import type { CellState } from '../../shared/lib/types';

import { createInitialBoard, getTotalShipsCount, isShipCompletelyHit, markShipAsSunk } from './lib';

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
      const currentState = get();
      const { board, gameWon, sunkShips: currentSunkShips } = currentState;
      const cell = board[y][x];

      if (cell.isHit || gameWon) {
        return;
      }

      const isHit = cell.hasShip;
      const newShots = currentState.shots + 1;
      const newHits = currentState.hits + (isHit ? 1 : 0);
      const newAccuracy = newShots > 0 ? Math.round((newHits / newShots) * 100) : 0;

      const newBoard = board.map((row, rowIndex) => {
        if (rowIndex === y) {
          return row.map((cellState, colIndex) => {
            if (colIndex === x) {
              return { ...cellState, isHit: true };
            }
            return cellState;
          });
        }
        return row;
      });

      let finalBoard = newBoard;
      let isCurrentShipSunk = false;

      if (cell.hasShip && cell.shipType) {
        isCurrentShipSunk = isShipCompletelyHit(cell.shipType, newBoard);
        if (isCurrentShipSunk) {
          finalBoard = markShipAsSunk(cell.shipType, newBoard);
        }
      }

      const newSunkShips =
        isCurrentShipSunk && cell.shipType && !currentSunkShips.includes(cell.shipType)
          ? [...currentSunkShips, cell.shipType]
          : currentSunkShips;

      const newGameWon = newSunkShips.length === getTotalShipsCount();

      set(() => ({
        board: finalBoard,
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
