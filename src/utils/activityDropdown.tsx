import { Search, ChevronDown } from "lucide-react";
import { useState } from "react";
type ActivityDropdownProps = {
  value: string;
  options: string[];
  placeholder: string;
  onChange: (value: string) => void;

  isOpen: boolean;
  onToggle: () => void;

  className?: string;
  triggerClassName?: string;

  showPlus?: boolean;
  width?: string;
  showSelectedDot?: boolean;
  dropdownAlign?: "left" | "right";
};

export function ActivityDropdown({
  value,
  options,
  placeholder,
  onChange,
  isOpen,
  onToggle,
  className = "",
  triggerClassName = "",
  showPlus = false,
  width,
  showSelectedDot = true,
  dropdownAlign = "left",
}: ActivityDropdownProps) {
  const [search, setSearch] = useState("");

  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (item: string) => {
    onChange(item);
    setSearch("");
  };

  return (
   <div
  className={`
    relative
    h-full
    shrink
    ${className}
  `}
>
      {/* TRIGGER */}
     <button
  type="button"
  onClick={() => {
    onToggle();

    if (isOpen) {
      setSearch("");
    }
  }}
  className={`
    flex
    h-full
    min-w-0
    items-center
    gap-1
    px-2
    font-medium
    text-[length:var(--font-size-base)]
    text-[var(--color-text)]
    hover:bg-[var(--color-surface-secondary)]
    sm:gap-1.5
    sm:px-3
    ${triggerClassName}
  `}
>
        {showPlus && (
          <span
            className="
              text-[length:var(--font-size-base)]
              leading-none
            "
          >
            +
          </span>
        )}

       <span className="truncate">
  {value}
</span>

        <ChevronDown
          size={15}
          className={`
            shrink-0
            transition-transform
            duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* DROPDOWN */}
      {isOpen && (
        <div
          style={
            width
              ? { width }
              : undefined
          }
    className={`
  absolute
  top-[calc(100%+4px)]
  z-30
  mt-2
  min-w-full
  max-w-[calc(100vw-2rem)]
  overflow-hidden
  rounded-lg
  border
  border-[var(--color-border)]
  bg-[var(--color-surface)]
  shadow-lg
  ${dropdownAlign === "right" ? "right-0" : "left-0"}
`}
        >
          {/* SEARCH */}
          <div
            className="
              flex
              h-10
              min-w-[180px]
              items-center
              gap-2
              border-b
              border-[var(--color-border)]
              px-3
            "
          >
            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder={placeholder}
              autoFocus
              className="
                min-w-0
                flex-1
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
          <div
            className="
              max-h-[320px]
              overflow-y-auto
              py-1
            "
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    handleSelect(item)
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    gap-3
                    px-3
                    py-2
                    text-left
                    text-[length:var(--font-size-base)]
                    transition-colors
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

                  {value === item &&
                    showSelectedDot && (
                      <span
                        className="
                          h-2
                          w-2
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
                  px-3
                  py-3
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