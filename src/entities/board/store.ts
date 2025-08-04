/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { produce } from 'immer';
import { create } from 'zustand';

import type { CellState } from '../../shared/lib/types';

import {
  calculateAccuracy,
  createBoard,
  getTotalShipsCount,
  isShipCompletelyHit,
  markShipAsSunk,
} from './lib';

interface BattleshipState {
  board: CellState[][];
  shots: number;
  hits: number;
  accuracy: number;
  gameWon: boolean;
  sunkShips: string[];
  isRandomLayout: boolean;
  gameMode: 'easy' | 'hard';
  actions: {
    fireShot: (x: number, y: number) => void;
    resetGame: (isRandomLayout?: boolean) => void;
    setGameMode: (mode: 'easy' | 'hard') => void;
  };
}

const initialState = {
  board: null,
  shots: 0,
  hits: 0,
  accuracy: 0,
  gameWon: false,
  sunkShips: [],
  isRandomLayout: false,
  gameMode: 'easy' as 'easy' | 'hard',
};

export const useBattleshipStore = create<BattleshipState>((set, get) => ({
  ...initialState,
  board: createBoard(false, 10),

  actions: {
    fireShot: (x: number, y: number) => {
      const currentState = get();
      const { board, gameWon, sunkShips } = currentState;

      if (x < 0 || x >= board[0].length || y < 0 || y >= board.length) {
        console.warn(`Invalid coordinates: ${x}, ${y}`);
        return;
      }

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
            markShipAsSunk(cellSnapshot.shipType, draft.board);

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
      const currentState = get();
      const boardSize = currentState.gameMode === 'easy' ? 10 : 15;
      const newBoard = createBoard(isRandomLayout, boardSize);

      set({
        ...initialState,
        board: newBoard,
        isRandomLayout,
        gameMode: currentState.gameMode,
      });
    },

    setGameMode: (mode: 'easy' | 'hard') => {
      const boardSize = mode === 'easy' ? 10 : 15;
      const newBoard = createBoard(false, boardSize);

      set({
        ...initialState,
        board: newBoard,
        gameMode: mode,
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
export const useBattleshipGameMode = (): 'easy' | 'hard' =>
  useBattleshipStore(state => state.gameMode);
export const useBattleshipBoardSize = (): number =>
  useBattleshipStore(state => (state.gameMode === 'easy' ? 10 : 15));
export const useBattleshipActions = () => useBattleshipStore(state => state.actions);
