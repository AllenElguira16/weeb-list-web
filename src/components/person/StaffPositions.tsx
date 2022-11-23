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
import { PersonModel } from '../../types';

type VoiceActorsOnCharacterProps = {
  staffPositions: PersonModel['staffPositions'];
};

export const StaffPositions: FC<VoiceActorsOnCharacterProps> = ({
  staffPositions,
}) => {
  const breakpoint = useBreakpoint();

  const [isShowMoreAnimeList, setShowMoreAnimeList] = useBoolean();

  const getStaffPositions = () => {
    return [...staffPositions].splice(
      0,
      isShowMoreAnimeList ? staffPositions.length : 8,
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
            Staffs
          </Text>
          <Link>Add Staff</Link>
        </Box>
        <Grid
          templateColumns={{
            base: `repeat(1, 1fr)`,
            lg: `repeat(2, 1fr)`,
          }}
          gap="4"
        >
          {getStaffPositions().length === 0 && (
            <Box>No Staffs yet, add one</Box>
          )}
          {getStaffPositions().map(({ personId, anime, positions }) => (
            <GridItem
              display="flex"
              justifyContent="space-between"
              key={personId}
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
                    src={anime.picture}
                    alt={anime.title}
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
                  <NextLink href={`/person/${personId}`} passHref>
                    <Text as={Link} fontSize="16" lineHeight="1" flex="1">
                      {anime.title}
                    </Text>
                  </NextLink>
                  <Text as="small">{positions.join(', ')}</Text>
                </Box>
              </Grid>
            </GridItem>
          ))}
        </Grid>
        {staffPositions.length > 8 && (
          <Button variant="link" onClick={setShowMoreAnimeList.toggle}>
            Show {!isShowMoreAnimeList ? 'more' : 'less'}
          </Button>
        )}
      </Box>
    </Box>
  );
};
