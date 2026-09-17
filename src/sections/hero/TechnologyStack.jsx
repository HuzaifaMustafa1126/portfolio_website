export function TechnologyStack({ technologies }) {
  return <div className="hero-tech-trail" data-tech-trail data-sequence={technologies.map((tech) => tech.name).join(' → ')} aria-hidden="true" />
}
