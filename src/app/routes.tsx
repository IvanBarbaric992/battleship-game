import { lazy, Suspense } from 'react';

import { createBrowserRouter } from 'react-router-dom';

import { PageLoader } from '@/components/Loader';

import ErrorBoundary from './ErrorBoundary';
import RootLayout from './RootLayout';

const StartPage = lazy(async () => await import('@/pages/StartPage'));
const GamePage = lazy(async () => await import('@/pages/GamePage'));

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader message='Loading Battleship...' />}>
            <StartPage />
          </Suspense>
        ),
      },
      {
        path: 'game',
        element: (
          <Suspense fallback={<PageLoader showShipAnimation message='Setting up battlefield...' />}>
            <GamePage />
          </Suspense>
        ),
      },
    ],
  },
]);
