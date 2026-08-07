"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { UserProfile } from "@/types";
import { getTheme, getAgeGroup, ThemeConfig } from "@/lib/themes";

const STORAGE_KEY = "builder_profile";
const SETTINGS_KEY = "builder_settings";

export interface UserSettings {
  customBackground?: string;
  customPrimary?: string;
  layoutDensity: "compact" | "normal" | "spacious";
  cardStyle: "rounded" | "sharp" | "soft";
}

const defaultSettings: UserSettings = {
  layoutDensity: "normal",
  cardStyle: "rounded",
};

interface ThemeContextType {
  theme: ThemeConfig;
  settings: UserSettings;
  updateSettings: (s: Partial<UserSettings>) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: getTheme("male", "young"),
  settings: defaultSettings,
  updateSettings: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeConfig>(getTheme("male", "young"));
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);

  useEffect(() => {
    // 读取用户档案
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const profile: UserProfile = JSON.parse(saved);
        const ageGroup = getAgeGroup(profile.age);
        const newTheme = getTheme(profile.gender, ageGroup);
        setTheme(newTheme);
        applyThemeToDOM(newTheme, settings);
      } catch {}
    } else {
      applyThemeToDOM(theme, settings);
    }

    // 读取自定义设置
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        const s = JSON.parse(savedSettings);
        setSettings(s);
        applyThemeToDOM(theme, s);
      } catch {}
    }
  }, []);

  const updateSettings = (partial: Partial<UserSettings>) => {
    const newSettings = { ...settings, ...partial };
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    applyThemeToDOM(theme, newSettings);
  };

  return (
    <ThemeContext.Provider value={{ theme, settings, updateSettings }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyThemeToDOM(t: ThemeConfig, s: UserSettings) {
  const root = document.documentElement;

  // 基础主题色
  const bg = s.customBackground || t.background;
  const primary = s.customPrimary || t.primary;

  root.style.setProperty("--primary", primary);
  root.style.setProperty("--primary-light", t.primaryLight);
  root.style.setProperty("--primary-dark", t.primaryDark);
  root.style.setProperty("--secondary", t.secondary);
  root.style.setProperty("--accent", t.accent);
  root.style.setProperty("--background", bg);
  root.style.setProperty("--surface", t.surface);
  root.style.setProperty("--surface-hover", t.surfaceHover);
  root.style.setProperty("--text", t.text);
  root.style.setProperty("--text-secondary", t.textSecondary);
  root.style.setProperty("--text-muted", t.textMuted);
  root.style.setProperty("--border", t.border);
  root.style.setProperty("--success", t.success);
  root.style.setProperty("--warning", t.warning);
  root.style.setProperty("--danger", t.danger);
  root.style.setProperty("--gradient", `linear-gradient(135deg, ${primary} 0%, ${t.secondary} 100%)`);

  // 字体
  root.style.setProperty("--font-sans", t.fontFamily);
  root.style.fontSize = t.fontSizeBase;

  // 排版密度
  const densityScale = s.layoutDensity === "compact" ? 0.85 : s.layoutDensity === "spacious" ? 1.2 : 1;
  root.style.setProperty("--layout-gap", `${parseFloat(t.layoutGap) * densityScale}px`);

  // 卡片风格
  const radiusMap = { rounded: t.borderRadius, sharp: "4px", soft: "20px" };
  root.style.setProperty("--card-radius", radiusMap[s.cardStyle] || t.borderRadius);
  root.style.setProperty("--card-padding", t.cardPadding);
}
