import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type {
  ColorTheme,
  FontFamily,
  FontSize,
  ThemeContextType,
  ThemeMode,
  ThemeSettings,
} from "./theme.types";

import {
  colorThemes,
  DEFAULT_THEME,
  fontFamilies,
  fontSizes,
} from "./theme";

const ThemeContext =
  createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({
  children,
}: ThemeProviderProps) {
  const [settings, setSettings] =
    useState<ThemeSettings>(() => {
      const savedTheme =
        localStorage.getItem("dashboard-theme");

      if (savedTheme) {
        try {
          return JSON.parse(savedTheme);
        } catch {
          return DEFAULT_THEME;
        }
      }

      return DEFAULT_THEME;
    });

  useEffect(() => {
    const root = document.documentElement;

    const {
      mode,
      color,
      fontFamily,
      fontSize,
    } = settings;

    const resolvedMode =
      mode === "system"
        ? window.matchMedia(
            "(prefers-color-scheme: dark)",
          ).matches
          ? "dark"
          : "light"
        : mode;

    const colors =
      colorThemes[color][resolvedMode];

    const typography =
      fontSizes[fontSize];

    /* -------------------------
       THEME ATTRIBUTE
    ------------------------- */

    root.setAttribute("data-theme", mode);

    /* -------------------------
       COLORS
    ------------------------- */

    root.style.setProperty(
      "--color-primary",
      colors.primary,
    );

    root.style.setProperty(
      "--color-primary-hover",
      colors.primaryHover,
    );

    root.style.setProperty(
      "--color-sidebar-active",
      colors.sidebarActive,
    );

    /* -------------------------
       FONT FAMILY
    ------------------------- */

    root.style.setProperty(
      "--font-family",
      fontFamilies[fontFamily],
    );

    /* -------------------------
       DESKTOP FONT SIZES
    ------------------------- */

    root.style.setProperty(
      "--font-size-xs-desktop",
      typography.desktop.xs,
    );

    root.style.setProperty(
      "--font-size-sm-desktop",
      typography.desktop.sm,
    );

    root.style.setProperty(
      "--font-size-base-desktop",
      typography.desktop.base,
    );

    root.style.setProperty(
      "--font-size-lg-desktop",
      typography.desktop.lg,
    );

    root.style.setProperty(
      "--font-size-xl-desktop",
      typography.desktop.xl,
    );

    root.style.setProperty(
      "--font-size-2xl-desktop",
      typography.desktop["2xl"],
    );

    root.style.setProperty(
      "--font-size-3xl-desktop",
      typography.desktop["3xl"],
    );

    /* -------------------------
       MOBILE FONT SIZES
    ------------------------- */

    root.style.setProperty(
      "--font-size-xs-mobile",
      typography.mobile.xs,
    );

    root.style.setProperty(
      "--font-size-sm-mobile",
      typography.mobile.sm,
    );

    root.style.setProperty(
      "--font-size-base-mobile",
      typography.mobile.base,
    );

    root.style.setProperty(
      "--font-size-lg-mobile",
      typography.mobile.lg,
    );

    root.style.setProperty(
      "--font-size-xl-mobile",
      typography.mobile.xl,
    );

    root.style.setProperty(
      "--font-size-2xl-mobile",
      typography.mobile["2xl"],
    );

    root.style.setProperty(
      "--font-size-3xl-mobile",
      typography.mobile["3xl"],
    );

    /* -------------------------
       THEME COLORS
    ------------------------- */

    if (resolvedMode === "dark") {
      root.style.setProperty(
        "--color-background",
        "#111111",
      );

      root.style.setProperty(
        "--color-surface",
        "#181818",
      );

      root.style.setProperty(
        "--color-surface-secondary",
        "#222222",
      );

      root.style.setProperty(
        "--color-text",
        "#F5F5F5",
      );

      root.style.setProperty(
        "--color-text-secondary",
        "#A3A3A3",
      );

      root.style.setProperty(
        "--color-border",
        "#2A2A2A",
      );
    } else {
      root.style.setProperty(
        "--color-background",
        "#FFFFFF",
      );

      root.style.setProperty(
        "--color-surface",
        "#FFFFFF",
      );

      root.style.setProperty(
        "--color-surface-secondary",
        "#F7F7F8",
      );

      root.style.setProperty(
        "--color-text",
        "#111111",
      );

      root.style.setProperty(
        "--color-text-secondary",
        "#5F6368",
      );

      root.style.setProperty(
        "--color-border",
        "#E5E7EB",
      );
    }

    /* -------------------------
       SAVE SETTINGS
    ------------------------- */

    localStorage.setItem(
      "dashboard-theme",
      JSON.stringify(settings),
    );
  }, [settings]);

  const setMode = (mode: ThemeMode) => {
    setSettings((current) => ({
      ...current,
      mode,
    }));
  };

  const setColor = (
    color: ColorTheme,
  ) => {
    setSettings((current) => ({
      ...current,
      color,
    }));
  };

  const setFontFamily = (
    fontFamily: FontFamily,
  ) => {
    setSettings((current) => ({
      ...current,
      fontFamily,
    }));
  };

  const setFontSize = (
    fontSize: FontSize,
  ) => {
    setSettings((current) => ({
      ...current,
      fontSize,
    }));
  };

  const resetTheme = () => {
    setSettings(DEFAULT_THEME);
  };

  return (
    <ThemeContext.Provider
      value={{
        settings,
        setMode,
        setColor,
        setFontFamily,
        setFontSize,
        resetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider",
    );
  }

  return context;
}