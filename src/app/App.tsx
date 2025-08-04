import { RouterProvider } from 'react-router-dom';

import { routes } from '@/app/routes';
import { usePreventScroll } from '@/shared/hooks';

const App = () => {
  usePreventScroll();

  return <RouterProvider router={routes} />;
};

export default App;
