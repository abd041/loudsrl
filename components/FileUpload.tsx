"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/cn";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 2 * 1024 * 1024;

type FileUploadProps = {
  label?: string;
  theme?: "dark" | "light";
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
};

export default function FileUpload({
  label = "ATTACH FILES",
  theme = "dark",
  files,
  onChange,
  error,
}: FileUploadProps) {
  const isLight = theme === "light";
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const [hint, setHint] = useState("");

  const addFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;

    const next = [...files];
    const rejected: string[] = [];

    for (const file of Array.from(incoming)) {
      if (next.length >= MAX_FILES) {
        rejected.push("Maximum number of files reached.");
        break;
      }
      if (file.size > MAX_FILE_BYTES) {
        rejected.push(`${file.name} exceeds 2 MB.`);
        continue;
      }
      const allowed =
        file.type.startsWith("image/") || file.type === "application/pdf";
      if (!allowed) {
        rejected.push(`${file.name}: unsupported file type.`);
        continue;
      }
      const duplicate = next.some(
        (existing) =>
          existing.name === file.name &&
          existing.size === file.size &&
          existing.lastModified === file.lastModified
      );
      if (!duplicate) next.push(file);
    }

    onChange(next);
    setHint(rejected[0] ?? "");
  };

  const removeFile = (index: number) => {
    onChange(files.filter((_, i) => i !== index));
  };

  return (
    <div className="block">
      <span
        className={cn(
          "section-label mb-2 block",
          isLight && "text-black/50"
        )}
      >
        {label}
      </span>
      <label
        htmlFor={inputId}
        className={cn(
          "flex min-h-[120px] cursor-pointer flex-col items-center justify-center border border-dashed px-4 py-8 text-center text-sm transition",
          isLight
            ? "border-black/15 text-black/50 hover:border-black/35"
            : "border-white/20 text-white/50 hover:border-white/40"
        )}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          addFiles(event.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          multiple
          className="sr-only"
          aria-label={label}
          accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
          onChange={(event) => {
            addFiles(event.target.files);
            event.target.value = "";
          }}
        />
        Drop files here or click to upload
        <span className="mt-2 text-xs opacity-70">
          Up to {MAX_FILES} files, 2 MB each (images or PDF)
        </span>
      </label>

      {files.length > 0 ? (
        <ul className="mt-3 space-y-2" aria-live="polite">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.lastModified}`}
              className={cn(
                "flex items-center justify-between gap-3 text-sm",
                isLight ? "text-black/80" : "text-white/80"
              )}
            >
              <span className="truncate">
                {file.name}{" "}
                <span className="opacity-60">
                  ({(file.size / 1024).toFixed(0)} KB)
                </span>
              </span>
              <button
                type="button"
                className={cn(
                  "shrink-0 text-xs uppercase tracking-wider underline-offset-2 hover:underline",
                  isLight ? "text-black" : "text-white"
                )}
                onClick={() => removeFile(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {hint || error ? (
        <p
          className={cn("mt-2 text-sm", isLight ? "text-red-700" : "text-red-300")}
          role="alert"
        >
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}
