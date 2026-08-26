import { useRef } from "react";

type ChartDataPoint = {
  date: Date;
  value: number;
};

type MiniSparklineProps = {
  data: ChartDataPoint[];
  hoveredIndex: number | null;
  onHoverChange: (index: number | null) => void;
};

export function MiniSparkline({
  data,
  hoveredIndex,
  onHoverChange,
}: MiniSparklineProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const dataLength = data.length;
const updateHoveredIndex = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  const element = chartRef.current;

  if (!element || dataLength === 0) return;

  const rect = element.getBoundingClientRect();

  const x = event.clientX - rect.left;

  /* 
   * If pointer reaches either end,
   * hide the marker and restore
   * Date / No prior data.
   */
  if (x <= 0 || x >= rect.width) {
    onHoverChange(null);
    return;
  }

  const percentage = x / rect.width;

  const index = Math.round(
    percentage * (dataLength - 1),
  );

  onHoverChange(index);
};
const handlePointerDown = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  event.currentTarget.setPointerCapture(
    event.pointerId,
  );

  updateHoveredIndex(event);
};

const handlePointerMove = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  updateHoveredIndex(event);
};

const handlePointerLeave = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  if (event.pointerType === "mouse") {
    onHoverChange(null);
  }
};

  // Get chart values
  const values = data.map((item) => item.value);

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  // Prevent division by zero
  const valueRange = maxValue - minValue || 1;

  const chartWidth = 100;
  const chartHeight = 40;
  const padding = 3;

  // Generate SVG points
  const points = data
    .map((item, index) => {
      const x =
        dataLength === 1
          ? chartWidth / 2
          : (index / (dataLength - 1)) * chartWidth;

      const normalizedValue =
        (item.value - minValue) / valueRange;

      const y =
        chartHeight -
        padding -
        normalizedValue * (chartHeight - padding * 2);

      return `${x},${y}`;
    })
    .join(" ");

  const markerPosition =
    hoveredIndex !== null && dataLength > 1
      ? (hoveredIndex / (dataLength - 1)) * 100
      : null;

  const hoveredValue =
    hoveredIndex !== null
      ? data[hoveredIndex]?.value
      : null;

  // Calculate hovered point Y position
  const hoveredPointY =
    hoveredValue !== null
      ? chartHeight -
        padding -
        ((hoveredValue - minValue) / valueRange) *
          (chartHeight - padding * 2)
      : null;

  return (
<div
  ref={chartRef}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerLeave={handlePointerLeave}
  className="
    relative
    h-12
    w-full
    cursor-crosshair
    overflow-hidden
    touch-none
  "
>
      {/* Sparkline */}
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        preserveAspectRatio="none"
        className="
          absolute
          left-0
          top-1/2
          h-10
          w-full
          -translate-y-1/2
        "
      >
        <polyline
          points={points}
          fill="none"
          stroke="var(--color-text-secondary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </svg>

      {/* Hover marker */}
      {markerPosition !== null && (
        <>
          {/* Vertical line */}
          <div
            className="
              absolute
              bottom-0
              top-0
              border-l
              border-dashed
              border-[var(--color-text-secondary)]
            "
            style={{
              left: `${markerPosition}%`,
            }}
          />

          {/* Point on actual line */}
          {hoveredPointY !== null && (
            <div
              className="
                absolute
                h-1.5
                w-1.5
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-[var(--color-text-secondary)]
              "
              style={{
                left: `${markerPosition}%`,
                top: `calc(50% + ${
                  hoveredPointY - chartHeight / 2
                }px)`,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}