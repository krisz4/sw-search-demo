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
  let firstResponse = await API.get<GetCharactersResp>(nextUrl);

  while (
    allResults.length < firstResponse?.data.count &&
    firstResponse?.data.count &&
    nextUrl
  ) {
    const response = await API.get<GetCharactersResp>(nextUrl);
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

  firstResponse.data.results = allResults;

  return firstResponse.data;
};

export const sortCharacters = (
  characters: Character[],
  sort: {
    primarySort?: { field: keyof Character; value: string };
    secondarySort: { field: keyof Character; ascending: boolean };
  }
) => {
  const { primarySort, secondarySort } = sort;

  const sortFunc = (a: Character, b: Character) => {
    if (secondarySort.field === "created") {
      return secondarySort.ascending
        ? new Date(a.created).getTime() - new Date(b.created).getTime()
        : new Date(b.created).getTime() - new Date(a.created).getTime();
    } else {
      return secondarySort.ascending
        ? (a[secondarySort.field] as string).localeCompare(
            b[sort.secondarySort.field] as string
          )
        : (b[secondarySort.field] as string).localeCompare(
            a[secondarySort.field] as string
          );
    }
  };

  const primary = primarySort
    ? characters
        .filter((c) => c[primarySort.field] === primarySort.value)
        .sort((a, b) => a.name.localeCompare(b.name))
    : [];
  const others = characters
    .filter((c) =>
      primarySort ? c[primarySort.field] !== primarySort.value : true
    )
    .sort(sortFunc);

  return [...primary, ...others];
};
