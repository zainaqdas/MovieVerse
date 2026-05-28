import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");
  const page = searchParams.get("page") || "1";
  const query = searchParams.get("query");
  const isAdult = searchParams.get("isAdult") === "true";
  const mediaType = searchParams.get("mediaType");

  if (!path) {
    return NextResponse.json({ error: "Missing 'path' parameter" }, { status: 400 });
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "TMDB_API_KEY is not configured" }, { status: 500 });
  }

  const baseUrl = "https://api.themoviedb.org/3";

  let url: string;
  let fetchOptions: RequestInit = { next: { revalidate: 3600 } };

  if (path === "search/multi" && query) {
    url = `${baseUrl}/search/multi?query=${encodeURIComponent(query)}&include_adult=${isAdult}&language=en-US&page=${page}&api_key=${apiKey}`;
    fetchOptions = { cache: "no-store" as const };
  } else if (path === "search/single" && query && mediaType) {
    url = `${baseUrl}/search/${mediaType}?query=${encodeURIComponent(query)}&include_adult=${isAdult}&language=en-US&page=${page}&api_key=${apiKey}`;
    fetchOptions = { cache: "no-store" as const };
  } else if (path === "trending") {
    const type = searchParams.get("type") || "all";
    url = `${baseUrl}/trending/${type === "movies" ? "movie" : type}/day?language=en-US&page=${page}&api_key=${apiKey}`;
  } else if (path === "movie/popular") {
    url = `${baseUrl}/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`;
  } else if (path === "movie/top_rated") {
    url = `${baseUrl}/movie/top_rated?language=en-US&page=${page}&api_key=${apiKey}`;
  } else if (path === "discover/movie") {
    const genreId = searchParams.get("with_genres");
    const sortBy = searchParams.get("sort_by") || "popularity.desc";
    if (!genreId) {
      return NextResponse.json({ error: "Missing 'with_genres' parameter for discover/movie" }, { status: 400 });
    }
    url = `${baseUrl}/discover/movie?with_genres=${genreId}&sort_by=${sortBy}&language=en-US&page=${page}&api_key=${apiKey}`;
    fetchOptions = { next: { revalidate: 3600 } };
  } else if (path === "info") {
    const tmdbId = searchParams.get("id");
    const type = mediaType || "movie";
    if (!tmdbId) {
      return NextResponse.json({ error: "Missing 'id' parameter for info" }, { status: 400 });
    }
    if (!["movie", "tv"].includes(type)) {
      return NextResponse.json({ error: "Invalid media_type for info. Must be 'movie' or 'tv'" }, { status: 400 });
    }
    url = `${baseUrl}/${type}/${tmdbId}?language=en-US&api_key=${apiKey}`;
  } else if (path === "recommendations") {
    const tmdbId = searchParams.get("id");
    const type = mediaType || "movie";
    if (!tmdbId) {
      return NextResponse.json({ error: "Missing 'id' parameter for recommendations" }, { status: 400 });
    }
    url = `${baseUrl}/${type}/${tmdbId}/recommendations?api_key=${apiKey}`;
  } else if (path === "reviews") {
    const tmdbId = searchParams.get("id");
    const type = mediaType || "movie";
    if (!tmdbId) {
      return NextResponse.json({ error: "Missing 'id' parameter for reviews" }, { status: 400 });
    }
    url = `${baseUrl}/${type}/${tmdbId}/reviews?language=en-US&page=${page}&api_key=${apiKey}`;
  } else if (path === "episodes") {
    const tmdbId = searchParams.get("id");
    const seasonNumber = searchParams.get("season") || "1";
    if (!tmdbId) {
      return NextResponse.json({ error: "Missing 'id' parameter for episodes" }, { status: 400 });
    }
    url = `${baseUrl}/tv/${tmdbId}/season/${seasonNumber}?language=en-US&api_key=${apiKey}`;
  } else {
    return NextResponse.json({ error: `Unsupported path: ${path}` }, { status: 400 });
  }

  try {
    const res = await fetch(url, fetchOptions);

    if (!res.ok) {
      const errorBody = await res.text();
      return NextResponse.json(
        { error: `TMDB API error: ${res.status}`, details: errorBody },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("TMDB proxy error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from TMDB" },
      { status: 500 }
    );
  }
}
