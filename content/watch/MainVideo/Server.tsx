"use client";

import React, { useEffect, useMemo } from "react";
import { useWatchContext } from "@/context/Watch";
import { STREAMING_SERVERS } from "@/utils/constants";


const Server = () => {
  const { MovieId, setWatchInfo, watchInfo, MovieInfo, episode, episodes, season } =
    useWatchContext();

  const servers = useMemo(() => {
    const serverMap = MovieInfo?.type === "tv" ? STREAMING_SERVERS.tv : STREAMING_SERVERS.movie;
    return (Object.entries(serverMap) as [string, (...args: unknown[]) => string][]).map(([name, urlFn]) => {
      const url = MovieInfo?.type === "tv"
        ? urlFn(MovieId, season, episode)
        : urlFn(MovieId);
      return [name, url] as [string, string];
    });
  }, [MovieInfo?.type, MovieId, season, episode]);

  // ✅ when user clicks server → save globally
  const changeServer = (item: [string, string]) => {
    const serverName = item[0];

    const updated = {
      ...watchInfo,
      url: item[1],
      iframe: true,
      loading: false,
      serverName,
    };

    setWatchInfo(updated);
    localStorage.setItem("preferredServer", serverName);
  };



  // ✅ load preferred server when episode changes
  useEffect(() => {
    if (!servers.length) return;

    const preferredServer = localStorage.getItem("preferredServer");
    const watchdata = Array.isArray(episodes) ? episodes.find((ep: { episode_number?: number }) => ep.episode_number === episode) : undefined;

    let selected;

    if (preferredServer) {
      selected = servers.find(([name]) => name === preferredServer);
    }

    // fallback to first server
    if (!selected) {
      selected = servers[1];
    }

    const defaultWatchInfo = {
      url: selected[1],
      iframe: true,
      loading: false,
      serverName: selected[0],
    };


    setWatchInfo(prev => ({ ...prev, ...defaultWatchInfo, watchdata }));
  }, [episode, servers, episodes, setWatchInfo]);

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="bg-[#323044] h-full w-full px-4 flex items-center gap-8 max-[880px]:py-2 max-[515px]:flex-col max-[515px]:gap-5">
        <div>Server</div>

        <div className="flex gap-2 flex-wrap max-[515px]:justify-center">
          {servers.map((item) => (
            <div
              key={item[0]}
              onClick={() => changeServer(item)}
              style={{
                background:
                  watchInfo?.serverName === item[0] ? "#4a446c" : undefined,
              }}
              className="px-4 py-[6px] text-[15px] bg-[#413d57] hover:bg-[#4a446c] border border-[#5b5682] rounded-md cursor-pointer"
            >
              {item[0]}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Server;
