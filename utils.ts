import { Character, GetCharactersResp } from "./apis/apiTypes";
import { API } from "./apis/axiosService";

export const fetchAllCharacters = async (
  baseParams?: string
): Promise<GetCharactersResp> => {
  console.log("ok");
  let allResults: Character[] = [];
  let currentPage = 1;
  let nextUrl: string | null = `people${
    baseParams ? "?" + baseParams + "&" : "?"
  }page=${currentPage}`;
  console.log(nextUrl);
  let firstResponse = await API.get<GetCharactersResp>(nextUrl);
  console.log("count", firstResponse.data.count);
  while (allResults.length < firstResponse.data.count && nextUrl) {
    console.log(nextUrl);
    const response = await API.get<GetCharactersResp>(nextUrl);
    console.log("response", response.data.count);
    const data = response.data;

    allResults = [...allResults, ...data.results];

    if (data.next) {
      currentPage += 1;
      nextUrl = `people${
        baseParams ? "?" + baseParams + "&" : "?"
      }page=${currentPage}`;
    } else {
      nextUrl = null;
    }
  }

  firstResponse.data.results = sortCharacters(allResults);

  return firstResponse.data;
};

const sortCharacters = (characters: Character[]) => {
  const blueEyes = characters
    .filter((c) => c.eye_color === "blue")
    .sort((a, b) => a.name.localeCompare(b.name));
  const others = characters
    .filter((c) => c.eye_color !== "blue")
    .sort(
      (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
    );
  return [...blueEyes, ...others];
};
