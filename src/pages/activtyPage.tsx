import { useState } from "react";

import { ActivityHeader } from "../components/activity/activityHeader";
import { ActivityTabs } from "../components/activity/activityTabs";
import { ActivityMetricCard } from "../components/activity/activityCard";
import { TopInfoCard } from "../components/activity/topInfoCard";
import { UnknownDetailsPanel } from "../components/activity/unknownDetailsPanel";
import { UsageByModelChart } from "../components/activity/usageByModalChart";
import { UsageTypeChart } from "../components/activity/usageTypeChart";
import { RequestVolumeByModel } from "../components/activity/requestVolumeByModel";
import { TokenBreakdown } from "../components/activity/tokenBreakDown";
import {PromptTokenCaching} from "../components/activity/promptTokenCaching";
import Guardrails from "../components/activity/guardrails";
import { TrendsChart } from "../components/activity/trendsChart";
import {
  apiKeySpendTrendData,
  apiKeySpendTrendSeries,
  apiKeyRequestTrendData,
  apiKeyRequestTrendSeries,
  apiKeyTokenTrendData,
  apiKeyTokenTrendSeries,
} from "../utils/filterOptions";
import { ChevronDown } from "lucide-react";
import {
  TrendingCard,
  type TrendingItem,
  
} from "../components/activity/trendingCard";
import type { ChartType } from "../components/activity/trendsChart";
import { ExploreTab } from "../components/activity/exploreTab";
import { totalSpendChartData, requestsChartData,tokenVolumeChartData
  ,cacheHitChartData,blendedChartData} from "../utils/filterOptions";
import { modelTrendData,modelTrendSeries,modelTokenTrendData,modelTokenTrendSeries,modelSpendTrendData,modelSpendTrendSeries } from "../utils/filterOptions";
import {
  appSpendTrendData,
  appSpendTrendSeries,
  appRequestTrendData,
  appRequestTrendSeries,
  appTokenTrendData,
  appTokenTrendSeries,
} from "../utils/filterOptions";
import type{ TrendData,TrendSeries } from "../components/activity/trendsChart";
type TrendConfig = {
  title: string;
  data: TrendData[];
  series: TrendSeries[];
  trendingItems: TrendingItem[];
};

const appTrendConfig: Record<
  "Spend" | "Requests" | "Tokens",
  TrendConfig
> = {
  Spend: {
    title: "Spend over time",
    data: appSpendTrendData,
    series: appSpendTrendSeries,
    trendingItems: [],
  },

  Requests: {
    title: "Requests over time",
    data: appRequestTrendData,
    series: appRequestTrendSeries,
    trendingItems: [
      {
        id: "unknown",
        name: "Unknown",
        subtitle: "",
        color: "#ec4899",
        trend: "new",
      },
    ],
  },

  Tokens: {
    title: "Tokens over time",
    data: appTokenTrendData,
    series: appTokenTrendSeries,
    trendingItems: [
      {
        id: "unknown",
        name: "Unknown",
        subtitle: "",
        color: "#ec4899",
        trend: "new",
      },
    ],
  },
};

const modelTrendConfig: Record<
  "Spend" | "Requests" | "Tokens",
  TrendConfig
> = {
  Spend: {
    title: "Spend over time",
    data: modelSpendTrendData,
    series: modelSpendTrendSeries,
    trendingItems: [],
  },

  Requests: {
    title: "Requests over time",
    data: modelTrendData,
    series: modelTrendSeries,
    trendingItems: [
      {
        id: "gpt-oss-20b",
        name: "gpt-oss-20b",
        subtitle: "by openai",
        color: "#0d9488",
        trend: "new",
      },
      {
        id: "nemotron-3",
        name: "Nemotron 3 Nano Omni",
        subtitle: "by nvidia",
        color: "#84a817",
        trend: "new",
      },
      {
        id: "nemotron-9",
        name: "Nemotron Nano 9B V2",
        subtitle: "by nvidia",
        color: "#2563a8",
        trend: "new",
      },
    ],
  },

  Tokens: {
    title: "Tokens over time",
    data: modelTokenTrendData,
    series: modelTokenTrendSeries,
    trendingItems: [
      {
        id: "nemotron-9",
        name: "Nemotron Nano 9B V2",
        subtitle: "by nvidia",
        color: "#84a817",
        trend: "new",
      },
      {
        id: "nemotron-3",
        name: "Nemotron 3 Nano Omni",
        subtitle: "by nvidia",
        color: "#0d9488",
        trend: "new",
      },
    ],
  },
};

const apiKeyTrendConfig: Record<
  "Spend" | "Requests" | "Tokens",
  TrendConfig
> = {
  Spend: {
    title: "Spend over time",
    data: apiKeySpendTrendData,
    series: apiKeySpendTrendSeries,
    trendingItems: [],
  },

  Requests: {
    title: "Requests over time",
    data: apiKeyRequestTrendData,
    series: apiKeyRequestTrendSeries,
    trendingItems: [
      {
        id: "api-builder",
        name: "api builder",
        subtitle: "sk-or-v1-550...04a",
        color: "#e57373",
        trend: "new",
      },
    ],
  },

  Tokens: {
    title: "Tokens over time",
    data: apiKeyTokenTrendData,
    series: apiKeyTokenTrendSeries,
    trendingItems: [
      {
        id: "api-builder",
        name: "api builder",
        subtitle: "sk-or-v1-550...04a",
        color: "#e57373",
        trend: "new",
      },
    ],
  },
};
export function ActivityPage() {
  const [activeTab, setActiveTab] = useState("Overview");
const [selectedItem, setSelectedItem] = useState<string | null>(null);
const [appTrendMetric, setAppTrendMetric] = useState<
  "Spend" | "Requests" | "Tokens"
>("Requests");

const [appTrendDropdownOpen, setAppTrendDropdownOpen] =
  useState(false);

const selectedAppTrendConfig =
  appTrendConfig[appTrendMetric];
  const [spendHoveredIndex, setSpendHoveredIndex] =
    useState<number | null>(null);
const [trendChartType, setTrendChartType] =
  useState<ChartType>("line");
  console.log(setTrendChartType)
  const [apiKeyTrendMetric, setApiKeyTrendMetric] = useState<
  "Spend" | "Requests" | "Tokens"
>("Requests");

const [
  apiKeyTrendDropdownOpen,
  setApiKeyTrendDropdownOpen,
] = useState(false);
  const [requestsHoveredIndex, setRequestsHoveredIndex] =
    useState<number | null>(null);

  const [tokenHoveredIndex, setTokenHoveredIndex] =
    useState<number | null>(null);

  const [cacheHoveredIndex, setCacheHoveredIndex] =
    useState<number | null>(null);

  const [blendedHoveredIndex, setBlendedHoveredIndex] =
    useState<number | null>(null);
const [trendMetric, setTrendMetric] = useState<
  "Spend" | "Requests" | "Tokens"
>("Requests");
// const [trendSection, setTrendSection] = useState<
//   "Models" | "API Keys" | "Apps"
// >("Models");
const [trendDropdownOpen, setTrendDropdownOpen] = useState(false);
  // Total spend - straight line
  const selectedTrendConfig = modelTrendConfig[trendMetric];
  const selectedApiKeyTrendConfig = apiKeyTrendConfig[trendMetric];
  return (
    <div
      className="
        min-h-full
        bg-[var(--color-background)]
        px-6
        py-5
      "
    >
      <ActivityHeader />

      <ActivityTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
{activeTab === "Guardrails" ? (
  <Guardrails />
) : activeTab === "Explore" ? (
  <ExploreTab />
) : activeTab === "Trends" ? (
 <div className="pt-5">
    {/* ================= MODELS ================= */}
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        Models
      </h2>

      {/* Metric Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setTrendDropdownOpen(!trendDropdownOpen)
          }
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-4
            py-2
            text-sm
            text-[var(--color-text)]
          "
        >
          {trendMetric}

          <ChevronDown
            size={16}
            className={`transition-transform ${
              trendDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {trendDropdownOpen && (
          <div
            className="
              absolute
              right-0
              top-full
              z-20
              mt-2
              w-32
              overflow-hidden
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-1
              shadow-lg
            "
          >
            {(["Spend", "Requests", "Tokens"] as const).map(
              (metric) => (
                <button
                  key={metric}
                  type="button"
                  onClick={() => {
                    setTrendMetric(metric);
                    setTrendDropdownOpen(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    rounded-md
                    px-3
                    py-2
                    text-left
                    text-sm
                    transition-colors
                    ${
                      trendMetric === metric
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-muted)]"
                    }
                  `}
                >
                  {metric}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>

    <div className="grid grid-cols-[2fr_1fr] gap-3">
      <TrendsChart
        title={selectedTrendConfig.title}
        data={selectedTrendConfig.data}
        series={selectedTrendConfig.series}
        type={trendChartType}
      />

      <TrendingCard
        items={selectedTrendConfig.trendingItems}
        onExplore={() => {
          console.log(`Explore ${trendMetric} trends`);
        }}
      />
    </div>

    {/* ================= API KEYS ================= */}
    <div className="mb-4 mt-8 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-[var(--color-text)]">
        API Keys
      </h2>

      {/* API Keys Metric Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() =>
            setApiKeyTrendDropdownOpen(
              !apiKeyTrendDropdownOpen,
            )
          }
          className="
            flex
            items-center
            gap-2
            rounded-lg
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            px-4
            py-2
            text-sm
            text-[var(--color-text)]
          "
        >
          {apiKeyTrendMetric}

          <ChevronDown
            size={16}
            className={`transition-transform ${
              apiKeyTrendDropdownOpen
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {apiKeyTrendDropdownOpen && (
          <div
            className="
              absolute
              right-0
              top-full
              z-20
              mt-2
              w-32
              overflow-hidden
              rounded-lg
              border
              border-[var(--color-border)]
              bg-[var(--color-surface)]
              p-1
              shadow-lg
            "
          >
            {(["Spend", "Requests", "Tokens"] as const).map(
              (metric) => (
                <button
                  key={metric}
                  type="button"
                  onClick={() => {
                    setApiKeyTrendMetric(metric);
                    setApiKeyTrendDropdownOpen(false);
                  }}
                  className={`
                    flex
                    w-full
                    items-center
                    rounded-md
                    px-3
                    py-2
                    text-left
                    text-sm
                    transition-colors
                    ${
                      apiKeyTrendMetric === metric
                        ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                        : "text-[var(--color-text)] hover:bg-[var(--color-muted)]"
                    }
                  `}
                >
                  {metric}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>

    <div className="grid grid-cols-[2fr_1fr] gap-3">
      <TrendsChart
        title={selectedApiKeyTrendConfig.title}
        data={selectedApiKeyTrendConfig.data}
        series={selectedApiKeyTrendConfig.series}
        type={trendChartType}
      />

      <TrendingCard
        items={selectedApiKeyTrendConfig.trendingItems}
        onExplore={() => {
          console.log(
            `Explore API Key ${apiKeyTrendMetric} trends`,
          );
        }}
      />
    </div>

    {/* ================= APPS ================= */}
<div className="mb-4 mt-8 flex items-center justify-between">
  <h2 className="text-lg font-semibold text-[var(--color-text)]">
    Apps
  </h2>

  {/* Apps Metric Dropdown */}
  <div className="relative">
    <button
      type="button"
      onClick={() =>
        setAppTrendDropdownOpen(
          !appTrendDropdownOpen,
        )
      }
      className="
        flex
        items-center
        gap-2
        rounded-lg
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-4
        py-2
        text-sm
        text-[var(--color-text)]
      "
    >
      {appTrendMetric}

      <ChevronDown
        size={16}
        className={`transition-transform ${
          appTrendDropdownOpen
            ? "rotate-180"
            : ""
        }`}
      />
    </button>

    {appTrendDropdownOpen && (
      <div
        className="
          absolute
          right-0
          top-full
          z-20
          mt-2
          w-32
          overflow-hidden
          rounded-lg
          border
          border-[var(--color-border)]
          bg-[var(--color-surface)]
          p-1
          shadow-lg
        "
      >
        {(["Spend", "Requests", "Tokens"] as const).map(
          (metric) => (
            <button
              key={metric}
              type="button"
              onClick={() => {
                setAppTrendMetric(metric);
                setAppTrendDropdownOpen(false);
              }}
              className={`
                flex
                w-full
                items-center
                rounded-md
                px-3
                py-2
                text-left
                text-sm
                transition-colors
                ${
                  appTrendMetric === metric
                    ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                    : "text-[var(--color-text)] hover:bg-[var(--color-muted)]"
                }
              `}
            >
              {metric}
            </button>
          ),
        )}
      </div>
    )}
  </div>
</div>

<div className="grid grid-cols-[2fr_1fr] gap-3">
  <TrendsChart
    title={selectedAppTrendConfig.title}
    data={selectedAppTrendConfig.data}
    series={selectedAppTrendConfig.series}
    type={trendChartType}
  />

  <TrendingCard
    items={selectedAppTrendConfig.trendingItems}
    onExplore={() => {
      console.log(
        `Explore App ${appTrendMetric} trends`,
      );
    }}
  />
</div>
  </div>

) : (
  <>
      <div className="grid grid-cols-5 gap-3">
        <ActivityMetricCard
          title="Total spend"
          value="$0.00"
          chartData={totalSpendChartData}
          hoveredIndex={spendHoveredIndex}
          onHoverChange={setSpendHoveredIndex}
        />

        <ActivityMetricCard
          title="Requests"
          value="3"
          chartData={requestsChartData}
          hoveredIndex={requestsHoveredIndex}
          onHoverChange={setRequestsHoveredIndex}
        />

        <ActivityMetricCard
          title="Token volume"
          value="3K"
          chartData={tokenVolumeChartData}
          hoveredIndex={tokenHoveredIndex}
          onHoverChange={setTokenHoveredIndex}
        />

        <ActivityMetricCard
          title="Cache hit rate"
          value="0.0%"
          chartData={cacheHitChartData}
          hoveredIndex={cacheHoveredIndex}
          onHoverChange={setCacheHoveredIndex}
        />

        <ActivityMetricCard
          title="Blended $/1M"
          value="$0.00"
          chartData={blendedChartData}
          hoveredIndex={blendedHoveredIndex}
          onHoverChange={setBlendedHoveredIndex}
        />
      </div>
<div className="mt-4 grid grid-cols-2 gap-3">
<TopInfoCard
  title="Top API Keys"
  rank="1"
  name="api builder"
  subtitle="sk-or-v1-550...04a"
  value="3K tok"
  dotColor="#e88b8b"
  onNameClick={() => setSelectedItem("api builder")}
  isMenuOpen={selectedItem === "api builder"}
  onCloseMenu={() => setSelectedItem(null)}
/>

<TopInfoCard
  title="Top Apps"
  rank="1"
  name="Unknown"
  value="3K tok"
  icon="U"
  onNameClick={() => setSelectedItem("Unknown")}
/>
{selectedItem === "Unknown" && (
  <UnknownDetailsPanel
    onClose={() => setSelectedItem(null)}
  />
)}
</div>
      {/* Page content will come here */}
       <div
      className="
        mt-4
        rounded-xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-3
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <h2
          className="
            text-[length:var(--font-size-lg)]
            font-medium
            text-[var(--color-text)]
          "
        >
          Usage by model
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

      <UsageByModelChart />
    </div>
 <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
  <UsageTypeChart />

  <RequestVolumeByModel />
</div>
<div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-2">
  <TokenBreakdown />
  <PromptTokenCaching />
 
</div>
 </>
  )}
    </div>
  );
}