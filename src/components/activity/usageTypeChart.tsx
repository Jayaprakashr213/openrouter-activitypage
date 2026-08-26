import { useState,useRef,useEffect ,useMemo} from "react";
import { PanelRight,PanelBottom } from "lucide-react";
type ChartData = {
  date: string;
  byok: number;
  openrouterSpend: number;
};

const chartData: ChartData[] = [
  { date: "25 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "26 Jul 2026", byok: 0, openrouterSpend: 0 },
  { date: "27 Jul 2026", byok: 3, openrouterSpend: 1 },
  { date: "28 Jul 2026", byok: 8, openrouterSpend: 4 },
  { date: "29 Jul 2026", byok: 5, openrouterSpend: 9 },
  { date: "30 Jul 2026", byok: 14, openrouterSpend: 7 },
  { date: "31 Jul 2026", byok: 10, openrouterSpend: 16 },
  { date: "1 Aug 2026", byok: 21, openrouterSpend: 13 },
  { date: "2 Aug 2026", byok: 16, openrouterSpend: 24 },
  { date: "3 Aug 2026", byok: 29, openrouterSpend: 19 },
  { date: "4 Aug 2026", byok: 23, openrouterSpend: 34 },
  { date: "5 Aug 2026", byok: 38, openrouterSpend: 27 },
  { date: "6 Aug 2026", byok: 31, openrouterSpend: 43 },
  { date: "7 Aug 2026", byok: 47, openrouterSpend: 35 },
  { date: "8 Aug 2026", byok: 40, openrouterSpend: 54 },
  { date: "9 Aug 2026", byok: 58, openrouterSpend: 46 },
  { date: "11 Aug 2026", byok: 51, openrouterSpend: 67 },
  { date: "13 Aug 2026", byok: 72, openrouterSpend: 59 },
  { date: "15 Aug 2026", byok: 63, openrouterSpend: 84 },
  { date: "17 Aug 2026", byok: 91, openrouterSpend: 76 },
  { date: "19 Aug 2026", byok: 80, openrouterSpend: 104 },
  { date: "21 Aug 2026", byok: 112, openrouterSpend: 94 },
  { date: "23 Aug 2026", byok: 98, openrouterSpend: 130 },
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

  const chartWrapperRef =
    useRef<HTMLDivElement>(null);

  const [chartWidth, setChartWidth] =
    useState(0);

  const [isNarrowLayout, setIsNarrowLayout] =
    useState(false);

    const handleChartPointerMove = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  const rect = event.currentTarget.getBoundingClientRect();

  const x = event.clientX - rect.left;

  const percentage = Math.max(
    0,
    Math.min(1, x / rect.width),
  );

  const index = Math.round(
    percentage * (chartData.length - 1),
  );

  setHoveredIndex(index);
};
  useEffect(() => {
    const element = chartWrapperRef.current;

    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;

      setChartWidth(width);

      setIsNarrowLayout(width < 480);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const [activeSeries, setActiveSeries] = useState<
    "byok" | "openrouterSpend" | null
  >(null);

  const dates = chartData.map(
    (item) => new Date(item.date),
  );

  const startDate = dates[0];

  const endDate =
    dates[dates.length - 1];

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

 const visibleDateIndexes = useMemo(() => {
  if (
    chartData.length === 0 ||
    chartWidth === 0
  ) {
    return [];
  }

  // Actual available chart width
  const actualChartWidth = isLegendOnRight
    ? Math.max(120, chartWidth - 220)
    : chartWidth;

  const minimumLabelWidth = 60;

  const labelsThatFit = Math.floor(
    actualChartWidth / minimumLabelWidth,
  );

  const maxLabels = isLegendOnRight
    ? 4
    : isNarrowLayout
      ? 6
      : 12;

  const minLabels = isLegendOnRight
    ? 3
    : 4;

  const labelCount = Math.max(
    minLabels,
    Math.min(
      maxLabels,
      labelsThatFit,
      chartData.length,
    ),
  );

  if (labelCount >= chartData.length) {
    return chartData.map(
      (_, index) => index,
    );
  }

  const step =
    (chartData.length - 1) /
    (labelCount - 1);

  const indexes = Array.from(
    { length: labelCount },
    (_, index) =>
      Math.round(index * step),
  );

  return [...new Set(indexes)];
}, [
  chartWidth,
  isNarrowLayout,
  isLegendOnRight,
]);
const CHART_HEIGHT = 240;
const CHART_PADDING = 12;

const visibleValues = chartData.flatMap((item) => {
  const values: number[] = [];

  if (isActive("byok")) {
    values.push(item.byok);
  }

  if (isActive("openrouterSpend")) {
    values.push(item.openrouterSpend);
  }

  return values;
});

const maxValue = Math.max(...visibleValues, 1);

const getSeriesPoints = (
  key: "byok" | "openrouterSpend",
) => {
  return chartData
    .map((item) => {
      const x = getDatePosition(
        item.date,
        startDate,
        totalDays,
      );

      const value = item[key];

      const y =
        CHART_HEIGHT -
        CHART_PADDING -
        (value / maxValue) *
          (CHART_HEIGHT - CHART_PADDING * 2);

      return `${x},${y}`;
    })
    .join(" ");
};
/* ================= OUTSIDE CLICK / TOUCH ================= */
// const handlePointerLeave = (
//   event: React.PointerEvent<HTMLDivElement>,
// ) => {
//   if (event.pointerType === "mouse") {
//     setHoveredIndex(null);
//   }
// };
useEffect(() => {
  const handlePointerDownOutside = (
    event: globalThis.PointerEvent,
  ) => {
    const element = chartWrapperRef.current;

    if (
      element &&
      !element.contains(event.target as Node)
    ) {
      setHoveredIndex(null);
    }
  };

  document.addEventListener(
    "pointerdown",
    handlePointerDownOutside,
  );

  return () => {
    document.removeEventListener(
      "pointerdown",
      handlePointerDownOutside,
    );
  };
}, []);
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
            text-[length:var(--font-size-base)]
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

<div
  ref={chartWrapperRef}
  className="flex min-w-0"
>
  {/* CHART */}
<div
  ref={chartWrapperRef}
  className="
    relative
    h-[275px]
    min-w-0
    flex-1
    touch-pan-y
  "
  onPointerMove={handleChartPointerMove}
  onPointerDown={handleChartPointerMove}
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
    {/* {chartData.map((item, index) => {
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
    })} */}

    {/* HOVER INDICATOR */}
    {/* ACTUAL CHART DATA */}
<svg
  viewBox={`0 0 100 ${CHART_HEIGHT}`}
  preserveAspectRatio="none"
  className="
    absolute
    inset-x-0
    top-0
    z-[5]
    h-[240px]
    w-full
    overflow-visible
    pointer-events-none
  "
>
  {/* BYOK */}
  {isActive("byok") && (
    <polyline
      points={getSeriesPoints("byok")}
      fill="none"
      stroke="#F2B233"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )}

  {/* OPENROUTER SPEND */}
  {isActive("openrouterSpend") && (
    <polyline
      points={getSeriesPoints("openrouterSpend")}
      fill="none"
      stroke="#8B6BD9"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )}
</svg>
  {hoveredIndex !== null &&
  (() => {
    const item = chartData[hoveredIndex];

    const left = getDatePosition(
      item.date,
      startDate,
      totalDays,
    );

    const isNearLeft = left < 15;

    const isNearRight = left > 85;

    return (
      <>
        {/* Vertical hover line */}
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

        {/* Date tooltip */}
        <div
          className="
            absolute
            top-[110px]
            z-30
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
            transform: isNearLeft
              ? "translateX(0)"
              : isNearRight
                ? "translateX(-100%)"
                : "translateX(-50%)",
          }}
        >
          {item.date}
        </div>

        {/* Hover bar */}
        <div
          className="
            absolute
            top-[145px]
            z-10
            h-2
            w-[35%]
            rounded-full
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-sm
          "
          style={{
            left: `${left}%`,
            transform: isNearLeft
              ? "translateX(0)"
              : isNearRight
                ? "translateX(-100%)"
                : "translateX(-50%)",
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