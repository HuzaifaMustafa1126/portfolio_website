export function TechnologyPreview({ technology, category, number }) {
  return <aside className="technology-preview" aria-live="polite"><div><span>{technology.mark}</span><i>{number} / {category}</i></div><h3>{technology.name}</h3><p>{technology.description}</p></aside>
}
