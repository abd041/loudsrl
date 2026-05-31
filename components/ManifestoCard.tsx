import MediaImage from "./MediaImage";

type ManifestoCardProps = {
  title: string;
  cta: string;
  images: string[];
  index: number;
};

export default function ManifestoCard({
  title,
  cta,
  images,
  index,
}: ManifestoCardProps) {
  return (
    <article
      className={`group relative overflow-hidden border border-white/10 bg-[#101010] ${
        index % 2 === 1 ? "lg:mt-12" : ""
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {images.map((img, i) => (
          <div
            key={img}
            className={`absolute transition-all duration-500 ${
              i === 0
                ? "inset-0 z-10 group-hover:translate-x-4 group-hover:-translate-y-2"
                : "inset-4 z-0 translate-x-6 translate-y-6 opacity-60"
            }`}
          >
            <MediaImage src={img} alt="" fill />
          </div>
        ))}
      </div>
      <div className="p-6 md:p-8">
        <h3 className="mb-4 text-2xl font-light tracking-tight md:text-3xl">
          {title}
        </h3>
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">{cta}</p>
      </div>
    </article>
  );
}
