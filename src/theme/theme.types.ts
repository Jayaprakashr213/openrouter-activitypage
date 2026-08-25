export type ThemeMode = "light" | "dark" |"system";

export type ColorTheme = "purple" | "blue" | "green";

export type FontFamily = "inter" | "system" | "mono";

export type FontSize = "small" | "medium" | "large";

export type ThemeSettings = {
  mode: ThemeMode;
  color: ColorTheme;
  fontFamily: FontFamily;
  fontSize: FontSize;
};

export type ThemeContextType = {
  settings: ThemeSettings;

  setMode: (mode: ThemeMode) => void;
  setColor: (color: ColorTheme) => void;
  setFontFamily: (fontFamily: FontFamily) => void;
  setFontSize: (fontSize: FontSize) => void;

  resetTheme: () => void;
};