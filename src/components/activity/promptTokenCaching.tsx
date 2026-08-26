import { useState,useEffect,useRef,useMemo } from "react";
import { LegendItem } from "../../utils/filterOptions";
import { PanelBottom,PanelRight } from "lucide-react";
// const chartData= [
//   {
//     date: "26 Jul 2026",
//     displayDate: "26 Jul",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "27 Jul 2026",
//     displayDate: "27 Jul",
//    uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "28 Jul 2026",
//     displayDate: "28 Jul",
//    uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "29 Jul 2026",
//     displayDate: "29 Jul",
//   uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "30 Jul 2026",
//     displayDate: "30 Jul",
//    uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "31 Jul 2026",
//     displayDate: "31 Jul",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "1 Aug 2026",
//     displayDate: "1 Aug",
//    uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "2 Aug 2026",
//     displayDate: "2 Aug",
//      uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "3 Aug 2026",
//     displayDate: "3 Aug",
//      uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "4 Aug 2026",
//     displayDate: "4 Aug",
//      uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "5 Aug 2026",
//     displayDate: "5 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "6 Aug 2026",
//     displayDate: "6 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "7 Aug 2026",
//     displayDate: "7 Aug",
//    uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "8 Aug 2026",
//     displayDate: "8 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "9 Aug 2026",
//     displayDate: "9 Aug",
//      uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "10 Aug 2026",
//     displayDate: "10 Aug",
//   uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "11 Aug 2026",
//     displayDate: "11 Aug",
//    uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "12 Aug 2026",
//     displayDate: "12 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "13 Aug 2026",
//     displayDate: "13 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "14 Aug 2026",
//     displayDate: "14 Aug",
//      uncached: 1,
//     cached: 1,
//   },
//   {
//     date: "15 Aug 2026",
//     displayDate: "15 Aug",
//      uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "16 Aug 2026",
//     displayDate: "16 Aug",
//      uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "17 Aug 2026",
//     displayDate: "17 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "18 Aug 2026",
//     displayDate: "18 Aug",
//   uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "19 Aug 2026",
//     displayDate: "19 Aug",
//    uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "20 Aug 2026",
//     displayDate: "20 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "21 Aug 2026",
//     displayDate: "21 Aug",
//     uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "22 Aug 2026",
//     displayDate: "22 Aug",
//   uncached: 0,
//     cached: 0,
//   },
//   {
//     date: "23 Aug 2026",
//     displayDate: "23 Aug",
//      uncached: 0,
//     cached: 0,
//   },
// ];
const chartData= [
  {
    date: "26 Jul 2026",
    displayDate: "26 Jul",
    uncached: 0,
    cached: 0,
  },
  {
    date: "27 Jul 2026",
    displayDate: "27 Jul",
   uncached: 0,
    cached: 0,
  },
  {
    date: "28 Jul 2026",
    displayDate: "28 Jul",
   uncached: 0,
    cached: 0,
  },
  {
    date: "29 Jul 2026",
    displayDate: "29 Jul",
  uncached: 0,
    cached: 0,
  },
  {
    date: "30 Jul 2026",
    displayDate: "30 Jul",
   uncached: 0,
    cached: 0,
  },
  {
    date: "31 Jul 2026",
    displayDate: "31 Jul",
    uncached: 0,
    cached: 0,
  },
  {
    date: "1 Aug 2026",
    displayDate: "1 Aug",
   uncached: 0,
    cached: 0,
  },
  {
    date: "2 Aug 2026",
    displayDate: "2 Aug",
     uncached: 0,
    cached: 0,
  },
  {
    date: "3 Aug 2026",
    displayDate: "3 Aug",
     uncached: 0,
    cached: 0,
  },
  {
    date: "4 Aug 2026",
    displayDate: "4 Aug",
     uncached: 0,
    cached: 0,
  },
  {
    date: "5 Aug 2026",
    displayDate: "5 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "6 Aug 2026",
    displayDate: "6 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "7 Aug 2026",
    displayDate: "7 Aug",
   uncached: 0,
    cached: 0,
  },
  {
    date: "8 Aug 2026",
    displayDate: "8 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "9 Aug 2026",
    displayDate: "9 Aug",
     uncached: 0,
    cached: 0,
  },
  {
    date: "10 Aug 2026",
    displayDate: "10 Aug",
  uncached: 0,
    cached: 0,
  },
  {
    date: "11 Aug 2026",
    displayDate: "11 Aug",
   uncached: 0,
    cached: 0,
  },
  {
    date: "12 Aug 2026",
    displayDate: "12 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "13 Aug 2026",
    displayDate: "13 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "14 Aug 2026",
    displayDate: "14 Aug",
     uncached: 760,
    cached: 200,
  },
  {
    date: "15 Aug 2026",
    displayDate: "15 Aug",
     uncached: 0,
    cached: 0,
  },
  {
    date: "16 Aug 2026",
    displayDate: "16 Aug",
     uncached: 0,
    cached: 0,
  },
  {
    date: "17 Aug 2026",
    displayDate: "17 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "18 Aug 2026",
    displayDate: "18 Aug",
  uncached: 0,
    cached: 0,
  },
  {
    date: "19 Aug 2026",
    displayDate: "19 Aug",
   uncached: 0,
    cached: 0,
  },
  {
    date: "20 Aug 2026",
    displayDate: "20 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "21 Aug 2026",
    displayDate: "21 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "22 Aug 2026",
    displayDate: "22 Aug",
  uncached: 0,
    cached: 0,
  },
  {
    date: "23 Aug 2026",
    displayDate: "23 Aug",
     uncached: 0,
    cached: 0,
  },
];

const models = [
  {
    key: "uncached",
    label: "Uncached",
    color: "#94a3b8",
  },
  {
    key: "cached",
    label: "Cached",
    color: "#f59e0b",
  },
];
const MAX_VALUE = 1000;

const yAxisValues = [
  1000,
  750,
  500,
  250,
  0,
];

export function PromptTokenCaching() {
  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  const [activeSeries, setActiveSeries] = useState(
    models.map((model) => model.key),
  );

  const [isLegendOnRight, setIsLegendOnRight] =
    useState(false);

  /* ================= CHART RESPONSIVE SIZE ================= */

  const chartContainerRef =
    useRef<HTMLDivElement | null>(null);
const chartAreaRef =
  useRef<HTMLDivElement>(null);


  const [chartWidth, setChartWidth] =
    useState(0);

  useEffect(() => {
    const element =
      chartContainerRef.current;

    if (!element) return;

    const updateWidth = () => {
      setChartWidth(element.clientWidth);
    };

    updateWidth();

    const resizeObserver =
      new ResizeObserver(updateWidth);

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  /* ================= NARROW LAYOUT ================= */

  const isNarrowLayout =
    chartWidth < 500;

  /* ================= RESPONSIVE DATE LABELS ================= */

  const visibleDateIndexes = useMemo(() => {
    if (chartWidth === 0) {
      return [];
    }

    const averageLabelWidth = 58;

    const labelsThatFit = Math.floor(
      chartWidth / averageLabelWidth,
    );

    const maxLabels = isLegendOnRight
      ? 5
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

  /* ================= CHART X POSITION ================= */

  const getPosition = (index: number) => {
    const currentDate = new Date(
      chartData[index].date,
    ).getTime();

    const startDate = new Date(
      chartData[0].date,
    ).getTime();

    const endDate = new Date(
      chartData[
        chartData.length - 1
      ].date,
    ).getTime();
    if (endDate === startDate) {
      return 0;
    }

    return (
      ((currentDate - startDate) /
        (endDate - startDate)) *
      100
    );
  };

  /* ================= LEGEND CLICK ================= */

  const handleLegendClick = (
    key: string,
  ) => {
    setActiveSeries((prev) => {
      const isOnlySelected =
        prev.length === 1 &&
        prev[0] === key;

      if (isOnlySelected) {
        return models.map(
          (model) => model.key,
        );
      }
      return [key];
    });
  };

  /* ================= FORMAT Y AXIS ================= */

  const formatValue = (
    value: number,
  ) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }

    return value.toLocaleString();
  };

  /* ================= RETURN ================= */
/* ================= MOBILE HOVER ================= */

const updateHoveredIndex = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  const element = chartAreaRef.current;

  if (!element || chartData.length === 0) {
    return;
  }

  const rect =
    element.getBoundingClientRect();

  const x =
    event.clientX - rect.left;

  const percentage = Math.max(
    0,
    Math.min(1, x / rect.width),
  );

  /*
   * For this chart, positions are based
   * on actual dates, not equally spaced indexes.
   *
   * Find the closest chart data point.
   */
  const startDate = new Date(
    chartData[0].date,
  ).getTime();

  const endDate = new Date(
    chartData[
      chartData.length - 1
    ].date,
  ).getTime();

  const hoveredTime =
    startDate +
    percentage *
      (endDate - startDate);

  let closestIndex = 0;
  let closestDifference =
    Infinity;

  chartData.forEach(
    (item, index) => {
      const itemTime = new Date(
        item.date,
      ).getTime();

      const difference = Math.abs(
        itemTime - hoveredTime,
      );

      if (
        difference <
        closestDifference
      ) {
        closestDifference =
          difference;

        closestIndex = index;
      }
    },
  );

  setHoveredIndex(closestIndex);
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
    setHoveredIndex(null);
  }
};
useEffect(() => {
  const handlePointerDownOutside = (
    event: PointerEvent,
  ) => {
    const element =
      chartAreaRef.current;

    if (
      element &&
      !element.contains(
        event.target as Node,
      )
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
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3
      "
    >
      {/* ================= HEADER ================= */}
      <div className="mb-5 flex items-center justify-between">
        <h2
          className="
            text-[length:var(--font-size-lg)]
            font-medium
            text-[var(--color-text)]
          "
        >
          Prompt token caching
        </h2>

        <button
          className="
            text-[length:var(--font-size-base)]
            text-[var(--color-text)]
            underline
          "
        >
          Explore ›
        </button>
      </div>

     {/* ================= CHART + RIGHT LEGEND ================= */}
<div
  className={`
    flex
    w-full
    ${
      isLegendOnRight
        ? "flex-row"
        : "flex-col"
    }
  `}
>
  {/* ================= CHART SECTION ================= */}
  <div
    ref={chartContainerRef}
    className={
      isLegendOnRight
        ? "relative min-w-0 flex-1"
        : "relative w-full"
    }
  >
    <div
      className="relative h-[285px]"
      onMouseLeave={() =>
        setHoveredIndex(null)
      }
    >
      {/* ================= Y AXIS ================= */}
      <div
        className="
          absolute
          left-0
          top-0
          h-[220px]
          w-10
          text-[length:var(--font-size-sm)]
          text-[var(--color-text-muted)]
        "
      >
        {yAxisValues.map((value) => (
          <div
            key={value}
            className="
              absolute
              -translate-y-1/2
            "
            style={{
              top: `${(
                (MAX_VALUE - value) /
                MAX_VALUE
              ) * 100}%`,
            }}
          >
            {value === 1000
              ? "1K"
              : value}
          </div>
        ))}
      </div>

      {/* ================= CHART AREA ================= */}
     <div
  ref={chartAreaRef}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerLeave={handlePointerLeave}
  className="
    absolute
    left-10
    right-0
    top-0
    h-[220px]
    border
    border-dashed
    border-[var(--color-border)]
    touch-none
  "
>
        {/* HORIZONTAL GRID */}
        {[250, 500, 750].map(
          (value) => (
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
                bottom: `${
                  (value / MAX_VALUE) *
                  100
                }%`,
              }}
            />
          ),
        )}

        {/* VERTICAL GRID */}
        {visibleDateIndexes.map(
          (index) => (
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
                left: `${getPosition(
                  index,
                )}%`,
              }}
            />
          ),
        )}

              {/* ================= HOVER AREAS ================= */}
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
                          ? `${
                              sectionWidth / 2
                            }%`
                          : `${sectionWidth}%`,
                    }}
                    onMouseEnter={() =>
                      setHoveredIndex(index)
                    }
                  />
                );
              })}

              {/* ================= HOVER BACKGROUND ================= */}
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
                      100 /
                      (chartData.length - 1)
                    }%`,
                  }}
                />
              )}

              {/* ================= BARS ================= */}
           {chartData.map((item, index) => {
  const totalValue = models.reduce(
    (sum, model) =>
      sum +
      (item[
        model.key as "uncached" | "cached"
      ] ?? 0),
    0,
  );

  if (totalValue === 0) {
    return null;
  }

  const isSingleModelSelected =
    activeSeries.length === 1;

  const selectedModel = isSingleModelSelected
    ? models.find(
        (model) =>
          model.key === activeSeries[0],
      )
    : null;

  const selectedValue =
    selectedModel
      ? item[
          selectedModel.key as
            | "uncached"
            | "cached"
        ] ?? 0
      : 0;

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
      {/* ONE SELECTED */}
      {isSingleModelSelected && selectedModel ? (
        selectedValue > 0 && (
          <div
            className="w-full"
            style={{
              height: `${
                (selectedValue / MAX_VALUE) * 220
              }px`,
              backgroundColor: selectedModel.color,
            }}
          />
        )
      ) : (
        /* ALL SELECTED → STACKED */
        models.map((model) => {
          const value =
            item[
              model.key as
                | "uncached"
                | "cached"
            ] ?? 0;

          if (value === 0) {
            return null;
          }

          return (
            <div
              key={model.key}
              className="w-full"
              style={{
                height: `${
                  (value / MAX_VALUE) * 220
                }px`,
                backgroundColor: model.color,
              }}
            />
          );
        })
      )}
    </div>
  );
})}

              {/* ================= HOVER CONTENT ================= */}
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
                          model.key as
                            | "uncached"
                            | "cached"
                        ] ?? 0),
                      0,
                    );

                  const hasModels =
                    hoveredTotal > 0;

                  return (
                    <>
                      {/* DATE LABEL */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          top-[105px]
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

                      {/* WHITE TOOLTIP SURFACE */}
                      {hasModels && (
                        <div
                          className="
                            pointer-events-none
                            absolute
                            top-[140px]
                            z-50
                            w-[250px]
                            -translate-x-1/2
                            rounded-md
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-surface)]
                            p-3
                            shadow-md
                          "
                          style={{
                            left: `${getPosition(
                              hoveredIndex,
                            )}%`,
                          }}
                        >
                          {activeModels.map(
                            (model) => {
                              const value =
                                hoveredItem[
                                  model.key as
                                    | "uncached"
                                    | "cached"
                                ] ?? 0;

                              if (value === 0) {
                                return null;
                              }

                              return (
                                <div
                                  key={model.key}
                                  className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    text-[12px]
                                  "
                                >
                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-2
                                      text-[var(--color-text)]
                                    "
                                  >
                                    <span
                                      className="
                                        h-2
                                        w-2
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

                                  <span
                                    className="
                                      text-[var(--color-text)]
                                    "
                                  >
                                    {formatValue(
                                      value,
                                    )}
                                  </span>
                                </div>
                              );
                            },
                          )}
                        </div>
                      )}
                    </>
                  );
                })()}
            </div>

            {/* ================= X AXIS ================= */}
            <div
              className="
                absolute
                left-10
                right-0
                top-[232px]
                h-6
              "
            >
             {visibleDateIndexes.map((index, position) => {
  const item = chartData[index];

  const isFirst = position === 0;

  const isLast =
    position ===
    visibleDateIndexes.length - 1;

  const isSecondLast =
    position ===
    visibleDateIndexes.length - 2;

  return (
    <span
      key={item.date}
      className="
        absolute
        whitespace-nowrap
        text-[11px]
        text-[var(--color-text-muted)]
      "
      style={{
        left: `${getPosition(index)}%`,

        transform: isFirst
          ? "translateX(0)"
          : isSecondLast && isLegendOnRight
            ? "translateX(-100%)"
            : isLast
              ? "translateX(-100%)"
              : "translateX(-50%)",
      }}
    >
      {item.displayDate}
    </span>
  );
})}
            </div>
          </div>
        </div>

        {/* ================= RIGHT LEGEND ================= */}
{isLegendOnRight && (
  <div
    className="
      relative
      ml-2
      flex
      w-[145px]
      shrink-0
      flex-col
      border-l
      border-[var(--color-border)]
      pl-2
      pt-1
    "
  >
    {/* LEGEND TITLE */}
    <span
      className="
        mb-3
        text-[10px]
        font-medium
        tracking-wider
        text-[var(--color-text-muted)]
      "
    >
      LEGEND
    </span>

    {/* LEGEND ITEMS */}
    <div className="flex flex-col gap-3">
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
        h-6
        w-6
        shrink-0
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

      {/* ================= BOTTOM LEGEND ================= */}
      {!isLegendOnRight && (
        <div
          className="
            mt-2
            flex
            items-center
            gap-5
            border-t
            border-[var(--color-border)]
            pt-4
          "
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
        </div>
      )}
    </div>
  );
}