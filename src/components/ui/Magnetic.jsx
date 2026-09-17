import { useRef } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

export function Magnetic({ as: Tag = 'div', strength, children, ...props }) {
  const ref = useRef(null)
  useMagnetic(ref, strength)
  return <Tag ref={ref} {...props}>{children}</Tag>
}
