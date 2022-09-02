import { CharacterModel, PersonModel } from '@/types';
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
import { StaffPositions } from './StaffPositions';
import { VoiceActingRoles } from './VoiceActingRoles';
// import { AnimeListOnCharacter } from './AnimeListOnCharacter';
// import { VoiceActorsOnCharacter } from './VoiceActorsOnCharacter';

export const Person: FC<PersonProps> = ({ person }) => {
  const breakpoint = useBreakpoint();
  const { colorMode } = useColorMode();
  const [isShowMoreAbout, setShowMoreAbout] = useBoolean();

  // console.log(person);

  if (!person) return <>Loading...</>;

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
            src={person.picture}
            alt={person.englishName}
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
          dangerouslySetInnerHTML={{
            __html:
              person.about?.replaceAll('\n', '<br />') ||
              'No info yet, add one',
          }}
        />
      </GridItem>
      <GridItem area="about" display="flex" flexDirection="column" gap="1rem">
        <Box background="chakra-body-bg" padding="16px">
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            {person.englishName}
          </Text>
        </Box>
        <VoiceActingRoles voiceActingRoles={person.voiceActingRoles} />
        <StaffPositions staffPositions={person.staffPositions} />
      </GridItem>
    </Grid>
  );
};

type PersonProps = {
  person?: PersonModel;
};
