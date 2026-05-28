import type { TMDBPaginatedResponse, TMDBMedia } from "@/types/global";

const TMDB_BASE = "https://api.themoviedb.org/3";

type FetchOptions = RequestInit & { next?: Record<string, unknown> };

async function tmdbFetch<T>(path: string, options?: FetchOptions): Promise<T | undefined> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    console.error("TMDB_API_KEY is not configured");
    return undefined;
  }

  const separator = path.includes("?") ? "&" : "?";
  const url = `${TMDB_BASE}${path}${separator}api_key=${apiKey}`;

  try {
    const res = await fetch(url, options as FetchOptions);
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

// Trending Movies
export const getTrendingMovies = async (
  type: string = "all",
  page: number = 1
): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  const mediaType = type === "movies" ? "movie" : type || "all";
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>(
    `/trending/${mediaType}/day?language=en-US&page=${page}`,
    { next: { revalidate: 3600 * 24 } }
  );
};

// Top Rated Movies
export const getTopRatedMovies = async (): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>(
    "/movie/top_rated?language=en-US&page=1",
    { next: { revalidate: 864000 } }
  );
};

// Top TV / MOVIES INFO (with retry logic)
export const getInfoTMDB = async (
  TMDBID: string | number,
  media_type: string
): Promise<TMDBMedia | string | null> => {
  if (!["movie", "tv"].includes(media_type)) return "media_type_error";

  const maxRetries = 5;
  const endpoint = `/${media_type}/${TMDBID}?language=en-US`;
  const apiKey = process.env.TMDB_API_KEY;

  for (let attempts = 0; attempts < maxRetries; attempts++) {
    try {
      const res = await fetch(
        `${TMDB_BASE}${endpoint}&api_key=${apiKey}&t=${Date.now()}`,
        { cache: "no-store" }
      );

      if (res.status === 404) return "media_type_error";
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data: TMDBMedia = await res.json();
      data.type = media_type;
      return data;
    } catch (error: unknown) {
      console.error(
        `Attempt ${attempts + 1} failed:`,
        error instanceof Error ? error.message : error
      );

      if (attempts >= maxRetries - 1) return null;
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return null;
};

// GET TV / MOVIES RECOMMENDATION
export const getRecommendation = async (
  TMDBID: string | number,
  Type: string
): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  const data = await tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>(
    `/${Type || "movie"}/${TMDBID}/recommendations`,
    { next: { revalidate: 21600 } }
  );

  if (!data?.results || data.results.length <= 5) {
    return getTrendingMovies();
  }

  return data;
};
