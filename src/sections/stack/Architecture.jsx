export function Architecture() {
  return <div className="architecture" aria-label="Application architecture: User to interface to API to database">{['User','React / WordPress','Node / API','MySQL'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><b>{item}</b>{index < 3 && <i data-architecture-line aria-hidden="true" />}</div>)}</div>
}
