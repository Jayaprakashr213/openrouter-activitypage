import { useState,useRef,useEffect } from "react";
import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  AreaChart,
  Line,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  
} from "recharts";
import {
  ChartNoAxesCombined,
  ChartNoAxesColumnIncreasing,
  ChartArea,
SlidersHorizontal,
PanelRight
} from "lucide-react";

export type ChartType = "line" | "bar" | "area";
export type TrendData = {
  date: string;
  [key: string]: string | number;
};

export type TrendSeries = {
  key: string;
  label: string;
  color: string;
};

type TrendsChartProps = {
  title: string;
  data: TrendData[];
  series: TrendSeries[];
  type?: ChartType;
  yAxisFormatter?: (value: number) => string;
};

type CustomTickProps = {
  x?: string | number;
  y?: string | number;
  payload?: {
    value?: string | number;
    index?: number;
  };
  activeIndex: number | null;
  isNarrowLayout: boolean;
  isLastTick: boolean;
};

const CustomTooltip = ({ active, label }: any) => {
  if (!active) return null;

  const formattedDate = label
    ? `${label} 2026`
    : "";

  return (
    <div className="flex flex-col">
      <div className="w-fit rounded-md bg-[var(--color-tooltip-background)] px-2 py-1 text-xs text-white">
        {formattedDate}
      </div>

      <div className="mt-2 h-2 w-[250px] rounded-full bg-white shadow-sm" />
    </div>
  );
};
function CustomXAxisTick({
  x = 0,
  y = 0,
  payload,
  activeIndex,
  isNarrowLayout,
  isLastTick,
}: CustomTickProps) {
  const isActive =
    payload?.index === activeIndex;

  return (
    <g transform={`translate(${x},${y})`}>
      {isActive && (
        <rect
          x={isNarrowLayout ? -20 : -24}
          y={2}
          width={isNarrowLayout ? 40 : 48}
          height={isNarrowLayout ? 20 : 24}
          rx={6}
          fill="var(--color-surface)"
          stroke="var(--color-border)"
        />
      )}

      <text
        x={isLastTick ? -8 : 0}
        y={isNarrowLayout ? 15 : 18}
        textAnchor="middle"
        fontSize={isNarrowLayout ? 10 : 12}
        fill={
          isActive
            ? "var(--color-text)"
            : "var(--color-text-secondary)"
        }
        fontWeight={isActive ? 500 : 400}
      >
        {payload?.value}
      </text>
    </g>
  );
}
export function TrendsChart({
  title,
  data,
  series,
  type: initialType = "line",
  yAxisFormatter,
}: TrendsChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [showOther, setShowOther] = useState(true);
  const [cumulativeSum, setCumulativeSum] = useState(false);
  const [isControlsOpen, setIsControlsOpen] = useState(false);

  const [chartType, setChartType] =
    useState<ChartType>(initialType);

  const [isLegendRight, setIsLegendRight] = useState(false);
  const chartWrapperRef = useRef<HTMLDivElement>(null);

const [isNarrowLayout, setIsNarrowLayout] =
  useState(false);

useEffect(() => {
  const element = chartWrapperRef.current;

  if (!element) return;

  const observer = new ResizeObserver(([entry]) => {
    const width = entry.contentRect.width;

    setIsNarrowLayout(width < 640);
  });

  observer.observe(element);

  return () => observer.disconnect();
}, []);

//  const fullVisibleLabels = data.map((item) => item.date);

// /*
//   Labels when legend is on the right side
// */
// const rightLegendVisibleLabels = data
//   .filter((_, index) => index % 2 === 0)
//   .map((item) => item.date);
const effectiveLegendRight = isLegendRight;

const maxVisibleLabels =
  isNarrowLayout && effectiveLegendRight
    ? 3
    : isNarrowLayout
      ? 6
      : effectiveLegendRight
        ? 7
        : 10;

const labelStep = Math.max(
  1,
  Math.ceil(
    (data.length - 1) /
      (maxVisibleLabels - 1),
  ),
);

const visibleLabels = data
  .filter(
    (_, index) =>
      index % labelStep === 0 ||
      index === data.length - 1,
  )
  .map((item) => item.date);
  const commonProps = {
    data,
    margin: {
      top: 12,
      right: 12,
      left: 0,
      bottom: 8,
    },

    onMouseMove: (state: any) => {
      if (typeof state?.activeTooltipIndex === "number") {
        setActiveIndex(state.activeTooltipIndex);
      }
    },

    onMouseLeave: () => {
      setActiveIndex(null);
    },
  };

  const chartContent = (
    <>
      <CartesianGrid
        stroke="var(--color-border)"
        strokeDasharray="3 4"
        vertical
        horizontal
      />

<XAxis
  dataKey="date"
  axisLine={false}
  tickLine={false}
  height={isNarrowLayout ? 32 : 38}
  interval={0}
  ticks={visibleLabels}
  minTickGap={isNarrowLayout ? 12 : 20}
  tick={(props) => (
    <CustomXAxisTick
      {...props}
      activeIndex={activeIndex}
      isNarrowLayout={isNarrowLayout}
      isLastTick={
        props.payload?.value ===
        visibleLabels[visibleLabels.length - 1]
      }
    />
  )}
/>

    <YAxis
  axisLine={false}
  tickLine={false}
  width={isNarrowLayout ? 34 : 42}
  tick={{
    fontSize: isNarrowLayout ? 11 : 12,
    fill: "var(--color-text-secondary)",
  }}
  tickFormatter={yAxisFormatter}
/>

     <Tooltip
  cursor={{
    fill: "var(--color-chart-hover-surface)",
  }}
  content={<CustomTooltip />}
/>

      {chartType === "line" &&
        series.map((item) => (
          <Line
            key={item.key}
            type="monotone"
            dataKey={item.key}
            stroke={item.color}
            strokeWidth={2}
            dot={{
              r: 3,
              strokeWidth: 0,
              fill: item.color,
            }}
            activeDot={{
              r: 5,
              stroke: "var(--color-surface)",
              strokeWidth: 2,
              fill: item.color,
            }}
          />
        ))}

      {chartType === "bar" &&
        series.map((item) => (
          <Bar
            key={item.key}
            dataKey={item.key}
            fill={item.color}
            radius={[2, 2, 0, 0]}
          />
        ))}

      {chartType === "area" &&
        series.map((item) => (
          <Area
            key={item.key}
            type="monotone"
            dataKey={item.key}
            stroke={item.color}
            fill={item.color}
            fillOpacity={0.18}
            strokeWidth={2}
          />
        ))}
    </>
  );

  return (
    <div
      className="
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3
      "
    >
     <div
  className="
    mb-3
    flex
    items-center
    justify-between
    gap-3
    sm:mb-4
  "
>
  <h3
    className="
      text-[var(--font-size-md)]
      font-semibold
      text-[var(--color-text)]
    "
  >
          {title}
        </h3>

     <button
  type="button"
  className="
    shrink-0
    text-[var(--font-size-sm)]
    text-[var(--color-text)]
    underline
    underline-offset-4
  "
>
  Explore ›
</button>
      </div>

      {/* Chart + optional right legend */}
      <div
  ref={chartWrapperRef}
  className="
    flex
    h-[260px]
    w-full
    sm:h-[290px]
  "
>
      <div
  className={
    effectiveLegendRight
      ? "min-w-0 flex-1"
      : "w-full"
  }
>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" && (
              <LineChart {...commonProps}>
                {chartContent}
              </LineChart>
            )}

            {chartType === "bar" && (
              <BarChart {...commonProps}>
                {chartContent}
              </BarChart>
            )}

            {chartType === "area" && (
              <AreaChart {...commonProps}>
                {chartContent}
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Right side legend */}
  {/* Right side legend */}
{/* Right side legend */}
{effectiveLegendRight && (
  <div
    className="
      ml-3
      flex
      w-[175px]
      shrink-0
      flex-col
      border-l
      border-[var(--color-border)]
      pl-3
      pt-1
    "
  >
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

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() =>
            setIsControlsOpen(!isControlsOpen)
          }
        >
          <SlidersHorizontal
            size={16}
            className="text-[var(--color-text-secondary)]"
          />
        </button>

        <button
          type="button"
          onClick={() =>
            setIsLegendRight(!isLegendRight)
          }
        >
          <PanelRight
            size={16}
            className="text-[var(--color-text-secondary)]"
          />
        </button>
      </div>
    </div>

    <div className="flex flex-col gap-3">
      {series.map((item) => (
        <div
          key={item.key}
          className="
            flex
            min-w-0
            items-center
            gap-2
            text-xs
            text-[var(--color-text)]
          "
        >
          <span
            className="
              h-2.5
              w-2.5
              shrink-0
              rounded-full
            "
            style={{
              backgroundColor: item.color,
            }}
          />

          <span className="truncate">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
)}
      </div>

{!effectiveLegendRight && (
  <div className="relative mt-2 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-3">
  {/* Legend */}
{/* Bottom legend */}
<div
  className="
    flex
    min-w-0
    flex-wrap
    items-center
    gap-x-3
    gap-y-2
    sm:gap-x-5
  "
>
  {series.map((item) => (
    <div
      key={item.key}
      className="
        flex
        min-w-0
        items-center
        gap-1.5
        text-[12px]
        text-[var(--color-text)]
        sm:gap-2
        sm:text-[var(--font-size-chart-legend)]
      "
    >
      <span
        className="
          h-2
          w-2
          shrink-0
          rounded-full
        "
        style={{
          backgroundColor: item.color,
        }}
      />

      <span className="truncate">
        {item.label}
      </span>
    </div>
  ))}
</div>
  {/* Chart controls */}
<div className="relative flex shrink-0 items-center gap-1">

{/* Settings */}
<button
  type="button"
  onClick={() => setIsControlsOpen((prev) => !prev)}
  className="
    flex
    h-7
    w-7
    items-center
    justify-center
    rounded-md
    text-[var(--color-text-secondary)]
    hover:bg-[var(--color-background)]
  "
>
  <SlidersHorizontal size={16} />
</button>

{/* Toggle right side legend */}
<button
  type="button"
  onClick={() => setIsLegendRight((prev) => !prev)}
  className={`
    flex
    h-7
    w-7
    items-center
    justify-center
    rounded-md
    ${
      isLegendRight
        ? "bg-[var(--color-background)] text-[var(--color-text)]"
        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]"
    }
  `}
  title="Toggle legend position"
>
  <PanelRight size={16} />
</button>
    {isControlsOpen && (
      <div
        className="
          absolute
          bottom-10
          right-0
          z-20
          w-[260px]
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          p-4
          shadow-lg
        "
      >
        {/* Show Other */}
        <div className="flex items-center justify-between">
          <span className="text-base text-[var(--color-text)]">
            Show "Other"
          </span>

          <button
            type="button"
            onClick={() => setShowOther((prev) => !prev)}
            className={`
              relative
              h-7
              w-11
              rounded-full
              transition-colors
              ${
                showOther
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-border)]"
              }
            `}
          >
            <span
              className={`
                absolute
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                rounded-full
                bg-white
                shadow-sm
                transition-all
                ${showOther ? "left-5" : "left-1"}
              `}
            />
          </button>
        </div>

        {/* Cumulative sum */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-base text-[var(--color-text)]">
            Cumulative sum
          </span>

          <button
            type="button"
            onClick={() => setCumulativeSum((prev) => !prev)}
            className={`
              relative
              h-7
              w-11
              rounded-full
              transition-colors
              ${
                cumulativeSum
                  ? "bg-[var(--color-primary)]"
                  : "bg-[var(--color-border)]"
              }
            `}
          >
            <span
              className={`
                absolute
                top-1/2
                h-5
                w-5
                -translate-y-1/2
                rounded-full
                bg-white
                shadow-sm
                transition-all
                ${cumulativeSum ? "left-5" : "left-1"}
              `}
            />
          </button>
        </div>

        {/* Chart type */}
        <div className="mt-5 flex items-center justify-between">
          <span className="text-base text-[var(--color-text)]">
            Chart type
          </span>

          <div className="flex items-center gap-2">
            {/* Bar */}
            <button
              type="button"
              onClick={() => setChartType("bar")}
              className={`
                flex h-8 w-8 items-center justify-center rounded-md
                ${
                  chartType === "bar"
                    ? "bg-[var(--color-background)] text-[var(--color-text)] shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]"
                }
              `}
              title="Bar chart"
            >
              <ChartNoAxesColumnIncreasing size={17} />
            </button>

            {/* Line */}
            <button
              type="button"
              onClick={() => setChartType("line")}
              className={`
                flex h-8 w-8 items-center justify-center rounded-md
                ${
                  chartType === "line"
                    ? "bg-[var(--color-background)] text-[var(--color-text)] shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]"
                }
              `}
              title="Line chart"
            >
              <ChartNoAxesCombined size={17} />
            </button>

            {/* Area */}
            <button
              type="button"
              onClick={() => setChartType("area")}
              className={`
                flex h-8 w-8 items-center justify-center rounded-md
                ${
                  chartType === "area"
                    ? "bg-[var(--color-background)] text-[var(--color-text)] shadow-sm"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]"
                }
              `}
              title="Area chart"
            >
              <ChartArea size={17} />
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
)}
    </div>
  );
}