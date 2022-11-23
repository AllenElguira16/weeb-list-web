import { SearchIcon } from '@chakra-ui/icons';
import {
  InputGroup,
  InputLeftElement,
  Input,
  Select,
  Box,
  Text,
  Link,
  AspectRatio,
  Image,
} from '@chakra-ui/react';
import { ChangeEventHandler, FC, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';

import { getAnimeList } from '../../api';
import { AnimeModel } from '../../types';
import { useOutsideChecker } from '../../hooks';

type SearchResults = {
  anime: AnimeModel[];
};

type SearchType = keyof SearchResults;

export const Search: FC = () => {
  const searchedResults: SearchResults = {
    anime: [],
  };

  let searchRef = useRef<HTMLDivElement>(null);
  const isClickedOutside = useOutsideChecker(searchRef);
  const [searchType, setSearchType] = useState<SearchType>('anime');
  const [search, setSearch] = useState('');

  const { data: anime } = useQuery(
    ['searchedAnimeData', search],
    () =>
      getAnimeList({
        search,
      }),
    {
      keepPreviousData: false,
    },
  );

  if (anime) searchedResults.anime = anime.anime;

  const handleSearchType: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setSearchType(event.currentTarget.value as SearchType);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
  };

  const handleClose = () => {
    setSearch('');
  };

  return (
    <Box maxWidth="md" position="relative" ref={searchRef}>
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          value={search}
          onChange={handleSearch}
          borderTopEndRadius="0"
          borderEndEndRadius="0"
          placeholder="Search Anime"
        />
        <Select
          borderTopStartRadius="0"
          borderEndStartRadius="0"
          width="10rem"
          value={searchType}
          onChange={handleSearchType}
        >
          <option value="anime">Anime</option>
          <option value="manga">Manga</option>
          <option value="person">Person</option>
        </Select>
      </InputGroup>
      {search.length > 0 && !isClickedOutside && (
        <Box
          position="absolute"
          background="chakra-body-bg"
          boxShadow="md"
          zIndex="1"
          width="100%"
        >
          <Text padding="0.4rem 0.8rem">
            Search results for &quot;
            <Text as="span" color="cyan.500" fontStyle="italic">
              {search}
            </Text>
            &quot;
          </Text>
          <Box maxHeight="30rem" overflowY="auto">
            {searchedResults[searchType].map((result) => (
              <NextLink
                key={result.id}
                href={`/${searchType}/${result.id}`}
                passHref
              >
                <Link
                  display="flex"
                  // background=""
                  width="100%"
                  _hover={{
                    textDecoration: 'none',
                    background: 'blackAlpha.100',
                  }}
                  gap="0.6rem"
                  padding="0.4rem 0.8rem"
                  onClick={handleClose}
                >
                  <AspectRatio
                    display="inline-block"
                    as={Box}
                    ratio={2 / 3}
                    minWidth="3rem"
                    maxWidth="3rem"
                  >
                    <Image
                      src={result.picture}
                      alt={result.title}
                      objectPosition="center"
                      objectFit="cover"
                      height="100%"
                      width="100%"
                    />
                  </AspectRatio>
                  <Text display="inline-block">{result.title}</Text>
                </Link>
              </NextLink>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
