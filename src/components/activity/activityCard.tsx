import { MiniSparkline } from "../../utils/miniSparkLine";

type ActivityMetricCardProps = {
  title: string;
  value: string;
  chartData: {
    date: Date;
    value: number;
  }[];
  hoveredIndex: number | null;
  onHoverChange: (index: number | null) => void;
};

export function ActivityMetricCard({
  title,
  value,
  chartData,
  hoveredIndex,
  onHoverChange,
}: ActivityMetricCardProps) {
  const hoveredDate =
    hoveredIndex !== null
      ? chartData[hoveredIndex]?.date
      : null;

  const formattedDate = hoveredDate
    ? new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
      }).format(hoveredDate)
    : "– No prior data";

return (
  <div
    className="
      rounded-lg
      border
      border-black/[0.04]
      bg-[var(--color-surface)]
      p-4
      mt-5
    "
  >
      <div className="flex items-center gap-4">
        {/* Left content */}
        <div className="min-w-[105px]">
          <p
            className="
              text-[length:var(--font-size-base)]
              text-[var(--color-text-secondary)]
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              text-2xl
              font-medium
              text-[var(--color-text)]
            "
          >
            {value}
          </p>
        </div>

        {/* Interactive chart */}
        <div className="min-w-0 flex-1">
          <MiniSparkline
            data={chartData}
            hoveredIndex={hoveredIndex}
            onHoverChange={onHoverChange}
          />
        </div>
      </div>

      {/* Date / default text */}
      <p
        className="
          mt-1
          text-[length:var(--font-size-base)]
          text-[var(--color-text-secondary)]
        "
      >
        {formattedDate}
      </p>
    </div>
  );
}