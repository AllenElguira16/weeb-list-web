/**
 * Model Anime
 *
 */
export type AnimeModel = {
  id: string;
  title: string;
  type: AnimeType | null;
  episodes: number | null;
  duration: string | null;
  rating: AnimeRating | null;
  status: AnimeStatus | null;
  season: AnimeSeason | null;
  synopsis: string | null;
  airtimeFrom: string | null;
  airtimeTo: string | null;
  picture: string;
  genres: string[];
  themes: string[];
  demographics: string[];
  createdAt: string;
  updatedAt: string;

  otherTitles: TitleModel[];
  characters: CharacterRoleModel[];
  voiceActors: VoiceActorModel[];
  staffs: StaffModel[];
  animeRelations: AnimeRelations[];
};

/**
 * Model Character
 *
 */
export type CharacterModel = {
  id: string;
  picture: string;
  englishName: string;
  kanjiName: string | null;
  nicknames: string[];
  about: string | null;
  createdAt: string;
  updatedAt: string;

  anime: CharacterRoleModel[];
  voiceActors: VoiceActorModel[];
};

/**
 * Model Person
 *
 */
export type PersonModel = {
  id: string;
  picture: string;
  englishName: string;
  kanjiName: string | null;
  about: string | null;
  createdAt: string;
  updatedAt: string;

  staffPositions: StaffModel[];
  voiceActingRoles: VoiceActorModel[];
};

/**
 * Model CharacterRole
 *
 */
export type CharacterRoleModel = {
  id: string;
  role: string;
  characterId: string;
  animeId: string;

  character: CharacterModel;
  anime: AnimeModel;
};

/**
 * Model VoiceActor
 *
 */
export type VoiceActorModel = {
  id: string;
  language: string;
  animeId: string;
  characterId: string;
  personId: string;

  character: CharacterModel;
  person: PersonModel;
};

/**
 * Model Staff
 *
 */
export type StaffModel = {
  id: string;
  positions: string[];
  personId: string;
  animeId: string;

  person: PersonModel;
  anime: AnimeModel;
};

/**
 * Model Title
 *
 */
export type TitleModel = {
  id: string;
  language: string;
  title: string;
  animeId: string;
};

/**
 * Model AnimeRelations
 *
 */
export type AnimeRelations = {
  id: string;
  type: AnimeRelationType;
  animeId: string;
  relatedAnimeId: string;

  anime: AnimeModel;
  relatedAnime: AnimeModel;
};

/**
 * Enums
 */
export type AnimeRating = 'G' | 'PG' | 'PG13' | 'R' | 'R18';

export type AnimeRelationType =
  | 'PREQUEL'
  | 'SEQUEL'
  | 'ALTERNATE_SETTING'
  | 'ALTERNATE_VERSION'
  | 'SIDE_STORY'
  | 'SUMMARY'
  | 'FULL_STORY'
  | 'PARENT_STORY'
  | 'SPIN_OFF'
  | 'CHARACTERS'
  | 'OTHERS';

export type AnimeSeason = 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER';

export type AnimeStatus = 'AIRING' | 'COMPLETE' | 'UPCOMING';

export type AnimeType = 'TV' | 'MOVIE' | 'OVA' | 'SPECIAL' | 'ONA';
