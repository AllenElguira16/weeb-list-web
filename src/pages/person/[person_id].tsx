import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { GetServerSideProps, NextPage } from 'next';
import { HomeLayout } from '@/layout';
import { getPersonByID } from '@/api';
import { useRouter } from 'next/router';
import { useDomReady } from '@/hooks';
import { Person } from '@/components/person';
import { Portal } from 'react-portal';
import { Box } from '@chakra-ui/react';
import { css } from '@emotion/react';

const PersonID: NextPage = () => {
  const router = useRouter();
  const isDomReady = useDomReady();
  const { person_id } = router.query;

  const { data: personData } = useQuery(
    ['person', person_id],
    getPersonByID(person_id as string),
  );

  return (
    <>
      <HomeLayout>
        <Person person={personData} />
      </HomeLayout>
      {isDomReady && (
        <Portal node={document.querySelector('#portal')}>
          <Box
            css={css`
              display: inline-block;
              background: url(${personData?.picture});
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
  query: { person_id },
}) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['person', person_id],
    getPersonByID(person_id as string),
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default PersonID;
