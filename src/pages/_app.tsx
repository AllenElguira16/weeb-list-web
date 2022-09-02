import type { AppProps } from 'next/app';
import { FC, useEffect, useState } from 'react';
import {
  Box,
  ChakraProvider,
  cookieStorageManagerSSR,
  IconButton,
  localStorageManager,
} from '@chakra-ui/react';
import {
  QueryClientProvider,
  Hydrate,
  QueryClient,
} from '@tanstack/react-query';
import { GetServerSideProps } from 'next';
import { theme } from '../config';
import { Global } from '@emotion/react';
import NextNProgress from 'nextjs-progressbar';
import { TriangleUpIcon } from '@chakra-ui/icons';

if (
  process.env.NEXT_PUBLIC_ENV === 'development' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
)
  require('../mocks');

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
          },
        },
      }),
  );

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider
          theme={theme}
          colorModeManager={
            typeof pageProps.cookies === 'string'
              ? cookieStorageManagerSSR(pageProps.cookies)
              : localStorageManager
          }
        >
          <Global
            styles={`
              @font-face {
                font-family: 'Neko';
                font-style: normal;
                src: url('/fonts/Neko.ttf');
              }
              @font-face {
                font-family: 'Roboto';
                font-style: normal;
                src: url('/fonts/Roboto-Regular.ttf');
              }
            `}
          />
          <div id="portal"></div>
          <NextNProgress color={theme.colors.cyan[500]} />
          <Component {...pageProps} />
          {scrollPosition > 500 && (
            <IconButton
              position="fixed"
              bottom="20px"
              right={['16px', '84px']}
              zIndex={1}
              aria-label="Go-to Top"
              icon={<TriangleUpIcon />}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      // first time users will not have any cookies and you may not return
      // undefined here, hence ?? is necessary
      cookies: req.headers.cookie ?? '',
    },
  };
};

export default App;
