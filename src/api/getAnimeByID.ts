import axios from 'axios';
import { AnimeModel } from '../types';

type AnimeResponse = {
  status: number;
  data: {
    anime: AnimeModel;
  };
};

export const getAnimeByID = (animeId: string) => async () => {
  const { data: animeData } = await axios.get<AnimeResponse>(
    `http://localhost:8000/anime/${animeId}`,
  );

  return animeData.data.anime;
};
