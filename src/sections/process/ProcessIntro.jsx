import { SectionLabel } from '../../components/ui/SectionLabel'

export function ProcessIntro({ data }) {
  return <header className="process-intro">
    <div className="process-intro__meta"><SectionLabel data-process-meta>{data.label}</SectionLabel><p data-process-meta>{data.flow.map((item, index) => <span key={item}>{item}{index < data.flow.length - 1 && <i aria-hidden="true">→</i>}</span>)}</p></div>
    <div className="process-intro__divider" data-process-divider />
    <div className="process-intro__grid"><h2 id="process-title" className="process-heading" aria-label="How I work"><span><i data-process-title>How</i></span><span><i data-process-title>I work</i></span></h2><p data-process-copy>{data.description}</p></div>
  </header>
}
