export const Figure = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) => (
  <figure className="container-px max-w-5xl mx-auto mt-6 md:mt-8">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={1600}
      height={912}
      className="w-full h-auto object-contain rounded-2xl border border-border bg-card"
    />
    <figcaption className="mt-3 text-center font-body text-sm text-foreground/55">
      {caption}
    </figcaption>
  </figure>
);
