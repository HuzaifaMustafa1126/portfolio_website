import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap } from "../../animations/gsap";
import { createMenuTimeline } from "../../animations/navigationAnimations";
import { navigationItems, socialLinks } from "../../data/navigation";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { Wordmark } from "./Wordmark";

export function FullscreenMenu({ open, onClosed, triggerRef }) {
  const menuRef = useRef(null);
  const timelineRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const [activeNumber, setActiveNumber] = useState("01");
  const [interactive, setInteractive] = useState(false);
  const pendingPath = useRef(null);

  const close = useCallback(
    (path = null) => {
      pendingPath.current = path;
      setInteractive(false);
      timelineRef.current
        ?.timeScale(1.25)
        .reverse()
        .eventCallback("onReverseComplete", () => {
          document.body.classList.remove("menu-scroll-lock");
          window.dispatchEvent(new CustomEvent("portfolio:scroll-unlock"));
          onClosed();
          if (pendingPath.current && pendingPath.current !== location.pathname)
            navigate(pendingPath.current);
          pendingPath.current = null;
          triggerRef.current?.focus();
        });
    },
    [location.pathname, navigate, onClosed, triggerRef],
  );

  useFocusTrap(menuRef, interactive, () => close(), reducedMotion ? 0 : 650);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const context = gsap.context(() => {
      timelineRef.current = createMenuTimeline(menu, reducedMotion);
      gsap.set(menu, { autoAlpha: 0, clipPath: "inset(100% 0 0 0)" });
    }, menu);
    return () => context.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!open || !timelineRef.current) return;
    document.body.classList.add("menu-scroll-lock");
    window.dispatchEvent(new CustomEvent("portfolio:scroll-lock"));
    setInteractive(true);
    timelineRef.current.timeScale(1).play(0);
  }, [open]);

  return (
    <div
      ref={menuRef}
      id="fullscreen-menu"
      className="fullscreen-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      inert={!open ? "" : undefined}
    >
      <div className="fullscreen-menu__top" data-menu-chrome>
        <Wordmark
          inverse
          onClick={(event) => {
            event.preventDefault();
            close("/");
          }}
        />
        <span>Navigation / 2026</span>
        <button
          className="menu-close"
          type="button"
          onClick={() => close()}
          aria-label="Close navigation menu"
          data-cursor="CLOSE"
        >
          <span>Close</span>
          <i aria-hidden="true" />
        </button>
      </div>
      <span className="fullscreen-menu__number" aria-hidden="true">
        {activeNumber}
      </span>
      <div className="fullscreen-menu__layout">
        <nav
          className="menu-links"
          aria-label="Full-screen navigation"
          onMouseLeave={() => setActiveNumber("01")}
        >
          {navigationItems.map(({ number, label, path }) => (
            <a
              key={label}
              href={path}
              className={`menu-link${location.pathname === path ? " menu-link--active" : ""}`}
              onClick={(event) => {
                event.preventDefault();
                close(path);
              }}
              onMouseEnter={() => setActiveNumber(number)}
              data-cursor="GO"
            >
              <span className="menu-link__inner" data-menu-link>
                <span className="menu-link__number">{number}</span>
                <span className="menu-link__arrow" aria-hidden="true">
                  →
                </span>
                <span>{label}</span>
              </span>
            </a>
          ))}
        </nav>
        <aside className="menu-meta" data-menu-meta>
          <div>
            <span className="menu-meta__label">Available for</span>
            <p>Freelance projects</p>
            <p className="menu-meta__status">
              <i aria-hidden="true" /> Currently available
            </p>
          </div>
          <div>
            <span className="menu-meta__label">Location</span>
            <p>
              Pakistan <span>PKT / UTC+5</span>
            </p>
          </div>
          <div>
            <span className="menu-meta__label">Social</span>
            <div className="menu-meta__links">
              {socialLinks.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  data-cursor="OPEN"
                >
                  {label} ↗
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
