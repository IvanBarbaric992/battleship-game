import { cn } from '../shared/lib/utils';

interface PageLoaderProps {
  message?: string;
  showShipAnimation?: boolean;
}

const PageLoader = ({
  message = 'Loading battleship...',
  showShipAnimation = true,
}: PageLoaderProps) => (
  <div
    className={cn(
      'fixed inset-0 z-50 flex min-h-screen items-center justify-center',
      'bg-gradient-to-br from-ocean-50 via-water-50 to-ocean-100',
    )}
  >
    <div className='absolute inset-0 overflow-hidden'>
      <div
        className={cn(
          'absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full',
          'bg-ocean-100 opacity-30 blur-3xl',
        )}
      />
      <div
        className={cn(
          'absolute -top-32 -right-32 h-80 w-80 animate-pulse rounded-full',
          'bg-water-200 opacity-20 blur-3xl',
        )}
      />
      <div
        className={cn(
          'absolute -bottom-24 -left-32 h-80 w-80 animate-pulse rounded-full',
          'bg-ocean-200 opacity-25 blur-3xl',
        )}
      />
    </div>

    <div className='relative text-center'>
      <div className='mb-8'>
        {showShipAnimation ? (
          <div className={cn(`
            relative mx-auto mb-6 flex h-24 w-32 items-center justify-center
          `)}>
            <div className='ship-floating'>
              <span className='text-6xl'>⚓</span>
            </div>

            <div className='absolute right-0 bottom-0 left-0 h-2'>
              <div className='wave wave-1' />
              <div className='wave wave-2' />
              <div className='wave wave-3' />
            </div>
          </div>
        ) : (
          <div className='mb-6'>
            <span className='animate-bounce text-6xl'>⚓</span>
          </div>
        )}

        <h2
          className={cn(
            'mb-4 text-2xl font-bold text-ocean-800',
            `sm:text-3xl`,
          )}
        >
          {message}
        </h2>

        <div className={cn(`
          mx-auto mb-4 h-2 w-64 overflow-hidden rounded-full bg-water-200
        `)}>
          <div
            className={cn(
              'h-full loading-bar rounded-full bg-gradient-to-r from-ocean-500',
              'to-water-400',
            )}
          />
        </div>

        <div className='flex justify-center space-x-2'>
          <div className='h-3 w-3 loading-dot rounded-full bg-ocean-500' />
          <div
            className={cn(
              'h-3 w-3 loading-dot rounded-full bg-ocean-500',
              `loading-dot-delay-1`,
            )}
          />
          <div
            className={cn('h-3 w-3 loading-dot rounded-full bg-ocean-500', `
              loading-dot-delay-2
            `)}
          />
        </div>
      </div>

      <p className='text-sm text-ocean-600'>Preparing your fleet for battle...</p>
    </div>
  </div>
);

interface GameContentLoaderProps {
  message?: string;
}

const GameContentLoader = ({ message = 'Loading game...' }: GameContentLoaderProps) => (
  <div className='flex min-h-[400px] items-center justify-center'>
    <div className='text-center'>
      <div className='mb-4'>
        <span className='animate-spin text-4xl'>⚓</span>
      </div>
      <p className='text-lg font-medium text-ocean-700'>{message}</p>
      <div className='mt-4 flex justify-center space-x-1'>
        <div className='h-2 w-2 loading-dot rounded-full bg-ocean-400' />
        <div
          className={cn(
            'h-2 w-2 loading-dot rounded-full bg-ocean-400',
            `loading-dot-delay-1`,
          )}
        />
        <div
          className={cn(
            'h-2 w-2 loading-dot rounded-full bg-ocean-400',
            `loading-dot-delay-2`,
          )}
        />
      </div>
    </div>
  </div>
);

export { GameContentLoader, PageLoader };
