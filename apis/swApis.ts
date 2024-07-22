import { fetchAllCharacters } from "@/utils";
import { AxiosRequestConfig } from "axios";
import { Character, GetCharactersReq } from "./apiTypes";
import { API } from "./axiosService";

export const getCharacters = async ({
  filters,
}: {
  filters: GetCharactersReq;
  config?: AxiosRequestConfig;
}) => {
  const params = filters.search ? new URLSearchParams(filters).toString() : "";
  return fetchAllCharacters(params);
};

export const getCharacter = async ({
  id,
  config,
}: {
  id: string;
  config?: AxiosRequestConfig;
}) => {
  return (await API.get<Character>(`people/${id}`, config)).data;
};
