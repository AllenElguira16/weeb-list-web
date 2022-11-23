import {
  AspectRatio,
  Box,
  Button,
  Grid,
  GridItem,
  useBoolean,
  Text,
  Image,
  Link,
  useBreakpoint,
} from '@chakra-ui/react';
import { FC } from 'react';
import NextLink from 'next/link';

import { AnimeModel } from '@/types';

type StaffsOnAnimeProps = {
  staffs: AnimeModel['staffs'];
};

export const StaffsOnAnime: FC<StaffsOnAnimeProps> = ({ staffs }) => {
  const breakpoint = useBreakpoint();
  const [isShowMoreStaffs, setShowMoreStaffs] = useBoolean();

  const getStaffs = () => {
    return [...staffs].splice(0, isShowMoreStaffs ? staffs.length : 8);
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
          gap="1rem"
        >
          {staffs.length === 0 && <Box>No staffs yet, add one</Box>}
          {getStaffs().map(({ personId, person, positions }) => (
            <GridItem
              as={Grid}
              templateColumns="repeat(2, 1fr)"
              display="flex"
              justifyContent="space-between"
              key={personId}
            >
              <Grid as={Box} height="inherit" display="flex" gap="1.5" flex="1">
                <AspectRatio
                  as={Box}
                  height={breakpoint !== 'base' ? '105px' : '75px'}
                  width={breakpoint !== 'base' ? '70px' : '50px'}
                  minHeight={breakpoint !== 'base' ? '105px' : '75px'}
                  minWidth={breakpoint !== 'base' ? '70px' : '50px'}
                  ratio={3 / 4}
                >
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
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  flex="1"
                  py="0.2rem"
                >
                  <NextLink href={`/person/${personId}`}>
                    <Text as={Link} fontSize="16" lineHeight="1">
                      {person.englishName}
                    </Text>
                  </NextLink>
                  <Text as="small" fontSize="small">
                    {positions.join(', ')}
                  </Text>
                </Box>
              </Grid>
            </GridItem>
          ))}
        </Grid>
        {staffs.length > 8 && (
          <Button variant="link" onClick={setShowMoreStaffs.toggle}>
            Show {!isShowMoreStaffs ? 'more' : 'less'}
          </Button>
        )}
      </Box>
    </Box>
  );
};
