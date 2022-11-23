import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        textDecoration: 'none!important',
        _hover: {
          color: 'cyan.500',
        },
      },
    },
  },
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  fonts: {
    heading: `system-ui`,
    body: `system-ui`,
    mono: `monospace`,
  },
});
