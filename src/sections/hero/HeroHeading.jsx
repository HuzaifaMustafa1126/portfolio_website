export function HeroHeading({ title }) {
  return (
    <h1 id="hero-title" className="hero-heading" aria-label={title.join(" ")}>
      <span className="hero-heading__mask hero-heading__creative">
        <span data-hero-line data-title-creative>
          {title[0]}
        </span>
      </span>
      <span className="hero-heading__mask hero-heading__web">
        <span data-hero-line>{title[1]}</span>
      </span>
      <span className="hero-heading__mask hero-heading__developer">
        <span data-hero-line data-title-developer>
          {title[2]}
        </span>
      </span>
    </h1>
  );
}
