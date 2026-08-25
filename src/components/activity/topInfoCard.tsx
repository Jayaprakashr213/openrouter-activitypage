type TopInfoCardProps = {
  title: string;
  rank: string;
  name: string;
  subtitle?: string;
  value: string;
  dotColor?: string;
  icon?: string;

  onNameClick?: () => void;

  isMenuOpen?: boolean;
  onCloseMenu?: () => void;
};

export function TopInfoCard({
  title,
  rank,
  name,
  subtitle,
  value,
  dotColor = "#e88b8b",
  icon,
  onNameClick,
  isMenuOpen = false,
  onCloseMenu,
}: TopInfoCardProps) {
  return (
    <div
      className="
        relative
        rounded-lg
        border
        border-black/[0.05]
        bg-[var(--color-surface)]
        p-4
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[var(--color-text)]">
          {title}
        </h3>

        <button
          type="button"
          className="
            text-[length:var(--font-size-base)]
            text-[var(--color-text)]
            underline
            underline-offset-2
            hover:opacity-70
          "
        >
          Explore ›
        </button>
      </div>

      {/* Content */}
      <div className="mt-5 flex items-center">
        {/* Rank */}
        <span className="w-7 text-sm text-[var(--color-text-secondary)]">
          {rank}
        </span>

        {/* Dot / Icon */}
        <div className="flex w-6 items-center justify-center">
          {icon ? (
            <span className="text-sm text-[var(--color-text-secondary)]">
              {icon}
            </span>
          ) : (
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: dotColor }}
            />
          )}
        </div>

        {/* Name + subtitle */}
        <div className="relative min-w-0 flex-1">
         <button
  type="button"
  onClick={onNameClick}
  className={`
    block
    w-full
    text-left
    text-sm
    text-[var(--color-text)]
    ${
      onNameClick
        ? "cursor-pointer hover:opacity-70"
        : "cursor-default"
    }
  `}
>
  {name}
</button>

          {subtitle && (
            <p className="mt-1 truncate text-sm text-[var(--color-text-secondary)]">
              {subtitle}
            </p>
          )}

          {/* API Builder popup */}
          {isMenuOpen && (
            <div
              className="
                absolute
                left-0
                top-7
                z-50
                w-50
                rounded-lg
                border
                border-black/[0.08]
                bg-[var(--color-surface)]
                py-1
                shadow-lg
              "
            >
              {/* Popup header */}
              <div className="flex items-center justify-between px-3 pb-1">
                <span
                  className="
                    text-xs
                    uppercase
                    text-[var(--color-text-secondary)]
                  "
                >
                  {name}
                </span>

                <button
                  type="button"
                  onClick={onCloseMenu}
                  className="
                    cursor-pointer
                    text-[var(--color-text-secondary)]
                    hover:opacity-70
                  "
                >
                  ×
                </button>
              </div>

              {/* View logs */}
              <button
                type="button"
                className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  gap-1
                  px-3
                  py-1
                  text-left
                  text-sm
                  text-[var(--color-text)]
                  hover:bg-black/[0.04]
                "
              >
                ↗ View logs
              </button>

              {/* Open in Explorer */}
              <button
                type="button"
                className="
                  flex
                  w-full
                  cursor-pointer
                  items-center
                  gap-2
                  px-3
                  py-1
                  text-left
                  text-sm
                  text-[var(--color-text)]
                  hover:bg-black/[0.04]
                "
              >
                ▥ Open in Explorer
              </button>
            </div>
          )}
        </div>

        {/* Right value */}
        <p className="ml-auto text-sm text-[var(--color-text)]">
          {value}
        </p>
      </div>
      
    </div>
  );
}