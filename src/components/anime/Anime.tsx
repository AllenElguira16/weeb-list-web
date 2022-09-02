import {
  GridItem,
  AspectRatio,
  Grid,
  Button,
  useColorMode,
  Image,
  Box,
  Text,
  useBoolean,
  useBreakpoint,
  Tag,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC } from 'react';
import { AnimeModel } from '@/types';
import { CharactersOnAnime } from './CharactersOnAnime';
import { StaffsOnAnime } from './StaffsOnAnime';

type AnimeProps = {
  anime: AnimeModel;
};

export const Anime: FC<AnimeProps> = ({ anime }) => {
  const breakpoint = useBreakpoint();

  const { colorMode } = useColorMode();

  const [isShowMoreSynopsis, setShowMoreSynopsis] = useBoolean();

  return (
    <Grid
      gap="1rem"
      templateColumns="repeat(8, 1fr)"
      templateAreas={{
        base: `
          "info info info  info  info info info info"
          "about about about about about about about about"
        `,
        sm: `
          "info info about about about about about about"
          "info info about about about about about about"
          "info info about about about about about about"
          "info info about about about about about about"
          "info info about about about about about about"
        `,
      }}
    >
      <GridItem
        // display={isDesktop ? "block" : "flex"}
        display="flex"
        flexDirection="column"
        gap="1rem"
        area="info"
      >
        <AspectRatio as={Box} ratio={2 / 3} minWidth="140px" minHeight="210px">
          <Image
            src={anime.picture}
            alt={anime.title}
            objectPosition="center"
            objectFit="cover"
            height="100%"
            width="100%"
          />
        </AspectRatio>
        <Box
          gap="0.5rem"
          padding="0.8rem 1rem"
          display="flex"
          flexDirection="column"
          backgroundColor={colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100'}
        >
          <Box>
            <Text as="header" fontWeight="bold">
              Type
            </Text>
            <Text as="span">{anime.type}</Text>
          </Box>
          <Box>
            <Text as="header" fontWeight="bold">
              Episodes
            </Text>
            <Text as="span">{anime.episodes || 'Unknown'}</Text>
          </Box>
          <Box>
            <Text as="header" fontWeight="bold">
              {anime.type === 'MOVIE' ? 'Duration' : 'Duration per Episodes'}
            </Text>
            <Text as="span">{anime.duration || 'Unknown'}</Text>
          </Box>
          <Box>
            <Text as="header" fontWeight="bold">
              Status
            </Text>
            <Text as="span">{_.capitalize(anime.status || 'Unknown')}</Text>
          </Box>
          {anime.airtimeFrom && (
            <Box>
              <Text as="header" fontWeight="bold">
                Release Date
              </Text>
              <Text as="span">
                {new Date(anime.airtimeFrom).toLocaleDateString()}
              </Text>
            </Box>
          )}
          {anime.type !== 'MOVIE' && (
            <Box>
              <Text as="header" fontWeight="bold">
                Season
              </Text>
              <Text as="span">{_.capitalize(anime.season || 'Unknown')}</Text>
            </Box>
          )}
          {anime.genres.length !== 0 && (
            <Box>
              <Text as="header" fontWeight="bold">
                Genres
              </Text>
              {anime.genres.map((genre) => (
                <Tag
                  as={Box}
                  size="sm"
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
            <Box>
              <Text as="header" fontWeight="bold">
                Themes
              </Text>
              {anime.themes.map((theme) => (
                <Tag
                  as={Box}
                  size="sm"
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
            <Box>
              <Text as="header" fontWeight="bold">
                Demographics
              </Text>
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
      <GridItem area="about" display="flex" flexDirection="column" gap="1rem">
        <Box background="chakra-body-bg" padding="16px">
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            {anime.title}
          </Text>
          <Box
            overflow="hidden"
            position="relative"
            maxHeight={{
              base: !isShowMoreSynopsis ? '310px' : 'auto',
              sm: 'initial',
            }}
          >
            <Text
              as="span"
              dangerouslySetInnerHTML={{
                __html:
                  anime.synopsis?.replaceAll('\n', '<br />') ||
                  'No synopsis yet, add one',
              }}
            />
          </Box>
          {breakpoint === 'base' && (
            <Button variant="link" onClick={setShowMoreSynopsis.toggle}>
              Show {!isShowMoreSynopsis ? 'more' : 'less'}
            </Button>
          )}
        </Box>
        <CharactersOnAnime characters={anime.characters} />
        <StaffsOnAnime staffs={anime.staffs} />
      </GridItem>
    </Grid>
  );
};
