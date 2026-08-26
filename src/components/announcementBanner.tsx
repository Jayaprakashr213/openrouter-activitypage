import { Sparkles, X } from "lucide-react";

type AnnouncementBannerProps = {
  onClose: () => void;
};

export function AnnouncementBanner({
  onClose,
}: AnnouncementBannerProps) {
  return (
 <div
  className="
    fixed
    inset-x-0
    top-0
    z-50
    flex
    min-h-12
    items-center
    justify-center
    border-b
   border-[#c9d3e8]
bg-[#eef1f7]
    px-4
    py-2
    text-xs
    text-[var(--color-text)]
    sm:px-12
    sm:py-0
    sm:text-sm
  "
>   
      <div
        className="
          flex
          items-center
          justify-center
          gap-1.5
          pr-8
          text-center
          sm:gap-2
          sm:pr-0
        "
      >
        <Sparkles
          size={16}
          className="
            shrink-0
            text-[var(--color-primary)]
          "
        />

        <span className="leading-5">
          Gemini 3.7 Flash is 75% off for a limited time.{" "}

          <button
            type="button"
            className="
              font-medium
              underline
              underline-offset-2
              hover:text-[var(--color-primary)]
            "
          >
            See all discounted models here
          </button>
        </span>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close announcement"
        className="
          absolute
          right-2
          top-1/2
          flex
          h-8
          w-8
          -translate-y-1/2
          items-center
          justify-center
          rounded-md
          text-[var(--color-text-secondary)]
          hover:bg-[var(--color-surface)]
          hover:text-[var(--color-text)]
          sm:right-4
        "
      >
        <X size={16} />
      </button>
    </div>
  );
}