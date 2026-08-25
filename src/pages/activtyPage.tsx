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
export function ActivityPage() {
  const [activeTab, setActiveTab] = useState("Overview");
const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [spendHoveredIndex, setSpendHoveredIndex] =
    useState<number | null>(null);

  const [requestsHoveredIndex, setRequestsHoveredIndex] =
    useState<number | null>(null);

  const [tokenHoveredIndex, setTokenHoveredIndex] =
    useState<number | null>(null);

  const [cacheHoveredIndex, setCacheHoveredIndex] =
    useState<number | null>(null);

  const [blendedHoveredIndex, setBlendedHoveredIndex] =
    useState<number | null>(null);

  // Total spend - straight line
  const totalSpendChartData = [
    { date: new Date("2026-07-25"), value: 10 },
    { date: new Date("2026-07-30"), value: 10 },
    { date: new Date("2026-08-05"), value: 10 },
    { date: new Date("2026-08-10"), value: 10 },
    { date: new Date("2026-08-15"), value: 10 },
    { date: new Date("2026-08-20"), value: 10 },
    { date: new Date("2026-08-24"), value: 10 },
  ];

  // Requests - spike at the end
  const requestsChartData = [
    { date: new Date("2026-07-25"), value: 0 },
    { date: new Date("2026-07-30"), value: 0 },
    { date: new Date("2026-08-05"), value: 0 },
    { date: new Date("2026-08-10"), value: 0 },
    { date: new Date("2026-08-15"), value: 0 },
    { date: new Date("2026-08-20"), value: 0 },
    { date: new Date("2026-08-24"), value: 100 },
  ];

  // Token volume - up and down
  const tokenVolumeChartData = [
    { date: new Date("2026-07-25"), value: 20 },
    { date: new Date("2026-07-30"), value: 20 },
    { date: new Date("2026-08-05"), value: 80 },
    { date: new Date("2026-08-10"), value: 20 },
    { date: new Date("2026-08-15"), value: 90 },
    { date: new Date("2026-08-20"), value: 20 },
    { date: new Date("2026-08-24"), value: 20 },
  ];

  // Cache hit rate - straight line
  const cacheHitChartData = [
    { date: new Date("2026-07-25"), value: 50 },
    { date: new Date("2026-07-30"), value: 50 },
    { date: new Date("2026-08-05"), value: 50 },
    { date: new Date("2026-08-10"), value: 50 },
    { date: new Date("2026-08-15"), value: 50 },
    { date: new Date("2026-08-20"), value: 50 },
    { date: new Date("2026-08-24"), value: 50 },
  ];

  // Blended - spike at the end
  const blendedChartData = [
    { date: new Date("2026-07-25"), value: 15 },
    { date: new Date("2026-07-30"), value: 15 },
    { date: new Date("2026-08-05"), value: 15 },
    { date: new Date("2026-08-10"), value: 15 },
    { date: new Date("2026-08-15"), value: 15 },
    { date: new Date("2026-08-20"), value: 15 },
    { date: new Date("2026-08-24"), value: 70 },
  ];

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
    </div>
  );
}