import { ActivityFilters } from "./activityFilter";
import { DateRangeSelector } from "./dateRangeSelector";
import { TimezoneSelector } from "./timeZoneSelctor";

export function ActivityHeader() {
  return (
    <div
      className="
        flex
        flex-col
        gap-4

        md:flex-row
        md:items-start
        md:justify-between
      "
    >
      {/* Left side */}
      <div className="min-w-0">
        <h1
          className="
            text-[length:var(--font-size-2xl)]
            font-semibold
            leading-tight
            text-[var(--color-text)]
          "
        >
          Activity
        </h1>

        <p
          className="
            mt-1
            text-[length:var(--font-size-base)]
            leading-relaxed
            text-[var(--color-text-secondary)]
          "
        >
          Your usage across models on OpenRouter
        </p>
      </div>

      {/* Right side controls */}
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2

          md:flex-nowrap
          md:flex-none
        "
      >
        {/* First row on mobile */}
        <TimezoneSelector />

        <ActivityFilters />

        {/* Second row on mobile */}
        <div className="w-full md:w-auto">
          <DateRangeSelector />
        </div>
      </div>
    </div>
  );
}