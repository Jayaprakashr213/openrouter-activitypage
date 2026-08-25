import { useState } from "react";
import { SiNvidia, SiOpenaigym } from "react-icons/si";
type UnknownDetailsPanelProps = {
  onClose: () => void;
};

// const tokenData = [
//   {
//     date: "Aug 21",
//     value: 3000,
//   },
// ];

const modelData = [
  {
    rank: "1",
    Icon: SiNvidia,
    name: "Nemotron Nano 9B V2",
    value: "1K",
  },
  {
    rank: "2",
    Icon: SiNvidia,
    name: "Nemotron 3 Nano Omni",
    value: "686",
  },
  {
    rank: "3",
    Icon: SiOpenaigym,
    name: "gpt-oss-20b",
    value: "362",
  },
];

export function UnknownDetailsPanel({
  onClose,
}: UnknownDetailsPanelProps) {
const [hoverPosition, setHoverPosition] = useState<{
  x: number;
  y: number;
} | null>(null);
  return (
   <div
  className="
    fixed
    right-0
    top-[var(--top-nav-height)]
    bottom-0
    z-50
    flex
    w-1/2
    flex-col
    border-l
    border-black/[0.05]
    bg-[var(--color-background)]
  "
>
      {/* Header */}
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-black/[0.05]
          px-5
          py-4
        "
      >
        <h2
          className="
            text-[length:var(--font-size-base)]
            font-semibold
            text-[var(--color-text)]
          "
        >
          Unknown
        </h2>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="
              rounded-lg
              border
              border-black/[0.08]
              px-4
              py-2
              text-sm
              text-[var(--color-text)]
              hover:bg-black/[0.03]
            "
          >
            Explore
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              text-[var(--color-text-secondary)]
              hover:opacity-70
            "
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        {/* Description */}
        <p
          className="
            text-[length:var(--font-size-base)]
            text-[var(--color-text-secondary)]
          "
        >
          Requests that did not identify an app.
        </p>

        {/* Tokens */}
        <div className="mt-6  border-y border-black/[0.05] mb-6 py-12">
          <div
            className="
              flex
              items-center
              gap-1
              text-[length:var(--font-size-base)]
              text-[var(--color-text)]
            "
          >
            <span>Tokens</span>

            <span className="text-[var(--color-text-secondary)]">
              (selected range)
            </span>
          </div>

          <div className="mt-3 flex items-center gap-12">
            <span className="text-[var(--color-text-secondary)]">
              Total
            </span>

            <span className="text-[var(--color-text)]">
              3K tok
            </span>
          </div>

          {/* Chart */}
         <div
  className="
    relative
    mt-6
    h-30
    cursor-pointer
  "
  onMouseMove={(event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setHoverPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }}
  onMouseLeave={() => setHoverPosition(null)}
>
            {/* Y axis */}
            <div
              className="
                absolute
                inset-y-0
                left-0
                flex
                flex-col
                justify-between
                text-sm
                text-[var(--color-text-secondary)]
              "
            >
              <span>3K</span>
              <span>2K</span>
              <span>1K</span>
              <span>650</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div
              className="
                absolute
                bottom-0
                left-12
                right-0
                top-0
              "
            >
              <div
                className="
                  absolute
                  inset-0
                  flex
                  flex-col
                  justify-between
                "
              >
                <div className="border-t border-dashed border-black/[0.08]" />
                <div className="border-t border-dashed border-black/[0.08]" />
                <div className="border-t border-dashed border-black/[0.08]" />
                <div className="border-t border-dashed border-black/[0.08]" />
                <div className="border-t border-dashed border-black/[0.08]" />
              </div>

              {/* 3K bar */}
              <div
                className="
                  absolute
                  bottom-0
                  left-[10%]
                  h-full
                  w-[80%]
                  bg-blue-600
                "
              />

              {/* Tooltip */}
           {hoverPosition && (
  <>
    {/* Date tooltip */}
    <div
      className="
        absolute
        z-20
        rounded-md
        bg-[var(--color-text)]
        px-2
        py-1
        text-xs
        text-[var(--color-background)]
        pointer-events-none
      "
      style={{
        left: `${hoverPosition.x}px`,
        top: `${Math.max(0, hoverPosition.y - 32)}px`,
        transform: "translateX(-50%)",
      }}
    >
      Aug 21
    </div>

    {/* Tokens tooltip */}
    <div
      className="
        absolute
        z-20
        flex
        w-62
        items-center
        justify-between
        rounded-lg
        border
        border-black/[0.08]
        bg-[var(--color-surface)]
        px-3
        py-2
        text-sm
        text-[var(--color-text)]
        shadow-lg
        pointer-events-none
      "
      style={{
        left: `${hoverPosition.x}px`,
        top: `${hoverPosition.y}px`,
        transform: "translateX(-50%)",
      }}
    >
      <span>Tokens</span>
      <span>3K</span>
    </div>
  </>
)}
            </div>

            {/* X axis */}
            <span
              className="
                absolute
                bottom-[-1.5rem]
                left-1/2
                -translate-x-1/2
                text-sm
                text-[var(--color-text-secondary)]
              "
            >
              Aug 21
            </span>
          </div>
        </div>

        {/* Model breakdown */}
        <div className="pt-8">
          <h3
            className="
              text-[length:var(--font-size-base)]
              font-semibold
              text-[var(--color-text)]
            "
          >
            By model · Tokens (Total)
          </h3>

          <div className="mt-6 space-y-8">
            {modelData.map((model) => (
              <div
                key={model.rank}
                
                className="flex items-center"
              >
                <span
                  className="
                    w-8
                    text-sm
                    text-[var(--color-text-secondary)]
                  "
                >
                  {model.rank}
                </span>

             <span className="mr-3 flex items-center">
  <model.Icon
    className="
      text-[length:var(--font-size-base)]
      text-[var(--color-text)]
    "
  />
</span>

                <span
                  className="
                    text-[length:var(--font-size-base)]
                    text-[var(--color-text)]
                  "
                >
                  {model.name}
                </span>

                <span
                  className="
                    ml-auto
                    text-[length:var(--font-size-base)]
                    text-[var(--color-text)]
                  "
                >
                  {model.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}