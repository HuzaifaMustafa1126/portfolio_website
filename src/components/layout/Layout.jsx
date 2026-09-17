import { useCallback, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SmoothScroll } from '../animations/SmoothScroll'
import { CustomCursor } from '../common/CustomCursor'
import { FullscreenMenu } from '../navigation/FullscreenMenu'
import { Header } from '../navigation/Header'

export function Layout() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef(null)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <SmoothScroll>
      <Header menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((current) => !current)} triggerRef={triggerRef} />
      <FullscreenMenu open={menuOpen} onClosed={closeMenu} triggerRef={triggerRef} />
      <main id="main-content" key={location.pathname} tabIndex="-1">
        <Outlet />
      </main>
      <CustomCursor />
    </SmoothScroll>
  )
}
