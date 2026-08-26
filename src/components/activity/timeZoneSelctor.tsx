import { useEffect, useRef, useState } from "react";
import { Globe2 } from "lucide-react";

const timezones = ["GMT+5:30", "UTC"];

export function TimezoneSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("GMT+5:30");

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

  const handleTimezoneChange = (timezone: string) => {
    setSelectedTimezone(timezone);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
     <button
  type="button"
  onClick={() => setIsOpen((value) => !value)}
  className="
    flex
    h-9
    cursor-pointer
    items-center
    gap-2
    rounded-md
    border
    border-[var(--color-border)]
    bg-[var(--color-surface)]
    px-3
    text-[length:var(--font-size-base)]
    text-[var(--color-text)]
    transition-colors
    hover:border-[var(--color-primary)]
    hover:text-[var(--color-primary)]
  "
>
     <Globe2
  size={16}
  className="
    text-[var(--color-text-secondary)]
    transition-colors
    group-hover:text-[var(--color-primary)]
  "
/>

        <span>{selectedTimezone}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
         absolute
top-full
left-0
md:left-auto
md:right-0
            z-50
            mt-1
            w-[215px]
            overflow-hidden
            rounded-md
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          {/* Heading */}
          <div
            className="
              px-3
              pt-3
              pb-2
              text-[length:var(--font-size-sm)]
              text-[var(--color-text-secondary)]
            "
          >
            Timezone
          </div>

          {/* Options */}
      {/* Options */}
<div className="px-2 pb-2">
  {timezones.map((timezone) => {
    const isSelected = selectedTimezone === timezone;

    return (
      <button
        key={timezone}
        type="button"
        onClick={() => handleTimezoneChange(timezone)}
        className="
          flex
          h-9
          w-full
          cursor-pointer
          items-center
          gap-3
          rounded-md
          px-2
          text-left
          text-[length:var(--font-size-base)]
          text-[var(--color-text)]
          transition-colors
          hover:bg-[var(--color-primary)]
          hover:text-white
        "
      >
        <span
          className={`
            h-1.5
            cursor-pointer
            w-1.5
            rounded-full
            ${
              isSelected
                ? "bg-[var(--color-text)]"
                : "bg-transparent"
            }
          `}
        />

        <span>{timezone}</span>
      </button>
    );
  })}
</div>

          {/* Description */}
          <div
            className="
              border-t
              border-[var(--color-border)]
              px-3
              py-3
              text-[length:var(--font-size-sm)]
              leading-6
              text-[var(--color-text-secondary)]
            "
          >
            Ranges starting over 30 days ago support UTC calendar days; only
            time labels use GMT+5:30.
          </div>
        </div>
      )}
    </div>
  );
}