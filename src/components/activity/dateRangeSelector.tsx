import { useEffect, useRef, useState } from "react";
import {
  CalendarDays,
  Check,
  ChevronDown,
} from "lucide-react";

const primaryRanges = [
  { label: "Past 15 Minutes", shortcut: "15m" },
  { label: "Past 30 Minutes", shortcut: "30m" },
  { label: "Past 1 Hour", shortcut: "1h" },
  { label: "Past 3 Hours", shortcut: "3h" },
  { label: "Past 24 Hours", shortcut: "1d" },
  { label: "Past 48 Hours", shortcut: "2d" },
  { label: "Past 1 Week", shortcut: "1w" },
  { label: "Past 1 Month", shortcut: "1mo" },
  { label: "Past 1 Year", shortcut: "1y" },
];

const secondaryRanges = [
  { label: "Today", shortcut: "11h" },
  { label: "Yesterday", shortcut: "24h" },
  { label: "This Week", shortcut: "11h" },
  { label: "Prev Week", shortcut: "7d" },
  { label: "This Month", shortcut: "23d" },
  { label: "Prev Month", shortcut: "31d" },
  { label: "This Year", shortcut: "8mo" },
  { label: "Prev Year", shortcut: "1y" },
];

const getRangeDates = (label: string) => {
  const end = new Date();
  const start = new Date();

  switch (label) {
    case "Past 15 Minutes":
      start.setMinutes(start.getMinutes() - 15);
      break;

    case "Past 30 Minutes":
      start.setMinutes(start.getMinutes() - 30);
      break;

    case "Past 1 Hour":
      start.setHours(start.getHours() - 1);
      break;

    case "Past 3 Hours":
      start.setHours(start.getHours() - 3);
      break;

    case "Past 24 Hours":
      start.setDate(start.getDate() - 1);
      break;

    case "Past 48 Hours":
      start.setDate(start.getDate() - 2);
      break;

    case "Past 1 Week":
      start.setDate(start.getDate() - 7);
      break;

    case "Past 1 Month":
      start.setMonth(start.getMonth() - 1);
      break;

    case "Past 1 Year":
      start.setFullYear(start.getFullYear() - 1);
      break;

    case "Today":
      start.setHours(0, 0, 0, 0);
      break;

    case "Yesterday":
      start.setDate(start.getDate() - 1);
      start.setHours(0, 0, 0, 0);
      end.setDate(end.getDate() - 1);
      end.setHours(23, 59, 59, 999);
      break;

    case "This Week":
      start.setDate(start.getDate() - start.getDay());
      start.setHours(0, 0, 0, 0);
      break;

    case "Prev Week": {
      const day = start.getDay();

      start.setDate(start.getDate() - day - 7);
      start.setHours(0, 0, 0, 0);

      end.setDate(end.getDate() - end.getDay() - 1);
      end.setHours(23, 59, 59, 999);
      break;
    }

    case "This Month":
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      break;

    case "Prev Month":
      start.setMonth(start.getMonth() - 1, 1);
      start.setHours(0, 0, 0, 0);

      end.setDate(0);
      end.setHours(23, 59, 59, 999);
      break;

    case "This Year":
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      break;

    case "Prev Year":
      start.setFullYear(start.getFullYear() - 1, 0, 1);
      start.setHours(0, 0, 0, 0);

      end.setFullYear(end.getFullYear() - 1, 11, 31);
      end.setHours(23, 59, 59, 999);
      break;
  }

  return { start, end };
};

const formatDateRange = (label: string) => {
  const { start, end } = getRangeDates(label);

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  });

  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${dateFormatter.format(start)}, ${timeFormatter.format(
    start
  )} – ${dateFormatter.format(end)}, ${timeFormatter.format(end)}`;
};

export function DateRangeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] =
    useState("Past 1 Month");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedShortcut =
    [...primaryRanges, ...secondaryRanges].find(
      (range) => range.label === selectedRange
    )?.shortcut ?? "1mo";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSelect = (range: string) => {
    setSelectedRange(range);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger */}
     <button
  type="button"
  onClick={() =>
    setIsOpen((value) => !value)
  }
  className="
    flex
    h-9
    w-full
    min-w-[320px]
    sm:w-[400px]
    md:w-[450px]
    cursor-pointer
    items-center
    gap-2
    rounded-md
    border
    border-[var(--color-border)]
    bg-[var(--color-surface)]
    px-3
    text-left
    text-[length:var(--font-size-base)]
    text-[var(--color-text)]
    transition-colors
    hover:bg-[var(--color-surface-secondary)]
  "
>
        {/* Shortcut badge */}
      <span
  className="
    shrink-0
    rounded
    border
    border-[var(--color-border)]
    px-1
    py-0.5
    text-[10px]
    sm:text-[11px]
    leading-none
    text-[var(--color-text-secondary)]
  "
>
  {selectedShortcut}
</span>

    <span
  className="
    min-w-0
    flex-1
    whitespace-nowrap
    text-sm
    sm:text-[length:var(--font-size-base)]
  "
>
  {formatDateRange(selectedRange)}
</span>

        <ChevronDown
          size={16}
          className={`
            shrink-0
            text-[var(--color-text-secondary)]
            transition-transform
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="
            absolute
           
            md:right-0
            top-full
            z-50
            mt-1
           w-[320px]
sm:w-[355px]
            overflow-hidden
            rounded-md
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-1
            shadow-lg
          "
        >
          {/* Main ranges */}
          <div className="space-y-0.5">
            {primaryRanges.map((range) => {
              const isSelected =
                selectedRange === range.label;

              return (
                <button
                  key={range.label}
                  type="button"
                  onClick={() =>
                    handleSelect(range.label)
                  }
                  className={`
                    flex
                    h-9
                    w-full
                    cursor-pointer
                    items-center
                    gap-2
                    rounded-md
                    px-2
                    text-left
                    text-[length:var(--font-size-base)]
                    transition-colors
                  ${
    isSelected
      ? `
        bg-[var(--color-sidebar-active)]
        text-[var(--color-primary)]
      `
      : `
        text-[var(--color-text)]
        hover:bg-[var(--color-surface-secondary)]
      `
  }
                  `}
                >
                  {/* Small shortcut badge */}
                  <span
                    className="
                      flex
                      min-w-8
                      items-center
                      justify-center
                      rounded
                      border
                      border-[var(--color-border)]
                      px-1
                      py-0.5
                      text-[11px]
                      leading-none
                      text-[var(--color-text-secondary)]
                    "
                  >
                    {range.shortcut}
                  </span>

                  <span className="flex-1">
                    {range.label}
                  </span>

                  {isSelected && (
                    <Check
                      size={16}
                      className="text-[var(--color-primary)]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-1 border-t border-[var(--color-border)]" />

          {/* Secondary ranges */}
          <div className="grid grid-cols-2 gap-0.5">
            {secondaryRanges.map((range) => (
              <button
                key={range.label}
                type="button"
                onClick={() =>
                  handleSelect(range.label)
                }
                className="
                  flex
                  h-9
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-md
                  px-2
                  text-left
                  text-[length:var(--font-size-base)]
                  text-[var(--color-text)]
                  transition-colors
                  hover:bg-[var(--color-primary-surface)]
                  hover:text-[var(--color-primary)]
                "
              >
                <span
                  className="
                    flex
                    min-w-8
                    items-center
                    justify-center
                    rounded
                    border
                    border-[var(--color-border)]
                    px-1
                    py-0.5
                    text-[11px]
                    leading-none
                    text-[var(--color-text-secondary)]
                  "
                >
                  {range.shortcut}
                </span>

                <span className="truncate">
                  {range.label}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="my-1 border-t border-[var(--color-border)]" />

          {/* Custom range */}
          <button
            type="button"
            onClick={() => {
              console.log("Open custom range");
            }}
            className="
              flex
              h-9
              w-full
              cursor-pointer
              items-center
              gap-3
              rounded-md
              px-2
              text-[length:var(--font-size-base)]
              text-[var(--color-text)]
              transition-colors
              hover:bg-[var(--color-primary-surface)]
              hover:text-[var(--color-primary)]
            "
          >
            <CalendarDays size={16} />

            <span>Custom range...</span>
          </button>
        </div>
      )}
    </div>
  );
}