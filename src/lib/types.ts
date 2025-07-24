export const BOARD_SIZE = 10;

export type ShipType = 'carrier' | 'battleship' | 'cruiser' | 'submarine' | 'destroyer';

export interface CellState {
  isHit: boolean;
  hasShip: boolean;
  shipType?: ShipType;
  isShipSunk?: boolean;
}

export interface Ship {
  name: string;
  size: number;
  positions: [number, number][];
  hits: number;
}

export interface GameState {
  board: CellState[][];
  ships: Ship[];
  shots: number;
  hits: number;
  gameWon: boolean;
}
