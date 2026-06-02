"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { isRasterMedia, mediaSrc } from "@/lib/media";
import { reportMessage } from "@/lib/observability/reportError";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  plain?: boolean;
  sizes?: string;
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
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaImageProps) {
  const resolved = mediaSrc(src);
  const useNextImage = isRasterMedia(resolved);
  const [failed, setFailed] = useState(false);
  const overlay = plain ? null : (
    <div className="absolute inset-0 bg-gradient-to-br from-[#753b2d]/20 via-transparent to-[#050505]/40" />
  );

  const onImageError = () => {
    if (!failed) {
      reportMessage("image_load_failed", "warning", { src: resolved });
      setFailed(true);
    }
  };

  if (failed) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-[#101010]",
          fill && "absolute inset-0",
          className
        )}
        role="img"
        aria-label={alt}
      />
    );
  }

  if (fill) {
    return (
      <div className={cn("relative overflow-hidden bg-[#101010]", className)}>
        {useNextImage ? (
          <Image
            src={resolved}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            onError={onImageError}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={resolved}
            alt={alt}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
            onError={onImageError}
          />
        )}
        {overlay}
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-[#101010]", className)}>
      {useNextImage ? (
        <Image
          src={resolved}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority}
          className="h-full w-full object-cover"
          onError={onImageError}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          className="h-full w-full object-cover"
          onError={onImageError}
        />
      )}
      {overlay}
    </div>
  );
}
