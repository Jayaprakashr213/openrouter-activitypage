import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  Download,
  FileText,
  Bookmark,
  ChevronRight,
  BarChart3,
  LineChart,
  ChartNoAxesCombined,
} from "lucide-react";
type ChartType = "bar" | "line" | "scatter";

export function ChartOptionsDropdown() {
  const [open, setOpen] = useState(false);
  const [showOther, setShowOther] = useState(true);
  const [cumulativeSum, setCumulativeSum] = useState(false);
  const [chartType, setChartType] = useState<ChartType>("bar");

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleDownloadCSV = () => {
    console.log("Download CSV");
    setOpen(false);
  };

  const handleDownloadPDF = () => {
    console.log("Download PDF");
    setOpen(false);
  };

  const handleSaveChart = () => {
    console.log("Save current chart");
    setOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* THREE DOT BUTTON */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex h-8 w-8 items-center justify-center
          rounded-l-lg
          text-[var(--color-text-secondary)]
          hover:bg-[var(--color-surface-secondary)]
        "
        aria-label="Chart options"
      >
        <MoreVertical size={18} />
      </button>

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute right-0 top-[calc(100%+8px)]
            z-50
            w-[320px]
            rounded-xl
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            p-5
            shadow-xl
          "
        >
          {/* SHOW OTHER */}
<div className="flex items-center justify-between">
  <span
    className="
      text-[length:var(--font-size-base)]
      text-[var(--color-text)]
    "
  >
    Show "Other"
  </span>

  <button
    type="button"
    onClick={() => setShowOther((prev) => !prev)}
    className={`
      relative h-8 w-14 shrink-0
      rounded-full
      transition-colors duration-200
      ${
        showOther
          ? "bg-[var(--color-primary)]"
          : "bg-[var(--color-border)]"
      }
    `}
  >
    <span
      className={`
        absolute top-1
        h-6 w-6
        rounded-full
        bg-white
        shadow-sm
        transition-all duration-200 ease-in-out
        ${
          showOther
            ? "left-7"
            : "left-1"
        }
      `}
    />
  </button>
</div>

{/* CUMULATIVE SUM */}
<div className="mt-5 flex items-center justify-between">
  <span
    className="
      text-[length:var(--font-size-base)]
      text-[var(--color-text-secondary)]
    "
  >
    Cumulative sum
  </span>

  <button
    type="button"
    onClick={() => setCumulativeSum((prev) => !prev)}
    className={`
      relative h-8 w-14 shrink-0
      rounded-full
      transition-colors duration-200
      ${
        cumulativeSum
          ? "bg-[var(--color-primary)]"
          : "bg-[var(--color-border)]"
      }
    `}
  >
    <span
      className={`
        absolute top-1
        h-6 w-6
        rounded-full
        bg-white
        shadow-sm
        transition-all duration-200 ease-in-out
        ${
          cumulativeSum
            ? "left-7"
            : "left-1"
        }
      `}
    />
  </button>
</div>
          {/* CHART TYPE */}
          <div className="mt-5 flex items-center justify-between">
            <span
              className="
                text-[length:var(--font-size-base)]
                text-[var(--color-text)]
              "
            >
              Chart type
            </span>

            <div className="flex items-center gap-1">
              {/* BAR */}
              <button
                onClick={() => setChartType("bar")}
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  transition-colors
                  ${
                    chartType === "bar"
                      ? "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
                  }
                `}
              >
                <BarChart3 size={19} />
              </button>

              {/* LINE */}
              <button
                onClick={() => setChartType("line")}
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  transition-colors
                  ${
                    chartType === "line"
                      ? "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
                  }
                `}
              >
                <LineChart size={19} />
              </button>

              {/* SCATTER */}
              <button
                onClick={() => setChartType("scatter")}
                className={`
                  flex h-9 w-9 items-center justify-center
                  rounded-lg
                  transition-colors
                  ${
                    chartType === "scatter"
                      ? "bg-[var(--color-surface-secondary)] text-[var(--color-text)]"
                      : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-secondary)]"
                  }
                `}
              >
                <ChartNoAxesCombined size={19} />
              </button>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="my-5 border-t border-[var(--color-border)]" />

          {/* DOWNLOAD CSV */}
          <button
            onClick={handleDownloadCSV}
            className="
              flex w-full items-center gap-3
              py-2
              text-left
              text-[length:var(--font-size-base)]
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-text)]
            "
          >
            <Download size={20} />

            <span>
              Download CSV
            </span>
          </button>

          {/* DOWNLOAD PDF */}
          <button
            onClick={handleDownloadPDF}
            className="
              flex w-full items-center justify-between
              py-3
              text-left
              text-[length:var(--font-size-base)]
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-text)]
            "
          >
            <div className="flex items-center gap-3">
              <FileText size={20} />

              <span>
                Download PDF
              </span>
            </div>

            <ChevronRight size={18} />
          </button>

          {/* DIVIDER */}
          <div className="my-4 border-t border-[var(--color-border)]" />

          {/* SAVE CURRENT CHART */}
          <button
            onClick={handleSaveChart}
            className="
              flex w-full items-center gap-3
              py-2
              text-left
              text-[length:var(--font-size-base)]
              text-[var(--color-text-secondary)]
              hover:text-[var(--color-text)]
            "
          >
            <Bookmark size={20} />

            <span>
              Save current chart
            </span>
          </button>
        </div>
      )}
    </div>
  );
}