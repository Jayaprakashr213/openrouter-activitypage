import { useState } from "react";
import { PanelRight,PanelBottom } from "lucide-react";
type ChartData = {
  date: string;
  byok: number;
  openrouterSpend: number;
};

const chartData: ChartData[] = [
  { date: "25 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "26 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "27 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "28 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "29 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "30 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "31 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "1 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "2 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "3 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "4 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "5 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "6 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "7 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "8 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "9 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "11 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "13 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "15 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "17 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "19 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "21 Aug 2026", byok: 0, openrouterSpend: 0 },
  { date: "23 Aug 2026", byok: 0, openrouterSpend: 0 },
];

const shortDate = (date: string) => {
  return date.replace(" 2026", "");
};

const getDatePosition = (
  date: string,
  startDate: Date,
  totalDays: number,
) => {
  const currentDate = new Date(date).getTime();
  const start = startDate.getTime();

  const daysFromStart =
    (currentDate - start) /
    (1000 * 60 * 60 * 24);

  return (daysFromStart / totalDays) * 100;
};

export function UsageTypeChart() {
  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);
const [isLegendOnRight, setIsLegendOnRight] =
  useState(false);
 
  const [activeSeries, setActiveSeries] = useState<
    "byok" | "openrouterSpend" | null
  >(null);

  const dates = chartData.map(
    (item) => new Date(item.date),
  );

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  const totalDays =
    (endDate.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24);

  const toggleSeries = (
    series: "byok" | "openrouterSpend",
  ) => {
    setActiveSeries((current) =>
      current === series ? null : series,
    );
  };

  const isActive = (
    series: "byok" | "openrouterSpend",
  ) => {
    return (
      activeSeries === null ||
      activeSeries === series
    );
  };

  // Only these dates have permanent grid lines and labels.
  // All other dates are still available on hover.
const bottomLegendDateIndexes = [
  0,
  2,
  4,
  6,
  8,
  10,
  12,
  14,
  16,
  18,
  20,
  22,
];

const rightLegendDateIndexes = [
  0,
  3,
  6,
  9,
  12,
  15,
  18,
  21,
];

const visibleDateIndexes = isLegendOnRight
  ? rightLegendDateIndexes
  : bottomLegendDateIndexes;

  return (
    <div
      className="
        min-w-0
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3
      "
    >
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="
            text-[length:var(--font-size-lg)]
            font-medium
            text-[var(--color-text)]
          "
        >
          Usage type
        </h2>

        <button
          type="button"
          className="
            text-[length:var(--font-size-sm)]
            text-[var(--color-text)]
            underline
            underline-offset-4
          "
        >
          Explore ›
        </button>
      </div>

      {/* CHART */}
    {/* CHART + RIGHT LEGEND */}

  {/* CHART */}
<div className="flex min-w-0">
  {/* CHART */}
  <div
    className="
      relative
      h-[275px]
      min-w-0
      flex-1
    "
    onMouseLeave={() => setHoveredIndex(null)}
  >
    {/* CHART BORDER */}
    <div
      className="
        absolute
        inset-x-0
        top-0
        h-[240px]
        border
        border-dashed
        border-[var(--color-border)]
      "
    />

    {/* ONLY VISIBLE DATE GRID LINES */}
    {visibleDateIndexes.map((index) => {
      const item = chartData[index];

      const left = getDatePosition(
        item.date,
        startDate,
        totalDays,
      );

      return (
        <div
          key={item.date}
          className="
            absolute
            top-0
            h-[240px]
            w-px
            bg-[var(--color-border)]
          "
          style={{
            left: `${left}%`,
          }}
        />
      );
    })}

    {/* HOVER AREAS */}
    {chartData.map((item, index) => {
      const left = getDatePosition(
        item.date,
        startDate,
        totalDays,
      );

      return (
        <div
          key={item.date}
          className="
            absolute
            top-0
            z-20
            h-[240px]
            -translate-x-1/2
            cursor-pointer
          "
          style={{
            left: `${left}%`,
            width: `${100 / chartData.length}%`,
          }}
          onMouseEnter={() =>
            setHoveredIndex(index)
          }
        />
      );
    })}

    {/* HOVER INDICATOR */}
    {hoveredIndex !== null &&
      (() => {
        const item = chartData[hoveredIndex];

        const left = getDatePosition(
          item.date,
          startDate,
          totalDays,
        );

        return (
          <>
            <div
              className="
                absolute
                top-0
                z-10
                h-[240px]
                w-px
                bg-[var(--color-border)]
              "
              style={{
                left: `${left}%`,
              }}
            />

            <div
              className="
                absolute
                top-[110px]
                z-30
                -translate-x-1/2
                whitespace-nowrap
                rounded-md
                bg-[#1f2933]
                px-2
                py-1
                text-xs
                font-medium
                text-white
              "
              style={{
                left: `${left}%`,
              }}
            >
              {item.date}
            </div>

            <div
              className="
                absolute
                top-[145px]
                z-10
                h-2
                w-[35%]
                -translate-x-1/2
                rounded-full
                border
                border-[var(--color-border)]
                bg-white
                shadow-sm
              "
              style={{
                left: `${left}%`,
              }}
            />
          </>
        );
      })()}

    {/* DATE LABELS */}
    <div
      className="
        absolute
        left-0
        right-0
        top-[250px]
      "
    >
      {visibleDateIndexes.map((index) => {
        const item = chartData[index];

        const left = getDatePosition(
          item.date,
          startDate,
          totalDays,
        );

        const isFirst =
          index === visibleDateIndexes[0];

        const isLast =
          index ===
          visibleDateIndexes[
            visibleDateIndexes.length - 1
          ];

        return (
          <div
            key={item.date}
            className="
              absolute
              whitespace-nowrap
              text-[11px]
              text-[var(--color-text-muted)]
            "
            style={{
              left: `${left}%`,
              transform: isFirst
                ? "translateX(-10%)"
                : isLast
                  ? "translateX(-100%)"
                  : "translateX(-50%)",
            }}
          >
            {shortDate(item.date)}
          </div>
        );
      })}
    </div>
  </div>

  {/* RIGHT LEGEND */}
  {isLegendOnRight && (
    <div
      className="
        relative
        ml-4
        flex
        h-[275px]
        w-[190px]
        shrink-0
        flex-col
        border-l
        border-[var(--color-border)]
        pl-4
        pt-1
      "
    >
      {/* LEGEND TITLE */}
      <span
        className="
          mb-3
          text-[11px]
          font-medium
          tracking-wider
          text-[var(--color-text-muted)]
        "
      >
        LEGEND
      </span>

      {/* LEGEND ITEMS */}
      <div
        className="
          flex
          flex-col
          gap-4
        "
      >
        <LegendItem
          color="#F2B233"
          label="BYOK"
          isActive={isActive("byok")}
          onClick={() =>
            toggleSeries("byok")
          }
        />

        <LegendItem
          color="#8B6BD9"
          label="OpenRouter Spend"
          isActive={isActive(
            "openrouterSpend",
          )}
          onClick={() =>
            toggleSeries(
              "openrouterSpend",
            )
          }
        />
      </div>

      {/* MOVE LEGEND TO BOTTOM */}
      <button
        type="button"
        onClick={() =>
          setIsLegendOnRight(false)
        }
        className="
          absolute
          top-0
          right-0
          flex
          items-center
          justify-center
          cursor-pointer
          text-[var(--color-text-muted)]
        "
        aria-label="Move legend to bottom"
      >
        <PanelBottom size={16} />
      </button>
    </div>
  )}
</div>

{/* BOTTOM LEGEND */}
{!isLegendOnRight && (
  <div
    className="
      mt-2
      flex
      items-center
      gap-6
      border-t
      border-[var(--color-border)]
      pt-4
    "
  >
    <LegendItem
      color="#F2B233"
      label="BYOK"
      isActive={isActive("byok")}
      onClick={() =>
        toggleSeries("byok")
      }
    />

    <LegendItem
      color="#8B6BD9"
      label="OpenRouter Spend"
      isActive={isActive(
        "openrouterSpend",
      )}
      onClick={() =>
        toggleSeries(
          "openrouterSpend",
        )
      }
    />

    {/* MOVE LEGEND TO RIGHT */}
    <button
      type="button"
      onClick={() =>
        setIsLegendOnRight(true)
      }
      className="
        ml-auto
        flex
        items-center
        justify-center
        cursor-pointer
        text-[var(--color-text-muted)]
      "
      aria-label="Move legend to right"
    >
      <PanelRight size={16} />
    </button>
  </div>
)}
</div>
);
}
function LegendItem({
  color,
  label,
  isActive,
  onClick,
}: {
  color: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        items-center
        gap-2
        border-0
        text-[length:var(--font-size-sm)]
        bg-transparent
        p-0
        cursor-pointer
      "
    >
      <span
        className="
          block
          h-2
          w-2
          shrink-0
          rounded-full
        "
        style={{
          backgroundColor: isActive
            ? color
            : "rgba(100, 116, 139, 0.45)",
        }}
      />

       <span
        className={
          isActive
            ? "text-[var(--color-text)]"
            : "text-[var(--color-text-muted)] line-through opacity-60"
        }
      >
        {label}
      </span>
    </button>
  );
}