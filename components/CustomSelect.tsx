"use client";

import { cn } from "@/lib/cn";

type CustomSelectProps = {
  label: string;
  options: string[];
  required?: boolean;
  placeholder?: string;
};

export default function CustomSelect({
  label,
  options,
  required,
  placeholder = "Select...",
}: CustomSelectProps) {
  return (
    <label className="block">
      <span className="section-label mb-2 block">
        {label}
        {required && "*"}
      </span>
      <select
        required={required}
        className={cn(
          "w-full border border-white/15 bg-transparent px-4 py-3 text-sm",
          "focus:border-white/40 focus:outline-none"
        )}
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-[#101010]">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
