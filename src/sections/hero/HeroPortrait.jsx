export function HeroPortrait({ portrait }) {
  return (
    <figure className="hero-portrait" data-hero-portrait data-cursor="ABOUT">
      <div className="hero-portrait__media">
        <img src={portrait.src} alt={portrait.alt} width="1098" height="1402" fetchPriority="high" decoding="async" data-hero-image />
      </div>
      <figcaption><span>[01]</span>{portrait.label}</figcaption>
    </figure>
  )
}
