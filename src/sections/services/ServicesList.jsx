import { useRef, useState } from 'react'
import { ServicePreview } from './ServicePreview'
import { ServiceRow } from './ServiceRow'

export function ServicesList({ services }) {
  const [openId, setOpenId] = useState(null)
  const [activeId, setActiveId] = useState(1)
  const [previewVisible, setPreviewVisible] = useState(false)
  const listRef = useRef(null)
  const toggle = (id) => { setOpenId((current) => current === id ? null : id); setActiveId(id) }
  return <div ref={listRef} className="services-list-wrap" onMouseEnter={() => setPreviewVisible(true)} onMouseLeave={() => setPreviewVisible(false)}><ol className="services-list">{services.map((service) => <ServiceRow key={service.id} service={service} expanded={openId === service.id} onToggle={toggle} onEnter={setActiveId} />)}</ol><ServicePreview services={services} activeId={activeId} visible={previewVisible} trackingRef={listRef} /></div>
}
