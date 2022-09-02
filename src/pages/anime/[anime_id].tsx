import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { HomeLayout } from '@/layout';
import { Anime } from '@/components/anime';
import { css } from '@emotion/react';
import { Portal } from 'react-portal';
import { Box } from '@chakra-ui/react';
import { useDomReady } from '@/hooks';
import { getAnimeByID } from '@/api';

const AnimeID: NextPage = () => {
  const router = useRouter();
  const { anime_id } = router.query;
  const isDomReady = useDomReady();
  const { data: anime, isLoading } = useQuery(
    ['anime', anime_id],
    getAnimeByID(anime_id as string),
  );

  return (
    <>
      <HomeLayout>
        {isLoading || !anime ? <div>Loading</div> : <Anime anime={anime} />}
      </HomeLayout>
      {isDomReady && (
        <Portal node={document.querySelector('#portal')}>
          <Box
            css={css`
              display: inline-block;
              background: url(${anime?.picture});
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
              width: 100%;
              height: 100%;
              position: fixed;
              z-index: -1;
              filter: blur(14px);
              opacity: 0.2;
            `}
          />
        </Portal>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query: { anime_id },
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['anime', anime_id],
    getAnimeByID(anime_id as string),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AnimeID;
