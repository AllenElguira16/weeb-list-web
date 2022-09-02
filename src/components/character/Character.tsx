import { CharacterModel } from '@/types';
import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Tag,
  useColorMode,
  Image,
  Text,
  useBoolean,
  Button,
  useBreakpoint,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC } from 'react';
import { AnimeListOnCharacter } from './AnimeListOnCharacter';
import { VoiceActorsOnCharacter } from './VoiceActorsOnCharacter';

export const Character: FC<CharacterProps> = ({ character }) => {
  const breakpoint = useBreakpoint();
  const { colorMode } = useColorMode();
  const [isShowMoreAbout, setShowMoreAbout] = useBoolean();

  if (!character) return <>Loading...</>;

  return (
    <Grid
      gap="1rem"
      templateColumns="repeat(8, 1fr)"
      templateAreas={{
        base: `
      "info info info  info  info"
      "about about about about about"
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
      <GridItem display="flex" flexDirection="column" gap="1rem" area="info">
        <AspectRatio as={Box} ratio={2 / 3} minWidth="140px" minHeight="210px">
          <Image
            src={character.picture}
            alt={character.englishName}
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
              Kanji
            </Text>
            <Text as="span">{character.kanjiName}</Text>
          </Box>
          <Box>
            <Text as="header" fontWeight="bold">
              Nicknames
            </Text>
            <Text as="span">
              {character.nicknames.length !== 0
                ? character.nicknames.join(', ')
                : 'N/A'}
            </Text>
          </Box>
        </Box>
      </GridItem>
      <GridItem area="about" display="flex" flexDirection="column" gap="1rem">
        <Box background="chakra-body-bg" padding="16px">
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            {character.englishName}
          </Text>
          <Box
            overflow="hidden"
            position="relative"
            maxHeight={{
              base: !isShowMoreAbout ? '310px' : 'initial',
              // sm: 'initial',
            }}
          >
            <Text
              as="span"
              dangerouslySetInnerHTML={{
                __html:
                  character.about?.replaceAll('\n', '<br />') ||
                  'No info yet, add one',
              }}
            />
          </Box>
          {/* {breakpoint === 'base' && ( */}
          <Button variant="link" onClick={setShowMoreAbout.toggle}>
            Show {!isShowMoreAbout ? 'more' : 'less'}
          </Button>
          {/* )} */}
        </Box>
        <AnimeListOnCharacter animeList={character.anime} />
        <VoiceActorsOnCharacter voiceActors={character.voiceActors} />
      </GridItem>
    </Grid>
  );
};

type CharacterProps = {
  character?: CharacterModel;
};
