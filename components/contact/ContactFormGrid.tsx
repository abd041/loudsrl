"use client";

import { ChevronDown, CirclePlus, Plus } from "lucide-react";
import { useRef, useState } from "react";
import {
  budgetOptions,
  careerPositionOptions,
  contactFieldPlaceholders,
  deliverableOptions,
  type ContactTabId,
} from "@/data/contact";
import { cn } from "@/lib/cn";
import { submitContact } from "@/lib/submitContact";

const CELL =
  "relative min-h-[170px] border-r border-b border-[#d9d9d9] p-4 lg:p-10";
const DESC_CELL = "min-h-[170px] border-r border-b border-[#d9d9d9] p-4 lg:p-10";
const LABEL = "!font-mono text-xs opacity-50 mb-3 block";
const TEXT_FIELD =
  "w-full min-h-16 resize-none bg-transparent p-0 text-sm font-medium leading-[140%] outline-0 placeholder:text-black/20";

function SubmitArrow() {
  return (
    <svg
      viewBox="0 0 50 50"
      width={32}
      height={32}
      className="fill-none stroke-current"
      aria-hidden
    >
      <circle
        cx="25"
        cy="25"
        r="24"
        stroke="currentColor"
        fill="none"
        strokeWidth={1}
      />
      <g transform="translate(7, 10)">
        <path
          d="M 9 15 L 27.45 15"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
        <path
          d="M 27 15 L 21 9"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
        <path
          d="M 27 15 L 21 21"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        />
      </g>
    </svg>
  );
}

function PillMultiSelect({
  options,
  selected,
  onToggle,
  idPrefix,
}: {
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  idPrefix: string;
}) {
  return (
    <div className="flex flex-wrap gap-2.5 text-sm font-medium leading-[120%] tracking-[0.03rem] sm:leading-[140%]">
      {options.map((opt) => {
        const isSelected = selected.includes(opt);
        return (
          <div key={opt}>
            <input
              id={`${idPrefix}-${opt.replace(/\s+/g, "_")}`}
              type="checkbox"
              className="hidden"
              checked={isSelected}
              onChange={() => onToggle(opt)}
            />
            <label
              htmlFor={`${idPrefix}-${opt.replace(/\s+/g, "_")}`}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-[50px] border border-black/15 py-1.5 pl-3 pr-5 transition-all duration-300",
                isSelected
                  ? "border-black bg-black text-white"
                  : "bg-white text-black"
              )}
            >
              {isSelected ? (
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-white"
                  aria-hidden
                />
              ) : (
                <Plus size={16} strokeWidth={1} aria-hidden />
              )}
              {opt}
            </label>
          </div>
        );
      })}
    </div>
  );
}

type ContactFormGridProps = {
  mode: ContactTabId;
};

export default function ContactFormGrid({ mode }: ContactFormGridProps) {
  const isCareer = mode === "career";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [projectType, setProjectType] = useState("");
  const [industry, setIndustry] = useState("");
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [budget, setBudget] = useState("");

  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [position, setPosition] = useState("");

  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const toggleInList = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const onFiles = (incoming: FileList | null) => {
    if (!incoming?.length) return;
    const next = [...files];
    for (const file of Array.from(incoming)) {
      if (next.length >= 5) break;
      if (file.size > 2 * 1024 * 1024) continue;
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        continue;
      }
      next.push(file);
    }
    setFiles(next);
  };

  const resetForm = () => {
    setProjectType("");
    setIndustry("");
    setDeliverables([]);
    setBudget("");
    setFullName("");
    setCountry("");
    setSkills([]);
    setPosition("");
    setDescription("");
    setEmail("");
    setFiles([]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const result = await submitContact(
      isCareer
        ? {
            formKind: "career",
            fullName,
            country,
            skills,
            position,
            description,
            email,
            companyWebsite: honeypot,
            files,
          }
        : {
            formKind: "business",
            projectType,
            industry,
            deliverables,
            budget,
            description,
            email,
            companyWebsite: honeypot,
            files,
          }
    );

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    resetForm();
  };

  const descriptionPlaceholder = isCareer
    ? contactFieldPlaceholders.careerDescription
    : contactFieldPlaceholders.description;

  return (
    <form
      key={mode}
      noValidate
      onSubmit={handleSubmit}
      className="mt-9 grid grid-cols-2 overflow-hidden border-l border-t border-[#d9d9d9] lg:grid-cols-3"
      aria-busy={status === "loading"}
    >
      <div className="sr-only" aria-hidden>
        <label htmlFor="companyWebsite">Company website</label>
        <input
          id="companyWebsite"
          name="companyWebsite"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {isCareer ? (
        <>
          <div className={CELL}>
            <label className={LABEL} htmlFor="full-name">
              YOUR FULL NAME*
            </label>
            <textarea
              id="full-name"
              name="full-name"
              required
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={TEXT_FIELD}
              placeholder={contactFieldPlaceholders.fullName}
            />
          </div>

          <div className={CELL}>
            <label className={LABEL} htmlFor="country">
              COUNTRY*
            </label>
            <textarea
              id="country"
              name="country"
              required
              autoComplete="country-name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={TEXT_FIELD}
              placeholder={contactFieldPlaceholders.country}
            />
          </div>

          <div className={CELL}>
            <label className={LABEL} htmlFor="skills">
              SKILLS*
            </label>
            <PillMultiSelect
              idPrefix="multiselection-skills"
              options={deliverableOptions}
              selected={skills}
              onToggle={(value) => toggleInList(value, setSkills)}
            />
          </div>

          <div className={CELL}>
            <label className={LABEL} htmlFor="position">
              POSITION*
            </label>
            <div className="relative">
              <div className="pointer-events-none flex w-full items-center justify-between gap-2 border border-black/15 bg-white px-4 py-2 text-sm">
                <span className={position ? "text-black" : "text-black/40"}>
                  {position || "Select the position you are applying for"}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1}
                  className="shrink-0 text-black/50"
                  aria-hidden
                />
              </div>
              <select
                id="position"
                name="position"
                required
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Select the position you are applying for"
              >
                <option value="" disabled>
                  Select the position you are applying for
                </option>
                {careerPositionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={CELL}>
            <label className={LABEL} htmlFor="project-type">
              PROJECT TYPE*
            </label>
            <textarea
              id="project-type"
              name="project-type"
              required
              autoComplete="off"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className={TEXT_FIELD}
              placeholder={contactFieldPlaceholders.projectType}
            />
          </div>

          <div className={CELL}>
            <label className={LABEL} htmlFor="industry">
              INDUSTRY*
            </label>
            <textarea
              id="industry"
              name="industry"
              required
              autoComplete="off"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={TEXT_FIELD}
              placeholder={contactFieldPlaceholders.industry}
            />
          </div>

          <div className={CELL}>
            <label className={LABEL} htmlFor="deliverables">
              DELIVERABLES*
            </label>
            <PillMultiSelect
              idPrefix="deliverable"
              options={deliverableOptions}
              selected={deliverables}
              onToggle={(value) => toggleInList(value, setDeliverables)}
            />
          </div>

          <div className={CELL}>
            <label className={LABEL} htmlFor="budget">
              BUDGET RANGE*
            </label>
            <div className="relative">
              <div className="pointer-events-none flex w-full items-center justify-between gap-2 border border-black/15 bg-white px-4 py-2 text-sm">
                <span className={budget ? "text-black" : "text-black/40"}>
                  {budget || "Select your budget range"}
                </span>
                <ChevronDown
                  size={16}
                  strokeWidth={1}
                  className="shrink-0 text-black/50"
                  aria-hidden
                />
              </div>
              <select
                id="budget"
                name="budget"
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Budget range"
              >
                <option value="" disabled>
                  Select your budget range
                </option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </>
      )}

      <div className={DESC_CELL}>
        <label className={LABEL} htmlFor="description">
          SHORT DESCRIPTION
        </label>
        <textarea
          id="description"
          name="description"
          required
          minLength={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={TEXT_FIELD}
          placeholder={descriptionPlaceholder}
        />
      </div>

      <div className={CELL}>
        <label className={LABEL} htmlFor="attached-files">
          ATTACH FILES
        </label>
        <div className="flex flex-wrap items-center gap-2">
          <label
            htmlFor="attached-files"
            className="flex cursor-pointer items-center"
          >
            <CirclePlus size={32} strokeWidth={1} aria-hidden />
          </label>
          <input
            ref={fileInputRef}
            id="attached-files"
            type="file"
            multiple
            className="hidden"
            accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
            onChange={(e) => {
              onFiles(e.target.files);
              e.target.value = "";
            }}
          />
          {files.map((file) => (
            <span
              key={`${file.name}-${file.lastModified}`}
              className="max-w-[140px] truncate text-xs text-black/50"
            >
              {file.name}
            </span>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "group relative col-span-2 min-h-22 w-full overflow-hidden lg:col-span-3",
          isCareer ? "bg-[#AD8AEC]" : "bg-[#4E71FF]"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-green-500/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden
        />
        <div className="relative z-10 flex min-h-22 w-full items-center justify-center px-4 sm:px-8">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={contactFieldPlaceholders.email}
            className="w-full max-w-xl flex-1 resize-none bg-transparent p-0 text-center text-lg font-light text-white outline-0 placeholder:text-white/40"
          />
          <div className="flex shrink-0 items-center sm:absolute sm:right-8 sm:top-1/2 sm:-translate-y-1/2">
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="flex cursor-pointer items-center gap-3 whitespace-nowrap !font-mono text-sm leading-[115%] text-white disabled:cursor-none sm:leading-[135%]"
            >
              {status === "loading" ? "Sending..." : "Send us message"}
              <SubmitArrow />
            </button>
          </div>
        </div>
      </div>

      {status === "error" ? (
        <p
          className="col-span-2 border-r border-b border-[#d9d9d9] bg-white px-4 py-3 text-sm text-red-700 lg:col-span-3"
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}

      {status === "success" ? (
        <p
          className="col-span-2 border-r border-b border-[#d9d9d9] bg-white px-4 py-3 text-sm text-black/70 lg:col-span-3"
          role="status"
        >
          Thank you — your message was sent. We&apos;ll get back to you soon.
        </p>
      ) : null}
    </form>
  );
}
