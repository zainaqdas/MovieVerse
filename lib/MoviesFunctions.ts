import type { TMDBPaginatedResponse, TMDBMedia } from "@/types/global";

// Trending Movies
export const getTrendingMovies = async (type: string = "all", page: number = 1): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  const url = `https://api.themoviedb.org/3/trending/${(type === "movies" ? "movie" : type) || "all"}/day?language=en-US&page=${page}&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 * 24 } } as RequestInit & { next?: Record<string, unknown> });

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data: TMDBPaginatedResponse<TMDBMedia> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

// Top Rated Movies
export const getTopRatedMovies = async (): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url,
      { next: { revalidate: 864000 } } as RequestInit & { next?: Record<string, unknown> }
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


// Top TV / MOVIES INFO
export const getInfoTMDB = async (TMDBID: string | number, media_type: string): Promise<TMDBMedia | string | null> => {
  const validMediaTypes = ["movie", "tv"];
  if (!validMediaTypes.includes(media_type)) {
    return "media_type_error";
  }

  const baseUrl = "https://api.themoviedb.org/3";
  const url =
    media_type === "movie"
      ? `${baseUrl}/movie/${TMDBID}?language=en-US&api_key=${process.env.TMDB_API_KEY}&t=${Date.now()}`
      : `${baseUrl}/tv/${TMDBID}?language=en-US&api_key=${process.env.TMDB_API_KEY}&t=${Date.now()}`;

  const maxRetries = 5;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const res = await fetch(url, { cache: "no-store" });

      if (res.status === 404) {
        return "media_type_error";
      }

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: TMDBMedia = await res.json();
      data.type = media_type;
      return data;

    } catch (error: unknown) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error instanceof Error ? error.message : error);

      if (attempts >= maxRetries) {
        return null;
      }

      // Wait 1 second before retry
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return null;
};


// GET TV / MOVIES RECOMMENDATION
export const getRecommendation = async (TMDBID: string | number, Type: string): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  const url = `https://api.themoviedb.org/3/${Type || "movie"}/${TMDBID}/recommendations?&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url,
      { next: { revalidate: 21600 } } as RequestInit & { next?: Record<string, unknown> })
    ;

    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }

    const data: TMDBPaginatedResponse<TMDBMedia> = await res.json();

    if (data?.results?.length <= 5) {
      const trendingData = await getTrendingMovies();
      return trendingData;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};
