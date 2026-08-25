interface ActivityTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ["Overview", "Trends", "Explore", "Guardrails"];

export function ActivityTabs({
  activeTab,
  onTabChange,
}: ActivityTabsProps) {
  return (
    <div className="mt-5 border-b border-[var(--color-border)]">
      <div className="flex items-center gap-1">
        {tabs.map((tab) => {
          const active = activeTab === tab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={`
                relative
                px-4
                py-3
                text-[length:var(--font-size-base)]
                transition-colors
                ${
                  active
                    ? "text-[var(--color-primary)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
                }
              `}
            >
              {tab}

              {active && (
                <span
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-0.5
                    w-full
                    bg-[var(--color-primary)]
                  "
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}