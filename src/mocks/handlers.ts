import { rest } from 'msw';
import { faker } from '@faker-js/faker';

import { AnimeModel } from '../types';

const types: AnimeModel['type'][] = ['TV', 'MOVIE', 'OVA', 'SPECIAL', 'ONA'];
const status: AnimeModel['status'][] = ['AIRING', 'COMPLETE', 'UPCOMING'];
const season: AnimeModel['season'][] = ['SPRING', 'SUMMER', 'FALL', 'WINTER'];
const rating: AnimeModel['rating'][] = ['G', 'PG', 'PG13', 'R', 'R18'];

const generateFromArray = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const createRandomUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

const animeList: AnimeModel[] = Array.from({ length: 200 }).map(() => {
  return {
    id: faker.datatype.uuid(),
    title: faker.name.firstName() + ': The ' + faker.name.jobTitle(),
    titleEnglish: faker.name.firstName() + ': The ' + faker.name.jobTitle(),
    titleJapanese: faker.name.firstName() + ': The ' + faker.name.jobTitle(),
    type: generateFromArray(types),
    episodes: faker.datatype.number(),
    duration: '24 mins. per. ep.',
    status: generateFromArray(status),
    season: generateFromArray(season),
    synopsis: faker.lorem.paragraph(20) || null,
    airtimeFrom: faker.date.past(9).toISOString(),
    airtimeTo: faker.date.past(10).toISOString(),
    picture: faker.image.unsplash.buildings(318, 450, faker.random.words()),
    synonyms: Array.from({ length: 4 }).map(
      () => faker.name.firstName() + ': The ' + faker.name.jobTitle(),
    ),
    genres: Array.from({ length: 4 }).map(() => faker.music.genre()),
    themes: Array.from({ length: 4 }).map(() => faker.music.genre()),
    demographics: Array.from({ length: 4 }).map(() => faker.music.genre()),
    characters: [],
    otherTitles: Array.from({ length: 4 }).map((i) => {
      return {
        id: createRandomUUID(),
        language: generateFromArray(['Japanese', 'English']),
        title: faker.music.songName(),
        animeId: createRandomUUID(),
      };
    }),
    rating: generateFromArray(rating),
    staffs: [],
    animeRelations: [],
    voiceActors: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
});

export const handlers = [
  rest.get('/api/anime', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') ?? '1');
    const limit = parseInt(req.url.searchParams.get('limit') ?? '10');
    const search = req.url.searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    const searchAnime = animeList.filter(
      (item) =>
        item.title?.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) >
        -1,
    );

    return res(
      ctx.status(200),
      ctx.json({
        status: 200,
        data: {
          total: animeList.length,
          anime: searchAnime.filter(
            (_anime, index) => index >= offset && index < limit * page,
          ),
        },
      }),
    );
  }),
  rest.get<{}, { anime_id: string }>(
    '/api/anime/:anime_id',
    (req, res, ctx) => {
      const searchAnime = animeList.find(
        (anime) => anime.id === req.params.anime_id,
      );

      if (!searchAnime) {
        return res(
          ctx.status(404),
          ctx.json({
            status: 404,
            error: `AnimeModel with id "${req.params.anime_id}" does not exists`,
          }),
        );
      }

      return res(
        ctx.status(200),
        ctx.json({
          status: 200,
          data: {
            anime: searchAnime,
          },
        }),
      );
    },
  ),
];
