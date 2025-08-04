/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { produce } from 'immer';
import { create } from 'zustand';

import type { CellState } from '../../shared/lib/types';

import {
  calculateAccuracy,
  createBoard,
  createFixedShipsBoard,
  getTotalShipsCount,
  isShipCompletelyHit,
  isValidCoordinate,
  markShipAsSunkMutation,
} from './lib';

interface BattleshipState {
  board: CellState[][];
  shots: number;
  hits: number;
  accuracy: number;
  gameWon: boolean;
  sunkShips: string[];
  isRandomLayout: boolean;
  actions: {
    fireShot: (x: number, y: number) => void;
    resetGame: (isRandomLayout?: boolean) => void;
  };
}

const initialState = {
  board: createFixedShipsBoard(),
  shots: 0,
  hits: 0,
  accuracy: 0,
  gameWon: false,
  sunkShips: [],
  isRandomLayout: false,
};

export const useBattleshipStore = create<BattleshipState>((set, get) => ({
  ...initialState,

  actions: {
    fireShot: (x: number, y: number) => {
      if (!isValidCoordinate(x, y)) {
        console.warn(`Invalid coordinates: ${x}, ${y}`);
        return;
      }

      const currentState = get();
      const { board, gameWon, sunkShips } = currentState;

      const cellSnapshot = { ...board[y][x] };

      if (cellSnapshot.isHit || gameWon) {
        return;
      }

      const updatedState = produce(currentState, draft => {
        draft.board[y][x].isHit = true;

        const isHit = cellSnapshot.hasShip;
        draft.shots += 1;
        if (isHit) {
          draft.hits += 1;
        }
        draft.accuracy = calculateAccuracy(draft.hits, draft.shots);

        if (cellSnapshot.hasShip && cellSnapshot.shipType) {
          const isCurrentShipSunk = isShipCompletelyHit(cellSnapshot.shipType, draft.board);

          if (isCurrentShipSunk) {
            markShipAsSunkMutation(cellSnapshot.shipType, draft.board);

            if (!sunkShips.includes(cellSnapshot.shipType)) {
              draft.sunkShips.push(cellSnapshot.shipType);
            }
          }
        }

        draft.gameWon = draft.sunkShips.length === getTotalShipsCount();
      });

      set(updatedState);
    },

    resetGame: (isRandomLayout = false) => {
      const newBoard = createBoard(isRandomLayout);

      set({
        ...initialState,
        board: newBoard,
        isRandomLayout,
      });
    },
  },
}));

export const useBattleshipBoard = (): CellState[][] => useBattleshipStore(state => state.board);
export const useBattleshipShots = (): number => useBattleshipStore(state => state.shots);
export const useBattleshipHits = (): number => useBattleshipStore(state => state.hits);
export const useBattleshipAccuracy = (): number => useBattleshipStore(state => state.accuracy);
export const useBattleshipGameWon = (): boolean => useBattleshipStore(state => state.gameWon);
export const useBattleshipSunkShips = (): readonly string[] =>
  useBattleshipStore(state => state.sunkShips);
export const useBattleshipIsRandomLayout = (): boolean =>
  useBattleshipStore(state => state.isRandomLayout);
export const useBattleshipActions = () => useBattleshipStore(state => state.actions);
