import type { MediaCategory, NavLink } from "@/types/global";

// Movie/TV Categories for user lists
export const MOVIE_CATEGORIES: MediaCategory[] = [
  { title: "Watching", id: "CURRENT" },
  { title: "To Watch", id: "PLANNING" },
  { title: "Watched", id: "COMPLETED" },
  { title: "On Hold", id: "PAUSED" },
  { title: "Dropped", id: "DROPPED" },
];

// Streaming server configurations
export const STREAMING_SERVERS = {
  movie: {
    Quantum: (id: string | number): string => `https://vidlink.pro/movie/${id}?player=jw`,
    Nova: (id: string | number): string => `https://vidfast.pro/movie/${id}?autoPlay=true`,
    MultiEmbed: (id: string | number): string => `https://multiembed.mov/?video_id=${id}&tmdb=1`,
    VidSrc: (id: string | number): string => `https://vidsrc.to/embed/movie/${id}`,
    Astro: (id: string | number): string => `https://hexa.su/watch/movie/${id}?autoPlay=true`,
  },
  tv: {
    Quantum: (id: string | number, season: number, episode: number): string => `https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw`,
    Nova: (id: string | number, season: number, episode: number): string => `https://vidfast.pro/tv/${id}/${season}/${episode}?autoPlay=true`,
    MultiEmbed: (id: string | number, season: number, episode: number): string => `https://multiembed.mov/?video_id=${id}&tmdb=1&s=${season}&e=${episode}`,
    VidSrc: (id: string | number, season: number, episode: number): string => `https://vidsrc.to/embed/tv/${id}/${season}/${episode}`,
    Astro: (id: string | number, season: number, episode: number): string => `https://hexa.su/watch/tv/${id}/${season}/${episode}?autoPlay=true`,
  },
} as const;

// Language code to display name mapping
export const LANGUAGE_MAP: Record<string, string> = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  ja: "Japanese",
  zh: "Chinese",
  hi: "Hindi",
  ko: "Korean",
  pt: "Portuguese",
  ru: "Russian",
  it: "Italian",
  ar: "Arabic",
  tr: "Turkish",
  id: "Indonesia",
};

// Media type helpers
export const formatMediaType = (type: string): string => {
  if (!type) return "";
  return type.length > 2
    ? type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
    : type.toUpperCase();
};

// TMDB image URLs
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";
export const getTmdbImage = (path: string | null, size: string = "w500"): string | null =>
  path ? `${TMDB_IMAGE_BASE}/${size}${path}` : null;

// Navigation links (used by header)
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Catalog", href: "/catalog" },
  { label: "Trending", href: "/catalog?sort=TRENDING_DESC" },
];


