import { useRef } from 'react'
import { useGsapReveal } from '../../hooks/useGsapReveal'

export function AnimatedHeading({ as: Tag = 'h1', className = '', children, ...props }) {
  const ref = useRef(null)
  useGsapReveal(ref, { y: 80, duration: 1.1 })
  return <Tag ref={ref} className={className} {...props}>{children}</Tag>
}
