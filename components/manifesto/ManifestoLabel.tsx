import { cn } from "@/lib/cn";

type ManifestoLabelProps = {
  label?: string;
  dotClassName?: string;
  className?: string;
};

export default function ManifestoLabel({
  label = "Manifesto",
  dotClassName = "bg-[#637FDC]",
  className,
}: ManifestoLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 font-mono text-sm uppercase tracking-widest text-black/60",
        className
      )}
    >
      <span
        className={cn("inline-block h-2.5 w-2.5 rounded-full", dotClassName)}
      />
      {label}
    </div>
  );
}
