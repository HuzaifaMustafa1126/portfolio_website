export function SectionLabel({ as: Tag = 'p', className = '', children, ...props }) {
  return <Tag className={`section-label ${className}`.trim()} {...props}>{children}</Tag>
}
