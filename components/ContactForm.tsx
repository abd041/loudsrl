"use client";

import { useState } from "react";
import CustomSelect from "./CustomSelect";
import FileUpload from "./FileUpload";
import { budgetOptions, deliverableOptions, projectTypes } from "@/data/contact";
import { industries } from "@/data/industries";
import { cn } from "@/lib/cn";
import { submitContact } from "@/lib/submitContact";

type ContactFormProps = {
  theme?: "dark" | "light";
};

export default function ContactForm({ theme = "dark" }: ContactFormProps) {
  const isLight = theme === "light";
  const [projectType, setProjectType] = useState("");
  const [industry, setIndustry] = useState("");
  const [budget, setBudget] = useState("");
  const [deliverables, setDeliverables] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const toggleDeliverable = (value: string) => {
    setDeliverables((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const result = await submitContact({
      formKind: "business",
      projectType,
      industry,
      deliverables,
      budget,
      description,
      email,
      companyWebsite: honeypot,
      files,
    });

    if (!result.ok) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    setProjectType("");
    setIndustry("");
    setBudget("");
    setDeliverables([]);
    setDescription("");
    setEmail("");
    setFiles([]);
  };

  return (
    <form
      className="space-y-8"
      onSubmit={handleSubmit}
      noValidate
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
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

      <CustomSelect
        label="PROJECT TYPE"
        options={[...projectTypes]}
        required
        value={projectType}
        onChange={setProjectType}
        theme={theme}
      />
      <CustomSelect
        label="INDUSTRY"
        options={industries.map((i) => i.title)}
        required
        value={industry}
        onChange={setIndustry}
        theme={theme}
      />

      <fieldset>
        <legend
          className={cn(
            "section-label mb-4 block",
            isLight && "text-black/50"
          )}
        >
          DELIVERABLES*
        </legend>
        <div className="flex flex-wrap gap-4">
          {deliverableOptions.map((opt) => (
            <label
              key={opt}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 text-sm",
                isLight && "text-black"
              )}
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#4050a7]"
                checked={deliverables.includes(opt)}
                onChange={() => toggleDeliverable(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      <CustomSelect
        label="BUDGET RANGE"
        options={budgetOptions}
        required
        placeholder="Select your budget range"
        value={budget}
        onChange={setBudget}
        theme={theme}
      />

      <label className="block">
        <span
          className={cn(
            "section-label mb-2 block",
            isLight && "text-black/50"
          )}
        >
          SHORT DESCRIPTION
        </span>
        <textarea
          rows={5}
          required
          minLength={10}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className={cn(
            "w-full resize-none border bg-transparent px-4 py-3 text-sm focus:outline-none",
            isLight
              ? "border-black/15 text-black focus:border-black/40"
              : "border-white/15 focus:border-white/40"
          )}
          placeholder="Tell us about your project..."
        />
      </label>

      <label className="block">
        <span
          className={cn(
            "section-label mb-2 block",
            isLight && "text-black/50"
          )}
        >
          EMAIL*
        </span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={cn(
            "w-full border bg-transparent px-4 py-3 text-sm focus:outline-none",
            isLight
              ? "border-black/15 text-black focus:border-black/40"
              : "border-white/15 focus:border-white/40"
          )}
        />
      </label>

      <FileUpload theme={theme} files={files} onChange={setFiles} />

      {status === "success" ? (
        <p
          className={cn("text-sm", isLight ? "text-black/70" : "text-white/70")}
          role="status"
        >
          Thank you — your message was sent. We&apos;ll get back to you soon.
        </p>
      ) : null}

      {status === "error" ? (
        <p
          className={cn("text-sm", isLight ? "text-red-700" : "text-red-300")}
          role="alert"
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        aria-disabled={status === "loading" || status === "success"}
        className={cn(
          "min-h-11 w-full border py-4 text-sm uppercase tracking-[0.2em] transition md:w-auto md:px-12",
          isLight
            ? "border-black/20 text-black hover:bg-black hover:text-white"
            : "border-white/20 hover:bg-white hover:text-black",
          status === "loading" && "cursor-wait opacity-60"
        )}
      >
        {status === "loading" ? "Sending..." : "Send us message"}
      </button>
    </form>
  );
}
