import { useBattleshipActions, useBattleshipIsRandomLayout } from '@/entities/board/store';

import Button from '../../components/Button';

interface LayoutSwitcherProps {
  size?: 'sm' | 'md' | 'lg';
}

const LayoutSwitcher = ({ size = 'md' }: LayoutSwitcherProps) => {
  const isRandomLayout = useBattleshipIsRandomLayout();
  const { resetGame } = useBattleshipActions();

  return (
    <div
      className={`
        mb-6 flex flex-col justify-center gap-3
        sm:flex-row
      `}
    >
      <Button
        size={size}
        variant={!isRandomLayout ? 'primary' : 'secondary'}
        onClick={() => {
          resetGame(false);
        }}
      >
        Play Fixed Ships
      </Button>
      <Button
        size={size}
        variant={isRandomLayout ? 'primary' : 'secondary'}
        onClick={() => {
          resetGame(true);
        }}
      >
        Play Random Ships
      </Button>
    </div>
  );
};

export default LayoutSwitcher;
