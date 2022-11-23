import { GetServerSideProps, NextPage } from 'next';
import {
  QueryClient,
  dehydrate,
  useQuery,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { AnimeHighlights, AnimeList } from '@/components/home';
import { getAnimeList, getRandomAnimeList } from '@/api';
import { HomeLayout } from '@/layout';

const LIMIT = {
  RANDOM_LIST: 10,
  ANIME_LIST: 12,
};

const fetchInfiniteAnime = ({ pageParam = 1 }) =>
  getAnimeList({
    limit: LIMIT.ANIME_LIST,
    status: 'UPCOMING',
    page: pageParam,
  });

const HomePage: NextPage = () => {
  const { data: randomAnimeList } = useQuery(
    ['randomAnimeData'],
    getRandomAnimeList({
      limit: LIMIT.RANDOM_LIST,
    }),
    {
      keepPreviousData: false,
    },
  );

  const {
    data: animeData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(['animeData'], fetchInfiniteAnime, {
    getNextPageParam({ pagination: { currentPage, totalPages } }) {
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  return (
    <HomeLayout
      display="flex"
      flexDirection="column"
      gap="1rem"
      my="1rem"
      flex="1"
    >
      <AnimeHighlights animeList={randomAnimeList?.anime} />
      <AnimeList
        animeList={animeData?.pages.flatMap((anime) => anime.anime)}
        isLoadMoreDisabled={!hasNextPage}
        loadMore={async () => {
          await fetchNextPage();
        }}
        heading="Upcomming!"
        isFetching={false}
      />
    </HomeLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['randomAnimeData'],
    getRandomAnimeList({
      limit: LIMIT.RANDOM_LIST,
    }),
  );

  await queryClient.prefetchInfiniteQuery(['animeData'], fetchInfiniteAnime, {
    getNextPageParam({ pagination: { currentPage, totalPages } }) {
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });

  const dehydratedState = dehydrate(queryClient);
  (dehydratedState.queries[1].state.data as any).pageParams = [1];

  return {
    props: {
      dehydratedState,
    },
  };
};

export default HomePage;
