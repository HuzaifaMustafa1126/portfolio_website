export function TechnologyIntro({ data }) {
  return <header className="technology-intro"><div className="technology-intro__meta"><p data-tech-meta>{data.label}</p><p data-tech-meta>Stack / Tools / Workflow</p></div><div className="technology-intro__divider" data-tech-divider /><div className="technology-intro__grid"><h2 id="technology-title" className="technology-heading" aria-label={data.title.join(' ')}>{data.title.map((line) => <span key={line}><i data-tech-title>{line}</i></span>)}</h2><p data-tech-meta>{data.description}</p></div></header>
}
