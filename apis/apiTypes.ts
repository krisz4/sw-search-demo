export type Character = {
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: "Male" | "Female" | "unknown" | "n/a";
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
};

export type GetCharactersResp = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
};

export type GetCharactersReq = {
  search?: string;
  page?: string;
  limit?: string;
};
