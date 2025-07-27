# ⚓ Battleship Game

A modern take on the classic naval strategy game built with React and TypeScript. Hunt down enemy ships on a 10x10 grid with an intuitive click-to-fire interface.

## Features

- **Responsive Design** - Plays great on mobile and desktop
- **Modern UI** - Clean interface with smooth animations
- **Game Statistics** - Track shots fired, hits, and accuracy
- **Fleet Status** - Visual ship status with damage indicators
- **Victory Celebration** - Modal with game results
- **Random Ship Placement** - Fixed or randomized fleet layouts

## Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Modern styling with custom design system
- **Zustand** - Lightweight state management
- **Vite** - Fast development and build tool

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

Open [http://localhost:5173](http://localhost:5173) to play the game.

## How to Play

1. Click any cell on the grid to fire a shot
2. 🔥 = Hit an enemy ship
3. 💧 = Miss (hit water)
4. 💥 = Ship completely destroyed
5. Sink all 5 ships to win!

## Project Structure

```
src/
├── features/           # Game features
│   ├── battle-field/   # Game board and controls
│   ├── game-stats/     # Statistics and victory modal
│   ├── game-instructions/ # How to play
│   └── ship-fleet/     # Fleet status display
├── entities/           # Business logic
│   └── board/          # Game state and ship data
├── shared/             # Reusable components
│   ├── ui/            # UI components
│   ├── config/        # Constants
│   └── lib/           # Utilities and types
└── pages/             # Page components
```

Built with modern web technologies for a smooth gaming experience.
