import type { ButtonHTMLAttributes } from 'react';

import { cn } from '../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ className, variant = 'primary', size = 'md', ...props }: ButtonProps) => (
  <button
    disabled={Boolean(props.disabled)}
    type='button'
    className={cn(
      `
        inline-flex items-center justify-center rounded-lg font-semibold
        shadow-md transition-colors duration-200
      `,
      `
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-ocean-500 focus-visible:outline-none
        disabled:pointer-events-none disabled:opacity-50
      `,
      {
        'bg-ocean-500 text-white hover:bg-ocean-600 active:bg-ocean-700': variant === 'primary',
        'bg-ship-200 text-ship-800 hover:bg-ship-100 active:bg-ship-400': variant === 'secondary',
        'bg-hit-400 text-white hover:bg-hit-500 active:bg-hit-500': variant === 'destructive',
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4 text-base': size === 'md',
        'h-12 px-6 text-lg': size === 'lg',
      },
      className,
    )}
    {...props}
  />
);

export default Button;
