"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/animations";

type IndustryGalleryCollageProps = {
  images: string[];
  alt: string;
};

type GalleryImageProps = {
  src: string;
  alt: string;
  index: number;
  sectionRef: React.RefObject<HTMLDivElement | null>;
};

function GalleryImage({ src, alt, index, sectionRef }: GalleryImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const aspectRef = useRef(1.5);
  const [dimensions, setDimensions] = useState({ width: 900, height: 600 });
  const [loaded, setLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  const updateDimensions = () => {
    const height = window.innerHeight * 0.7;
    const width = height * aspectRef.current;
    setDimensions({ width, height });
  };

  useEffect(() => {
    setMounted(true);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    registerGsap();
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const trigger = ScrollTrigger.create({
      id: `carousel-image-${index}`,
      trigger: section,
      start: "top bottom",
      end: "bottom center",
      scrub: 0.8,
      onUpdate: () => {
        const rect = image.getBoundingClientRect();
        const center = rect.left + rect.width / 2;
        const viewportCenter = window.innerWidth / 2;
        const distance = Math.abs(viewportCenter - center);
        const scale = 1 - (distance / viewportCenter) * (1 - 0.9);

        gsap.to(image, {
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
  }, [index, mounted, sectionRef]);

  return (
    <div
      ref={imageRef}
      className={`carousel-image relative shrink-0 scale-90 overflow-hidden transition-opacity duration-700 ease-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ width: dimensions.width, height: dimensions.height }}
    >
      <Image
        src={src}
        alt={alt}
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

function killCarouselTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => {
    const id = trigger.vars.id;
    if (
      typeof id === "string" &&
      (id.startsWith("horizontal-carousel-") || id.startsWith("carousel-image-"))
    ) {
      trigger.kill();
    }
  });
}

export default function IndustryGalleryCollage({
  images,
  alt,
}: IndustryGalleryCollageProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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
          id: "horizontal-carousel-scroll",
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
    <section ref={sectionRef} className="relative mt-10 w-full overflow-hidden bg-black">
      <div
        ref={trackRef}
        className="flex h-full flex-nowrap items-center gap-[5vw] px-[20vw] will-change-transform"
      >
        {images.map((src, index) => (
          <GalleryImage
            key={src}
            src={src}
            alt={`${alt} ${index + 1}`}
            index={index}
            sectionRef={sectionRef}
          />
        ))}
      </div>
    </section>
  );
}
