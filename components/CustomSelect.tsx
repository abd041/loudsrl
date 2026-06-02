"use client";

import { cn } from "@/lib/cn";

type CustomSelectProps = {
  label: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  theme?: "dark" | "light";
};

export default function CustomSelect({
  label,
  options,
  required,
  placeholder = "Select...",
  value = "",
  onChange,
  theme = "dark",
}: CustomSelectProps) {
  const isLight = theme === "light";

  return (
    <label className="block">
      <span
        className={cn(
          "section-label mb-2 block",
          isLight && "text-black/50"
        )}
      >
        {label}
        {required && "*"}
      </span>
      <select
        required={required}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "w-full border bg-transparent px-4 py-3 text-sm focus:outline-none",
          isLight
            ? "border-black/15 text-black focus:border-black/40"
            : "border-white/15 focus:border-white/40"
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className={isLight ? "bg-white text-black" : "bg-[#101010]"}
          >
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
