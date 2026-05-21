export default function BrandButton({ as: Tag = 'a', href, to, children, variant = 'primary', className = '', ...props }) {
  const extra = className ? ` ${className}` : '';
  const navigationProps = Tag === 'a' ? { href } : { to: to || href };

  return (
    <Tag {...navigationProps} className={`brandButton ${variant}${extra}`} {...props}>
      {children}
    </Tag>
  );
}
