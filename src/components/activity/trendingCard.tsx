
import { TrendingUp, ArrowUp, ChevronRight } from "lucide-react";

export type TrendingItem = {
  id: string;
  name: string;
  subtitle: string;
  icon?: React.ReactNode;
  color?: string;
  trend?: "new" | "up" | "down";
};

type TrendingCardProps = {
  items?: TrendingItem[];
  onExplore?: () => void;
};

export function TrendingCard({
  items = [],
  onExplore,
}: TrendingCardProps) {
  const isEmpty = items.length === 0;

  return (
    <div className="flex h-full min-h-[240px] flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4">
        <h3 className="text-lg font-semibold text-[var(--color-text)]">
          Trending
        </h3>

        <button
          onClick={onExplore}
          className="flex items-center gap-1 text-sm text-[var(--color-text)] hover:text-[var(--color-primary)]"
        >
          Explore
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {isEmpty ? (
          <div className="flex flex-1 items-center justify-center px-4">
            <p className="text-sm text-[var(--color-text-secondary)]">
              No meaningful trend vs prior period
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6 px-4 py-8">
            {items.map((item) => (
              <TrendingItemRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TrendingItemRow({
  item,
}: {
  item: TrendingItem;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        {item.icon ? (
          <div className="flex h-7 w-7 shrink-0 items-center justify-center">
            {item.icon}
          </div>
        ) : (
          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{
              backgroundColor: item.color || "var(--color-primary)",
            }}
          />
        )}

        <div className="min-w-0">
          <p className="truncate text-base text-[var(--color-text)]">
            {item.name}
          </p>

          <p className="truncate text-sm text-[var(--color-text-secondary)]">
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-6">
        {/* Sparkline */}
        <div className="flex items-end gap-[1px]">
          <div className="h-[2px] w-10 bg-[#1f9d7a]" />
          <div className="h-[2px] w-1 bg-[#1f9d7a]" />
          <div className="h-3 w-[2px] bg-[#1f9d7a]" />
          <div className="h-[7px] w-[2px] bg-[#1f9d7a]" />
        </div>

        {/* Status */}
        <div className="flex items-center gap-1 text-[#168a68]">
          <ArrowUp size={15} />
          <span className="text-base">New</span>
        </div>
      </div>
    </div>
  );
}