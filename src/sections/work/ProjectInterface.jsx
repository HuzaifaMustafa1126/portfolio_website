export function ProjectInterface({ project }) {
  return <div className={`project-ui project-ui--${project.visual}`} aria-label={`${project.title} interface preview`}>
    <aside><b>HM</b>{['Overview','Workspace','Reports','Settings'].map((item, index) => <i key={item} className={index === 0 ? 'is-active' : ''}>{item}</i>)}</aside>
    <div className="project-ui__main"><header><div><small>Dashboard</small><strong>{project.title}</strong></div><span>HM</span></header><div className="project-ui__stats">{project.features.map((item, index) => <div key={item}><small>{item}</small><b>{[24, 128, 96][index]}</b><i>+{index + 3}.2%</i></div>)}</div><div className="project-ui__content"><div className="project-ui__chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="project-ui__table">{['Name / Reference','Status','Updated','Owner'].map((item) => <b key={item}>{item}</b>)}{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div></div></div>
  </div>
}
