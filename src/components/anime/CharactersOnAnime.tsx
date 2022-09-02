import {
  Grid,
  GridItem,
  AspectRatio,
  Button,
  Box,
  Text,
  Image,
  useBoolean,
  Link,
  useBreakpoint,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';
import { AnimeModel } from '../../types';

type CharactersOnAnimeProps = {
  characters: AnimeModel['characters'];
};

export const CharactersOnAnime: FC<CharactersOnAnimeProps> = ({
  characters,
}) => {
  const breakpoint = useBreakpoint();

  const [isShowMoreCharacters, setShowMoreCharacters] = useBoolean();

  const getVoiceActor = (
    character: AnimeModel['characters'][number]['character'],
  ) => {
    return character?.voiceActors.find(
      ({ language }) => language === 'Japanese',
    );
  };

  const getCharacter = () => {
    return [...characters].splice(
      0,
      isShowMoreCharacters ? characters.length : 8,
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="24"
      background="chakra-body-bg"
      padding="0.8rem 1rem"
    >
      <Box as="section">
        <Box
          as="header"
          mb="4"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xl" fontWeight="bold">
            Characters
          </Text>
          <Link>Add Character</Link>
        </Box>
        <Grid
          templateColumns={{
            base: `repeat(1, 1fr)`,
            lg: `repeat(2, 1fr)`,
          }}
          gap="4"
        >
          {characters.length === 0 && <Box>No characters yet, add one</Box>}
          {getCharacter().map(({ characterId, character, role }) => (
            <GridItem
              display="flex"
              justifyContent="space-between"
              key={characterId}
            >
              <Grid
                as={Box}
                height="inherit"
                display="flex"
                gap="1.5"
                flex="1"
                maxWidth="100%"
              >
                <AspectRatio
                  as={Box}
                  height={breakpoint !== 'base' ? '105px' : '75px'}
                  width={breakpoint !== 'base' ? '70px' : '50px'}
                  minHeight={breakpoint !== 'base' ? '105px' : '75px'}
                  minWidth={breakpoint !== 'base' ? '70px' : '50px'}
                  ratio={2 / 3}
                >
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
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  flex="1"
                  pt="0.2rem"
                  pb="0.6rem"
                >
                  <NextLink href={`/character/${characterId}`} passHref>
                    <Text as={Link} fontSize="16" lineHeight="1" flex="1">
                      {character?.englishName}
                    </Text>
                  </NextLink>
                  <Text as="small">{role}</Text>
                </Box>
              </Grid>

              {getVoiceActor(character) && (
                <Grid
                  as={Box}
                  height="inherit"
                  textAlign="right"
                  display="flex"
                  flexDirection="row-reverse"
                  key={getVoiceActor(character)?.person.id}
                  gap="1.5"
                  flex="1"
                  maxWidth="100%"
                >
                  <AspectRatio
                    as={Box}
                    height={breakpoint !== 'base' ? '105px' : '75px'}
                    width={breakpoint !== 'base' ? '70px' : '50px'}
                    minHeight={breakpoint !== 'base' ? '105px' : '75px'}
                    minWidth={breakpoint !== 'base' ? '70px' : '50px'}
                    ratio={2 / 3}
                  >
                    <Image
                      src={getVoiceActor(character)?.person.picture}
                      alt={getVoiceActor(character)?.person.englishName}
                      objectPosition="center"
                      objectFit="cover"
                      height="100%"
                      width="100%"
                    />
                  </AspectRatio>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    flex="1"
                    py="0.2rem"
                  >
                    <NextLink
                      href={`/person/${getVoiceActor(character)?.person.id}`}
                      passHref
                    >
                      <Text as={Link} fontSize="16" lineHeight="1" flex="1">
                        {getVoiceActor(character)?.person.englishName}
                      </Text>
                    </NextLink>
                    <Text as="small">{getVoiceActor(character)?.language}</Text>
                  </Box>
                </Grid>
              )}
            </GridItem>
          ))}
        </Grid>
        {characters.length > 8 && (
          <Button variant="link" onClick={setShowMoreCharacters.toggle}>
            Show {!isShowMoreCharacters ? 'more' : 'less'}
          </Button>
        )}
      </Box>
    </Box>
  );
};
