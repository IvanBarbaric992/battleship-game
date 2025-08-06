import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';
import { useBattleshipActions } from '@/entities/board/store';

const StartPage = () => {
  const navigate = useNavigate();
  const { setGameMode } = useBattleshipActions();

  const handleEasyModeClick = () => {
    setGameMode('easy');
    void navigate('/game');
  };

  const handleHardModeClick = () => {
    setGameMode('hard');
    void navigate('/game');
  };

  return (
    <div
      className={`
        min-h-screen bg-gradient-to-br from-ocean-50 via-water-50 to-ocean-100
      `}
    >
      <div className='absolute inset-0 overflow-hidden'>
        <div
          className={`
            absolute -top-24 -left-24 h-96 w-96 rounded-full bg-ocean-100
            opacity-30 blur-3xl
          `}
        />
        <div
          className={`
            absolute -top-32 -right-32 h-80 w-80 rounded-full bg-water-200
            opacity-20 blur-3xl
          `}
        />
        <div
          className={`
            absolute -bottom-24 -left-32 h-80 w-80 rounded-full bg-ocean-200
            opacity-25 blur-3xl
          `}
        />
      </div>

      <div
        className={`
          relative flex min-h-screen flex-col items-center justify-center px-4
          py-8
        `}
      >
        <div className='mb-12 text-center'>
          <div className='mb-6'>
            <span
              className={`
                text-6xl
                sm:text-7xl
                md:text-8xl
              `}
            >
              ⚓
            </span>
          </div>
          <h1
            className={`
              mb-4 text-4xl font-bold text-ocean-800
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
            `}
          >
            Welcome to{' '}
            <span
              className={`
                bg-gradient-to-r from-ocean-600 to-water-400 bg-clip-text
                text-transparent
              `}
            >
              Battleship
            </span>
          </h1>
          <p
            className={`
              text-lg text-ocean-600
              sm:text-xl
              md:text-2xl
            `}
          >
            Choose your difficulty and set sail for battle!
          </p>
        </div>

        <div
          className={`
            w-full max-w-md rounded-2xl border border-ocean-100 bg-white/80 p-8
            shadow-2xl backdrop-blur-sm
          `}
        >
          <h2
            className={`
              mb-6 text-center text-xl font-semibold text-ocean-700
              sm:text-2xl
            `}
          >
            Select Difficulty
          </h2>

          <div className='space-y-4'>
            <Button
              variant='primary'
              className={`
                w-full transform transition-all duration-200
                hover:scale-105 hover:shadow-lg
              `}
              onClick={handleEasyModeClick}
            >
              <div className='flex items-center justify-between gap-2'>
                <span
                  className={`
                    text-sm font-semibold
                    sm:text-lg
                  `}
                >
                  🌊 Easy Mode
                </span>
                <span
                  className={`
                    text-xs opacity-75
                    sm:text-sm
                  `}
                >
                  10×10 Grid
                </span>
              </div>
            </Button>

            <Button
              variant='secondary'
              className={`
                w-full transform transition-all duration-200
                hover:scale-105 hover:shadow-lg
              `}
              onClick={handleHardModeClick}
            >
              <div className='flex items-center justify-between gap-2'>
                <span
                  className={`
                    text-sm font-semibold
                    sm:text-lg
                  `}
                >
                  ⚡ Hard Mode
                </span>
                <span
                  className={`
                    text-xs opacity-75
                    sm:text-sm
                  `}
                >
                  15×15 Grid
                </span>
              </div>
            </Button>
          </div>

          <div className='mt-8 text-center'>
            <p className='mb-3 text-sm font-medium text-ocean-600'>Game Features:</p>
            <div className='flex flex-wrap justify-center gap-2'>
              <span
                className={`
                  rounded-full bg-ocean-100 px-3 py-1 text-xs font-medium
                  text-ocean-700
                `}
              >
                🎯 Strategic Gameplay
              </span>
              <span
                className={`
                  rounded-full bg-water-100 px-3 py-1 text-xs font-medium
                  text-ocean-700
                `}
              >
                📊 Live Statistics
              </span>
              <span
                className={`
                  rounded-full bg-victory-100 px-3 py-1 text-xs font-medium
                  text-ocean-700
                `}
              >
                🏆 Victory Animations
              </span>
            </div>
          </div>
        </div>

        <div className='mt-12 text-center'>
          <p className='text-sm text-ocean-500'>Sink all enemy ships to claim victory! 🚢</p>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
