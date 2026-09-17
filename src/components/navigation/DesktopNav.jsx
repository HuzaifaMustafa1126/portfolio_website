import { NavLink } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'

export function DesktopNav() {
  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {navigationItems.map(({ label, path }) => (
        <NavLink key={label} to={path} end={path === '/'} className={({ isActive }) => `nav-swap${isActive ? ' nav-swap--active' : ''}`} data-cursor="GO">
          <span className="nav-swap__track" aria-hidden="true"><span>{label}</span><span>{label}</span></span>
          <span className="sr-only">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
