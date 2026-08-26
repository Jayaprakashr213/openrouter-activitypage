import {
  LayoutGrid,
  KeyRound,
  ShieldCheck,
  Database,
  ArrowRightLeft,
  SlidersHorizontal,
  Puzzle,
  Eye,
  Tag,
  Settings,
  User,
  Activity,
  List,
  CreditCard,
  LockKeyhole,
  Shield,
} from "lucide-react";

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
  isBottomLegend = false,
}: {
  color: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  isBottomLegend?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        cursor-pointer
        items-center
        gap-2
        bg-transparent
        p-0
        ${
          isBottomLegend
            ? "text-[11px] sm:text-[length:var(--font-size-sm)]"
            : "text-[length:var(--font-size-sm)]"
        }
      `}
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
export const navItems = [
  "Home",
  "Models",
  "Benchmarks",
  "Chat",
  "Rankings",
  "Apps",
  "Enterprise",
  "Docs",
];

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

export const mainItems = [
  {
    label: "Overview",
    icon: LayoutGrid,
  },
  {
    label: "API Keys",
    icon: KeyRound,
  },
  {
    label: "Guardrails",
    icon: ShieldCheck,
  },
  {
    label: "BYOK",
    icon: Database,
  },
  {
    label: "Routing",
    icon: ArrowRightLeft,
  },
  {
    label: "Presets",
    icon: SlidersHorizontal,
  },
  {
    label: "Plugins",
    icon: Puzzle,
  },
  {
    label: "Observability",
    icon: Eye,
  },
  {
    label: "Classifiers",
    icon: Tag,
    badge: "Beta",
  },
  {
    label: "Settings",
    icon: Settings,
  },
];

export const accountItems = [
  {
    label: "Profile",
    icon: User,
  },
  {
    label: "Activity",
    icon: Activity,
  },
  {
    label: "Logs",
    icon: List,
  },
  {
    label: "Credits",
    icon: CreditCard,
  },
  {
    label: "Management Keys",
    icon: KeyRound,
  },
  {
    label: "Privacy",
    icon: LockKeyhole,
  },
  {
    label: "Preferences",
    icon: Shield,
  },
];
export const commonTrendDates = [
  "26 Jul",
  "27 Jul",
  "28 Jul",
  "29 Jul",
  "30 Jul",
  "31 Jul",
  "1 Aug",
  "2 Aug",
  "3 Aug",
  "4 Aug",
  "5 Aug",
  "6 Aug",
  "7 Aug",
  "8 Aug",
  "9 Aug",
  "10 Aug",
  "11 Aug",
  "12 Aug",
  "13 Aug",
  "14 Aug",
  "15 Aug",
  "16 Aug",
  "17 Aug",
  "18 Aug",
  "19 Aug",
  "20 Aug",
  "21 Aug",
  "22 Aug",
  "23 Aug",
  "24 Aug",
];
const createTrendData = <T extends Record<string, number>>(
  values: Record<string, Partial<T>>,
) => {
  return commonTrendDates.map(
    (date): { date: string } & Partial<T> => ({
      date,
      ...(values[date] ?? {}),
    }),
  );
};
export const modelTrendData = createTrendData({
  "22 Aug": {
    gpt: 1,
    nemotron9b: 1,
    nemotron3: 1,
  },
}).map((item) => ({
  date: item.date,
  gpt: item.gpt ?? 0,
  nemotron9b: item.nemotron9b ?? 0,
  nemotron3: item.nemotron3 ?? 0,
}));

export const modelTrendSeries = [
  {
    key: "gpt",
    label: "gpt-oss-20b",
    color: "var(--color-chart-gpt)",
  },
  {
    key: "nemotron9b",
    label: "Nemotron Nano 9B V2",
    color: "var(--color-chart-nemotron-9b)",
  },
  {
    key: "nemotron3",
    label: "Nemotron 3 Nano Omni",
    color: "var(--color-chart-nemotron-3)",
  },
];
export const modelTokenTrendData = createTrendData({
  "22 Aug": {
    gpt: 450,
    nemotron9b: 1400,
    nemotron3: 1150,
  },
}).map((item) => ({
  date: item.date,
  gpt: item.gpt ?? 0,
  nemotron9b: item.nemotron9b ?? 0,
  nemotron3: item.nemotron3 ?? 0,
}));
export const modelTokenTrendSeries = [
  {
    key: "gpt",
    label: "gpt-oss-20b",
    color: "#2f80c0",
  },
  {
    key: "nemotron9b",
    label: "Nemotron Nano 9B V2",
    color: "#82a91f",
  },
  {
    key: "nemotron3",
    label: "Nemotron 3 Nano Omni",
    color: "#1f9d7a",
  },
];
export const modelSpendTrendData = createTrendData({
  "22 Aug": {
    gpt: 0.001,
    nemotron9b: 0.003,
    nemotron3: 0.001,
  },
}).map((item) => ({
  date: item.date,
  gpt: item.gpt ?? 0,
  nemotron9b: item.nemotron9b ?? 0,
  nemotron3: item.nemotron3 ?? 0,
}));

export const modelSpendTrendSeries = [
  {
    key: "gpt",
    label: "gpt-oss-20b",
    color: "#2f80c0",
  },
  {
    key: "nemotron9b",
    label: "Nemotron Nano 9B V2",
    color: "#82a91f",
  },
  {
    key: "nemotron3",
    label: "Nemotron 3 Nano Omni",
    color: "#1f9d7a",
  },
];
export const apiKeyRequestTrendData = commonTrendDates.map(
  (date) => ({
    date,
    apiBuilder: date === "21 Aug" ? 1 : 0,
  }),
);

export const apiKeyRequestTrendSeries = [
  {
    key: "apiBuilder",
    label: "api builder",
    color: "#f5a623",
  },
];
export const apiKeyTokenTrendData = commonTrendDates.map(
  (date) => ({
    date,
    apiBuilder: date === "21 Aug" ? 3000 : 0,
  }),
);

export const apiKeyTokenTrendSeries = [
  {
    key: "apiBuilder",
    label: "api builder",
    color: "#f5a623",
  },
];
export const apiKeySpendTrendData = commonTrendDates.map(
  (date) => ({
    date,
    apiBuilder: date === "21 Aug" ? 0.0008 : 0,
  }),
);

export const apiKeySpendTrendSeries = [
  {
    key: "apiBuilder",
    label: "api builder",
    color: "#f5a623",
  },
];

export const appSpendTrendData = commonTrendDates.map(
  (date) => ({
    date,
    unknown: 0,
  }),
);

export const appSpendTrendSeries = [
  {
    key: "unknown",
    label: "Unknown",
    color: "#ec4899",
  },
];


// ================= APPS - REQUESTS =================
export const appRequestTrendData = commonTrendDates.map(
  (date) => ({
    date,
    unknown: date === "22 Aug" ? 3 : 0,
  }),
);

export const appRequestTrendSeries = [
  {
    key: "unknown",
    label: "Unknown",
    color: "#ec4899",
  },
];


// ================= APPS - TOKENS =================
export const appTokenTrendData = commonTrendDates.map(
  (date) => ({
    date,
    unknown: date === "22 Aug" ? 2900 : 0,
  }),
);

export const appTokenTrendSeries = [
  {
    key: "unknown",
    label: "Unknown",
    color: "#ec4899",
  },
];