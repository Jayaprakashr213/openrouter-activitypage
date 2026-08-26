import { useState } from "react";
import {
  ChevronDown,
  Maximize2,
} from "lucide-react";
import { metricOptions,modelOptions,subgroupOptions,rollupOptions,topBottomOptions,limitOptions,rankByOptions} from "../../utils/filterOptions";
import { ActivityDropdown } from "../../utils/activityDropdown";
import { ChartOptionsDropdown } from "../../utils/chartOptionsDropdown";
type ModelUsage = {
  name: string;
  value: number;
  color: string;
};
type ActiveDropdown =
  | "metric"
  | "model"
  | "subgroup"
  | "rollup"
  | "top"
  | "limit"
  | "rank"
  | null;


const modelUsageData: ModelUsage[] = [
  {
    name: "gpt-oss-20b",
    value: 0,
    color: "#2AA89A",
  },
  {
    name: "Nemotron 3 Nano Omni",
    value: 0,
    color: "#2AA89A",
  },
  {
    name: "Nemotron Nano 9B V2",
    value: 0,
    color: "#95B52C",
  },
];

export function ExploreTab() {


const [activeDropdown, setActiveDropdown] =
  useState<ActiveDropdown>(null);
//   const toggleDropdown = (dropdown: ActiveDropdown) => {
//   setActiveDropdown((current) =>
//     current === dropdown ? null : dropdown
//   );
// };
const [selectedMetric, setSelectedMetric] = useState(
  "Total Usage ($)"
);

const [selectedModel, setSelectedModel] = useState(
  "Model"
);

const [selectedSubgroup, setSelectedSubgroup] = useState(
  "Subgroup"
);
// const [rollupOpen, setRollupOpen] = useState(false);
// const [topOpen, setTopOpen] = useState(false);
// const [limitOpen, setLimitOpen] = useState(false);
// const [rankByOpen, setRankByOpen] = useState(false);

const [selectedRollup, setSelectedRollup] = useState("Total");
const [selectedTop, setSelectedTop] = useState("Top");
const [selectedLimit, setSelectedLimit] = useState("10");
const [selectedRankBy, setSelectedRankBy] = useState("Requests");
  return (
    <div className="w-full">
{/* FILTER BAR */}
<div
  className="
    mt-5
    flex
    flex-wrap
    items-start
    gap-2
    border-b
    border-[var(--color-border)]
    pb-2
    sm:items-center
  "
>
  {/* =========================================
      METRIC + BY + MODEL + SUBGROUP
  ========================================= */}
<div className="w-full lg:w-auto">
 <div
  className="
    flex
    h-8
    w-full
    items-center
    overflow-visible
    rounded-lg
    border
    border-[var(--color-border)]
    bg-[var(--color-surface)]
    lg:w-fit
  "
>
      {/* =========================================
          METRIC
      ========================================= */}
    <ActivityDropdown
  value={selectedMetric}
  options={metricOptions}
  placeholder="Metric"
  onChange={(value) => {
    setSelectedMetric(value);
    setActiveDropdown(null);
  }}
  className="flex-1"
  triggerClassName="w-full justify-between"
  showSelectedDot
  isOpen={activeDropdown === "metric"}
  onToggle={() =>
    setActiveDropdown(
      activeDropdown === "metric"
        ? null
        : "metric",
    )
  }
/>

      {/* =========================================
          BY
      ========================================= */}
      <div
        className="
          flex
          h-full
          shrink-0
          items-center
          border-l
          border-[var(--color-border)]
          bg-[var(--color-surface-secondary)]
          px-2
          text-[length:var(--font-size-base)]
          text-[var(--color-text-secondary)]
          sm:px-3
        "
      >
        by
      </div>

      {/* =========================================
          MODEL
      ========================================= */}
    <ActivityDropdown
  value={selectedModel}
  options={modelOptions}
  placeholder="Model"
  onChange={(value) => {
    setSelectedModel(value);
    setActiveDropdown(null);
  }}
  className="
    border-l
    border-[var(--color-border)]
  "
  dropdownAlign="right"
  isOpen={activeDropdown === "model"}
  onToggle={() =>
    setActiveDropdown(
      activeDropdown === "model"
        ? null
        : "model",
    )
  }
/>

      {/* =========================================
          SUBGROUP
      ========================================= */}
      <ActivityDropdown
        value={selectedSubgroup}
        options={subgroupOptions}
        placeholder="Subgroup"
        onChange={(value) => {
          setSelectedSubgroup(value);
          setActiveDropdown(null);
        }}
        className="
          border-l
          border-[var(--color-border)]
        "
        showPlus
          dropdownAlign="right"
        isOpen={activeDropdown === "subgroup"}
        onToggle={() =>
          setActiveDropdown(
            activeDropdown === "subgroup"
              ? null
              : "subgroup",
          )
        }
      />
    </div>
  </div>

  {/* =========================================
      SECONDARY FILTERS
  ========================================= */}
<div 
  className=" 
    flex 
    w-full 
    flex-nowrap 
    items-center 
    gap-2 
    overflow-visible
    lg:w-auto 
  " 
>
    {/* =========================================
        ROLLUP
    ========================================= */}
    <div className="relative">
      <button
        onClick={() =>
          setActiveDropdown(
            activeDropdown === "rollup"
              ? null
              : "rollup",
          )
        }
        className="
    flex h-8 shrink-0 items-center gap-1
    rounded-lg
    border border-[var(--color-border)]
    bg-[var(--color-surface)]
    px-2
    text-[length:var(--font-size-base)]
    text-[var(--color-text)]
    sm:gap-1.5
    sm:px-3
  "
      >
        <span className="text-[var(--color-text-secondary)]">
          Rollup:
        </span>

        <span className="font-medium">
          {selectedRollup}
        </span>

        <ChevronDown
          size={15}
          className="shrink-0"
        />
      </button>

      {activeDropdown === "rollup" && (
        <div
          className="
            absolute
            left-0
            top-[calc(100%+4px)]
            z-30
            mt-1
            min-w-[120px]
            overflow-hidden
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          <div className="py-1">
            {rollupOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedRollup(item);
                  setActiveDropdown(null);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  px-3
                  py-2
                  text-left
                  text-[length:var(--font-size-base)]
                  hover:bg-[var(--color-surface-secondary)]
                  ${
                    selectedRollup === item
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)]"
                  }
                `}
              >
                {item}

                {selectedRollup === item && (
                  <span
                    className="
                      h-2
                      w-2
                      rounded-full
                      bg-[var(--color-primary)]
                    "
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

 

  {/* =========================================
      TOP + NUMBER + RANK BY
  ========================================= */}
<div
  className="
    flex
    h-8
    min-w-0
    flex-1
    items-center
    overflow-visible
    rounded-lg
    border
    border-[var(--color-border)]
    bg-[var(--color-surface)]
  "
>
    {/* TOP / BOTTOM */}
    <div className="relative h-full shrink-0">
      <button
        onClick={() =>
          setActiveDropdown(
            activeDropdown === "top" ? null : "top"
          )
        }
     className="
  flex h-full items-center gap-1.5
  px-2
  text-[length:var(--font-size-base)]
  text-[var(--color-text)]
  hover:bg-[var(--color-surface-secondary)]
  sm:gap-2
  sm:px-3
"
      >
        <span
          className={
            selectedTop !== "Top"
              ? "font-medium"
              : ""
          }
        >
          {selectedTop}
        </span>

        <ChevronDown size={15} />
      </button>

      {activeDropdown === "top" && (
        <div
          className="
            absolute left-0 top-[calc(100%+4px)] z-30
            mt-1
            min-w-[95px]
            overflow-hidden
            rounded-lg
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          <div className="py-1">
            {topBottomOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedTop(item);
                  setActiveDropdown(null);
                }}
                className={`
                  flex w-full items-center justify-between
                  px-3 py-2
                  text-left
                  text-[length:var(--font-size-base)]
                  hover:bg-[var(--color-surface-secondary)]
                  ${
                    selectedTop === item
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)]"
                  }
                `}
              >
                {item}

                {selectedTop === item && (
                  <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* NUMBER */}
   <div className="relative h-full shrink-0 border-l border-[var(--color-border)]">
      <button
        onClick={() =>
          setActiveDropdown(
            activeDropdown === "limit" ? null : "limit"
          )
        }
    className="
  flex h-full items-center gap-1.5
  px-2
  text-[length:var(--font-size-base)]
  text-[var(--color-text)]
  hover:bg-[var(--color-surface-secondary)]
  sm:gap-2
  sm:px-3
"
      >
        {selectedLimit}

        <ChevronDown size={14} />
      </button>

      {activeDropdown === "limit" && (
        <div
          className="
            absolute left-0 top-[calc(100%+4px)] z-30
            mt-1
            min-w-[95px]
            overflow-hidden
            rounded-lg
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-lg
          "
        >
          <div className="max-h-[240px] overflow-y-auto py-1">
            {limitOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedLimit(item);
                  setActiveDropdown(null);
                }}
                className={`
                  flex w-full items-center justify-between
                  px-3 py-2
                  text-left
                  text-[length:var(--font-size-base)]
                  hover:bg-[var(--color-surface-secondary)]
                  ${
                    selectedLimit === item
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)]"
                  }
                `}
              >
                {item}

                {selectedLimit === item && (
                  <span className="h-2 w-2 rounded-full bg-[var(--color-text)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* RANK BY */}
   <div
  className="
    relative
    h-full
    min-w-0
    flex-1
    border-l
    border-[var(--color-border)]
  "
>
  <button
    onClick={() =>
      setActiveDropdown(
        activeDropdown === "rank" ? null : "rank"
      )
    }
    className="
      flex
      h-full
      w-full
      min-w-0
      items-center
      gap-1.5
      px-2
      text-[length:var(--font-size-base)]
      text-[var(--color-text)]
      hover:bg-[var(--color-surface-secondary)]
      sm:gap-2
      sm:px-3
    "
  >
    {/* Hide label on mobile to save space */}
    <span
      className="
        hidden
        shrink-0
        text-[var(--color-text-secondary)]
        sm:inline
      "
    >
      Rank by:
    </span>

    <span
      className="
        min-w-0
        flex-1
        truncate
        text-left
        font-medium
      "
    >
      {selectedRankBy}
    </span>

    <ChevronDown
      size={14}
      className="shrink-0"
    />
  </button>

  {activeDropdown === "rank" && (
    <div
      className="
        absolute
        right-0
        top-[calc(100%+4px)]
        z-30
        mt-1
        min-w-[180px]
        overflow-hidden
        rounded-lg
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        shadow-lg
      "
    >
          <div className="max-h-[260px] overflow-y-auto py-1">
            {rankByOptions.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setSelectedRankBy(item);
                  setActiveDropdown(null);
                }}
                className={`
                  flex w-full items-center justify-between
                  px-3 py-2
                  text-left
                  text-[length:var(--font-size-base)]
                  hover:bg-[var(--color-surface-secondary)]
                  ${
                    selectedRankBy === item
                      ? "text-[var(--color-primary)]"
                      : "text-[var(--color-text)]"
                  }
                `}
              >
                {item}

                {selectedRankBy === item && (
                  <span className="h-2 w-2 rounded-full bg-[var(--color-text)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
</div>
  {/* =========================================
      RIGHT ACTIONS
  ========================================= */}
<div 
  className="
    ml-auto
    flex h-8 items-center
    overflow-visible
    rounded-lg
    border border-[var(--color-border)]
    bg-[var(--color-surface)]
  "
>
  {/* MORE */}
  <ChartOptionsDropdown />

  {/* DIVIDER */}
  <div className="h-full w-px bg-[var(--color-border)]" />

  {/* EXPAND */}
  <button
    className="
      flex h-full items-center gap-2
      px-3
      text-[length:var(--font-size-base)]
      text-[var(--color-text-secondary)]
      hover:bg-[var(--color-surface-secondary)]
    "
  >
    <Maximize2 size={16} />

    <span>Expand</span>
  </button>
</div>
</div>

      {/* TOTAL USAGE CHART */}
      <div className="mt-6">
        <div className="flex h-6 w-full overflow-hidden rounded-md">
          {modelUsageData.map((model) => (
            <div
              key={model.name}
              style={{
                width: `${100 / modelUsageData.length}%`,
                backgroundColor: model.color,
              }}
              className="border-r border-white/40 last:border-r-0"
            />
          ))}
        </div>

        {/* LEGEND */}
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3 sm:gap-6">
  {modelUsageData.map((model) => (
    <div
      key={model.name}
      className="
        flex
        items-center
        gap-2
        text-[length:var(--font-size-sm)]
        text-[var(--color-text)]
        sm:text-[length:var(--font-size-base)]
      "
    >
      <span
        className="h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: model.color }}
      />

      <span className="whitespace-nowrap">
        {model.name}
      </span>
    </div>
  ))}
</div>
      </div>

      {/* TABLE */}
    {/* TABLE */}
<div className="mt-5 overflow-hidden sm:mt-6">

  {/* HEADER */}
  <div
    className="
      grid
      grid-cols-[minmax(0,1fr)_70px_100px]
      border-b
      border-[var(--color-border)]
      px-2
      py-3
      text-[length:var(--font-size-sm)]
      text-[var(--color-text-secondary)]

      sm:grid-cols-[minmax(0,1fr)_110px_140px]
      sm:px-3
      sm:text-[length:var(--font-size-base)]

      lg:grid-cols-[minmax(0,1fr)_150px_180px]
    "
  >
    <div>Model ↕</div>

    <div className="text-right">
      ↕ Value
    </div>

    <div className="text-right">
      <span className="sm:hidden">
        ↕ %
      </span>

      <span className="hidden sm:inline">
        ↕ % of Total
      </span>
    </div>
  </div>

  {/* ROWS */}
  {modelUsageData.map((model) => (
    <div
      key={model.name}
      className="
        grid
        grid-cols-[minmax(0,1fr)_70px_100px]
        items-center
        border-b
        border-[var(--color-border)]
        px-2
        py-3
        text-[length:var(--font-size-sm)]
        text-[var(--color-text)]

        sm:grid-cols-[minmax(0,1fr)_110px_140px]
        sm:px-3
        sm:text-[length:var(--font-size-base)]

        lg:grid-cols-[minmax(0,1fr)_150px_180px]
      "
    >
      {/* MODEL */}
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="
            h-2
            w-2
            shrink-0
            rounded-full
            sm:h-2.5
            sm:w-2.5
          "
          style={{
            backgroundColor: model.color,
          }}
        />

        <span className="truncate">
          {model.name}
        </span>
      </div>

      {/* VALUE */}
      <div className="text-right whitespace-nowrap">
        $0
      </div>

      {/* PERCENTAGE */}
      <div className="flex items-center justify-end gap-2 sm:gap-3">
        <div
          className="
            h-2
            w-10
            shrink-0
            overflow-hidden
            rounded-full
            bg-[var(--color-surface-secondary)]

            sm:w-16
          "
        >
          <div className="h-full w-0" />
        </div>

        <span className="hidden whitespace-nowrap sm:inline">
          0.0%
        </span>
      </div>
    </div>
  ))}
</div>

      {/* FOOTER */}
      <div className="mt-4 text-sm text-[var(--color-text-secondary)]">
        3 rows · 11ms
      </div>
    </div>
  );
}