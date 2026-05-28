import type { TMDBPaginatedResponse, TMDBMedia } from "@/types/global";

export const getMultiSearch = async (query: string, page: number, isadult: boolean): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  const url = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=${isadult === true}&language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url,
      { next: { caches: "no-cache" } } as RequestInit & { next?: Record<string, unknown> }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data: TMDBPaginatedResponse<TMDBMedia> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getSearch = async (query: string, page: number = 1, isAdult: boolean = false, type: string = 'movie'): Promise<TMDBPaginatedResponse<TMDBMedia>> => {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error('API key is missing.');
  }

  const url = `https://api.themoviedb.org/3/search/${type === "movies" ? "movie" : type}?query=${encodeURIComponent(query)}&include_adult=${isAdult}&language=en-US&page=${page}&api_key=${apiKey}`;


  try {
    const res = await fetch(url, { next: { caches: "no-cache" } } as RequestInit & { next?: Record<string, unknown> });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }

    const data: TMDBPaginatedResponse<TMDBMedia> = await res.json();
    return data;
  } catch (error: unknown) {
    console.error(`Failed to fetch search results: ${error instanceof Error ? error.message : error}`);
    throw error;
  }
};
