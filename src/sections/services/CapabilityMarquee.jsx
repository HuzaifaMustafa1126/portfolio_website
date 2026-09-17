export function CapabilityMarquee({ items, className = '' }) {
  const content = [...items, ...items]
  return <div className={`capability-marquee ${className}`.trim()} aria-label={items.join(', ')}><div aria-hidden="true">{content.map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></div>
}
