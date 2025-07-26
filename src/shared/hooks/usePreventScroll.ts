import { useEffect, useRef } from 'react';

const usePreventScroll = () => {
  const stateRef = useRef({
    originalStyles: {
      overflow: '',
      position: '',
      top: '',
      width: '',
      height: '',
      paddingRight: '',
    },
    scrollPosition: 0,
    isLocked: false,
    modalCount: 0,
  });

  useEffect(() => {
    const dialogPortal = document.getElementById('modal-portal');
    if (!dialogPortal) {
      return;
    }

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const lockScroll = () => {
      const state = stateRef.current;

      if (!state.isLocked) {
        state.scrollPosition = window.scrollY;

        state.originalStyles = {
          overflow: document.body.style.overflow,
          position: document.body.style.position,
          top: document.body.style.top,
          width: document.body.style.width,
          height: document.body.style.height,
          paddingRight: document.body.style.paddingRight,
        };

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        if (isIOS) {
          document.body.style.position = 'fixed';
          document.body.style.top = `-${state.scrollPosition.toString()}px`;
          document.body.style.width = '100%';
          document.body.style.height = '100%';
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'hidden';
          document.body.style.paddingRight = `${scrollbarWidth.toString()}px`;
        }

        state.isLocked = true;
      }
    };

    const unlockScroll = () => {
      const state = stateRef.current;

      if (state.isLocked) {
        if (isIOS) {
          document.body.style.position = state.originalStyles.position || '';
          document.body.style.top = state.originalStyles.top || '';
          document.body.style.height = state.originalStyles.height || '';
          document.body.style.width = state.originalStyles.width || '';
          document.body.style.overflow = state.originalStyles.overflow || '';

          window.scrollTo(0, state.scrollPosition);
        } else {
          document.body.style.overflow = state.originalStyles.overflow || '';
          document.body.style.paddingRight = state.originalStyles.paddingRight || '';
        }

        state.isLocked = false;
      }
    };

    const updateScrollState = () => {
      const previousModalCount = stateRef.current.modalCount;
      const currentModalCount = dialogPortal.children.length;
      stateRef.current.modalCount = currentModalCount;

      if (previousModalCount === 0 && currentModalCount > 0) {
        lockScroll();
      } else if (previousModalCount > 0 && currentModalCount === 0) {
        unlockScroll();
      }
    };

    updateScrollState();

    const observer = new MutationObserver(updateScrollState);
    observer.observe(dialogPortal, { childList: true });

    return () => {
      observer.disconnect();
      unlockScroll();
    };
  }, []);
};

export default usePreventScroll;
