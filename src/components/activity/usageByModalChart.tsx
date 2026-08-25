import { useState } from "react";

type ChartData = {
  date: string;
  gpt: number;
  nemotron9b: number;
  nemotron3: number;
};
// function getLinePath(
//   data: ChartData[],
//   key: "gpt" | "nemotron9b" | "nemotron3",
// ) {
//     const MAX_VALUE = 1200;
//   return data
//     .map((item, index) => {
//       const x =
//         (index / (data.length - 1)) * 100;

//       const value = item[key];

//       const y =
//         100 - (value / MAX_VALUE) * 100;

//       return `${index === 0 ? "M" : "L"} ${x} ${y}`;
//     })
//     .join(" ");
// }
const getDatePosition = (
  date: string,
  startDate: Date,
  totalDays: number,
) => {
  const currentDate = new Date(date).getTime();
  const start = startDate.getTime();

  const daysFromStart =
    (currentDate - start) / (1000 * 60 * 60 * 24)+2;

  return (daysFromStart / totalDays) * 100;
};
const chartData: ChartData[] = [
  { date: "25 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "26 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "27 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "28 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "29 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "30 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "31 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "1 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "2 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "3 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "4 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "5 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "6 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "7 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "8 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "9 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "11 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "13 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "15 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "17 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "19 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "21 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "23 Aug 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },
];

const shortDate = (date: string) => {
  return date.replace(" 2026", "");
};

export function UsageByModelChart() {
  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  // Convert all chart dates to Date objects
  const dates = chartData.map(
    (item) => new Date(item.date),
  );

  // First date: 25 Jul 2026
  const startDate = dates[0];

  // Last date: 23 Aug 2026
  const endDate = dates[dates.length - 1];

  // Total calendar days between first and last date
const totalDays =
  (endDate.getTime() - startDate.getTime()) /
    (1000 * 60 * 60 * 24) +
  2;
const hoverLeft =
  hoveredIndex !== null
    ? getDatePosition(
        chartData[hoveredIndex].date,
        startDate,
        totalDays,
      )
    : 0;
const [activeModel, setActiveModel] = useState<
  "all" | "gpt" | "nemotron3" | "nemotron9b"
>("all");
  return (
  <div className="relative">
    {/* CHART WRAPPER */}
    <div className="relative h-[260px]">
      {/* CHART AREA */}
      <div
        className="
          absolute
          left-16
          right-16
          top-0
          bottom-8
          border
          border-dashed
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-sm
        "
      >
        {/* ONLY VERTICAL DOTTED GRID LINES */}
   <div className="absolute inset-0 pointer-events-none">
  {chartData.map((item) => {
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
          bottom-0
          border-l
          border-dashed
          border-[var(--color-border)]
          opacity-70
        "
        style={{
          left: `${left}%`,
        }}
      />
    );
  })}

  {/* FINAL CLOSING LINE AFTER 23 AUG */}
  <div
    className="
      absolute
      top-0
      bottom-0
      border-l
      border-dashed
      border-[var(--color-border)]
      opacity-70
    "
    style={{
      left: "100%",
    }}
  />
</div>

        {/* HOVER VERTICAL ROUNDED SURFACE */}
      {/* HOVER DARK SURFACE */}
{hoveredIndex !== null && (
  <div
    className="
      pointer-events-none
      absolute
      top-0
      bottom-0
      z-20
      w-[48px]
      -translate-x-1/2
      bg-black/2
    "
    style={{
      left: `${hoverLeft}%`,
    }}
  />
)}
        {/* HOVER DATE + WHITE SURFACE */}
        {hoveredIndex !== null && (
          <div
            className="
              pointer-events-none
              absolute
              top-[38%]
              z-30
              -translate-x-1/2
            "
            style={{
              left: `${hoverLeft}%`,
            }}
          >
            {/* DATE TOOLTIP */}
            <div
              className="
                inline-block
                whitespace-nowrap
                rounded-md
                bg-[var(--color-tooltip-background)]
                px-2
                py-1
                text-[length:var(--font-size-xs)]
                font-medium
                text-[var(--color-tooltip-text)]
                shadow-[var(--shadow-md)]
              "
            >
              {chartData[hoveredIndex].date}
            </div>

            {/* ROUNDED WHITE HOVER SURFACE */}
            <div
              className="
                mt-2
                h-[10px]
                w-[220px]
                rounded-full
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                shadow-[var(--shadow-sm)]
              "
            />
          </div>
        )}

        {/* HOVER DETECTION */}
        <div className="absolute inset-0 z-40 flex">
          {chartData.map((item, index) => (
            <div
              key={item.date}
              className="
                h-full
                flex-1
                cursor-crosshair
              "
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>

      {/* X AXIS */}
      <div
        className="
          absolute
          bottom-0
          left-16
          right-16
          flex
          justify-between
          text-[length:var(--font-size-xs)]
          text-[var(--color-text-secondary)]
        "
      >
        {chartData.map((item) => (
          <span
            key={item.date}
            className="whitespace-nowrap"
          >
            {shortDate(item.date)}
          </span>
        ))}
      </div>
    </div>

    {/* LEGEND */}
  {/* LEGEND */}
<div
  className="
    mt-4
    flex
    items-center
    gap-6
    border-t
    border-[var(--color-border)]
    pt-4
  "
>
  <LegendItem
    color="var(--color-chart-gpt)"
    label="gpt-oss-20b"
    isActive={activeModel === "all" || activeModel === "gpt"}
    onClick={() =>
      setActiveModel((current) =>
        current === "gpt" ? "all" : "gpt",
      )
    }
  />

  <LegendItem
    color="var(--color-chart-nemotron-3)"
    label="Nemotron 3 Nano Omni"
    isActive={
      activeModel === "all" || activeModel === "nemotron3"
    }
    onClick={() =>
      setActiveModel((current) =>
        current === "nemotron3"
          ? "all"
          : "nemotron3",
      )
    }
  />

  <LegendItem
    color="var(--color-chart-nemotron-9b)"
    label="Nemotron Nano 9B V2"
    isActive={
      activeModel === "all" || activeModel === "nemotron9b"
    }
    onClick={() =>
      setActiveModel((current) =>
        current === "nemotron9b"
          ? "all"
          : "nemotron9b",
      )
    }
  />
</div>
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
        text-[length:var(--font-size-sm)]
        transition-all
        duration-200
        cursor-pointer
      "
    >
      <span
        className="h-2 w-2 rounded-full shrink-0"
        style={{
          backgroundColor: isActive
            ? color
            : "var(--color-text-muted)",
        }}
      />

      <span
        className={
          isActive
            ? "text-[var(--color-text)]"
            : "text-[var(--color-text-muted)] line-through opacity-50"
        }
      >
        {label}
      </span>
    </button>
  );
}