export function TechnologyWall({ rows }) {
  return <div className="technology-wall" aria-hidden="true">{rows.map((row, index) => <div key={index} className={`technology-wall__row technology-wall__row--${index + 1}`} data-tech-wall-row>{[...row, ...row].map((name, itemIndex) => <span key={`${name}-${itemIndex}`} data-cursor={name === 'WordPress' ? 'CMS' : name === 'GSAP' ? 'MOTION' : name === 'Figma' ? 'DESIGN' : name === 'MySQL' ? 'DATABASE' : 'FRONTEND'}>{name}<i>✦</i></span>)}</div>)}</div>
}
