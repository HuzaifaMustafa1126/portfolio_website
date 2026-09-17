import { ServiceDetails } from './ServiceDetails'

export function ServiceRow({ service, expanded, onToggle, onEnter }) {
  return <li className={`service-row${expanded ? ' service-row--open' : ''}`} data-service-row onMouseEnter={() => onEnter(service.id)}><button type="button" onClick={() => onToggle(service.id)} aria-expanded={expanded} aria-controls={`service-details-${service.id}`} data-cursor={service.cursorLabel.toUpperCase()}><span className="service-row__number">{service.number}</span><h3>{service.title}</h3><span className="service-row__action" aria-hidden="true"><i>↗</i><b /><b /></span></button><ServiceDetails service={service} expanded={expanded} /></li>
}
