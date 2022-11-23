import { Box, BoxProps, Flex } from '@chakra-ui/react';
import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  PropsWithChildren,
  useRef,
} from 'react';
import { HomeHeader } from './HomeHeader';

type HomeLayoutProps = PropsWithChildren<BoxProps>;

export const HomeLayout: FC<HomeLayoutProps> = ({ children, ...boxProps }) => {
  const headerRef = useRef<HTMLHeadingElement>(null);

  return (
    <Box>
      <Box
        as="header"
        position="sticky"
        top="0"
        zIndex="3"
        ref={headerRef}
        mx="1rem"
      >
        {/* <Flex> */}
        <HomeHeader
          mx="auto"
          maxW="container.xl"
          p={{ sm: '0.4rem 1rem', base: '0.8rem 1rem' }}
          background="chakra-body-bg"
          justifyContent="space-between"
          boxShadow="md"
          as="nav"
          align="center"
          wrap="wrap"
          rounded="md"
          roundedTopStart={0}
          roundedTopEnd={0}
        />
        {/* </Flex> */}
      </Box>
      <Box as="main" display="flex" justifyContent="center">
        <Box
          maxW="container.xl"
          m="1rem"
          flex="1"
          {...boxProps}
          // backgroundColor="chakra-body-bg"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
