import { useState } from "react";
import { LegendItem } from "../../utils/filterOptions";

const chartData = [
  {
    date: "26 July 2026",
    displayDate: "26 Jul",
    uncached: 0,
    cached: 0,
  },
  {
    date: "27 July 2026",
    displayDate: "27 Jul",
    uncached: 0,
    cached: 0,
  },
  {
    date: "28 July 2026",
    displayDate: "28 Jul",
    uncached: 0,
    cached: 0,
  },
  {
    date: "30 July 2026",
    displayDate: "30 Jul",
    uncached: 0,
    cached: 0,
  },
  {
    date: "2 August 2026",
    displayDate: "2 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "5 August 2026",
    displayDate: "5 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "8 August 2026",
    displayDate: "8 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "11 August 2026",
    displayDate: "11 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "14 August 2026",
    displayDate: "14 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "17 August 2026",
    displayDate: "17 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "20 August 2026",
    displayDate: "20 Aug",
    uncached: 0,
    cached: 0,
  },
  {
    date: "21 August 2026",
    displayDate: "21 Aug",
    uncached: 866,
    cached: 0,
  },
  {
    date: "23 August 2026",
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

const visibleDateIndexes = [
  0,
  1,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  12,
];

const yAxisValues = [1000, 750, 500, 250, 0];

export  function PromptTokenCaching() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(
    null,
  );

  const [activeSeries, setActiveSeries] = useState(
    models.map((model) => model.key),
  );

  const [isLegendOnRight, setIsLegendOnRight] =
    useState(false);

  const getPosition = (index: number) => {
    if (chartData.length <= 1) {
      return 0;
    }

    return (
      (index / (chartData.length - 1)) * 100
    );
  };

  const handleLegendClick = (key: string) => {
    setActiveSeries((prev) => {
      const isOnlySelected =
        prev.length === 1 && prev[0] === key;

      // Click selected item again → show all
      if (isOnlySelected) {
        return models.map(
          (model) => model.key,
        );
      }

      // Click another legend → show only that one
      return [key];
    });
  };

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}K`;
    }

    return value.toLocaleString();
  };
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
            text-[length:var(--font-size-sm)]
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
                    top: `${
                      ((MAX_VALUE - value) /
                        MAX_VALUE) *
                      100
                    }%`,
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
              {[250, 500, 750].map((value) => (
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
                      model.key as
                        | "uncached"
                        | "cached"
                    ] ?? 0),
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
                      left: `${getPosition(
                        index,
                      )}%`,
                    }}
                  >
                    {/* ONE SELECTED → FULL HEIGHT */}
                    {isSingleModelSelected &&
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
                                (value /
                                  MAX_VALUE) *
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
                          ? "translateX(0)"
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
              ml-4
              flex
              w-[200px]
              shrink-0
              flex-col
              border-l
              border-[var(--color-border)]
              pl-4
              pt-1
            "
          >
            <span
              className="
                mb-3
                text-[11px]
                font-medium
                tracking-wider
                text-[var(--color-text-muted)]
              "
            >
              LEGEND
            </span>

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

            <button
              type="button"
              onClick={() =>
                setIsLegendOnRight(false)
              }
              className="
                mt-auto
                self-end
                cursor-pointer
                text-[length:var(--font-size-lg)]
                text-[var(--color-text-muted)]
              "
            >
              ˅
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
            onClick={() =>
              setIsLegendOnRight(true)
            }
            className="
              ml-auto
              cursor-pointer
              text-[length:var(--font-size-lg)]
              text-[var(--color-text-muted)]
            "
          >
            ◧
          </button>
        </div>
      )}
    </div>
  );
}