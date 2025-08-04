import { useNavigate } from 'react-router-dom';

import { Button } from '@/components';

const StartPage = () => {
  const navigate = useNavigate();

  const handleEasyModeClick = () => {
    void navigate('/game');
  };

  const handleHardModeClick = () => {
    void navigate('/game');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-4'>
      <h1>Welcome to Battleship</h1>
      <p>Please choose difficulty mode</p>
      <div className='flex gap-2'>
        <Button variant='primary' onClick={handleEasyModeClick}>
          Easy mode
        </Button>
        <Button variant='secondary' onClick={handleHardModeClick}>
          Hard mode
        </Button>
      </div>
    </div>
  );
};

export default StartPage;
