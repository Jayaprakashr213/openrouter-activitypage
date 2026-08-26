import type {
  ColorTheme,
  FontFamily,
  FontSize,
  ThemeMode,
} from "./theme.types";

export const DEFAULT_THEME = {
  mode: "light" as ThemeMode,
  color: "purple" as ColorTheme,
  fontFamily: "inter" as FontFamily,
  fontSize: "medium" as FontSize,
};

export const colorThemes = {
  purple: {
    light: {
      primary: "#6D28D9",
      primaryHover: "#5B21B6",
      sidebarActive: "#F3E8FF",
    },
 dark: {
  primary: "#C8FF00",
  primaryHover: "#B8EB00",
  sidebarActive: "#1A2600",
},
  },

  blue: {
    light: {
      primary: "#2563EB",
      primaryHover: "#1D4ED8",
      sidebarActive: "#EFF6FF",
    },
    dark: {
      primary: "#60A5FA",
      primaryHover: "#3B82F6",
      sidebarActive: "#13294B",
    },
  },

  green: {
    light: {
      primary: "#16A34A",
      primaryHover: "#15803D",
      sidebarActive: "#ECFDF5",
    },
    dark: {
      primary: "#4ADE80",
      primaryHover: "#22C55E",
      sidebarActive: "#142F20",
    },
  },

  orange: {
    light: {
      primary: "#EA580C",
      primaryHover: "#C2410C",
      sidebarActive: "#FFF7ED",
    },
    dark: {
      primary: "#FB923C",
      primaryHover: "#F97316",
      sidebarActive: "#3D2112",
    },
  },
};

export const fontFamilies: Record<FontFamily, string> = {
  inter: "Inter, sans-serif",
  system: "system-ui, sans-serif",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
};
export const fontSizes: Record<
  FontSize,
  {
    desktop: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
    };

    mobile: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      "2xl": string;
      "3xl": string;
    };
  }
> = {
  small: {
    desktop: {
      xs: "0.6875rem",
      sm: "0.75rem",
      base: "0.875rem",
      lg: "1rem",
      xl: "1.125rem",
      "2xl": "1.375rem",
      "3xl": "1.75rem",
    },

    mobile: {
      xs: "0.625rem",
      sm: "0.6875rem",
      base: "0.8125rem",
      lg: "0.9375rem",
      xl: "1rem",
      "2xl": "1.25rem",
      "3xl": "1.5rem",
    },
  },

  medium: {
    desktop: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },

    mobile: {
      xs: "0.6875rem",
      sm: "0.75rem",
      base: "0.875rem",
      lg: "1rem",
      xl: "1.125rem",
      "2xl": "1.375rem",
      "3xl": "1.75rem",
    },
  },

  large: {
    desktop: {
      xs: "0.8125rem",
      sm: "0.9375rem",
      base: "1.0625rem",
      lg: "1.25rem",
      xl: "1.375rem",
      "2xl": "1.625rem",
      "3xl": "2.125rem",
    },

    mobile: {
      xs: "0.75rem",
      sm: "0.8125rem",
      base: "0.9375rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
  },
};