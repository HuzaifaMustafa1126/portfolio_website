export function HeroHeading({ title }) {
  return (
    <h1 id="hero-title" className="hero-heading" aria-label={title.join(" ")}>
      <span className="hero-heading__mask hero-heading__name hero-heading__name--first"><span data-hero-line>{title[0]}</span></span>
      <span className="hero-heading__mask hero-heading__name hero-heading__name--last"><span data-hero-line>{title[1]}</span></span>
    </h1>
  );
}
