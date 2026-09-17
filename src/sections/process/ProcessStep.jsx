export function ProcessStep({ step, index }) {
  return <article className={`process-step${index === 0 ? ' is-active' : ''}`} data-process-step={index}>
    <div className="process-step__number"><span>{step.number}</span><i>/ 06</i></div>
    <div className="process-step__main"><h3>{step.title}</h3><p className="process-step__keyword">{step.keyword}</p></div>
    <div className="process-step__copy"><p>{step.description}</p><ol>{step.details.map((detail, detailIndex) => <li key={detail}><span>{String(detailIndex + 1).padStart(2, '0')} /</span>{detail}</li>)}</ol></div>
  </article>
}
