import GamePage from '@/pages/GamePage';
import { usePreventScroll } from '@/shared/hooks';

const App = () => {
  usePreventScroll();

  return <GamePage />;
};

export default App;
