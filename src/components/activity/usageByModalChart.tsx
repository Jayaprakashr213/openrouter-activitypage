import { useMemo, useState } from "react";
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
    <div
      className="
        pointer-events-none
        -translate-x-1/2
      "
    >
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
          w-[220px]
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

type UsageByModelChartProps = {
  isLegendRight?: boolean;
};

export function UsageByModelChart({
 
}: UsageByModelChartProps) {
  const [activeModel, setActiveModel] = useState<
    "all" | "gpt" | "nemotron3" | "nemotron9b"
  >("all");
const [isLegendRight, setIsLegendRight] = useState(false);
  /*
    When legend is on the right,
    chart width is smaller → show fewer labels.

    When legend is below,
    chart width is larger → show more labels.
  */

  const visibleLabels = useMemo(() => {
    const step = isLegendRight ? 2 : 1;

    return chartData
      .filter(
        (_, index) =>
          index % step === 0 ||
          index === chartData.length - 1,
      )
      .map((item) => item.date);
  }, [isLegendRight]);

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
          ? "min-w-0 flex-1"
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
          className="
            pointer-events-none
            absolute
            left-5
            right-5
            top-[14px]
            bottom-[34px]
            border
            border-dashed
            border-[var(--color-border)]
          "
        />

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 14,
              right: 20,
              left: 20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              stroke="var(--color-border)"
              strokeDasharray="3 4"
              horizontal={false}
              vertical
            />

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              height={34}
              interval={0}
              ticks={visibleLabels}
              tick={{
                fontSize: 12,
                fill: "var(--color-text-secondary)",
              }}
              tickFormatter={shortDate}
              minTickGap={0}
              padding={{
                left: 8,
                right: 8,
              }}
            />

            <YAxis
              hide
              domain={[0, "auto"]}
            />

<Tooltip
  cursor={{
    fill: "rgba(100, 116, 139, 0.12)",
  }}
  content={<UsageByModelTooltip />}
/>

           {/* GPT */}
{visibleSeries.gpt && (
  <Line
    type="monotone"
    dataKey="gpt"
    stroke="transparent"
    strokeWidth={0}
    connectNulls={false}
  dot={false}
    // activeDot={{
    // false
    // }}
  />
)}

{/* NEMOTRON 3 */}
{visibleSeries.nemotron3 && (
  <Line
    type="monotone"
    dataKey="nemotron3"
    stroke="transparent"
    strokeWidth={0}
    connectNulls={false}
   dot={false}
 
  />
)}

{/* NEMOTRON 9B */}
{visibleSeries.nemotron9b && (
  <Line
    type="monotone"
    dataKey="nemotron9b"
    stroke="transparent"
    strokeWidth={0}
    connectNulls={false}
  dot={false}
    // activeDot={{
    //   r: 4,
    //   fill: "var(--color-chart-nemotron-9b)",
    //   stroke: "var(--color-surface)",
    //   strokeWidth: 2,
    // }}
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
            items-center
            justify-between
            border-t
            border-[var(--color-border)]
            pt-4
          "
        >
          {/* LEGEND ITEMS */}
          <div className="flex items-center gap-6">
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
          ml-4
          w-[190px]
          shrink-0
          pl-4
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
        gap-2
        text-[length:var(--font-size-sm)]
        transition-opacity
        duration-200
        cursor-pointer
      "
      style={{
        opacity: isActive ? 1 : 0.35,
      }}
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
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