import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, BoxProps } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react';

export type CarouselProps = PropsWithChildren<
  {
    onChange?: (currentIndex: number) => void;
  } & Omit<BoxProps, 'onChange'>
>;

export const Carousel: FC<CarouselProps> = ({
  children,
  onChange,
  ...boxProps
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ref.current) {
      ref.current.children[currentIdx]?.classList.add('active');
    }

    onChange?.(currentIdx);
  });

  const handleCurrentIdx = (direction: 'next' | 'prev') => () => {
    if (ref.current) {
      for (const child of Array.from(ref.current.children)) {
        child.classList.remove('active');
      }

      let idx = currentIdx;

      if (direction === 'prev' && currentIdx === 0)
        idx = ref.current.children.length - 1;
      else if (direction === 'prev') idx--;
      else if (
        direction === 'next' &&
        currentIdx === ref.current.children.length - 1
      )
        idx = 0;
      else if (direction === 'next') idx++;

      setCurrentIdx(idx);
    }
  };

  return (
    <Box display="block" position="relative">
      <Box
        overflow="hidden"
        css={css`
          & > *:not(.active) {
            display: none;
          }
        `}
        ref={ref}
        {...boxProps}
      >
        {children}
      </Box>
      <Box position="absolute" right="4" bottom="4" display="flex" gap="8px">
        <ArrowBackIcon onClick={handleCurrentIdx('prev')} cursor="pointer" />
        <ArrowForwardIcon onClick={handleCurrentIdx('next')} cursor="pointer" />
      </Box>
    </Box>
  );
};
