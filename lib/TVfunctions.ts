import type { TMDBSeasonResponse } from "@/types/global";

export const getEpisodes = async (TMDBID: string | number, season: number): Promise<TMDBSeasonResponse | undefined> => {
  const url = `https://api.themoviedb.org/3/tv/${TMDBID}/season/${season || 1}?language=en-US?&api_key=${process.env.TMDB_API_KEY}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache" as RequestCache,
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => "");
      throw new Error(`Error: ${res.status} ${errorText}`);
    }

    const data: TMDBSeasonResponse = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};