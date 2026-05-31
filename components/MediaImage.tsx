import { cn } from "@/lib/cn";
import { mediaSrc } from "@/lib/media";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  plain?: boolean;
};

export default function MediaImage({
  src,
  alt,
  className,
  fill,
  width = 800,
  height = 600,
  priority,
  plain = false,
}: MediaImageProps) {
  const resolved = mediaSrc(src);
  const overlay = plain ? null : (
    <div className="absolute inset-0 bg-gradient-to-br from-[#753b2d]/20 via-transparent to-[#050505]/40" />
  );

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden bg-[#101010]", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolved}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {overlay}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-[#101010]", className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolved}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : undefined}
        className="h-full w-full object-cover"
      />
      {overlay}
    </div>
  );
}
