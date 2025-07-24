export const SHIP_ICONS: Record<string, string> = {
  carrier: '/Carrier Shape.png',
  battleship: '/Battleship Shape.png',
  cruiser: '/Cruiser Shape.png',
  submarine: '/Submarine Shape.png',
  destroyer: '/Aircraft Shape.png',
};

export const EMOJI = {
  SUNK: '💥',
  HIT: '🔥',
  MISS: '💧',
} as const;

export const BOARD_SIZE = 10;

export const COLUMN_LABELS = 'ABCDEFGHIJ'.split('');
export const ROW_LABELS = Array.from({ length: BOARD_SIZE }, (_, i) => (i + 1).toString());
