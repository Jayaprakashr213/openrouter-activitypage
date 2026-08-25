export const subgroupOptions = [
  "Variant",
  "API Key",
  "Provider",
  "Origin",
  "Country",
  "Region",
  "API Skin",
  "Finish Reason",
  "Workspace",
  "User",
  "Organization",
  "Project",
  "Environment",
  "Application",
  "Model",
  "Model Family",
  "Endpoint",
  "Request Method",
  "Status Code",
  "Error Type",
  "Cache Status",
  "Source",
  "Client",
  "SDK",
  "IP Address",
  "User Agent",
  "Tags",
  "Metadata",
  "Deployment",
];export const chartData = Array.from({ length: 31 }, (_, index) => {
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
export const metricOptions = [
  "Request Count",
  "Total Usage ($)",
  "Tokens (Total)",
  "Tokens (Prompt)",
  "Tokens (Completion)",
  "Reasoning Tokens",
  "Cached Tokens",
  "Possible Cached Tokens",

  // More metrics
  "Generation Tokens",
  "Input Tokens",
  "Output Tokens",
  "Total Cost",
  "Average Cost",
  "Average Latency",
  "Latency (P50)",
  "Latency (P95)",
  "Latency (P99)",
  "Time to First Token",
  "Requests per Minute",
  "Error Count",
  "Error Rate",
  "Success Rate",
];
export const totalSpendChartData = [
    { date: new Date("2026-07-25"), value: 10 },
    { date: new Date("2026-07-30"), value: 10 },
    { date: new Date("2026-08-05"), value: 10 },
    { date: new Date("2026-08-10"), value: 10 },
    { date: new Date("2026-08-15"), value: 10 },
    { date: new Date("2026-08-20"), value: 10 },
    { date: new Date("2026-08-24"), value: 10 },
  ];

  // Requests - spike at the end
  export const requestsChartData = [
    { date: new Date("2026-07-25"), value: 0 },
    { date: new Date("2026-07-30"), value: 0 },
    { date: new Date("2026-08-05"), value: 0 },
    { date: new Date("2026-08-10"), value: 0 },
    { date: new Date("2026-08-15"), value: 0 },
    { date: new Date("2026-08-20"), value: 0 },
    { date: new Date("2026-08-24"), value: 100 },
  ];

  // Token volume - up and down
  export const tokenVolumeChartData = [
    { date: new Date("2026-07-25"), value: 20 },
    { date: new Date("2026-07-30"), value: 20 },
    { date: new Date("2026-08-05"), value: 80 },
    { date: new Date("2026-08-10"), value: 20 },
    { date: new Date("2026-08-15"), value: 90 },
    { date: new Date("2026-08-20"), value: 20 },
    { date: new Date("2026-08-24"), value: 20 },
  ];

  // Cache hit rate - straight line
  export const cacheHitChartData = [
    { date: new Date("2026-07-25"), value: 50 },
    { date: new Date("2026-07-30"), value: 50 },
    { date: new Date("2026-08-05"), value: 50 },
    { date: new Date("2026-08-10"), value: 50 },
    { date: new Date("2026-08-15"), value: 50 },
    { date: new Date("2026-08-20"), value: 50 },
    { date: new Date("2026-08-24"), value: 50 },
  ];

  // Blended - spike at the end
  export const blendedChartData = [
    { date: new Date("2026-07-25"), value: 15 },
    { date: new Date("2026-07-30"), value: 15 },
    { date: new Date("2026-08-05"), value: 15 },
    { date: new Date("2026-08-10"), value: 15 },
    { date: new Date("2026-08-15"), value: 15 },
    { date: new Date("2026-08-20"), value: 15 },
    { date: new Date("2026-08-24"), value: 70 },
  ];

  export const modelOptions = [
  "Model",
  "Provider",
  "Model Family",
  "Model Variant",
  "Model ID",
  "Model Name",
  "Model Version",
  "Provider Model",
  "Provider Name",
  "Model Type",
  "Model Category",
  "Context Length",
  "Input Modality",
  "Output Modality",
  "Reasoning Support",
  "Tool Support",
  "Vision Support",
  "Streaming Support",
  "Created At",
  "Updated At",
];
export const rollupOptions = [
  "Total",
  "Hourly",
  "Daily",
  "Weekly",
  "Monthly",
];

export const topBottomOptions = [
  "Top",
  "Bottom",
];

export const limitOptions = [
  "5",
  "10",
  "15",
  "20",
  "30",
  "50",
  "100",
];

export const rankByOptions = [
  "Current metric",
  "Requests",
  "Total Usage ($)",
  "Tokens (Total)",
  "Tokens (Prompt)",
  "Tokens (Completion)",
];
export const modelTrendData = [
  {
    date: "27 Jul",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "29 Jul",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "31 Jul",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "2 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "4 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "6 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "8 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "10 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "12 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "14 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "16 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "18 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "20 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
  {
    date: "22 Aug",
    gpt: 1,
    nemotron9b: 1,
    nemotron3: 1,
  },
  {
    date: "24 Aug",
    gpt: 0,
    nemotron9b: 0,
    nemotron3: 0,
  },
];

export const modelTrendSeries = [
  {
    key: "gpt",
    name: "gpt-oss-20b",
    color: "var(--color-chart-gpt)",
  },
  {
    key: "nemotron9b",
    name: "Nemotron Nano 9B V2",
    color: "var(--color-chart-nemotron-9b)",
  },
  {
    key: "nemotron3",
    name: "Nemotron 3 Nano Omni",
    color: "var(--color-chart-nemotron-3)",
  },
];
export const modelTokenTrendData = [
  { date: "27 Jul", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "29 Jul", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "31 Jul", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "2 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "4 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "6 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "8 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "10 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "12 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "14 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "16 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "18 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "20 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  {
    date: "22 Aug",
    gpt: 450,
    nemotron9b: 1400,
    nemotron3: 1150,
  },
  { date: "24 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
];

export const modelTokenTrendSeries = [
  {
    dataKey: "gpt",
    name: "gpt-oss-20b",
    color: "#2f80c0",
  },
  {
    dataKey: "nemotron9b",
    name: "Nemotron Nano 9B V2",
    color: "#82a91f",
  },
  {
    dataKey: "nemotron3",
    name: "Nemotron 3 Nano Omni",
    color: "#1f9d7a",
  },
];
export const modelSpendTrendData = [
  { date: "27 Jul", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "29 Jul", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "31 Jul", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "2 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "4 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "6 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "8 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "10 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "12 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "14 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "16 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "18 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "20 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
  { date: "22 Aug", gpt: 0.001, nemotron9b: 0.003, nemotron3: 0.001 },
  { date: "24 Aug", gpt: 0, nemotron9b: 0, nemotron3: 0 },
];

export const modelSpendTrendSeries = [
  {
    dataKey: "gpt",
    name: "gpt-oss-20b",
    color: "#2f80c0",
  },
  {
    dataKey: "nemotron9b",
    name: "Nemotron Nano 9B V2",
    color: "#82a91f",
  },
  {
    dataKey: "nemotron3",
    name: "Nemotron 3 Nano Omni",
    color: "#1f9d7a",
  },
];
export const apiKeyRequestTrendData = [
  { date: "26 Jul", apiBuilder: 0 },
  { date: "27 Jul", apiBuilder: 0 },
  { date: "28 Jul", apiBuilder: 0 },
  { date: "29 Jul", apiBuilder: 0 },
  { date: "30 Jul", apiBuilder: 0 },
  { date: "31 Jul", apiBuilder: 0 },
  { date: "1 Aug", apiBuilder: 0 },
  { date: "2 Aug", apiBuilder: 0 },
  { date: "3 Aug", apiBuilder: 0 },
  { date: "4 Aug", apiBuilder: 0 },
  { date: "5 Aug", apiBuilder: 0 },
  { date: "6 Aug", apiBuilder: 0 },
  { date: "7 Aug", apiBuilder: 0 },
  { date: "8 Aug", apiBuilder: 0 },
  { date: "9 Aug", apiBuilder: 0 },
  { date: "10 Aug", apiBuilder: 0 },
  { date: "11 Aug", apiBuilder: 0 },
  { date: "12 Aug", apiBuilder: 0 },
  { date: "13 Aug", apiBuilder: 0 },
  { date: "14 Aug", apiBuilder: 0 },
  { date: "15 Aug", apiBuilder: 0 },
  { date: "16 Aug", apiBuilder: 0 },
  { date: "17 Aug", apiBuilder: 0 },
  { date: "18 Aug", apiBuilder: 0 },
  { date: "19 Aug", apiBuilder: 0 },
  { date: "20 Aug", apiBuilder: 0 },
  { date: "21 Aug", apiBuilder: 3 },
  { date: "22 Aug", apiBuilder: 0 },
  { date: "23 Aug", apiBuilder: 0 },
  { date: "24 Aug", apiBuilder: 0 },
];

export const apiKeyRequestTrendSeries = [
  {
    key: "apiBuilder",
    name: "api builder",
    color: "#f5a623",
  },
];
export const apiKeyTokenTrendData = [
  { date: "26 Jul", apiBuilder: 0 },
  { date: "27 Jul", apiBuilder: 0 },
  { date: "28 Jul", apiBuilder: 0 },
  { date: "29 Jul", apiBuilder: 0 },
  { date: "30 Jul", apiBuilder: 0 },
  { date: "31 Jul", apiBuilder: 0 },
  { date: "1 Aug", apiBuilder: 0 },
  { date: "2 Aug", apiBuilder: 0 },
  { date: "3 Aug", apiBuilder: 0 },
  { date: "4 Aug", apiBuilder: 0 },
  { date: "5 Aug", apiBuilder: 0 },
  { date: "6 Aug", apiBuilder: 0 },
  { date: "7 Aug", apiBuilder: 0 },
  { date: "8 Aug", apiBuilder: 0 },
  { date: "9 Aug", apiBuilder: 0 },
  { date: "10 Aug", apiBuilder: 0 },
  { date: "11 Aug", apiBuilder: 0 },
  { date: "12 Aug", apiBuilder: 0 },
  { date: "13 Aug", apiBuilder: 0 },
  { date: "14 Aug", apiBuilder: 0 },
  { date: "15 Aug", apiBuilder: 0 },
  { date: "16 Aug", apiBuilder: 0 },
  { date: "17 Aug", apiBuilder: 0 },
  { date: "18 Aug", apiBuilder: 0 },
  { date: "19 Aug", apiBuilder: 0 },
  { date: "20 Aug", apiBuilder: 0 },
  { date: "21 Aug", apiBuilder: 3000 },
  { date: "22 Aug", apiBuilder: 0 },
  { date: "23 Aug", apiBuilder: 0 },
  { date: "24 Aug", apiBuilder: 0 },
];

export const apiKeyTokenTrendSeries = [
  {
    key: "apiBuilder",
    name: "api builder",
    color: "#f5a623",
  },
];
export const apiKeySpendTrendData = [
  { date: "26 Jul", apiBuilder: 0 },
  { date: "27 Jul", apiBuilder: 0 },
  { date: "28 Jul", apiBuilder: 0 },
  { date: "29 Jul", apiBuilder: 0 },
  { date: "30 Jul", apiBuilder: 0 },
  { date: "31 Jul", apiBuilder: 0 },
  { date: "1 Aug", apiBuilder: 0 },
  { date: "2 Aug", apiBuilder: 0 },
  { date: "3 Aug", apiBuilder: 0 },
  { date: "4 Aug", apiBuilder: 0 },
  { date: "5 Aug", apiBuilder: 0 },
  { date: "6 Aug", apiBuilder: 0 },
  { date: "7 Aug", apiBuilder: 0 },
  { date: "8 Aug", apiBuilder: 0 },
  { date: "9 Aug", apiBuilder: 0 },
  { date: "10 Aug", apiBuilder: 0 },
  { date: "11 Aug", apiBuilder: 0 },
  { date: "12 Aug", apiBuilder: 0 },
  { date: "13 Aug", apiBuilder: 0 },
  { date: "14 Aug", apiBuilder: 0 },
  { date: "15 Aug", apiBuilder: 0 },
  { date: "16 Aug", apiBuilder: 0 },
  { date: "17 Aug", apiBuilder: 0 },
  { date: "18 Aug", apiBuilder: 0 },
  { date: "19 Aug", apiBuilder: 0 },
  { date: "20 Aug", apiBuilder: 0 },
  { date: "21 Aug", apiBuilder: 0.0008 },
  { date: "22 Aug", apiBuilder: 0 },
  { date: "23 Aug", apiBuilder: 0 },
  { date: "24 Aug", apiBuilder: 0 },
];

export const apiKeySpendTrendSeries = [
  {
    key: "apiBuilder",
    name: "api builder",
    color: "#f5a623",
  },
];

// ================= APPS - SPEND =================

export const appSpendTrendData = [
  { date: "27 Jul", unknown: 0 },
  { date: "29 Jul", unknown: 0 },
  { date: "31 Jul", unknown: 0 },
  { date: "2 Aug", unknown: 0 },
  { date: "4 Aug", unknown: 0 },
  { date: "6 Aug", unknown: 0 },
  { date: "8 Aug", unknown: 0 },
  { date: "10 Aug", unknown: 0 },
  { date: "12 Aug", unknown: 0 },
  { date: "14 Aug", unknown: 0 },
  { date: "16 Aug", unknown: 0 },
  { date: "18 Aug", unknown: 0 },
  { date: "20 Aug", unknown: 0 },
  { date: "22 Aug", unknown: 0 },
  { date: "24 Aug", unknown: 0 },
];

export const appSpendTrendSeries = [
  {
    key: "unknown",
    label: "Unknown",
    color: "#ec4899",
  },
];


// ================= APPS - REQUESTS =================

export const appRequestTrendData = [
  { date: "27 Jul", unknown: 0 },
  { date: "29 Jul", unknown: 0 },
  { date: "31 Jul", unknown: 0 },
  { date: "2 Aug", unknown: 0 },
  { date: "4 Aug", unknown: 0 },
  { date: "6 Aug", unknown: 0 },
  { date: "8 Aug", unknown: 0 },
  { date: "10 Aug", unknown: 0 },
  { date: "12 Aug", unknown: 0 },
  { date: "14 Aug", unknown: 0 },
  { date: "16 Aug", unknown: 0 },
  { date: "18 Aug", unknown: 0 },
  { date: "20 Aug", unknown: 0 },
  { date: "22 Aug", unknown: 3 },
  { date: "24 Aug", unknown: 0 },
];

export const appRequestTrendSeries = [
  {
    key: "unknown",
    label: "Unknown",
    color: "#ec4899",
  },
];


// ================= APPS - TOKENS =================

export const appTokenTrendData = [
  { date: "27 Jul", unknown: 0 },
  { date: "29 Jul", unknown: 0 },
  { date: "31 Jul", unknown: 0 },
  { date: "2 Aug", unknown: 0 },
  { date: "4 Aug", unknown: 0 },
  { date: "6 Aug", unknown: 0 },
  { date: "8 Aug", unknown: 0 },
  { date: "10 Aug", unknown: 0 },
  { date: "12 Aug", unknown: 0 },
  { date: "14 Aug", unknown: 0 },
  { date: "16 Aug", unknown: 0 },
  { date: "18 Aug", unknown: 0 },
  { date: "20 Aug", unknown: 0 },
  { date: "22 Aug", unknown: 2900 },
  { date: "24 Aug", unknown: 0 },
];

export const appTokenTrendSeries = [
  {
    key: "unknown",
    label: "Unknown",
    color: "#ec4899",
  },
];