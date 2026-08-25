import { ActivityFilters } from "./activityFilter";
import { DateRangeSelector } from "./dateRangeSelector";
import { TimezoneSelector } from "./timeZoneSelctor";

export function ActivityHeader() {
  return (
    <div className="flex items-start justify-between gap-6">
      {/* Left side */}
      <div>
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
            text-[var(--color-text-secondary)]
          "
        >
          Your usage across models on OpenRouter
        </p>
      </div>

      {/* Right side controls */}
      <div className="flex items-center gap-2">
        <TimezoneSelector />

        <ActivityFilters />

        <DateRangeSelector />
      </div>
    </div>
  );
}