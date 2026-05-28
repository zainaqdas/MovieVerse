import type { TMDBPaginatedResponse, TMDBMedia, TMDBReview, TMDBSeasonResponse } from "@/types/global";

const API_BASE = "/api/tmdb";

async function tmdbFetch<T>(params: Record<string, string>): Promise<T | undefined> {
  const searchParams = new URLSearchParams(params);
  const url = `${API_BASE}?${searchParams.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("TMDB client error:", error);
    return undefined;
  }
}

export const clientGetMultiSearch = async (
  query: string,
  page: number = 1,
  isAdult: boolean = false
): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>({
    path: "search/multi",
    query,
    page: String(page),
    isAdult: String(isAdult),
  });
};

export const clientGetSearch = async (
  query: string,
  page: number = 1,
  isAdult: boolean = false,
  type: string = "movie"
): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>({
    path: "search/single",
    query,
    page: String(page),
    isAdult: String(isAdult),
    mediaType: type === "movies" ? "movie" : type,
  });
};

export const clientGetTrendingMovies = async (
  type: string = "all",
  page: number = 1
): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>({
    path: "trending",
    type,
    page: String(page),
  });
};

export const clientGetPopularMovies = async (
  page: number = 1
): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>({
    path: "movie/popular",
    page: String(page),
  });
};

export const clientGetTopRatedMovies = async (): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>({
    path: "movie/top_rated",
    page: "1",
  });
};

export const clientGetInfoTMDB = async (
  tmdbId: string | number,
  mediaType: string
): Promise<TMDBMedia | undefined> => {
  return tmdbFetch<TMDBMedia>({
    path: "info",
    id: String(tmdbId),
    mediaType,
  });
};

export const clientGetRecommendation = async (
  tmdbId: string | number,
  type: string
): Promise<TMDBPaginatedResponse<TMDBMedia> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBMedia>>({
    path: "recommendations",
    id: String(tmdbId),
    mediaType: type,
  });
};

export const clientGetReviews = async (
  tmdbId: string | number,
  type: string,
  page: number = 1
): Promise<TMDBPaginatedResponse<TMDBReview> | undefined> => {
  return tmdbFetch<TMDBPaginatedResponse<TMDBReview>>({
    path: "reviews",
    id: String(tmdbId),
    mediaType: type,
    page: String(page),
  });
};

export const clientGetEpisodes = async (
  tmdbId: string | number,
  season: number
): Promise<TMDBSeasonResponse | undefined> => {
  return tmdbFetch<TMDBSeasonResponse>({
    path: "episodes",
    id: String(tmdbId),
    season: String(season),
  });
};
