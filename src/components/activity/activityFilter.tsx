import { useEffect, useRef, useState } from "react";
import { ChevronRight, ListFilter } from "lucide-react";

const filterOptions = ["Model", "Router", "API Key", "App", "Region"];

export function ActivityFilters() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Filter Trigger */}
      <button
        type="button"
        aria-label="Activity filters"
        onClick={() => setIsOpen((value) => !value)}
        className="
          flex
          h-9
          w-9
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          text-[var(--color-text)]
          transition-colors
          hover:bg-[var(--color-primary)]
          hover:text-white
        "
      >
        <ListFilter size={16} strokeWidth={1.7} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute
            right-0
            top-full
            z-50
            mt-1
            w-[225px]
            overflow-hidden
            rounded-md
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          {/* Search */}
          <div className="border-b border-[var(--color-border)]">
            <input
              type="text"
              placeholder="Search filters..."
              className="
                h-8
                w-full
                bg-transparent
                px-3
                text-[length:var(--font-size-base)]
                text-[var(--color-text)]
                outline-none
                placeholder:text-[var(--color-text-secondary)]
              "
            />
          </div>

          {/* Filter Options */}
          <div className="p-1">
            {filterOptions.map((option, index) => (
              <button
                key={option}
                type="button"
                className={`
                  flex
                  h-9
                  w-full
                  cursor-pointer
                  items-center
                  justify-between
                  rounded-md
                  px-2.5
                  text-left
                  text-[length:var(--font-size-base)]
                  transition-colors
                  hover:bg-[var(--color-primary)]
                  hover:text-white
                  ${
                    index === 0
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)]"
                  }
                `}
              >
                <span>{option}</span>

                <ChevronRight size={16} strokeWidth={1.7} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}