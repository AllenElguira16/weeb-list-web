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
import { CharacterRoleModel, PersonModel } from '../../types';

type VoiceActingRolesProps = {
  voiceActingRoles: PersonModel['voiceActingRoles'];
};

export const VoiceActingRoles: FC<VoiceActingRolesProps> = ({
  voiceActingRoles,
}) => {
  const breakpoint = useBreakpoint();

  const [isShowMoreAnimeList, setShowMoreAnimeList] = useBoolean();

  const getVoiceActingRoles = () => {
    return [...voiceActingRoles].splice(
      0,
      isShowMoreAnimeList ? voiceActingRoles.length : 8,
    );
  };

  const getAnimeRole = (anime: CharacterRoleModel[]) => {
    return anime[0];
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
            Voice Acting Roles
          </Text>
          <Link>Add </Link>
        </Box>
        <Grid
          templateColumns={{
            base: `repeat(1, 1fr)`,
            // lg: `repeat(2, 1fr)`,
          }}
          gap="4"
        >
          {getVoiceActingRoles().length === 0 && (
            <Box>No Voice Acting Roles yet, add one</Box>
          )}
          {getVoiceActingRoles().map(({ characterId, character }) => (
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
                      {character.englishName}
                    </Text>
                  </NextLink>
                </Box>
              </Grid>
              <Grid
                as={Box}
                height="inherit"
                textAlign="right"
                display="flex"
                flexDirection="row-reverse"
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
                    src={getAnimeRole(character.anime).anime.picture}
                    alt={getAnimeRole(character.anime).anime.title}
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
                  <Text as="h4" fontSize="16" lineHeight="1">
                    {getAnimeRole(character.anime).anime.title}
                  </Text>
                  <Text as="small">{getAnimeRole(character.anime).role}</Text>
                </Box>
              </Grid>
            </GridItem>
          ))}
        </Grid>
        {voiceActingRoles.length > 8 && (
          <Button variant="link" onClick={setShowMoreAnimeList.toggle}>
            Show {!isShowMoreAnimeList ? 'more' : 'less'}
          </Button>
        )}
      </Box>
    </Box>
  );
};
