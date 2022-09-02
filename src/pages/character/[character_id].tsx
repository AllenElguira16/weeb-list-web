import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import { HomeLayout } from '@/layout';
import { getCharacterByID } from '@/api';
import { useRouter } from 'next/router';
import { Character } from '@/components/character';
import { useDomReady } from '@/hooks';
import { Portal } from 'react-portal';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';

const CharacterID: NextPage = () => {
  const router = useRouter();
  const isDomReady = useDomReady();
  const { character_id } = router.query;

  const { data: characterData } = useQuery(
    ['character', character_id],
    getCharacterByID(character_id as string),
  );

  return (
    <>
      <HomeLayout>
        <Character character={characterData} />
      </HomeLayout>
      {isDomReady && (
        <Portal node={document.querySelector('#portal')}>
          <Box
            css={css`
              display: inline-block;
              background: url(${characterData?.picture});
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
  query: { character_id },
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['character', character_id],
    getCharacterByID(character_id as string),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CharacterID;
