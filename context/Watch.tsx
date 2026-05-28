'use client';

import { getEpisodes } from '@/lib/TVfunctions';
import { saveWatchProgress } from '@/utils/ProgressHandler';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState, useMemo, useRef, useCallback, type ReactNode } from 'react';
import { toast } from 'react-toastify';
import { useWatchSettingContext } from './WatchSetting';
import type { WatchAreaContextValue, WatchInfo, TMDBMedia, TMDBMovie, TMDBEpisode, WatchSetting } from '@/types/global';

export const WatchAreaContext = createContext<WatchAreaContextValue | null>(null);

export function WatchAreaContextProvider({ children, MovieInfo, MovieId }: { children: ReactNode; MovieInfo: TMDBMedia; MovieId: string }) {
  const searchparam = useSearchParams();

  const [episode, setEpisode] = useState<number>(() => parseInt(searchparam.get('ep') || '1', 10) || 1);
  const [season, setSeason] = useState<number>(() => parseInt(searchparam.get('se') || '1', 10) || 1);
  const [episodes, setEpisodes] = useState<TMDBEpisode[]>([]);
  const [episodeLoading, setEpisodeLoading] = useState<boolean>(true);
  const [watchInfo, setWatchInfo] = useState<WatchInfo>({ loading: true });


  // ---------------- SYNC WITH SEARCH PARAMS ----------------
  useEffect(() => {
    const ep = parseInt(searchparam.get('ep') || '1') || 1;
    const se = parseInt(searchparam.get('se') || '1') || 1;

    setEpisode(ep);
    setSeason(se);
  }, [searchparam]);


  // ---------------- FETCH EPISODES ----------------
  useEffect(() => {
    if (!MovieInfo) return;

    setEpisodeLoading(true);

    if (MovieInfo.type !== 'tv') {
      const movieEpisode: TMDBEpisode[] = [{
        id: MovieInfo.id,
        episode_number: 1,
        name: ('title' in MovieInfo ? MovieInfo.title : MovieInfo.name) || '',
        overview: MovieInfo.overview || '',
        runtime: (MovieInfo as TMDBMovie).runtime || 90,
        season_number: 1,
        still_path: MovieInfo.backdrop_path || null,
        vote_average: MovieInfo.vote_average || 0,
        vote_count: MovieInfo.vote_count || 0,
        air_date: MovieInfo.release_date || (MovieInfo as TMDBMedia).first_air_date || '',
      }];

      setEpisodes(movieEpisode);
      setEpisodeLoading(false);
      return;
    }

    const fetchEpisodes = async () => {
      try {
        const data = await getEpisodes(MovieId, season);
        if (!data?.episodes?.length) {
          toast('No episodes found');
          setEpisodes([]);
        } else {
          setEpisodes(data.episodes);
        }
      } catch (err) {
        console.error(err);
        toast('Failed to fetch episodes');
      } finally {
        setEpisodeLoading(false);
      }
    };

    fetchEpisodes();
  }, [MovieInfo, MovieId, season]);


  // ---------------- SAVE PROGRESS ----------------
  useEffect(() => {
    if (episodes.length && MovieInfo) {
      saveWatchProgress(MovieInfo, episodes, episode);
    }
  }, [episode, season, episodes, MovieInfo]);

  // ---------------- AUTO-NEXT ----------------
  const watchSettingCtx = useWatchSettingContext();
  const watchSetting = watchSettingCtx.watchSetting;

  const autoNextTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advanceToNextEpisode = useCallback(() => {
    if (MovieInfo?.type !== 'tv') return;

    const currentEpisodeIndex = episodes.findIndex(ep => ep.episode_number === episode);
    const nextEpisode = episodes[currentEpisodeIndex + 1];

    if (nextEpisode) {
      toast.success("▶️ Auto-advancing to next episode...");
      setEpisode(nextEpisode.episode_number);
    }
  }, [MovieInfo?.type, episodes, episode, setEpisode]);

  // Auto-next timer: when a new episode loads, schedule advance after its runtime
  useEffect(() => {
    // Clear any existing timer
    if (autoNextTimerRef.current) {
      clearTimeout(autoNextTimerRef.current);
      autoNextTimerRef.current = null;
    }

    // Only auto-next for TV shows when feature is enabled
    if (!watchSetting.autoNext || MovieInfo?.type !== 'tv') return;
    if (!episodes.length || episodeLoading) return;

    const currentEpData = episodes.find(ep => ep.episode_number === episode);
    if (!currentEpData) return;

    // Get runtime in minutes (default 24min if unknown)
    const runtimeMinutes = currentEpData.runtime || 24;
    // Convert to milliseconds, subtract 30 seconds as buffer so it triggers near the end
    const runtimeMs = Math.max(runtimeMinutes * 60 * 1000 - 30000, 10000);

    autoNextTimerRef.current = setTimeout(() => {
      advanceToNextEpisode();
    }, runtimeMs);

    return () => {
      if (autoNextTimerRef.current) {
        clearTimeout(autoNextTimerRef.current);
        autoNextTimerRef.current = null;
      }
    };
  }, [watchSetting.autoNext, episode, season, episodes, episodeLoading, MovieInfo?.type, advanceToNextEpisode]);

  // ---------------- CONTEXT VALUE ----------------
  const contextValue = useMemo<WatchAreaContextValue>(() => ({
    episode,
    setEpisode,
    season,
    setSeason,
    episodes,
    watchInfo,
    setWatchInfo,
    episodeLoading,
    MovieInfo,
    MovieId,
  }), [
    episode,
    season,
    episodes,
    watchInfo,
    episodeLoading,
    MovieInfo,
    MovieId,
  ]);

  return (
    <WatchAreaContext.Provider value={contextValue}>
      {children}
    </WatchAreaContext.Provider>
  );
}

export function useWatchContext(): WatchAreaContextValue {
  const ctx = useContext(WatchAreaContext);
  if (!ctx) throw new Error('useWatchContext must be used inside WatchAreaContextProvider');
  return ctx;
}
