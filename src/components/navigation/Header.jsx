import { useRef } from 'react'
import { useHeaderScroll } from '../../hooks/useHeaderScroll'
import { Magnetic } from '../ui/Magnetic'
import { DesktopNav } from './DesktopNav'
import { MenuTrigger } from './MenuTrigger'
import { Wordmark } from './Wordmark'

export function Header({ menuOpen, onMenuToggle, triggerRef }) {
  const headerRef = useRef(null)
  const compact = useHeaderScroll(headerRef, menuOpen)

  return (
    <header ref={headerRef} className={`site-header${compact ? ' site-header--compact' : ''}${menuOpen ? ' site-header--menu-open' : ''}`}>
      <div className="site-header__inner">
        <Wordmark inverse={menuOpen} />
        <DesktopNav />
        <div className="site-header__actions">
          <Magnetic className="availability" strength={0.08} data-cursor="AVAILABLE"><span aria-hidden="true" /> Available for work</Magnetic>
          <MenuTrigger ref={triggerRef} open={menuOpen} onClick={onMenuToggle} />
        </div>
      </div>
    </header>
  )
}
