'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { WatchSetting, WatchSettingContextValue } from '@/types/global';

const SETTINGS_STORAGE_KEY = "movieverse_settings";

const defaultSettings: WatchSetting = {
  isExpanded: false,
  light: false,
  autoPlay: false,
  autoNext: false,
  autoSkipIntro: false
};

const WatchSettingContext = createContext<WatchSettingContextValue | null>(null);

export function WatchSettingContextProvider({ children }: { children: ReactNode }) {
  const [watchSetting, setWatchSetting] = useState<WatchSetting>(defaultSettings);

  /* eslint-disable react-hooks/set-state-in-effect -- reads localStorage on mount */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setWatchSetting(prev => ({
          ...prev,
          autoPlay: parsed.autoPlay ?? prev.autoPlay,
          autoNext: parsed.autoNext ?? prev.autoNext,
          autoSkipIntro: parsed.autoSkipIntro ?? prev.autoSkipIntro,
        }));
      }
    } catch (e) {
      console.warn("Failed to load watch settings:", e);
    }
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Sync autoPlay/autoNext/autoSkipIntro back to localStorage whenever they change
  useEffect(() => {
    try {
      const toSync = {
        autoPlay: watchSetting.autoPlay,
        autoNext: watchSetting.autoNext,
        autoSkipIntro: watchSetting.autoSkipIntro,
      };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(toSync));
    } catch (e) {
      console.warn("Failed to sync watch settings:", e);
    }
  }, [watchSetting.autoPlay, watchSetting.autoNext, watchSetting.autoSkipIntro]);

  return (
    <WatchSettingContext.Provider value={{ watchSetting, setWatchSetting }}>
      <div
        className="flex gap-3 flex-col-reverse max-h-[52rem] "
        style={{ flexDirection: (watchSetting.isExpanded ? "column-reverse" : undefined) as React.CSSProperties['flexDirection'] | undefined }}
      >
        {children}
      </div>
    </WatchSettingContext.Provider >
  )
}

export const useWatchSettingContext = (): WatchSettingContextValue => {
  const ctx = useContext(WatchSettingContext);
  if (!ctx) throw new Error('useWatchSettingContext must be used inside WatchSettingContextProvider');
  return ctx;
}