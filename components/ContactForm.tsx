"use client";

import CustomSelect from "./CustomSelect";
import FileUpload from "./FileUpload";
import { budgetOptions, deliverableOptions, projectTypes } from "@/data/contact";
import { industries } from "@/data/industries";

export default function ContactForm() {
  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <CustomSelect
        label="PROJECT TYPE"
        options={[...projectTypes]}
        required
      />
      <CustomSelect
        label="INDUSTRY"
        options={industries.map((i) => i.title)}
        required
      />

      <fieldset>
        <legend className="section-label mb-4 block">DELIVERABLES*</legend>
        <div className="flex flex-wrap gap-4">
          {deliverableOptions.map((opt) => (
            <label
              key={opt}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#4050a7]"
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
      />

      <label className="block">
        <span className="section-label mb-2 block">SHORT DESCRIPTION</span>
        <textarea
          rows={5}
          className="w-full resize-none border border-white/15 bg-transparent px-4 py-3 text-sm focus:border-white/40 focus:outline-none"
          placeholder="Tell us about your project..."
        />
      </label>

      <FileUpload />

      <button
        type="submit"
        className="w-full border border-white/20 py-4 text-sm uppercase tracking-[0.2em] transition hover:bg-white hover:text-black md:w-auto md:px-12"
      >
        Send us message
      </button>
    </form>
  );
}
