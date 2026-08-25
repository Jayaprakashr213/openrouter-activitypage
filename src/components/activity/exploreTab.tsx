import { useState } from "react";
import {
  ChevronDown,
  Search,
  MoreVertical,
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
  const [groupOpen, setGroupOpen] = useState(false);
const [metricOpen, setMetricOpen] = useState(false);
const [metricSearch, setMetricSearch] = useState("");

const [activeDropdown, setActiveDropdown] =
  useState<ActiveDropdown>(null);
  const toggleDropdown = (dropdown: ActiveDropdown) => {
  setActiveDropdown((current) =>
    current === dropdown ? null : dropdown
  );
};
const [selectedMetric, setSelectedMetric] = useState(
  "Total Usage ($)"
);

const [selectedModel, setSelectedModel] = useState(
  "Model"
);

const [selectedSubgroup, setSelectedSubgroup] = useState(
  "Subgroup"
);
const [rollupOpen, setRollupOpen] = useState(false);
const [topOpen, setTopOpen] = useState(false);
const [limitOpen, setLimitOpen] = useState(false);
const [rankByOpen, setRankByOpen] = useState(false);

const [selectedRollup, setSelectedRollup] = useState("Total");
const [selectedTop, setSelectedTop] = useState("Top");
const [selectedLimit, setSelectedLimit] = useState("10");
const [selectedRankBy, setSelectedRankBy] = useState("Requests");
  return (
    <div className="w-full">
      {/* FILTER BAR */}
     <div className="mt-5 flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
  {/* =========================================
      METRIC + BY + MODEL + SUBGROUP
  ========================================= */}
{/* =========================================
    METRIC + BY + MODEL + SUBGROUP
========================================= */}
<div
  className="
    flex h-8 items-center
    rounded-lg
    border border-[var(--color-border)]
    bg-[var(--color-surface)]
    overflow-visible
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
    width="220px"
    showSelectedDot
    isOpen={activeDropdown === "metric"}
    onToggle={() =>
      setActiveDropdown(
        activeDropdown === "metric" ? null : "metric"
      )
    }
  />

  {/* =========================================
      BY
  ========================================= */}
  <div
    className="
      flex h-full items-center
      border-l border-[var(--color-border)]
      bg-[var(--color-surface-secondary)]
      px-3
      text-[length:var(--font-size-base)]
      text-[var(--color-text-secondary)]
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
    width="220px"
    className="border-l border-[var(--color-border)]"
    isOpen={activeDropdown === "model"}
    onToggle={() =>
      setActiveDropdown(
        activeDropdown === "model" ? null : "model"
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
    width="220px"
    className="border-l border-[var(--color-border)]"
    showPlus
    isOpen={activeDropdown === "subgroup"}
    onToggle={() =>
      setActiveDropdown(
        activeDropdown === "subgroup" ? null : "subgroup"
      )
    }
  />
</div>

<div className="flex items-center gap-2">
  {/* =========================================
      ROLLUP
  ========================================= */}
  <div className="relative">
    <button
      onClick={() =>
        setActiveDropdown(
          activeDropdown === "rollup" ? null : "rollup"
        )
      }
      className="
        flex h-8 items-center gap-1.5
        rounded-lg
        border border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-3
        text-[length:var(--font-size-base)]
        text-[var(--color-text)]
        hover:bg-[var(--color-surface-secondary)]
      "
    >
      <span className="text-[var(--color-text-secondary)]">
        Rollup:
      </span>

      <span className="font-medium">
        {selectedRollup}
      </span>

      <ChevronDown size={15} />
    </button>

    {activeDropdown === "rollup" && (
      <div
        className="
          absolute left-0 top-[calc(100%+4px)] z-30
          mt-1
          min-w-[120px]
          overflow-hidden
          rounded-lg
          border border-[var(--color-border)]
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
                flex w-full items-center justify-between
                px-3 py-2
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
                <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
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
      flex h-8 items-center
      overflow-visible
      rounded-lg
      border border-[var(--color-border)]
      bg-[var(--color-surface)]
    "
  >
    {/* TOP / BOTTOM */}
    <div className="relative h-full">
      <button
        onClick={() =>
          setActiveDropdown(
            activeDropdown === "top" ? null : "top"
          )
        }
        className="
          flex h-full items-center gap-2
          px-3
          text-[length:var(--font-size-base)]
          text-[var(--color-text)]
          hover:bg-[var(--color-surface-secondary)]
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
    <div className="relative h-full border-l border-[var(--color-border)]">
      <button
        onClick={() =>
          setActiveDropdown(
            activeDropdown === "limit" ? null : "limit"
          )
        }
        className="
          flex h-full items-center gap-2
          px-3
          text-[length:var(--font-size-base)]
          text-[var(--color-text)]
          hover:bg-[var(--color-surface-secondary)]
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
    <div className="relative h-full border-l border-[var(--color-border)]">
      <button
        onClick={() =>
          setActiveDropdown(
            activeDropdown === "rank" ? null : "rank"
          )
        }
        className="
          flex h-full items-center gap-2
          px-3
          text-[length:var(--font-size-base)]
          text-[var(--color-text)]
          hover:bg-[var(--color-surface-secondary)]
        "
      >
        <span className="text-[var(--color-text-secondary)]">
          Rank by:
        </span>

        <span className="font-medium">
          {selectedRankBy}
        </span>

        <ChevronDown size={15} />
      </button>

      {activeDropdown === "rank" && (
        <div
          className="
            absolute left-0 top-[calc(100%+4px)] z-30
            mt-1
            min-w-[200px]
            overflow-hidden
            rounded-lg
            border border-[var(--color-border)]
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
        <div className="mt-3 flex flex-wrap items-center gap-6">
          {modelUsageData.map((model) => (
            <div
              key={model.name}
              className="flex items-center gap-2 text-sm text-[var(--color-text)]"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: model.color }}
              />

              {model.name}
            </div>
          ))}
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-6 overflow-hidden">
        <div className="grid grid-cols-[1fr_150px_180px] border-b border-[var(--color-border)] px-3 py-3 text-sm text-[var(--color-text-secondary)]">
          <div>Model ↕</div>

          <div className="text-right">
            ↕ Value
          </div>

          <div className="text-right">
            ↕ % of Total
          </div>
        </div>

        {modelUsageData.map((model) => (
          <div
            key={model.name}
            className="
              grid grid-cols-[1fr_150px_180px]
              border-b border-[var(--color-border)]
              px-3 py-3
              text-sm
              text-[var(--color-text)]
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: model.color }}
              />

              {model.name}
            </div>

            <div className="text-right">
              $0
            </div>

            <div className="flex items-center justify-end gap-3">
              <div className="h-2 w-16 overflow-hidden rounded-full bg-[var(--color-surface-secondary)]">
                <div className="h-full w-0" />
              </div>

              0.0%
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