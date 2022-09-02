import { useEffect, RefObject, useState } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export const useOutsideChecker = <T extends Element>(ref: RefObject<T>) => {
  const [isOutside, setIsOutside] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as any)) {
        setIsOutside(true);
      } else {
        setIsOutside(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return isOutside;
};
