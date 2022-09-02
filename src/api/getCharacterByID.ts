import axios from 'axios';
import { CharacterModel } from '../types';

type CharacterResponse = {
  status: number;
  data: {
    character: CharacterModel;
  };
};

export const getCharacterByID = (animeId: string) => async () => {
  const { data: characterData } = await axios.get<CharacterResponse>(
    `http://localhost:8000/character/${animeId}`,
  );

  return characterData.data.character;
};
