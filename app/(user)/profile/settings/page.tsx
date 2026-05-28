"use client";

export const dynamic = 'force-dynamic';

import { useUserInfoContext } from "@/context/UserInfoContext";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState, useCallback } from "react";
import { FaUser, FaPlay, FaForward, FaWandMagic } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { MdArrowBack } from "react-icons/md";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const SETTINGS_STORAGE_KEY = "jadescreen_settings";

const defaultSettings = {
  autoPlay: true,
  autoNext: true,
  autoSkipIntro: false,
};

interface SettingToggleProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
}

const SettingToggle = ({ icon, label, description, enabled, onChange }: SettingToggleProps) => (    <div className="flex items-center justify-between py-4 px-5 rounded-xl bg-dark-card border border-[#1e293b] hover:border-jade-700 transition-all group">
    <div className="flex items-center gap-4">
      <div className="text-xl text-jade-400 group-hover:text-jade-300 transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[#e8e6f0] font-medium text-[15px]">{label}</div>
        <div className="text-[#8886a0] text-[13px] mt-0.5">{description}</div>
      </div>
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
        enabled ? "bg-jade-500" : "bg-[#1e293b]"
      }`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 ${
          enabled ? "left-[26px]" : "left-0.5"
        }`}
      />
    </button>
  </div>
);

const SettingsPage = () => {
  const { userInfo, isUserLoggedIn, loading } = useUserInfoContext();
  const router = useRouter();
  const [settings, setSettings] = useState(() => {
    if (typeof window === "undefined") return defaultSettings;
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch (e) {
      console.warn("Failed to load settings:", e);
      return defaultSettings;
    }
  });


  // Save settings to localStorage
  const updateSetting = useCallback(
    (key: 'autoPlay' | 'autoNext' | 'autoSkipIntro', value: boolean) => {
      const updated = { ...settings, [key]: value };
      setSettings(updated);
      try {
        localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
        toast.success(`${key === "autoPlay" ? "Auto-play" : key === "autoNext" ? "Auto-next" : "Auto-skip intro"} ${value ? "enabled" : "disabled"}`);
      } catch (e) {
        console.warn("Failed to save settings:", e);
      }
    },
    [settings]
  );

  // Redirect if not logged in (only client-side)
  useEffect(() => {
    if (!loading && !isUserLoggedIn) {
      router.push("/");
    }
  }, [loading, isUserLoggedIn, router]);

  if (!loading && !isUserLoggedIn) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-dark-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-jade-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[42rem] relative py-6">

          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]" />

          <div className="mt-[15px] flex items-center gap-3">
            <Link
              href="/profile"
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-dark-card border border-[#1e293b] text-jade-400 hover:text-white hover:border-jade-500 transition-all"
            >
              <MdArrowBack />
            </Link>
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">Settings</h1>
          </div>

          {/* Account Section */}
          <div className="mt-8">
            <h2 className="text-jade-400 font-['poppins'] text-[13px] font-semibold uppercase tracking-wider mb-3">Account</h2>

            <div className="p-5 rounded-xl bg-dark-card border border-[#1e293b]">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-jade-700 flex-shrink-0">
                  {userInfo?.photo ? (
                    <Image
                      src={userInfo.photo}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#1e293b] flex items-center justify-center text-2xl text-jade-400">
                      <FaUser />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#e8e6f0] font-medium text-[17px] font-['poppins'] truncate">
                    {userInfo?.name || "User"}
                  </div>
                  <div className="text-[#8886a0] text-[14px] truncate">
                    {userInfo?.email || "No email"}
                  </div>
                  {userInfo?.description && (
                    <div className="text-[#666480] text-[13px] mt-1 truncate">
                      {userInfo.description}
                    </div>
                  )}
                </div>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1e293b] text-[#c8c6d0] text-[13px] hover:bg-jade-800 transition-all flex-shrink-0"
                >
                  <FaUser className="text-xs" />
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Watch Preferences Section */}
          <div className="mt-10">
            <h2 className="text-jade-400 font-['poppins'] text-[13px] font-semibold uppercase tracking-wider mb-3">Watch Preferences</h2>

            <div className="flex flex-col gap-2">
              <SettingToggle
                icon={<FaPlay />}
                label="Auto-play"
                description="Automatically start playing the next video"
                enabled={settings.autoPlay}
                onChange={(val) => updateSetting("autoPlay", val)}
              />
              <SettingToggle
                icon={<FaForward />}
                label="Auto-next episode"
                description="Automatically advance to the next episode"
                enabled={settings.autoNext}
                onChange={(val) => updateSetting("autoNext", val)}
              />
              <SettingToggle
                icon={<FaWandMagic />}
                label="Auto-skip intro"
                description="Automatically skip intro sequences (where available)"
                enabled={settings.autoSkipIntro}
                onChange={(val) => updateSetting("autoSkipIntro", val)}
              />
            </div>
          </div>

        </div>
      </div>

      {/* background blur elements */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#10b9814d] blur-[200px]" />
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#05966966] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]" />
    </Fragment>
  );
};

export default SettingsPage;
