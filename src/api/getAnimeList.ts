import axios from 'axios';
import { AnimeModel } from '../types';

export const getAnimeList = async (params: GetAnimeDataQueryParams) => {
  params = { ...params, explicit: false };
  const queryString = (Object.keys(params) as (keyof GetAnimeDataQueryParams)[])
    .map((key) => key + '=' + params[key])
    .join('&');

  const { data: animeData } = await axios.get<AnimeResponse>(
    `http://localhost:8000/anime?${queryString}`,
  );

  return animeData.data;
};

type AnimeResponse = {
  status: number;
  data: {
    pagination: {
      total_anime: number;
      total_pages: number;
      current_page: number;
    };
    anime: AnimeModel[];
  };
};

type GetAnimeDataQueryParams = Partial<
  Pick<AnimeModel, 'type' | 'status' | 'season'>
> & {
  sortType?: 'asc' | 'desc';
  orderBy?: keyof AnimeModel;
  explicit?: boolean;
  page?: number;
  limit?: number;
  search?: string;
};
