import { useBoolean } from '@chakra-ui/react';
import { useEffect } from 'react';

export const useDomReady = () => {
  const [isDomReady, setIsDomReady] = useBoolean(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDomReady.on();
    }
  });

  return isDomReady;
};
