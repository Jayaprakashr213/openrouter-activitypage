import { useEffect, useState } from "react";
import {
  Brain,
  Cpu,
  Image,
  MessageSquare,
  Sparkles,
  Video,
  Zap,
    Search,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import  type {ThemeMode} from "../theme/theme.types";
import PreferencesModal from "./preferenceModal";
import {
  Monitor,
  BarChart3,
  CircleUserRound,
  FileText,
  KeyRound,
  LogOut,
  Moon,
  Settings,
  Sun,
  Users,
  House,
  Box,
  FlaskConical,
  Trophy,
  PanelsTopLeft,
  Building2,
  BookOpen,

} from "lucide-react";

import { useTheme } from "../theme/themeProvider";
import { navItems } from "../utils/filterOptions";

const navItemsm = [
  { label: "Home", icon: House },
  { label: "Models", icon: Box },
  { label: "Benchmarks", icon: FlaskConical },
  { label: "Chat", icon: MessageSquare },
  { label: "Rankings", icon: Trophy },
  { label: "Apps", icon: PanelsTopLeft },
  { label: "Enterprise", icon: Building2 },
  { label: "Docs", icon: BookOpen },
];
const searchItems = [
  {
    name: "Ox Alpha",
    icon: Sparkles,
    category: "AI",
  },
  {
    name: "Hy-MT2-1.8B",
    icon: Brain,
    category: "Text",
  },
  {
    name: "Hy-MT2-30B-A3B",
    icon: Brain,
    category: "Text",
  },
  {
    name: "FLUX Video Upscale",
    icon: Video,
    category: "Video",
  },
  {
    name: "GLM Latest",
    icon: Cpu,
    category: "AI",
  },
  {
    name: "GLM 5.3",
    icon: Cpu,
    category: "AI",
  },
  {
    name: "LFM2.5-Embedding-350M (free)",
    icon: Zap,
    category: "Embedding",
  },
  {
    name: "Qwen3.8 27B",
    icon: MessageSquare,
    category: "Text",
  },
  {
    name: "Dots3-Note Preview (free)",
    icon: Image,
    category: "Vision",
  },
];

const accountItems = [
  {
    label: "Workspaces",
    icon: Users,
  },
  {
    label: "Profile",
    icon: CircleUserRound,
  },
  {
    label: "Activity",
    icon: BarChart3,
  },
  {
    label: "Logs",
    icon: FileText,
  },
  {
    label: "Credits",
    icon: KeyRound,
  },
  {
    label: "Labs",
    icon: Settings,
  },
  {
    label: "Preferences",
    icon: Settings,
  },
];
type TopNavbarProps = {
  onMenuClick: () => void;
  announcementVisible: boolean;
};
export function TopNavbar({
  onMenuClick,
  announcementVisible,
}: TopNavbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  const {
    settings,
    setMode,
    setColor,
    setFontFamily,
    setFontSize,
  } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
        setProfileOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
return (
  <>
   <header
  className={`
    fixed
    inset-x-0
    z-40
    h-[var(--top-nav-height)]
    border-b
    border-[var(--color-border)]
    bg-[var(--color-surface)]
    text-[var(--color-text)]
    transition-[top]
    duration-200
    ${
      announcementVisible
        ? "top-12"
        : "top-0"
    }
  `}
>
<div className="flex h-full w-full items-center">

  {/* LEFT SIDE */}
  <div className="flex shrink-0 items-center">
    {/* Mobile menu */}
    <button
      type="button"
      onClick={onMenuClick}
      aria-label="Open menu"
      className="
        flex
        h-full
        w-12
        shrink-0
        items-center
        justify-center
        lg:hidden
      "
    >
      <Menu size={20} strokeWidth={1.8} />
    </button>

    {/* Logo */}
    <div
      className="
        flex
        shrink-0
        items-center
        px-2
        lg:w-[220px]
        lg:px-8
      "
    >
      <div className="flex items-center gap-2.5">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 6.5C4.5 6.5 3 8.1 3 10.2C3 12.3 4.5 13.5 7 13.5H14.5C17 13.5 18.5 14.7 18.5 16.8C18.5 18.9 17 20.5 14.5 20.5H7"
            stroke="var(--color-primary)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          <path
            d="M14 6.5H21"
            stroke="var(--color-primary)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>

        <span
          className="
            hidden
            text-[20px]
            font-semibold
            tracking-[-0.04em]
            sm:block
          "
        >
          openrouter
        </span>
      </div>
    </div>
  </div>

  {/* RIGHT SIDE */}
{/* SEARCH - stays on left */}
<div className="ml-auto shrink-0 lg:ml-0">
  <button
    type="button"
    onClick={() => setSearchOpen(true)}
    className="
      flex
      h-10
      w-10
      shrink-0
      items-center
      justify-center
      rounded-lg
      transition
      hover:bg-[var(--color-surface-secondary)]

      md:mx-2
      md:h-8
      md:w-[270px]
      md:justify-between
      md:border
      md:border-[var(--color-border)]
      md:bg-[var(--color-background)]
      md:px-3
    "
  >
    <span className="flex items-center gap-2.5">
      <Search size={18} strokeWidth={1.8} />

      <span className="hidden md:block">
        Search
      </span>
    </span>

    <span className="hidden items-center gap-1.5 md:flex">
      <span className="flex h-6 min-w-8 items-center justify-center rounded-lg bg-[var(--color-surface-secondary)] px-2 text-[12px]">
        ⌘
      </span>

      <span className="flex h-6 min-w-8 items-center justify-center rounded-lg bg-[var(--color-surface-secondary)] px-2 text-[12px]">
        K
      </span>
    </span>
  </button>
</div>

{/* SPACER - pushes navigation and profile right */}
<div className="hidden min-w-0 flex-1 lg:block" />

{/* NAVIGATION - right side */}
<nav className="hidden shrink-0 items-center gap-6 px-5 lg:flex">
  {navItems.map((item) => (
    <button
      key={item}
      type="button"
      className="
        whitespace-nowrap
        cursor-pointer
        text-[var(--color-text-secondary)]
        transition-colors
        hover:text-[var(--color-primary)]
      "
    >
      {item}
    </button>
  ))}
</nav>

{/* PROFILE - right side */}
<div className="relative shrink-0 px-3.5">
  <button
    type="button"
    onClick={() => {
      setProfileOpen((current) => !current);
      setSearchOpen(false);
    }}
    className="
      flex
      shrink-0
      items-center
      gap-2
      rounded-md
      px-1
      py-1.5
      text-sm
      transition
      hover:bg-[var(--color-surface-secondary)]
    "
  >
    <div
      className="
        flex
        h-8
        w-8
        shrink-0
        items-center
        justify-center
        rounded-full
        bg-[var(--color-primary)]
        text-sm
        font-medium
        text-white
      "
    >
      R
    </div>

    <span
      className="
        whitespace-nowrap
        text-[var(--font-size-base)]
        font-normal
        text-[var(--color-text-secondary)]
      "
    >
      Personal
    </span>

    {profileOpen ? (
      <ChevronUp
        size={15}
        strokeWidth={1.8}
        className="shrink-0 text-[var(--color-text-secondary)]"
      />
    ) : (
      <ChevronDown
        size={15}
        strokeWidth={1.8}
        className="shrink-0 text-[var(--color-text-secondary)]"
      />
    )}
  </button>

  {profileOpen && (
    <ProfileDropdown
      mode={settings.mode}
      setMode={setMode}
      onPreferences={() => setPreferencesOpen(true)}
      navItemsm={navItemsm}
    />
  )}
</div>
  </div>
</header>

      {searchOpen && (
        <SearchModal onClose={() => setSearchOpen(false)} />
      )}
      {preferencesOpen && (
  <PreferencesModal
    open={preferencesOpen}
    onClose={() => setPreferencesOpen(false)}
    mode={settings.mode}
    color={settings.color}
    fontFamily={settings.fontFamily}
    fontSize={settings.fontSize}
    setMode={setMode}
    setColor={setColor}
    setFontFamily={setFontFamily}
    setFontSize={setFontSize}
  />
)}
    </>
  );
}

type ProfileDropdownProps = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  onPreferences: () => void;
   navItemsm: {
    label: string;
    icon: React.ElementType;
  }[];
};
function ProfileDropdown({
  mode,
  setMode,
  onPreferences,
  navItemsm,
}: ProfileDropdownProps) {
  
  return (
    <div
      className="
        absolute
        right-0
        top-12
        z-50
        w-64
        max-h-[calc(100vh-5rem)]
        overflow-y-auto
        rounded-lg
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-lg
      "
    >
      {/* Account header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--color-border)]
          bg-[var(--color-background)]
          px-3
          py-3
        "
      >
        <div className="flex items-center gap-2">
          <div
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              bg-[var(--color-primary)]
              text-xs
              font-medium
              text-white
            "
          >
            R
          </div>

          <span className="text-sm font-medium">
            Personal
          </span>
        </div>

        <button
          type="button"
          onClick={onPreferences}
          className="
            rounded-md
            p-1.5
            text-[var(--color-text-secondary)]
            hover:bg-[var(--color-background)]
            hover:text-[var(--color-primary)]
          "
        >
          <Settings size={15} />
        </button>
      </div>

      {/* ================= MOBILE NAVIGATION ================= */}
    <div
  className="
    lg:hidden
    border-b
    border-[var(--color-border)]
    p-1.5
  "
>
  {navItemsm.map((item) => {
    const Icon = item.icon;

    return (
      <button
        key={item.label}
        type="button"
        className="
          flex
          w-full
          cursor-pointer
          items-center
          gap-3
          rounded-md
          px-2.5
          py-2
          text-left
           text-base
          text-[var(--color-text-secondary)]
          transition
          hover:bg-[var(--color-background)]
          hover:text-[var(--color-primary)]
        "
      >
        <Icon size={18} />

        <span>{item.label}</span>
      </button>
    );
  })}
</div>

      {/* ================= ACCOUNT MENU ================= */}
      <div className="p-1.5">
        {accountItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (item.label === "Preferences") {
                  onPreferences();
                }
              }}
              className="
                flex
                w-full
                cursor-pointer
                items-center
                gap-3
                rounded-md
                px-2.5
                py-2
                text-left
                text-base
                text-[var(--color-text-secondary)]
                transition
                hover:bg-[var(--color-background)]
                hover:text-[var(--color-primary)]
              "
            >
              <Icon size={18} />

              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Sign out */}
        <button
          type="button"
          className="
            flex
            w-full
            cursor-pointer
            items-center
            gap-3
            rounded-md
            px-2.5
            py-2
            text-left
            text-sm
            text-red-500
            hover:bg-[var(--color-background)]
          "
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>

      {/* ================= THEME CONTROLS ================= */}
      <div
        className="
          border-t
          border-[var(--color-border)]
          p-2
          mb-5
        "
      >
        <div
          className="
            flex
            h-12
            w-full
            items-center
            gap-1
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-background)]
            p-0.5
          "
        >
          {/* Light */}
          <ThemeButton
            active={mode === "light"}
            onClick={() => setMode("light")}
          >
            <Sun size={17} strokeWidth={2} />
          </ThemeButton>

          {/* Dark */}
          <ThemeButton
            active={mode === "dark"}
            onClick={() => setMode("dark")}
          >
            <Moon size={17} strokeWidth={2} />
          </ThemeButton>

          {/* System */}
          <ThemeButton
            active={mode === "system"}
            onClick={() => setMode("system")}
          >
            <Monitor size={17} strokeWidth={2} />
          </ThemeButton>
        </div>
      </div>
    </div>
  );
}

type ThemeButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function ThemeButton({
  active,
  onClick,
  children,
}: ThemeButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        h-9
        flex-1
        items-center
        justify-center
        rounded-md
        transition
        ${
          active
            ? "bg-[var(--color-background)] text-[var(--color-primary)] shadow-sm"
            : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]"
        }
      `}
    >
      {children}
    </button>
  );
}

type SearchModalProps = {
  onClose: () => void;
};
function SearchModal({ onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

  const filteredItems = searchItems.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (item: (typeof searchItems)[number]) => {
    console.log("Selected:", item.name);

    // Later:
    // navigate to model page
    // or open model details
    // or select model

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-black/70
        p-4
      "
      onClick={onClose}
    >
      <div
        className="
          flex
          w-full
          max-w-[580px]
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-2xl
        "
        onClick={(event) => event.stopPropagation()}
      >
        {/* Search Header */}
        <div
          className="
            flex
            h-12
            shrink-0
            items-center
            gap-3
            border-b
            border-[var(--color-border)]
            px-3
          "
        >
          <Search
            size={17}
            strokeWidth={1.8}
            className="
              shrink-0
              text-[var(--color-text-secondary)]
            "
          />

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search..."
            className="
              min-w-0
              flex-1
              bg-transparent
              text-[var(--font-size-sm)]
              font-normal
              text-[var(--color-text)]
              outline-none
              placeholder:text-[var(--color-text-secondary)]
            "
          />

          <button
            type="button"
            onClick={onClose}
            className="
              shrink-0
              rounded-md
              bg-[var(--color-background)]
              px-2
              py-1
              text-[var(--font-size-xs)]
              font-medium
              text-[var(--color-text-secondary)]
              transition
              hover:text-[var(--color-text)]
            "
          >
            esc
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[420px] overflow-y-auto p-1.5">

          {/* Section */}
          <div
            className="
              px-2.5
              py-2
              text-[var(--font-size-xs)]
              font-medium
              text-[var(--color-text-secondary)]
            "
          >
            August 2026
          </div>

          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <button
                  key={`${item.name}-${index}`}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className="
                    group
                    flex
                    h-10
                    w-full
                    items-center
                    gap-3
                    rounded-md
                    px-2.5
                    text-left
                    transition-colors
                    hover:bg-[var(--color-background)]
                  "
                >
                  {/* Model Icon */}
                  <span
                    className="
                      flex
                      h-6
                      w-6
                      shrink-0
                      items-center
                      justify-center
                      rounded-md
                      bg-[var(--color-background)]
                      text-[var(--color-text-secondary)]
                    "
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.8}
                    />
                  </span>

                  {/* Model Name */}
                  <span
                    className="
                      min-w-0
                      flex-1
                      truncate
                      text-[var(--font-size-sm)]
                      font-normal
                      text-[var(--color-text)]
                    "
                  >
                    {item.name}
                  </span>

                  {/* Category */}
                  <span
                    className="
                      hidden
                      text-[var(--font-size-xs)]
                      text-[var(--color-text-secondary)]
                      sm:block
                    "
                  >
                    {item.category}
                  </span>

                  {/* Favorite */}
                  <span
                    className="
                      shrink-0
                      px-1
                      text-[18px]
                      leading-none
                      text-[var(--color-text-secondary)]
                      opacity-0
                      transition-opacity
                      group-hover:opacity-100
                    "
                  >
                    ☆
                  </span>
                </button>
              );
            })
          ) : (
            <div
              className="
                px-3
                py-10
                text-center
                text-[var(--font-size-sm)]
                text-[var(--color-text-secondary)]
              "
            >
              No results found
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          className="
            flex
            h-9
            shrink-0
            items-center
            justify-between
            border-t
            border-[var(--color-border)]
            px-3
            text-[var(--font-size-xs)]
            text-[var(--color-text-secondary)]
          "
        >
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5">
              <span className="flex items-center gap-0.5">
                <kbd
                  className="
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded
                    bg-[var(--color-background)]
                    px-1
                    text-[11px]
                  "
                >
                  ↑
                </kbd>

                <kbd
                  className="
                    flex
                    h-5
                    min-w-5
                    items-center
                    justify-center
                    rounded
                    bg-[var(--color-background)]
                    px-1
                    text-[11px]
                  "
                >
                  ↓
                </kbd>
              </span>

              <span>Navigate</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <kbd
              className="
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded
                bg-[var(--color-background)]
                px-1
                text-[11px]
              "
            >
              ↵
            </kbd>

            <span>Select</span>
          </div>
        </div>
      </div>
    </div>
  );
}