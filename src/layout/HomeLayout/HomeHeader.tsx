import { SearchIcon, SunIcon, MoonIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Text,
  useColorMode,
  Image,
  useBoolean,
  Stack,
  Flex,
  FlexProps,
} from '@chakra-ui/react';
import {
  ChangeEventHandler,
  FC,
  FocusEventHandler,
  PropsWithChildren,
  useState,
} from 'react';
import { Search } from './Search';

type Props = PropsWithChildren<FlexProps>;

export const HomeHeader: FC<Props> = ({ ...flexProps }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isOpen, toggleOpen] = useBoolean();

  return (
    <Flex {...flexProps}>
      <Box display="flex">
        <Text
          as="h1"
          fontFamily="Neko"
          fontSize={{ sm: '4xl', base: '2xl' }}
          fontWeight="semibold"
        >
          Nyan-imeList
        </Text>
        <Image
          alt="Nyanime-List"
          src="/images/logo.png"
          width={{ sm: '4rem', base: '3.5rem' }}
          draggable="false"
        />
      </Box>
      <Box display={{ base: 'block', md: 'none' }} onClick={toggleOpen.toggle}>
        <HamburgerIcon />
      </Box>
      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
        flex="1"
      >
        <Stack
          spacing={8}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <Search />
          <Box
            as="div"
            display="flex"
            width={{ sm: 'initial', base: '100%' }}
            flexDirection={{ sm: 'row', base: 'column' }}
            // marginBottom={{ base: "2!important", sm: "0!important" }}
            gap="4"
          >
            <Button
              onClick={toggleColorMode}
              rightIcon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            >
              {colorMode === 'dark' ? 'Light' : 'Dark'}
            </Button>
            <Button>Log-in</Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};
