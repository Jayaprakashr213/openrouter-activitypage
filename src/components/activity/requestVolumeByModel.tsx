import {  useState } from "react";
import { LegendItem } from "../../utils/filterOptions";
import { PanelBottom,PanelRight } from "lucide-react";
type ModelKey =
  | "gptOss20b"
  | "nemotron3NanoOmni"
  | "nemotronNano9BV2";

type ChartItem = {
  date: string;
  displayDate: string;
  gptOss20b: number;
  nemotron3NanoOmni: number;
  nemotronNano9BV2: number;
};

const chartData: ChartItem[] = [
  {
    date: "26 Jul 2026",
    displayDate: "26 Jul",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "27 Jul 2026",
    displayDate: "27 Jul",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "28 Jul 2026",
    displayDate: "28 Jul",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "29 Jul 2026",
    displayDate: "29 Jul",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "30 Jul 2026",
    displayDate: "30 Jul",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "31 Jul 2026",
    displayDate: "31 Jul",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "1 Aug 2026",
    displayDate: "1 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "2 Aug 2026",
    displayDate: "2 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "3 Aug 2026",
    displayDate: "3 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "4 Aug 2026",
    displayDate: "4 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "5 Aug 2026",
    displayDate: "5 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "6 Aug 2026",
    displayDate: "6 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "7 Aug 2026",
    displayDate: "7 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "8 Aug 2026",
    displayDate: "8 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "9 Aug 2026",
    displayDate: "9 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "10 Aug 2026",
    displayDate: "10 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "11 Aug 2026",
    displayDate: "11 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "12 Aug 2026",
    displayDate: "12 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "13 Aug 2026",
    displayDate: "13 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "14 Aug 2026",
    displayDate: "14 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "15 Aug 2026",
    displayDate: "15 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "16 Aug 2026",
    displayDate: "16 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "17 Aug 2026",
    displayDate: "17 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "18 Aug 2026",
    displayDate: "18 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "19 Aug 2026",
    displayDate: "19 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "20 Aug 2026",
    displayDate: "20 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "21 Aug 2026",
    displayDate: "21 Aug",
    gptOss20b: 1,
    nemotron3NanoOmni: 1,
    nemotronNano9BV2: 1,
  },
  {
    date: "22 Aug 2026",
    displayDate: "22 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
  {
    date: "23 Aug 2026",
    displayDate: "23 Aug",
    gptOss20b: 0,
    nemotron3NanoOmni: 0,
    nemotronNano9BV2: 0,
  },
];

const MAX_VALUE = 3;

const models: {
  key: ModelKey;
  label: string;
  color: string;
}[] = [
  {
    key: "gptOss20b",
    label: "gpt-oss-20b",
    color: "#1fa187",
  },
  {
    key: "nemotron3NanoOmni",
    label: "Nemotron 3 Nano Omni",
    color: "#2878bd",
  },
  {
    key: "nemotronNano9BV2",
    label: "Nemotron Nano 9B V2",
    color: "#84b526",
  },
];

export function RequestVolumeByModel() {
  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);
const [isLegendOnRight, setIsLegendOnRight] =
  useState(false);
  
const visibleDateIndexes = isLegendOnRight
  ? [0, 4, 8, 12, 16, 20, 24, 28]
  : [0, 2, 4, 7, 10, 13, 16, 19, 22, 25, 28];
  const [activeSeries, setActiveSeries] =
    useState<ModelKey[]>([
      "gptOss20b",
      "nemotron3NanoOmni",
      "nemotronNano9BV2",
    ]);

    // const [activeTab, setActiveTab] = useState("overview");
const handleLegendClick = (key: ModelKey) => {
  setActiveSeries((prev) => {
    const onlySelected =
      prev.length === 1 &&
      prev[0] === key;

    if (onlySelected) {
      return models.map((model) => model.key);
    }

    return [key];
  });
};

  // const toggleSeries = (key: ModelKey) => {
  //   setActiveSeries((current) => {
  //     if (current.includes(key)) {
  //       return current.filter(
  //         (item) => item !== key,
  //       );
  //     }

  //     return [...current, key];
  //   });
  // };

  const getPosition = (index: number) => {
    if (chartData.length <= 1) return 0;

    return (
      (index / (chartData.length - 1)) *
      100
    );
  };

  // const hoveredData =
  //   hoveredIndex !== null
  //     ? chartData[hoveredIndex]
  //     : null;

  // const total = useMemo(() => {
  //   if (!hoveredData) return 0;

  //   return models.reduce((sum, model) => {
  //     if (!activeSeries.includes(model.key)) {
  //       return sum;
  //     }

  //     return (
  //       sum + hoveredData[model.key]
  //     );
  //   }, 0);
  // }, [hoveredData, activeSeries]);

return (
  <div
    className="
      rounded-2xl
      border
      border-[var(--color-border)]
      bg-[var(--color-surface)]
      p-3
    "
  >
    {/* ================= HEADER ================= */}
    <div className="mb-5 flex items-center">
      <h2
          className="
            text-[length:var(--font-size-lg)]
            font-medium
            text-[var(--color-text)]
          "
        >
          Request volume by model
        </h2>

 <button
  type="button"
  // onClick={() => setActiveTab("Explore")}
  className="
    ml-auto
    cursor-pointer
    text-[length:var(--font-size-sm)]
    text-[var(--color-text)]
    underline
    underline-offset-4
  "
>
  Explore ›
</button>
    </div>

    {/* ================= CHART + LEGEND ================= */}
    <div
      className={`flex w-full ${
        isLegendOnRight ? "flex-row" : "flex-col"
      }`}
    >

    {/* ==================== CHART SECTION ==================== */}
  <div
  className={
    isLegendOnRight
      ? "relative flex-1 min-w-0"
      : "relative w-full"
  }
>
      {/* CHART */}
      <div
        className="relative h-[285px]"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {/* Y AXIS LABELS */}
<div
  className="
    absolute
    left-2
    top-[4px]
    h-[212px]
    w-8
    text-[length:var(--font-size-sm)]
    text-[var(--color-text-muted)]
  "
>
  {[3, 2, 1, 0].map((value) => (
    <div
      key={value}
      className="absolute -translate-y-1/2"
      style={{
        top: `${((MAX_VALUE - value) / MAX_VALUE) * 100}%`,

        // Prevent top and bottom labels from crossing chart
        transform:
          value === MAX_VALUE
            ? "translateY(0)"
            : value === 0
              ? "translateY(-100%)"
              : "translateY(-50%)",
      }}
    >
      {value}
    </div>
  ))}
</div>

        {/* ==================== CHART AREA ==================== */}
        <div
          className="
            absolute
            left-10
            right-0
            top-0
            h-[220px]
            border
            border-dashed
            border-[var(--color-border)]
          "
        >
          {/* HORIZONTAL GRID */}
          {[1, 2].map((value) => (
            <div
              key={value}
              className="
                pointer-events-none
                absolute
                left-0
                right-0
                border-t
                border-dashed
                border-[var(--color-border)]
              "
              style={{
                bottom: `${(value / MAX_VALUE) * 100}%`,
              }}
            />
          ))}

          {/* VERTICAL GRID */}
          {visibleDateIndexes.map((index) => (
            <div
              key={index}
              className="
                pointer-events-none
                absolute
                top-0
                bottom-0
                w-px
                bg-[var(--color-border)]
              "
              style={{
                left: `${getPosition(index)}%`,
              }}
            />
          ))}

          {/* HOVER AREAS */}
          {chartData.map((item, index) => {
            const sectionWidth =
              100 / (chartData.length - 1);

            const isFirst = index === 0;
            const isLast =
              index === chartData.length - 1;

            return (
              <div
                key={`hover-${item.date}`}
                className="
                  absolute
                  top-0
                  bottom-0
                  z-40
                  cursor-pointer
                "
                style={{
                  left: isFirst
                    ? "0%"
                    : `${
                        getPosition(index) -
                        sectionWidth / 2
                      }%`,

                  width:
                    isFirst || isLast
                      ? `${sectionWidth / 2}%`
                      : `${sectionWidth}%`,
                }}
                onMouseEnter={() =>
                  setHoveredIndex(index)
                }
              />
            );
          })}

          {/* HOVER BACKGROUND */}
          {hoveredIndex !== null && (
            <div
              className="
                pointer-events-none
                absolute
                top-0
                bottom-0
                z-10
                -translate-x-1/2
                bg-[rgba(148,163,184,0.10)]
              "
              style={{
                left: `${getPosition(
                  hoveredIndex,
                )}%`,
                width: `${
                  100 / (chartData.length - 1)
                }%`,
              }}
            />
          )}

          {/* ==================== BARS ==================== */}
          {chartData.map((item, index) => {
            const totalValue = models.reduce(
              (sum, model) =>
                sum +
                (item[model.key] ?? 0),
              0,
            );

            if (totalValue === 0) {
              return null;
            }

            const isSingleModelSelected =
              activeSeries.length === 1;

            const selectedModel =
              isSingleModelSelected
                ? models.find(
                    (model) =>
                      model.key ===
                      activeSeries[0],
                  )
                : null;

            return (
              <div
                key={item.date}
                className="
                  absolute
                  bottom-0
                  z-30
                  flex
                  w-3
                  -translate-x-1/2
                  flex-col-reverse
                "
                style={{
                  left: `${getPosition(index)}%`,
                }}
              >
                {isSingleModelSelected &&
                selectedModel ? (
                  /* ONE SELECTED MODEL */
                  <div
                    className="w-full"
                    style={{
                      height: `${
                        (totalValue / MAX_VALUE) *
                        220
                      }px`,
                      backgroundColor:
                        selectedModel.color,
                    }}
                  />
                ) : (
                  /* ALL MODELS */
                  models.map((model) => {
                    const value =
                      item[model.key] ?? 0;

                    if (value === 0) {
                      return null;
                    }

                    return (
                      <div
                        key={model.key}
                        className="w-full"
                        style={{
                          height: `${
                            (value / MAX_VALUE) *
                            220
                          }px`,
                          backgroundColor:
                            model.color,
                        }}
                      />
                    );
                  })
                )}
              </div>
            );
          })}

          {/* ==================== HOVER CONTENT ==================== */}
          {hoveredIndex !== null &&
            (() => {
              const hoveredItem =
                chartData[hoveredIndex];

              const activeModels =
                models.filter((model) =>
                  activeSeries.includes(
                    model.key,
                  ),
                );

              const hoveredTotal =
                activeModels.reduce(
                  (sum, model) =>
                    sum +
                    (hoveredItem[
                      model.key
                    ] ?? 0),
                  0,
                );

              const hasModels =
                hoveredTotal > 0;

              return (
                <>
                  {/* BLACK DATE */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      top-[125px]
                      z-50
                      -translate-x-1/2
                      whitespace-nowrap
                      rounded-md
                      bg-[#1f2933]
                      px-2
                      py-1
                      text-[11px]
                      font-medium
                      text-white
                      shadow-sm
                    "
                    style={{
                      left: `${getPosition(
                        hoveredIndex,
                      )}%`,
                    }}
                  >
                    {hoveredItem.date}
                  </div>

                  {/* WHITE SURFACE */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      top-[165px]
                      z-40
                      h-3
                      w-[25%]
                      -translate-x-1/2
                      rounded-full
                      border
                      border-[var(--color-border)]
                      bg-[var(--color-surface)]
                      shadow-sm
                    "
                    style={{
                      left: `${getPosition(
                        hoveredIndex,
                      )}%`,
                    }}
                  />

                  {/* TOOLTIP */}
                  {hasModels && (
                    <div className="pointer-events-none">
                      <RequestTooltip
                        item={hoveredItem}
                        total={hoveredTotal}
                        activeSeries={activeModels.map(
                          (model) =>
                            model.key,
                        )}
                        left={getPosition(
                          hoveredIndex,
                        )}
                      />
                    </div>
                  )}
                </>
              );
            })()}
        </div>

        {/* ==================== X AXIS ==================== */}
       {/* X AXIS LABELS */}
<div
  className="
    absolute
    left-10
    right-0
    top-[232px]
    h-6
    overflow-visible
  "
>
  {visibleDateIndexes.map((index) => {
    const item = chartData[index];

    const isFirst =
      index === visibleDateIndexes[0];

    const isLast =
      index ===
      visibleDateIndexes[
        visibleDateIndexes.length - 1
      ];

    return (
      <span
        key={item.date}
        className="
          absolute
          whitespace-nowrap
          text-[11px]
          leading-none
          text-[var(--color-text-muted)]
        "
        style={{
          left: `${getPosition(index)}%`,

          transform: isFirst
            ? "translateX(-45%)"
            : isLast
              ? "translateX(-100%)"
              : "translateX(-79%)",
        }}
      >
        {item.displayDate}
      </span>
    );
  })}
</div>
      </div>
    </div>

    {/* ==================== LEGEND ==================== */}
    <div
      className={
        isLegendOnRight
          ? `
            ml-4
            flex
            min-w-[240px]
            flex-col
            border-l
            border-[var(--color-border)]
            pl-4
          `
          : `
            flex
            items-center
            gap-5
            border-t
            border-[var(--color-border)]
            pt-4
          `
      }
    >
      {/* RIGHT LEGEND HEADING */}
     {isLegendOnRight && (
  <div className="relative mb-4 flex items-center justify-between">
    <div
      className="
        text-[12px]
        uppercase
        tracking-wider
        text-[var(--color-text-muted)]
      "
    >
      Legend
    </div>

    <button
      type="button"
      onClick={() => setIsLegendOnRight(false)}
      className="
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

      {/* LEGEND ITEMS */}
      <div
        className={
          isLegendOnRight
            ? "flex flex-col gap-4"
            : "flex items-center gap-5"
        }
      >
        {models.map((model) => (
          <LegendItem
            key={model.key}
            color={model.color}
            label={model.label}
            isActive={activeSeries.includes(
              model.key,
            )}
            onClick={() =>
              handleLegendClick(model.key)
            }
          />
        ))}
      </div>

 {!isLegendOnRight && (
  <button
    type="button"
    onClick={() => setIsLegendOnRight(true)}
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
)}
    </div>
    </div>
  </div>
);
}

export function RequestTooltip({
  item,
  total,
  activeSeries,
  left,
}: {
  item: ChartItem;
  total: number;
  activeSeries: ModelKey[];
  left: number;
}) {
  const shouldShowOnLeft = left > 70;

  return (
    <div
      className="
        absolute
        top-[90px]
        z-50
      "
      style={{
        left: `${left}%`,
        transform: shouldShowOnLeft
          ? "translateX(-100%)"
          : "translateX(-10%)",
      }}
    >
      {/* DATE */}
      <div
        className="
          inline-block
          rounded-md
          bg-[#1f2933]
          px-2
          py-1
          text-xs
          font-semibold
          text-white
        "
      >
        {item.date}
      </div>

      {/* CONTENT */}
      <div
        className="
          mt-2
          min-w-[310px]
          rounded-xl
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          p-3
          shadow-lg
        "
      >
        {models.map((model) => {
          if (
            !activeSeries.includes(
              model.key,
            )
          ) {
            return null;
          }

          return (
            <div
              key={model.key}
              className="
                mb-2
                flex
                items-center
                justify-between
                gap-8
                text-[length:var(--font-size-sm)]
                text-[var(--color-text)]
              "
            >
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-5
                    w-1
                    rounded-full
                  "
                  style={{
                    backgroundColor:
                      model.color,
                  }}
                />

                <span>
                  {model.label}
                </span>
              </div>

              <span>
                {item[model.key]}
              </span>
            </div>
          );
        })}

        <div
          className="
            mt-3
            flex
            items-center
            justify-between
            border-t
            border-[var(--color-border)]
            pt-3
            text-[length:var(--font-size-sm)]
            font-medium
            text-[var(--color-text)]
          "
        >
          <span>Total</span>

          <span>{total}</span>
        </div>
      </div>
    </div>
  );
}