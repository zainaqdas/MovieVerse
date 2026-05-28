// ================ TMDB API Types ================

export interface TMDBMovie {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids?: number[];
  genres?: TMDBGenre[];
  media_type?: string;
  type?: string;
  runtime?: number;
  status?: string;
  tagline?: string;
  budget?: number;
  revenue?: number;
  homepage?: string;
  production_companies?: TMDBProductionCompany[];    spoken_languages?: { iso_639_1: string; name: string }[];
    original_language?: string;
    adult?: boolean;
    video?: boolean;
    // TV properties (optional on movies for union access)
    name?: string;
    original_name?: string;
    first_air_date?: string;
    origin_country?: string[];
    number_of_episodes?: number;
    number_of_seasons?: number;
    seasons?: TMDBSeason[];
    in_production?: boolean;
    episode_run_time?: number[];
    last_air_date?: string;
    // Additional known TMDB fields
    adult?: boolean;
    video?: boolean;
    imdb_id?: string;
  }

  export interface TMDBTVShow {
    id: number;
    name: string;
    original_name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    last_air_date?: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids?: number[];
    genres?: TMDBGenre[];
    media_type?: string;
    type?: string;
    number_of_episodes?: number;
    number_of_seasons?: number;
    seasons?: TMDBSeason[];
    status?: string;
    tagline?: string;
    origin_country?: string[];
    spoken_languages?: { iso_639_1: string; name: string }[];
    original_language?: string;
    in_production?: boolean;
    episode_run_time?: number[];
    // Movie properties (optional on TV shows for union access)
    title?: string;
    original_title?: string;
    release_date?: string;
    budget?: number;
    revenue?: number;
    production_companies?: TMDBProductionCompany[];
    video?: boolean;
    // Additional known TMDB fields
    adult?: boolean;
    imdb_id?: string;
  }

export type TMDBMedia = TMDBMovie | TMDBTVShow;

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBSeason {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  overview: string;
  poster_path: string | null;
  air_date: string | null;
}

export interface TMDBEpisode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  still_path: string | null;
  runtime: number | null;
  vote_average: number;
  vote_count: number;
  air_date: string;
}

export interface TMDBPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TMDBSeasonResponse {
  id: number;
  season_number: number;
  episodes: TMDBEpisode[];
  name: string;
  overview: string;
  air_date: string;
}

export interface TMDBReview {
  id: string;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface TMDBVideoResult {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface TMDBProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// ================ Firebase / User Types (data shapes — not Firebase-dependent) ================

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  photo: string;
  emailVerified: boolean;
  description: string;
  banner: string;
  shortTitle: string;
  episodesWatched: number;
  moviesWatched: number;
  createdAt: unknown;
}

export interface SavedMovie {
  uid: string;
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  backdrop_path?: string | null;
  overview?: string;
  media_type?: string;
  type?: string;
  status: string;
  createdAt: unknown;
  [key: string]: unknown;
}

export interface SavedMovieBreakdown {
  status: string;
  count: number;
  movies: SavedMovie[];
}

export interface TotalMoviesResult {
  total: number;
  breakdown: SavedMovieBreakdown[];
}

export interface WatchProgressItem {
  id: string;
  movieid: number;
  title: string;
  episode: number;
  totalepisode: number;
  season: number;
  description: string;
  runtime: number | string;
  media_type: string;
  date: number;
  thumbnail: string;
}

export interface MovieStatus {
  status: string;
  data?: SavedMovie;
}

// ================ Context Types ================

export interface UserInfoContextValue {
  userInfo: UserProfile | null;
  loading: boolean;
  isUserLoggedIn: boolean;
}

export interface WatchInfo {
  url?: string;
  iframe?: boolean;
  loading: boolean;
  serverName?: string;
  watchdata?: TMDBEpisode;
}

export interface WatchAreaContextValue {
  episode: number;
  setEpisode: (ep: number | ((prev: number) => number)) => void;
  season: number;
  setSeason: (s: number | ((prev: number) => number)) => void;
  episodes: TMDBEpisode[];
  watchInfo: WatchInfo;
  setWatchInfo: (info: WatchInfo | ((prev: WatchInfo) => WatchInfo)) => void;
  episodeLoading: boolean;
  MovieInfo: TMDBMedia | null;
  MovieId: string;
}

export interface WatchSetting {
  isExpanded: boolean;
  light: boolean;
  autoPlay: boolean;
  autoNext: boolean;
  autoSkipIntro: boolean;
}

export interface WatchSettingContextValue {
  watchSetting: WatchSetting;
  setWatchSetting: (settings: WatchSetting | ((prev: WatchSetting) => WatchSetting)) => void;
}

// ================ App Types ================

export interface NavLink {
  label: string;
  href: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface StreamingServers {
  movie: Record<string, (id: string | number) => string>;
  tv: Record<string, (id: string | number, season: number, episode: number) => string>;
}

export interface MediaCategory {
  title: string;
  id: string;
}

// ================ Component Props ================

export interface CardProps {
  data?: TMDBMovie | TMDBTVShow;
  type?: string;
  loading?: boolean;
}

export interface HorizontalCardProps {
  data?: TMDBMovie | TMDBTVShow;
  type?: string;
}

export interface FeaturedCardProps {
  populardata?: TMDBMovie | TMDBTVShow;
  index?: number;
}

export interface TrendingCardProps {
  info?: TMDBMovie | TMDBTVShow;
  index?: number;
}

export interface EpisodeCardProps {
  info?: TMDBEpisode;
  currentEp?: number;
  loading?: boolean;
  watchedEP?: number[];
  posterImg?: string | null;
  currentSn?: number;
}

export interface SelectProps {
  data: string[];
  selectedIndex?: number;
  setSelected: (val: { id: number; title: string }) => void;
}

export interface CatalogSelectProps {
  data: string[];
  state: string;
  onStateChange: (val: string) => void;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CheckboxProps {
  label: string;
  state?: boolean;
  setState: (checked: boolean) => void;
}

export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownFilterProps {
  data: DropdownOption[];
  state: string;
  setState: (val: string) => void;
  placeholder?: string;
}

export interface CommentProps {
  MovieId: string;
  type?: string;
}

export interface RecommendationProps {
  MovieId: string;
  type?: string;
}

export interface MovieInfoProps {
  info?: TMDBMovie | TMDBTVShow;
}

export interface RatingProps {
  info?: TMDBMovie | TMDBTVShow;
}

export interface ServerProps {
  // No props, uses context
}

export interface EpInfoProps {
  episode: number;
}

export interface MainVideoProps {
  // No props, uses context
}


