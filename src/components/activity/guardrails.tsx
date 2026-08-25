import { Shield } from "lucide-react";

export default function Guardrails() {
  return (
    <div
      className="
        rounded-xl
        border
        mt-6
        border-dashed
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        min-h-[315px]
        flex
        items-center
        justify-center
      "
    >
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div
          className="
            mb-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-surface-secondary)]
          "
        >
          <Shield
            size={20}
            className="text-[var(--color-text-secondary)]"
          />
        </div>

        {/* Title */}
        <h2
          className="
            text-[length:var(--font-size-lg)]
            font-medium
            text-[var(--color-text)]
          "
        >
          Set up Guardrails
        </h2>

        {/* Description */}
        <p
          className="
            mt-2
            max-w-[430px]
            text-[length:var(--font-size-base)]
            leading-6
            text-[var(--color-text-secondary)]
          "
        >
          Protect your API usage with content filters, spending
          <br />
          limits, and usage policies.
          <br />
          Once configured, enforcement stats will appear here.
        </p>

        {/* Button */}
        <button
          className="
            mt-6
            rounded-md
            cursor-pointer
            bg-[var(--color-primary)]
            px-5
            py-2.5
            text-[length:var(--font-size-base)]
            font-medium
            text-white
            transition
            hover:bg-[var(--color-primary-hover)]
          "
        >
          Configure
        </button>
      </div>
    </div>
  );
}