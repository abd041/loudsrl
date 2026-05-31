"use client";

type FileUploadProps = {
  label?: string;
};

export default function FileUpload({ label = "ATTACH FILES" }: FileUploadProps) {
  return (
    <label className="block cursor-pointer">
      <span className="section-label mb-2 block">{label}</span>
      <div className="flex min-h-[120px] items-center justify-center border border-dashed border-white/20 px-4 py-8 text-sm text-white/50 transition hover:border-white/40">
        <input type="file" multiple className="hidden" />
        Drop files here or click to upload
      </div>
    </label>
  );
}
