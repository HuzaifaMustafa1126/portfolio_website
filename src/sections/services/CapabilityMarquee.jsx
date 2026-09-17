export function CapabilityMarquee({ items }) {
  const content = [...items, ...items]
  return <div className="capability-marquee" aria-label={items.join(', ')}><div aria-hidden="true">{content.map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div></div>
}
