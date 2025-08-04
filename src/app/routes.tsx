import { createBrowserRouter } from 'react-router-dom';

import GamePage from '@/pages/GamePage';
import StartPage from '@/pages/StartPage';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <StartPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
]);
