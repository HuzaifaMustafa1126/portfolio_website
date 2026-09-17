export function AboutImage({ image }) {
  return (
    <figure className="about-image" data-about-image-frame data-cursor="ABOUT">
      <img
        src={image.src}
        alt={image.alt}
        width="1536"
        height="1024"
        loading="lazy"
        decoding="async"
        data-about-image
      />
      <figcaption>
        <span>At work / 2026</span>
        <span>Designing systems that perform</span>
      </figcaption>
    </figure>
  );
}
