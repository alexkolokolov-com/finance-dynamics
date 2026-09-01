export const Figure = ({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption: string;
}) => (
  <figure className="mt-6 md:mt-8">
    {/* Мобильно: во всю ширину экрана и с минимальным кропом (16:10),
        чтобы иллюстрация не была мелкой. Десктоп: натуральные пропорции. */}
    <img
      src={src}
      alt={alt}
      loading="lazy"
      width={1600}
      height={912}
      className="w-full h-auto aspect-[16/10] object-cover object-center bg-card
        md:aspect-auto md:object-contain md:rounded-2xl md:border md:border-border
        md:container-px md:max-w-5xl md:mx-auto"
    />
    <figcaption className="container-px max-w-3xl mx-auto mt-3 text-center font-body text-sm text-foreground/55">
      {caption}
    </figcaption>
  </figure>
);
