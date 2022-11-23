import axios from 'axios';
import { AnimeModel } from '../types';

export const getRandomAnimeList =
  (params: GetAnimeDataQueryParams) => async () => {
    params = { ...params, explicit: false };
    const queryString = (
      Object.keys(params) as (keyof GetAnimeDataQueryParams)[]
    )
      .map((key) => key + '=' + params[key])
      .join('&');

    const { data: animeData } = await axios.get<AnimeResponse>(
      `http://localhost:8000/anime/random?${queryString}`,
    );

    return animeData.data;
  };

export type AnimeResponse = {
  status: number;
  data: {
    // total: number;
    anime: AnimeModel[];
  };
};

type GetAnimeDataQueryParams = {
  explicit?: boolean;
  limit?: number;
};
