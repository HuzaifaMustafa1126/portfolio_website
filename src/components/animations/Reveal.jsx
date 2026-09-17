import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'

export function Reveal({ as: Tag = 'div', className = '', children, delay = 0, ...props }) {
  const ref = useRef(null)
  useGsapReveal(ref, { delay })
  return <Tag ref={ref} className={className} {...props}>{children}</Tag>
}
