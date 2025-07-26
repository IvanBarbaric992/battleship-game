import { type CSSProperties, type ReactNode, useCallback } from 'react';

import { createPortal } from 'react-dom';

import { useAnimateModal, useClickAway, useKeyPressClose } from '@/shared/hooks';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnBackdropClick = true,
}: ModalProps) => {
  const { shouldRender, isAnimating } = useAnimateModal({ isOpen });

  const handleClickAway = useCallback(() => {
    if (closeOnBackdropClick && isOpen) {
      onClose();
    }
  }, [closeOnBackdropClick, isOpen, onClose]);

  const modalRef = useClickAway(handleClickAway);

  useKeyPressClose(shouldRender ? onClose : null);

  if (!shouldRender) {
    return null;
  }

  const portalElement = document.querySelector('#modal-portal');
  if (!portalElement) {
    return null;
  }

  const modalContent = (
    <div
      aria-labelledby={title != null ? 'modal-title' : undefined}
      aria-modal='true'
      role='dialog'
      className={`
        fixed inset-0 z-50 flex
        [animation:var(--backdrop-animation)]
        items-center justify-center p-4
      `}
      style={
        {
          '--backdrop-animation': isAnimating
            ? 'backdrop-enter 0.3s ease-out'
            : 'backdrop-exit 0.2s ease-in',
        } as CSSProperties
      }
    >
      <div className='absolute inset-0 bg-black/50' />

      <div
        ref={modalRef}
        className={`
          relative w-full max-w-md transform
          [animation:var(--modal-animation)]
          rounded-lg bg-white p-6 shadow-xl
        `}
        style={
          {
            '--modal-animation': isAnimating
              ? 'modal-enter 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              : 'modal-exit 0.2s cubic-bezier(0.4, 0, 1, 1)',
          } as CSSProperties
        }
      >
        {showCloseButton && (
          <button
            aria-label='Close modal'
            className={`
              absolute top-2 right-2 z-10 cursor-pointer rounded-full p-2
              text-gray-400 transition-colors
              hover:bg-gray-100 hover:text-gray-600
              focus:ring-2 focus:ring-blue-500 focus:outline-none
            `}
            onClick={onClose}
          >
            <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                d='M6 18L18 6M6 6l12 12'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
              />
            </svg>
          </button>
        )}

        {title != null && (
          <div className='mb-4'>
            <h2 className='text-xl font-semibold text-gray-900' id='modal-title'>
              {title}
            </h2>
          </div>
        )}

        <div>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, portalElement);
};

export default Modal;
