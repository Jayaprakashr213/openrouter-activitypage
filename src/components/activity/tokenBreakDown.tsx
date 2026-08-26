"use client";
import { LegendItem } from "../../utils/filterOptions";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  PanelRight,
  PanelBottom,
} from "lucide-react";const MAX_VALUE = 4000;

const Y_AXIS_VALUES = [
  4000,
  3000,
  2000,
  1000,
  0,
];
const chartData = [
  {
    date: "27 Jul 2026",
    displayDate: "27 Jul",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "30 Jul 2026",
    displayDate: "30 Jul",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "2 Aug 2026",
    displayDate: "2 Aug",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "5 Aug 2026",
    displayDate: "5 Aug",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "8 Aug 2026",
    displayDate: "8 Aug",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "11 Aug 2026",
    displayDate: "11 Aug",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "14 Aug 2026",
    displayDate: "14 Aug",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "17 Aug 2026",
    displayDate: "17 Aug",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
  {
    date: "20 Aug 2026",
    displayDate: "20 Aug",
    reasoning: 1500,
    completion: 700,
    prompt: 800,
  },
  {
    date: "23 Aug 2026",
    displayDate: "23 Aug",
    reasoning: 0,
    completion: 0,
    prompt: 0,
  },
];

const models = [
  {
    key: "reasoning",
    label: "Reasoning",
    color: "#f04d65",
  },
  {
    key: "completion",
    label: "Completion",
    color: "#7c5ac8",
  },
  {
    key: "prompt",
    label: "Prompt",
    color: "#3f6fb6",
  },
];

export function TokenBreakdown() {
  const [activeSeries, setActiveSeries] = useState(
    models.map((model) => model.key),
  );

  const [hoveredIndex, setHoveredIndex] =
    useState<number | null>(null);

  const [isLegendOnRight, setIsLegendOnRight] =
    useState(false);

  /* ================= CHART RESPONSIVE SIZE ================= */

  const chartContainerRef =
    useRef<HTMLDivElement | null>(null);

const chartAreaRef =
  useRef<HTMLDivElement | null>(null);
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

  const isNarrowLayout = chartWidth < 500;

  /* ================= LEGEND CLICK ================= */

  const handleLegendClick = (key: string) => {
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

  /* ================= X POSITION ================= */

  const getPosition = (index: number) => {
    if (chartData.length <= 1) {
      return 0;
    }

    return (
      (index / (chartData.length - 1)) *
      100
    );
  };

  /* ================= RESPONSIVE VISIBLE DATES ================= */

  const visibleDateIndexes = useMemo(() => {
    if (chartWidth === 0) {
      return [];
    }

    /*
     * Approximate minimum width required
     * for one date label.
     */
    const averageLabelWidth = 58;

    const labelsThatFit = Math.floor(
      chartWidth / averageLabelWidth,
    );

    /*
     * Legend on right:
     * chart has less width.
     *
     * Narrow layout:
     * fewer labels.
     *
     * Desktop:
     * more labels.
     */
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

  /* ================= Y AXIS FORMAT ================= */

  const formatYAxisValue = (
    value: number,
  ) => {
    const labelMap: Record<
      number,
      string
    > = {
      4000: "3K",
      3000: "2K",
      2000: "1K",
      1000: "650",
      0: "0",
    };

    return labelMap[value] ?? "";
  };

  /* ================= TOTAL VALUE ================= */

  const getTotalValue = (
    item: (typeof chartData)[number],
  ) => {
    return models.reduce(
      (sum, model) =>
        sum +
        (item[
          model.key as keyof typeof item
        ] as number),
      0,
    );
  };

  /* ================= MOBILE / DESKTOP HOVER ================= */

const updateHoveredIndex = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  const element = chartAreaRef.current;

  if (!element || chartData.length === 0) {
    return;
  }

  const rect = element.getBoundingClientRect();

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

const handlePointerUp = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  if (
    event.currentTarget.hasPointerCapture(
      event.pointerId,
    )
  ) {
    event.currentTarget.releasePointerCapture(
      event.pointerId,
    );
  }
};

const handlePointerLeave = (
  event: React.PointerEvent<HTMLDivElement>,
) => {
  // Desktop: hide when mouse leaves chart
  if (event.pointerType === "mouse") {
    setHoveredIndex(null);
  }
};
useEffect(() => {
  const handleOutsidePointerDown = (
    event: PointerEvent,
  ) => {
    const chartElement =
      chartAreaRef.current;

    if (
      chartElement &&
      !chartElement.contains(
        event.target as Node,
      )
    ) {
      setHoveredIndex(null);
    }
  };

  document.addEventListener(
    "pointerdown",
    handleOutsidePointerDown,
  );

  return () => {
    document.removeEventListener(
      "pointerdown",
      handleOutsidePointerDown,
    );
  };
}, []);
  // ... rest of your component

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

      <div
        className="
          mb-4
          flex
          items-center
          justify-between
        "
      >
        <h3
          className="
            text-[length:var(--font-size-lg)]
            font-medium
            text-[var(--color-text)]
          "
        >
          Token breakdown
        </h3>

        <button
          type="button"
          className="
            text-[length:var(--font-size-base)]
            text-[var(--color-text)]
            underline
            cursor-pointer
          "
        >
          Explore ›
        </button>
      </div>

      {/* ================= MAIN LAYOUT ================= */}

<div
  className={`flex w-full ${
    isLegendOnRight
      ? "flex-row"
      : "flex-col"
  }`}
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
    {/* ================= CHART ================= */}

    <div
      className="relative h-[285px]"
      onMouseLeave={() =>
        setHoveredIndex(null)
      }
    >
      {/* ================= Y AXIS LABELS ================= */}

      <div
        className="
          absolute
          left-0
          top-0
          h-[220px]
          w-10
          shrink-0
          text-[length:var(--font-size-sm)]
          text-[var(--color-text-muted)]
        "
      >
        {Y_AXIS_VALUES.map((value) => {
          const isTopValue =
            value === MAX_VALUE;

          return (
            <div
              key={value}
              className="absolute -translate-y-1/2"
              style={{
                top: isTopValue
                  ? "4%"
                  : `${(
                      (MAX_VALUE - value) /
                      MAX_VALUE
                    ) * 100}%`,
              }}
            >
              {formatYAxisValue(value)}
            </div>
          );
        })}
      </div>

      {/* ================= CHART AREA ================= */}

   <div
  ref={chartAreaRef}
  onPointerDown={handlePointerDown}
  onPointerMove={handlePointerMove}
  onPointerUp={handlePointerUp}
  onPointerLeave={handlePointerLeave}
  className="
    absolute
    left-10
    right-0
    top-0
    h-[220px]
    touch-none
    border
    border-dashed
    border-[var(--color-border)]
  "
>
        {/* ================= HORIZONTAL GRID ================= */}

        {Y_AXIS_VALUES
          .filter((value) => value !== 0)
          .map((value) => (
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
                  (value / MAX_VALUE) * 100
                }%`,
              }}
            />
          ))}

        {/* ================= VERTICAL GRID ================= */}

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

              {chartData.map(
                (item, index) => {
                  const sectionWidth =
                    100 /
                    (chartData.length - 1);

                  const isFirst =
                    index === 0;

                  const isLast =
                    index ===
                    chartData.length - 1;

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
                        setHoveredIndex(
                          index,
                        )
                      }
                    />
                  );
                },
              )}

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

              {/* ================= STACKED BARS ================= */}

              {chartData.map(
                (item, index) => {
                  /*
                   * Calculate full original total
                   */
                  const totalValue =
                    getTotalValue(item);

                  if (totalValue === 0) {
                    return null;
                  }

                  /*
                   * One legend selected?
                   */
                  const isSingleSelected =
                    activeSeries.length === 1;

                  const selectedModel =
                    isSingleSelected
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
                        cursor-pointer
                      "
                      style={{
                        left: `${getPosition(
                          index,
                        )}%`,
                      }}
                      onMouseEnter={() =>
                        setHoveredIndex(
                          index,
                        )
                      }
                    >
                      {/* ================= ONE SELECTED ================= */}

                      {isSingleSelected &&
                      selectedModel ? (
                        <div
                          className="w-full"
                          style={{
                            height: `${
                              (totalValue /
                                MAX_VALUE) *
                              220
                            }px`,
                            backgroundColor:
                              selectedModel.color,
                          }}
                        />
                      ) : (
                        /* ================= ALL SELECTED ================= */

                        models.map(
                          (model) => {
                            const value =
                              item[
                                model.key as keyof typeof item
                              ] as number;

                            if (value === 0) {
                              return null;
                            }

                            return (
                              <div
                                key={model.key}
                                className="w-full"
                                style={{
                                  height: `${
                                    (value /
                                      MAX_VALUE) *
                                    220
                                  }px`,
                                  backgroundColor:
                                    model.color,
                                }}
                              />
                            );
                          },
                        )
                      )}
                    </div>
                  );
                },
              )}

              {/* ================= HOVER CONTENT ================= */}

              {hoveredIndex !== null &&
                (() => {
                  const hoveredItem =
                    chartData[hoveredIndex];

                  const activeModels =
                    models.filter(
                      (model) =>
                        activeSeries.includes(
                          model.key,
                        ),
                    );

                  const hoveredTotal =
                    activeModels.reduce(
                      (sum, model) =>
                        sum +
                        (hoveredItem[
                          model.key as keyof typeof hoveredItem
                        ] as number),
                      0,
                    );

                  return (
                    <>
                      {/* DATE LABEL */}

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

                      {/* WHITE HOVER SURFACE */}

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

                      {/* TOKEN TOOLTIP */}

                      {hoveredTotal > 0 && (
                        <div
                          className="
                            pointer-events-none
                            absolute
                            z-50
                            -translate-x-full
                            rounded-md
                            border
                            border-[var(--color-border)]
                            bg-[var(--color-surface)]
                            p-3
                            text-sm
                            shadow-lg
                          "
                          style={{
                            left: `${getPosition(
                              hoveredIndex,
                            )}%`,
                            top: "20px",
                          }}
                        >
                          <div className="space-y-2">
                            {activeModels.map(
                              (model) => {
                                const value =
                                  hoveredItem[
                                    model.key as keyof typeof hoveredItem
                                  ] as number;

                                return (
                                  <div
                                    key={
                                      model.key
                                    }
                                    className="
                                      flex
                                      items-center
                                      justify-between
                                      gap-6
                                    "
                                  >
                                    <div
                                      className="
                                        flex
                                        items-center
                                        gap-2
                                      "
                                    >
                                      <span
                                        className="
                                          h-2.5
                                          w-2.5
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
                                      {value}
                                    </span>
                                  </div>
                                );
                              },
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  );
                })()}
            </div>

            {/* ================= X AXIS LABELS ================= */}

            <div
              className="
                absolute
                left-10
                right-0
                top-[232px]
                h-6
              "
            >
              {visibleDateIndexes.map(
                (index) => {
                  const item =
                    chartData[index];

                  const isFirst =
                    index ===
                    visibleDateIndexes[0];

                  const isLast =
                    index ===
                    visibleDateIndexes[
                      visibleDateIndexes.length -
                        1
                    ];

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
                        left: `${getPosition(
                          index,
                        )}%`,

                        transform: isFirst
                          ? "translateX(-25%)"
                          : isLast
                            ? "translateX(-100%)"
                            : "translateX(-50%)",
                      }}
                    >
                      {item.displayDate}
                    </span>
                  );
                },
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT LEGEND ================= */}

      {isLegendOnRight && (
  <div
    className="
      relative
      ml-4
      w-[150px]
      shrink-0
      border-l
      border-[var(--color-border)]
      pl-4
    "
  >
    <div
      className="
        mb-4
        text-[11px]
        uppercase
        tracking-wider
        text-[var(--color-text-muted)]
      "
    >
      Legend
    </div>

    <div className="flex flex-col gap-4">
      {models.map((model) => (
        <LegendItem
          key={model.key}
          color={model.color}
          label={model.label}
          isActive={activeSeries.includes(model.key)}
          onClick={() => handleLegendClick(model.key)}
        />
      ))}
    </div>

    {/* Panel Bottom - bottom right */}
    <button
      type="button"
      onClick={() => setIsLegendOnRight(false)}
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

      {/* ================= BOTTOM LEGEND ================= */}

      {!isLegendOnRight && (
        <div
          className="
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
                handleLegendClick(
                  model.key,
                )
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