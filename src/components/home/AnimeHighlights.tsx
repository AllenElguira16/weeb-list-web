import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Image,
  Link,
  Tag,
  Text,
} from '@chakra-ui/react';
import { FC, useState } from 'react';
import NextLink from 'next/link';
import { AnimeModel } from '../../types';
import { Carousel } from '../common';
import { css } from '@emotion/react';
import { Portal } from 'react-portal';
import { useDomReady } from '../../hooks';

export const AnimeHighlights: FC<AnimeCarouselListProps> = ({ animeList }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const isDomReady = useDomReady();

  const handleChange = (newCurrentIdx: number) => {
    setCurrentIdx(newCurrentIdx);
  };

  return (
    <>
      {animeList && animeList[currentIdx] && isDomReady && (
        <Portal node={document.querySelector('#portal')}>
          <Box
            css={css`
              display: inline-block;
              background: url(${animeList[currentIdx].picture});
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
      <Carousel onChange={handleChange} boxShadow="md" rounded="md">
        {animeList?.map((anime) => (
          <Grid
            key={anime.id}
            templateColumns={{
              base: `1fr`,
              sm: `1fr 1fr`,
              md: `1fr 3fr`,
              lg: `1fr 5fr`,
            }}
            background="chakra-body-bg"
          >
            <GridItem
              as={AspectRatio}
              maxWidth={{
                // sm: "180px",
                base: '100%',
              }}
              ratio={2 / 3}
            >
              <Image
                src={anime.picture}
                alt={anime.title}
                objectPosition="center"
                objectFit="cover"
                height="inherit"
                width="inherit"
              />
            </GridItem>
            <GridItem
              as={Box}
              display="flex"
              flexDirection="column"
              gap="6"
              paddingY="16px"
              paddingX="16px"
            >
              <NextLink href={`/anime/${anime.id}`} passHref>
                <Text
                  as={Link}
                  fontSize={{ sm: '2xl', base: 'xl' }}
                  color="cyan.500"
                  lineHeight="1"
                >
                  {anime.title}
                </Text>
              </NextLink>
              <Text
                as="p"
                maxHeight="calc(24px * 6)"
                overflow="hidden"
                dangerouslySetInnerHTML={{
                  __html:
                    anime.synopsis?.replaceAll('\n', '<br />') ||
                    '(No summary yet)',
                }}
              />
              <Box display="flex" flexDirection="column" gap="1">
                {anime.genres.length !== 0 && (
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <Text as="small">Genres: </Text>
                    {anime.genres.map((genre) => (
                      <Tag
                        as={Box}
                        size="sm"
                        fontSize="x-small"
                        key={genre}
                        variant="solid"
                        colorScheme="cyan"
                      >
                        {genre}
                      </Tag>
                    ))}
                  </Box>
                )}
                {anime.themes.length !== 0 && (
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <Text as="small">Themes: </Text>
                    {anime.themes.map((theme) => (
                      <Tag
                        as={Box}
                        size="sm"
                        fontSize="x-small"
                        key={theme}
                        variant="solid"
                        colorScheme="cyan"
                      >
                        {theme}
                      </Tag>
                    ))}
                  </Box>
                )}
                {anime.demographics.length !== 0 && (
                  <Box display="flex" flexWrap="wrap" gap={2}>
                    <Text>Demographics: </Text>
                    {anime.demographics.map((demographic) => (
                      <Tag
                        as={Box}
                        size="sm"
                        key={demographic}
                        variant="solid"
                        colorScheme="cyan"
                      >
                        {demographic}
                      </Tag>
                    ))}
                  </Box>
                )}
              </Box>
            </GridItem>
          </Grid>
        ))}
      </Carousel>
    </>
  );
};

type AnimeCarouselListProps = {
  animeList?: AnimeModel[];
};
