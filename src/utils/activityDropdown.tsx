import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useEffect, useRef, } from "react";
import {
  MoreVertical,
  Download,
  FileText,
  Bookmark,
  ChevronRight,
  BarChart3,
  LineChart,
  ChartNoAxesCombined,
} from "lucide-react";
type ActivityDropdownProps = {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;

  // Controlled state
  isOpen: boolean;
  onToggle: () => void;

  // Styling
  className?: string;
  showPlus?: boolean;
  width?: string;
  showSelectedDot?: boolean;
};

export function ActivityDropdown({
  value,
  options,
  placeholder,
  onChange,

  isOpen,
  onToggle,

  className = "",
  showPlus = false,
  width = "220px",
  showSelectedDot = true,
}: ActivityDropdownProps) {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (item: string) => {
    onChange(item);
    setSearch("");
  };

  return (
    <div className={`relative h-full ${className}`}>
      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => {
          onToggle();

          // Clear search when closing
          if (isOpen) {
            setSearch("");
          }
        }}
        className="
          flex h-full items-center gap-2
          px-3
          font-medium
          text-[length:var(--font-size-base)]
          text-[var(--color-text)]
          hover:bg-[var(--color-surface-secondary)]
        "
      >
        {showPlus && (
          <span className="text-[length:var(--font-size-base)] leading-none">
            +
          </span>
        )}

        <span className="whitespace-nowrap">
          {value}
        </span>

        <ChevronDown
          size={15}
          className={`
            transition-transform duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          style={{ width }}
          className="
            absolute left-0 top-[calc(100%+4px)] z-30
            mt-2
            overflow-hidden
            rounded-lg
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          {/* SEARCH */}
          <div
            className="
              flex h-10 items-center gap-2
              border-b border-[var(--color-border)]
              px-3
            "
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder}
              autoFocus
              className="
                min-w-0 flex-1
                bg-transparent
                text-[length:var(--font-size-base)]
                text-[var(--color-text)]
                outline-none
                placeholder:text-[var(--color-text-secondary)]
              "
            />

            <Search
              size={15}
              className="
                shrink-0
                text-[var(--color-text-secondary)]
              "
            />
          </div>

          {/* OPTIONS */}
          <div className="max-h-[320px] overflow-y-auto py-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelect(item)}
                  className={`
                    flex w-full items-center justify-between
                    px-3 py-2
                    text-left
                    text-[length:var(--font-size-base)]
                    hover:bg-[var(--color-surface-secondary)]
                    ${
                      value === item
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-text)]"
                    }
                  `}
                >
                  <span className="truncate">
                    {item}
                  </span>

                  {value === item && showSelectedDot && (
                    <span
                      className="
                        ml-3
                        h-2 w-2
                        shrink-0
                        rounded-full
                        bg-[var(--color-primary)]
                      "
                    />
                  )}
                </button>
              ))
            ) : (
              <div
                className="
                  px-3 py-3
                  text-[length:var(--font-size-sm)]
                  text-[var(--color-text-secondary)]
                "
              >
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}