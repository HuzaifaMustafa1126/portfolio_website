export function HeroPortrait({ portrait }) {
  return (
    <figure className="hero-portrait" data-hero-portrait>
      <div className="hero-portrait__media">
        <img
          src={portrait.src}
          alt={portrait.alt}
          width="1098"
          height="1402"
          fetchpriority="high"
          decoding="async"
          data-hero-image
        />
      </div>
    </figure>
  );
}
