import { createBrowserRouter } from 'react-router-dom';

import { ErrorBoundary, RootLayout } from '@/components';
import GamePage from '@/pages/GamePage';
import StartPage from '@/pages/StartPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    ErrorBoundary,
    children: [
      {
        index: true,
        Component: StartPage,
      },
      {
        path: 'game',
        Component: GamePage,
      },
    ],
  },
]);
