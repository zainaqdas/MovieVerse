"use client";
import { createContext, useState, useMemo, useContext } from "react";

import type { UserProfile, UserInfoContextValue } from "@/types/global";
import type { ReactNode } from "react";

// Create the context (always logged out — Firebase removed)
export const UserContext = createContext<UserInfoContextValue>({
  userInfo: null,
  loading: false,
  isUserLoggedIn: false
});

// Provider component
export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo] = useState<UserProfile | null>(null);
  const [loading] = useState(false);
  const [isUserLoggedIn] = useState(false);

  const contextValue = useMemo<UserInfoContextValue>(
    () => ({
      userInfo,
      loading,
      isUserLoggedIn
    }),
    [userInfo, loading, isUserLoggedIn]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserInfoContext = (): UserInfoContextValue => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserInfoProvider');
  }

  return context;
};