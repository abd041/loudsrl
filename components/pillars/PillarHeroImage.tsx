import MediaImage from "@/components/MediaImage";

type PillarHeroImageProps = {
  src: string;
  alt: string;
};

export default function PillarHeroImage({ src, alt }: PillarHeroImageProps) {
  return (
    <section className="relative z-20 bg-white">
      <MediaImage
        src={src}
        alt={alt}
        className="aspect-[21/9] min-h-[320px] w-full md:min-h-[480px] lg:min-h-[540px]"
        priority
        plain
      />
    </section>
  );
}
