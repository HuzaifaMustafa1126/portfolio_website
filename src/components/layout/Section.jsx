export function Section({
  as: Tag = "section",
  theme = "light",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag className={`section section--${theme} ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
