// components/Sidebar.tsx

import { useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  Plus,
  
} from "lucide-react";
import { mainItems,accountItems } from "../utils/filterOptions";
type SidebarProps = {
  activeItem?: string;
  onNavigate?: (item: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  announcementVisible?: boolean;
};

export function Sidebar({
  activeItem = "Activity",
  onNavigate,
  isOpen = false,
  onClose,
  announcementVisible = false,
}: SidebarProps) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const handleNavigate = (item: string) => {
    onNavigate?.(item);
    onClose?.();
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-30
            bg-black/40
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      <aside
        className={`
          fixed
          left-0
          bottom-0
          z-40
          flex
          w-[300px]
          flex-col
          border-r
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          text-[var(--color-text)]
          transition-[top,transform]
          duration-300
          ease-in-out
          md:w-[250px]
          ${
            announcementVisible
              ? "top-[calc(var(--top-nav-height)+3rem)]"
              : "top-[var(--top-nav-height)]"
          }
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
      {/* Workspace */}
   <div className="relative px-4 pt-3 pb-2">
  <div
    className="
      flex
      h-10
      w-full
      items-center
      justify-between
      rounded-md
      border
      border-[var(--color-border)]
      bg-[var(--color-background)]
      px-3
    "
  >
    {/* Workspace name */}
    <button
      type="button"
      onClick={() => setWorkspaceOpen((value) => !value)}
      className="
        min-w-0
         font-normal
        flex-1
        cursor-pointer
        truncate
        text-left
        text-[var(--font-size-sm)]
        text-[var(--color-text)]
      "
    >
      Default Workspace
    </button>

    {/* Vertical workspace arrows */}
    <div className="flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          // previous workspace
        }}
        className="
          flex
          h-3
          w-4
          cursor-pointer
          items-center
          justify-center
          rounded
          text-[var(--color-text-secondary)]
          transition-colors
          hover:text-[var(--color-text)]
        "
      >
        <ChevronUp size={11} strokeWidth={1.8} />
      </button>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          // next workspace
        }}
        className="
          flex
          h-3
          w-4
          cursor-pointer
          items-center
          justify-center
          rounded
          text-[var(--color-text-secondary)]
          transition-colors
          hover:text-[var(--color-text)]
        "
      >
        <ChevronDown size={11} strokeWidth={1.8} />
      </button>
    </div>
  </div>

  {/* Workspace dropdown */}
  {workspaceOpen && (
    <div
      className="
        absolute
        left-3
        right-3
        top-[58px]
        z-50
        overflow-hidden
        rounded-md
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-lg
      "
    >
      <button
        type="button"
        className="
          flex
          w-full
          cursor-pointer
          items-center
          justify-between
          px-3
          py-2.5
          text-left
          text-[var(--font-size-sm)]
          text-[var(--color-text)]
          transition-colors
          hover:bg-[var(--color-background)]
        "
      >
        <span>Default Workspace</span>

        <span className="text-[var(--color-primary)]">
          ✓
        </span>
      </button>

      <button
        type="button"
        className="
          flex
          w-full
          cursor-pointer
          items-center
          justify-between
          border-t
          border-[var(--color-border)]
          px-3
          py-2.5
          text-left
          text-[var(--font-size-sm)]
          text-[var(--color-text-secondary)]
          transition-colors
          hover:bg-[var(--color-background)]
          hover:text-[var(--color-text)]
        "
      >
        <span>Create Workspace</span>

        <Plus size={16} />
      </button>
    </div>
  )}
</div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Main */}
        <nav className="space-y-0.5">
          {mainItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem === item.label;

            return (
              <SidebarItem
                key={item.label}
                label={item.label}
                icon={<Icon size={16} strokeWidth={1.7} />}
                active={active}
                badge={item.badge}
                onClick={() => handleNavigate(item.label)}
              />
            );
          })}
        </nav>

        {/* Account heading */}
        <div
  className="
    mb-1
    mt-7
    px-2
    text-[length:var(--font-size-sm)]
    font-medium
    uppercase
    tracking-wide
    text-[var(--color-text-secondary)]
  "
>
  Account
</div>

        {/* Account */}
        <nav className="space-y-0.5">
          {accountItems.map((item) => {
            const Icon = item.icon;
            const active = activeItem === item.label;

            return (
              <SidebarItem
                key={item.label}
                label={item.label}
                icon={<Icon size={17} strokeWidth={1.8} />}
                active={active}
                onClick={() => handleNavigate(item.label)}
              />
            );
          })}
        </nav>
      </div>
    </aside>
    </>
  );
}

interface SidebarItemProps {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string;
  onClick?: () => void;
}
function SidebarItem({
  label,
  icon,
  active = false,
  badge,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        flex
        h-10
        w-full
        cursor-pointer
        items-center
        gap-3
        rounded-md
        px-2
        text-left
        text-[length:var(--font-size-base)]
        font-normal
        transition-colors

        ${
          active
            ? `
               bg-[var(--color-sidebar-active)]
              text-[var(--color-primary)]
            `
            : `
              text-[var(--color-text-secondary)]
              hover:bg-[var(--color-surface-secondary)]
              hover:text-[var(--color-primary)]
            `
        }
      `}
    >
      <span
        className={`
          flex
          w-5
          shrink-0
          items-center
          justify-center
          transition-colors

          ${
            active
              ? "text-[var(--color-primary)]"
              : `
                text-[var(--color-text-secondary)]
                group-hover:text-[var(--color-primary)]
              `
          }
        `}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1 truncate">
        {label}
      </span>

      {badge && (
        <span
          className="
            shrink-0
            rounded-full
            border
            border-[var(--color-border)]
            bg-[var(--color-background)]
            px-1.5
            py-0.5
            text-[length:var(--font-size-xs)]
            font-normal
            leading-none
            text-[var(--color-primary)]
          "
        >
          {badge}
        </span>
      )}
    </button>
  );
}