import { useMemo, useState,  useEffect,useRef, } from "react";
import { PanelRight,PanelBottom } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
type ChartData = {
  date: string;
  gpt: number;
  nemotron9b: number;
  nemotron3: number;
};

function UsageByModelTooltip({
  active,
  label,
}: any) {
  if (!active || !label) {
    return null;
  }

  return (
    <div className="pointer-events-none">
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
        {label}
      </div>

      <div
        className="
          mt-2
          h-[10px]
          w-[180px]
          max-w-[calc(100vw-32px)]
          rounded-full
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          shadow-[var(--shadow-sm)]
        "
      />
    </div>
  );
}
const chartData: ChartData[] = [
  { date: "25 Jul 2026", gpt: 0, nemotron9b: 0, nemotron3: 0 },

  { date: "26 Jul 2026", gpt: 12, nemotron9b: 5, nemotron3: 8 },

  { date: "27 Jul 2026", gpt: 28, nemotron9b: 14, nemotron3: 10 },

  { date: "28 Jul 2026", gpt: 18, nemotron9b: 22, nemotron3: 16 },

  { date: "29 Jul 2026", gpt: 45, nemotron9b: 30, nemotron3: 24 },

  { date: "30 Jul 2026", gpt: 62, nemotron9b: 38, nemotron3: 35 },

  { date: "31 Jul 2026", gpt: 40, nemotron9b: 52, nemotron3: 46 },

  { date: "1 Aug 2026", gpt: 75, nemotron9b: 44, nemotron3: 58 },

  { date: "2 Aug 2026", gpt: 95, nemotron9b: 60, nemotron3: 72 },

  { date: "3 Aug 2026", gpt: 68, nemotron9b: 85, nemotron3: 64 },

  { date: "4 Aug 2026", gpt: 120, nemotron9b: 72, nemotron3: 90 },

  { date: "5 Aug 2026", gpt: 88, nemotron9b: 110, nemotron3: 95 },

  { date: "6 Aug 2026", gpt: 145, nemotron9b: 92, nemotron3: 118 },

  { date: "7 Aug 2026", gpt: 110, nemotron9b: 135, nemotron3: 100 },

  { date: "8 Aug 2026", gpt: 165, nemotron9b: 115, nemotron3: 140 },

  { date: "9 Aug 2026", gpt: 140, nemotron9b: 160, nemotron3: 125 },

  { date: "11 Aug 2026", gpt: 210, nemotron9b: 145, nemotron3: 175 },

  { date: "13 Aug 2026", gpt: 180, nemotron9b: 200, nemotron3: 155 },

  { date: "15 Aug 2026", gpt: 260, nemotron9b: 175, nemotron3: 220 },

  { date: "17 Aug 2026", gpt: 230, nemotron9b: 240, nemotron3: 195 },

  { date: "19 Aug 2026", gpt: 320, nemotron9b: 210, nemotron3: 270 },

  { date: "21 Aug 2026", gpt: 280, nemotron9b: 290, nemotron3: 250 },

  { date: "23 Aug 2026", gpt: 380, nemotron9b: 260, nemotron3: 330 },
];
const shortDate = (date: string) => {
  return date.replace(" 2026", "");
};

type UsageByModelChartProps = {
  isLegendRight?: boolean;
};

export function UsageByModelChart({
 
}: UsageByModelChartProps) {
  const [activeModel, setActiveModel] = useState<
    "all" | "gpt" | "nemotron3" | "nemotron9b"
  >("all");
const [isLegendRight, setIsLegendRight] = useState(false);

const chartWrapperRef = useRef<HTMLDivElement>(null);
const [isNarrowLayout, setIsNarrowLayout] = useState(false);
const [chartWidth, setChartWidth] = useState(0);
useEffect(() => {
  const element = chartWrapperRef.current;

  if (!element) return;

  const observer = new ResizeObserver(([entry]) => {
    const width = entry.contentRect.width;

    setChartWidth(width);
    setIsNarrowLayout(width < 430);
  });

  observer.observe(element);

  return () => observer.disconnect();
}, []);
const visibleLabels = useMemo(() => {
  if (chartData.length === 0) return [];

  const MAX_LABELS = 6;

  const actualChartWidth = isLegendRight
    ? Math.max(120, chartWidth - 190)
    : chartWidth;

  const possibleLabels = Math.max(
    2,
    Math.floor(actualChartWidth / 60),
  );

  const labelCount = Math.min(
    MAX_LABELS,
    possibleLabels,
    chartData.length,
  );

  const step =
    labelCount <= 1
      ? 1
      : (chartData.length - 1) / (labelCount - 1);

  return Array.from(
    { length: labelCount },
    (_, index) => {
      const dataIndex = Math.round(index * step);

      return chartData[dataIndex].date;
    },
  );
}, [
  chartWidth,
  isLegendRight,
  chartData,
]);
  const visibleSeries = {
    gpt:
      activeModel === "all" ||
      activeModel === "gpt",

    nemotron3:
      activeModel === "all" ||
      activeModel === "nemotron3",

    nemotron9b:
      activeModel === "all" ||
      activeModel === "nemotron9b",
  };
return (
<div
  ref={chartWrapperRef}
  className={
    isLegendRight
      ? "flex h-[260px] w-full"
      : "w-full"
  }
>
    {/* CHART SECTION */}
<div
  className={
    isLegendRight
      ? `
        min-w-0
        flex-1
        border-r
        border-[var(--color-border)]
        pr-3
      `
      : "w-full"
  }
>
      <div
        className={
          isLegendRight
            ? "relative h-full"
            : "relative h-[260px]"
        }
      >
        {/* FOUR-SIDE DASHED BORDER */}
      <div
  className={`
    pointer-events-none
    absolute
    top-[14px]
    bottom-[34px]
    border
    border-dashed
    border-[var(--color-border)]

    ${
      isLegendRight
        ? "left-2 right-1"
        : "left-5 right-5"
    }
  `}
/>

  <ResponsiveContainer
    width="100%"
    height="100%"
  >
    <LineChart
      data={chartData}
      margin={{
        top: 14,
        right: isLegendRight ? 4 : 20,
        left: isLegendRight ? 8 : 20,
        bottom: 0,
      }}
    >
      {/* ================= GRID ================= */}

      <CartesianGrid
        stroke="var(--color-border)"
        strokeDasharray="3 4"
        horizontal
        vertical
        opacity={0.7}
      />

      {/* ================= X AXIS ================= */}

      <XAxis
        dataKey="date"
        axisLine={false}
        tickLine={false}
        height={34}
        interval={
          isNarrowLayout
            ? 0
            : "preserveStartEnd"
        }
        ticks={
          isNarrowLayout
            ? visibleLabels
            : undefined
        }
        tick={{
          fontSize: isNarrowLayout ? 11 : 12,
          fill: "var(--color-text-secondary)",
        }}
        tickFormatter={shortDate}
        minTickGap={
          isNarrowLayout ? 0 : 20
        }
        padding={{
          left: 8,
          right: 8,
        }}
      />

      {/* ================= Y AXIS ================= */}

      <YAxis
        hide
        domain={[0, "auto"]}
      />

      {/* ================= TOOLTIP ================= */}

      <Tooltip
        cursor={{
          fill: "rgba(100, 116, 139, 0.12)",
        }}
        content={<UsageByModelTooltip />}
      />

      {/* ================= GPT ================= */}

      {visibleSeries.gpt && (
        <Line
          type="monotone"
          dataKey="gpt"
          stroke="var(--color-chart-gpt)"
          strokeWidth={2}
          strokeOpacity={0.85}
          connectNulls={false}
          dot={false}
          activeDot={{
            r: 5,
            fill: "var(--color-chart-gpt)",
            stroke: "var(--color-surface)",
            strokeWidth: 2,
          }}
        />
      )}

      {/* ================= NEMOTRON 3 ================= */}

      {visibleSeries.nemotron3 && (
        <Line
          type="monotone"
          dataKey="nemotron3"
          stroke="var(--color-chart-nemotron-3)"
          strokeWidth={2}
          strokeOpacity={0.85}
          connectNulls={false}
          dot={false}
          activeDot={{
            r: 5,
            fill: "var(--color-chart-nemotron-3)",
            stroke: "var(--color-surface)",
            strokeWidth: 2,
          }}
        />
      )}

      {/* ================= NEMOTRON 9B ================= */}

      {visibleSeries.nemotron9b && (
        <Line
          type="monotone"
          dataKey="nemotron9b"
          stroke="var(--color-chart-nemotron-9b)"
          strokeWidth={2}
          strokeOpacity={0.85}
          connectNulls={false}
          dot={false}
          activeDot={{
            r: 5,
            fill: "var(--color-chart-nemotron-9b)",
            stroke: "var(--color-surface)",
            strokeWidth: 2,
          }}
        />
      )}
    </LineChart>
  </ResponsiveContainer>
</div>

      {/* BOTTOM LEGEND */}
    {!isLegendRight && (
  <div
    className="
      mt-4
      flex
      items-start
      justify-between
      gap-2
      border-t
      border-[var(--color-border)]
      pt-4
    "
  >
    {/* LEGEND ITEMS */}
    <div
      className="
        flex
        min-w-0
        flex-1
        flex-wrap
        items-center
        gap-x-5
        gap-y-3
      "
    >
      <LegendItem
        color="var(--color-chart-gpt)"
        label="gpt-oss-20b"
        isActive={
          activeModel === "all" ||
          activeModel === "gpt"
        }
        onClick={() =>
          setActiveModel((current) =>
            current === "gpt"
              ? "all"
              : "gpt",
          )
        }
      />

      <LegendItem
        color="var(--color-chart-nemotron-9b)"
        label="Nemotron Nano 9B V2"
        isActive={
          activeModel === "all" ||
          activeModel === "nemotron9b"
        }
        onClick={() =>
          setActiveModel((current) =>
            current === "nemotron9b"
              ? "all"
              : "nemotron9b",
          )
        }
      />

      <LegendItem
        color="var(--color-chart-nemotron-3)"
        label="Nemotron 3 Nano Omni"
        isActive={
          activeModel === "all" ||
          activeModel === "nemotron3"
        }
        onClick={() =>
          setActiveModel((current) =>
            current === "nemotron3"
              ? "all"
              : "nemotron3",
          )
        }
      />
    </div>

    {/* RIGHT SIDE ICON */}
    <button
      type="button"
      onClick={() =>
        setIsLegendRight((prev) => !prev)
      }
      className="
        mt-8
        flex
        h-6
        w-6
        shrink-0
        items-center
        justify-center
        cursor-pointer
        text-[var(--color-text-secondary)]
        hover:text-[var(--color-text)]
        transition-colors
      "
      aria-label="Move legend to right"
    >
      <PanelRight className="h-4 w-4" />
    </button>
  </div>
)}
    </div>

    {/* RIGHT LEGEND */}
  {isLegendRight && (
  <div
    className="
      w-[190px]
      shrink-0
      px-4
      pt-1
    "
  >
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <p
            className="
              text-xs
              uppercase
              tracking-wide
              text-[var(--color-text-secondary)]
            "
          >
            Legend
          </p>

          {/* MOVE LEGEND BACK TO BOTTOM */}
          <button
            type="button"
            onClick={() =>
              setIsLegendRight(false)
            }
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              cursor-pointer
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-text)]
              transition-colors
            "
            aria-label="Move legend to bottom"
          >
            <PanelBottom
              size={16}
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* LEGEND ITEMS */}
        <div className="flex flex-col gap-4">
          <LegendItem
            color="var(--color-chart-gpt)"
            label="gpt-oss-20b"
            isActive={
              activeModel === "all" ||
              activeModel === "gpt"
            }
            onClick={() =>
              setActiveModel((current) =>
                current === "gpt"
                  ? "all"
                  : "gpt",
              )
            }
          />

          <LegendItem
            color="var(--color-chart-nemotron-9b)"
            label="Nemotron Nano 9B V2"
            isActive={
              activeModel === "all" ||
              activeModel === "nemotron9b"
            }
            onClick={() =>
              setActiveModel((current) =>
                current === "nemotron9b"
                  ? "all"
                  : "nemotron9b",
              )
            }
          />

          <LegendItem
            color="var(--color-chart-nemotron-3)"
            label="Nemotron 3 Nano Omni"
            isActive={
              activeModel === "all" ||
              activeModel === "nemotron3"
            }
            onClick={() =>
              setActiveModel((current) =>
                current === "nemotron3"
                  ? "all"
                  : "nemotron3",
              )
            }
          />
        </div>
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
        gap-1.5
        whitespace-nowrap
        text-[length:var(--font-size-chart-legend)]
        leading-[1.4]
        transition-opacity
        duration-200
        cursor-pointer
      "
      style={{
        opacity: isActive ? 1 : 0.35,
      }}
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
          backgroundColor: color,
        }}
      />

      <span
        className={
          isActive
            ? "text-[var(--color-text)]"
            : "text-[var(--color-text-muted)]"
        }
      >
        {label}
      </span>
    </button>
  );
}