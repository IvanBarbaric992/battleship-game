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
        inline-flex items-center justify-center rounded-md font-medium
        transition-colors
      `,
      `
        focus-visible:ring-2 focus-visible:outline-none
        disabled:pointer-events-none disabled:opacity-50
      `,
      {
        'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
        'bg-gray-200 text-gray-900 hover:bg-gray-300': variant === 'secondary',
        'bg-red-600 text-white hover:bg-red-700': variant === 'destructive',
        'h-8 px-3 text-sm': size === 'sm',
        'h-10 px-4': size === 'md',
        'h-12 px-6 text-lg': size === 'lg',
      },
      className,
    )}
    {...props}
  />
);

export default Button;
