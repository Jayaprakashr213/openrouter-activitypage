export const chartData = Array.from({ length: 31 }, (_, index) => {
  const date = new Date("2026-07-25T00:00:00");

  date.setDate(date.getDate() + index);

  return {
    date,
    value: 0,
  };
});
export const formatChartDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
  }).format(date);
};
type ChartDataPoint = {
  date: Date;
  value: number;
};
export const generatePastMonthData = (
  values: number[],
): ChartDataPoint[] => {
  const today = new Date();

  return values.map((value, index) => {
    const date = new Date(today);

    date.setDate(
      today.getDate() - (values.length - 1 - index),
    );

    return {
      date,
      value,
    };
  });
};

export function LegendItem({
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
        cursor-pointer
        items-center
        gap-2
        bg-transparent
        p-0
        text-[length:var(--font-size-sm)]
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
          backgroundColor: isActive
            ? color
            : "rgba(100, 116, 139, 0.4)",
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