import {
  Sun,
  Moon,
  Monitor,
  X,
} from "lucide-react";

import type {
  ColorTheme,
  FontFamily,
  FontSize,
  ThemeMode,
} from "../theme/theme.types";

import { COLOR_THEMES } from "../theme/theme.config";

interface PreferencesModalProps {
  open: boolean;
  onClose: () => void;

  mode: ThemeMode;
  color: ColorTheme;
  fontFamily: FontFamily;
  fontSize: FontSize;

  setMode: (mode: ThemeMode) => void;
  setColor: (color: ColorTheme) => void;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: FontSize) => void;
}

export default function PreferencesModal({
  open,
  onClose,
  mode,
  color,
  fontFamily,
  fontSize,
  setMode,
  setColor,
  setFontFamily,
  setFontSize,
}: PreferencesModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[300]
        flex
        items-center
        justify-center
        bg-black/40
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          w-full
          max-w-[420px]
          overflow-hidden
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-[var(--color-border)]
            px-5
            py-4
          "
        >
          <div>
            <h2
              className="
                text-[var(--font-size-base)]
                font-semibold
                text-[var(--color-text)]
              "
            >
              Preferences
            </h2>

            <p
              className="
                mt-0.5
                text-[var(--font-size-xs)]
                text-[var(--color-text-secondary)]
              "
            >
              Customize your dashboard appearance
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close preferences"
            className="
              flex
              h-8
              w-8
              cursor-pointer
              items-center
              justify-center
              rounded-md
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-[var(--color-background)]
              hover:text-[var(--color-text)]
            "
          >
            <X size={17} />
          </button>
        </div>

        {/* Appearance */}
        <div
          className="
            border-b
            border-[var(--color-border)]
            px-5
            py-4
          "
        >
          <p
            className="
              mb-2
              text-[var(--font-size-sm)]
              font-medium
              text-[var(--color-text)]
            "
          >
            Appearance
          </p>

          <div
            className="
              flex
              h-10
              gap-1
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-background)]
              p-0.5
            "
          >
            <AppearanceButton
              active={mode === "light"}
              onClick={() => setMode("light")}
            >
              <Sun size={17} />
              <span>Light</span>
            </AppearanceButton>

            <AppearanceButton
              active={mode === "dark"}
              onClick={() => setMode("dark")}
            >
              <Moon size={17} />
              <span>Dark</span>
            </AppearanceButton>

            <AppearanceButton
              active={mode === "system"}
              onClick={() => setMode("system")}
            >
              <Monitor size={17} />
              <span>System</span>
            </AppearanceButton>
          </div>
        </div>

        {/* Color Theme */}
        <div
          className="
            border-b
            border-[var(--color-border)]
            px-5
            py-4
          "
        >
          <p
            className="
              mb-3
              text-[var(--font-size-sm)]
              font-medium
              text-[var(--color-text)]
            "
          >
            Color Theme
          </p>

          <div className="flex items-center gap-3">
            {(
              Object.entries(COLOR_THEMES) as [
                ColorTheme,
                (typeof COLOR_THEMES)[ColorTheme],
              ][]
            ).map(([themeName, themeConfig]) => {
              const active = color === themeName;

              return (
                <button
                  key={themeName}
                  type="button"
                  onClick={() => setColor(themeName)}
                  aria-label={`${themeName} theme`}
                  title={themeName}
                  className={`
                    h-8
                    w-8
                    cursor-pointer
                    rounded-full
                    border
                    border-[var(--color-border)]
                    transition-all
                    ${
                      active
                        ? `
                          ring-2
                          ring-[var(--color-primary)]
                          ring-offset-2
                          ring-offset-[var(--color-surface)]
                        `
                        : `
                          hover:scale-105
                        `
                    }
                  `}
                  style={{
                    backgroundColor: themeConfig.primary,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Font Family */}
        <div
          className="
            border-b
            border-[var(--color-border)]
            px-5
            py-4
          "
        >
          <p
            className="
              mb-2
              text-[var(--font-size-sm)]
              font-medium
              text-[var(--color-text)]
            "
          >
            Font Family
          </p>

          <select
            value={fontFamily}
            onChange={(event) =>
              setFontFamily(event.target.value as FontFamily)
            }
            className="
              h-9
              w-full
              cursor-pointer
              rounded-md
              border
              border-[var(--color-border)]
              bg-[var(--color-background)]
              px-3
              text-[var(--font-size-sm)]
              text-[var(--color-text)]
              outline-none
              transition-colors
              focus:border-[var(--color-primary)]
            "
          >
            <option value="inter">Inter</option>
            <option value="roboto">Roboto</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Font Size */}
        <div className="px-5 py-4">
          <p
            className="
              mb-2
              text-[var(--font-size-sm)]
              font-medium
              text-[var(--color-text)]
            "
          >
            Font Size
          </p>

          <div
            className="
              flex
              gap-1
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-background)]
              p-0.5
            "
          >
            {(["small", "medium", "large"] as FontSize[]).map((size) => {
              const active = fontSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setFontSize(size)}
                  className={`
                    flex
                    flex-1
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-md
                    py-1.5
                    text-[var(--font-size-xs)]
                    capitalize
                    transition-colors
                    ${
                      active
                        ? `
                          bg-[var(--color-surface)]
                          text-[var(--color-primary)]
                          shadow-sm
                        `
                        : `
                          text-[var(--color-text-secondary)]
                          hover:text-[var(--color-text)]
                        `
                    }
                  `}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AppearanceButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function AppearanceButton({
  active,
  onClick,
  children,
}: AppearanceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        flex-1
        cursor-pointer
        items-center
        justify-center
        gap-1.5
        rounded-md
        text-[var(--font-size-xs)]
        transition-colors
        ${
          active
            ? `
              bg-[var(--color-surface)]
              text-[var(--color-primary)]
              shadow-sm
            `
            : `
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-text)]
            `
        }
      `}
    >
      {children}
    </button>
  );
}