export function ServicesIntro({ data }) {
  return <header className="services-intro"><div className="services-intro__meta"><p data-services-meta>{data.label}</p><p data-services-meta>Design + Development</p></div><div className="services-intro__divider" data-services-divider /><div className="services-intro__grid"><h2 id="services-title" className="services-heading" aria-label={data.title.join(' ')}><span><i data-services-title>{data.title[0]}</i></span><span><i data-services-title>{data.title[1]}</i></span></h2><p data-services-meta>{data.description}</p></div></header>
}
