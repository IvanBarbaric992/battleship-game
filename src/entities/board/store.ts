import { produce } from 'immer';
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

      const cellSnapshot = { ...board[y][x] };

      if (cellSnapshot.isHit || gameWon) {
        return;
      }

      const isHit = cellSnapshot.hasShip;
      const newShots = currentState.shots + 1;
      const newHits = currentState.hits + (isHit ? 1 : 0);
      const newAccuracy = newShots > 0 ? Math.round((newHits / newShots) * 100) : 0;

      const updatedState = produce(currentState, draft => {
        draft.board[y][x].isHit = true;

        draft.shots = newShots;
        draft.hits = newHits;
        draft.accuracy = newAccuracy;

        if (cellSnapshot.hasShip && cellSnapshot.shipType) {
          const isCurrentShipSunk = isShipCompletelyHit(cellSnapshot.shipType, draft.board);

          if (isCurrentShipSunk) {
            draft.board = markShipAsSunk(cellSnapshot.shipType, draft.board);

            if (!currentSunkShips.includes(cellSnapshot.shipType)) {
              draft.sunkShips.push(cellSnapshot.shipType);
            }
          }
        }

        draft.gameWon = draft.sunkShips.length === getTotalShipsCount();
      });

      set(updatedState);
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
