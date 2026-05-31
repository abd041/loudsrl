"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CaseStudyMedia } from "@/data/caseStudies";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animations";
import { cn } from "@/lib/cn";

type CaseStudyGalleryCarouselProps = {
  images: CaseStudyMedia[];
};

type LightboxState = {
  media: CaseStudyMedia;
  rect: DOMRect;
};

function GalleryImage({
  image,
  index,
  sectionRef,
  onSelect,
}: {
  image: CaseStudyMedia;
  index: number;
  sectionRef: React.RefObject<HTMLDivElement | null>;
  onSelect: (rect: DOMRect) => void;
}) {
  const imageRef = useRef<HTMLDivElement>(null);
  const aspectRef = useRef(
    image.width && image.height ? image.width / image.height : 1.5
  );
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const [loaded, setLoaded] = useState(false);

  const updateDimensions = () => {
    const height = window.innerHeight * 0.7;
    const width = height * aspectRef.current;
    setDimensions({ width, height });
  };

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    const node = imageRef.current;
    if (!section || !node) return;

    const trigger = ScrollTrigger.create({
      id: `case-carousel-image-${index}`,
      trigger: section,
      start: "top bottom",
      end: "bottom center",
      scrub: 0.8,
      onUpdate: () => {
        const rect = node.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const viewportCenter = window.innerWidth / 2;
        const distance = Math.abs(viewportCenter - center);
        const scale = 1 - (distance / viewportCenter) * (1 - 0.9);

        gsap.to(node, {
          scale,
          duration: 0.2,
          overwrite: "auto",
          ease: "power3.out",
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [index, sectionRef]);

  return (
    <div
      ref={imageRef}
      className={cn(
        "carousel-image relative shrink-0 scale-90 cursor-pointer overflow-hidden transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0"
      )}
      style={{ width: dimensions.width, height: dimensions.height }}
      onClick={() => {
        if (imageRef.current) onSelect(imageRef.current.getBoundingClientRect());
      }}
    >
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className="object-cover"
        sizes="70vh"
        onLoad={(event) => {
          const target = event.currentTarget;
          aspectRef.current = target.naturalWidth / target.naturalHeight;
          updateDimensions();
          setLoaded(true);
        }}
      />
    </div>
  );
}

function GalleryLightbox({
  media,
  onClose,
}: {
  media: CaseStudyMedia;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        type="button"
        className="absolute right-6 top-6 font-mono text-sm text-white/70"
        onClick={onClose}
      >
        Close
      </button>
      <div className="relative h-[min(90vh,900px)] w-[min(90vw,1200px)]">
        <Image
          src={media.url}
          alt={media.alt}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>
    </div>
  );
}

function killCarouselTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    const id = trigger.vars.id;
    if (
      typeof id === "string" &&
      (id.startsWith("case-horizontal-carousel-") ||
        id.startsWith("case-carousel-image-"))
    ) {
      trigger.kill();
    }
  });
}

export default function CaseStudyGalleryCarousel({
  images,
}: CaseStudyGalleryCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  useEffect(() => {
    registerGsap();

    const setup = () => {
      killCarouselTriggers();

      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const travel = Math.max(0, track.scrollWidth - section.offsetWidth * 0.7);
      gsap.set(track, { x: 0 });

      gsap.to(track, {
        x: -travel,
        ease: "none",
        scrollTrigger: {
          id: "case-horizontal-carousel-scroll",
          trigger: section,
          start: "top bottom-=200px",
          end: "bottom top+=200px",
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.utils.toArray<HTMLElement>(".carousel-image").forEach((image) => {
        gsap.set(image, { scale: 0.9 });
      });
    };

    let ctx = gsap.context(setup, sectionRef);
    const refresh = () => {
      ctx.revert();
      ctx = gsap.context(setup, sectionRef);
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", refresh);
    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(refresh)
        : null;

    if (observer) {
      if (sectionRef.current) observer.observe(sectionRef.current);
      if (trackRef.current) observer.observe(trackRef.current);
    }

    return () => {
      window.removeEventListener("resize", refresh);
      observer?.disconnect();
      ctx.revert();
      killCarouselTriggers();
    };
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <section ref={sectionRef} className="relative mt-10 w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex h-full flex-nowrap items-center gap-[5vw] px-[20vw] will-change-transform"
        >
          {images.map((image, index) => (
            <GalleryImage
              key={`${image.url}-${index}`}
              image={image}
              index={index}
              sectionRef={sectionRef}
              onSelect={(rect) => setLightbox({ media: image, rect })}
            />
          ))}
        </div>
      </section>

      {lightbox ? (
        <GalleryLightbox media={lightbox.media} onClose={() => setLightbox(null)} />
      ) : null}
    </>
  );
}
