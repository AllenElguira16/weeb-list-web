import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  AspectRatio,
  Link,
  Image,
  Text,
  Grid,
  Button,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import { AnimeModel } from '../../types';

type AnimeListProps = {
  animeList?: AnimeModel[];
  isFetching: boolean;
  heading?: string;
  loadMore?: React.MouseEventHandler<HTMLButtonElement>;
  isLoadMoreDisabled?: boolean;
};

export const AnimeList: FC<AnimeListProps> = ({
  animeList,
  isFetching,
  heading,
  loadMore,
  isLoadMoreDisabled = false,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="8px"
      background="chakra-body-bg"
      padding="16px"
      rounded="md"
      boxShadow="md"
    >
      {heading && (
        <Text as="h1" fontSize="2xl" fontWeight="bold">
          {heading}
        </Text>
      )}
      <Grid
        templateColumns={{
          base: `repeat(auto-fill,minmax(110px, 1fr))`,
          sm: `repeat(auto-fill,minmax(180px, 1fr))`,
        }}
        width="100%"
        gap="1rem"
      >
        {!isFetching &&
          animeList !== undefined &&
          animeList.map((anime, key) => (
            <NextLink href={`/anime/${anime.id}`} key={key} passHref>
              <Box as={Link} key={key} width="100%">
                <AspectRatio as={Box} ratio={2 / 3} width="inherit">
                  <Image
                    src={anime.picture}
                    alt={anime.title}
                    objectPosition="center"
                    objectFit="cover"
                    height="100%"
                    width="100%"
                    rounded="base"
                  />
                </AspectRatio>
                <Text noOfLines={2}>{anime.title}</Text>
              </Box>
            </NextLink>
          ))}
      </Grid>
      {loadMore && (
        <Button
          maxWidth="fit-content"
          mx="auto"
          onClick={loadMore}
          disabled={isLoadMoreDisabled}
          leftIcon={<ChevronDownIcon />}
        >
          Load more
        </Button>
      )}
    </Box>
  );
};
