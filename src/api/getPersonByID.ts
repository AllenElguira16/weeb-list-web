import axios from 'axios';
import { PersonModel } from '../types';

type PersonResponse = {
  status: number;
  data: {
    person: PersonModel;
  };
};

export const getPersonByID = (animeId: string) => async () => {
  const { data: personData } = await axios.get<PersonResponse>(
    `http://localhost:8000/person/${animeId}`,
  );

  return personData.data.person;
};
