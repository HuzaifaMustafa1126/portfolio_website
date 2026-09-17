import { forwardRef, useRef } from "react";
import { useMagnetic } from "../../hooks/useMagnetic";

export const MenuTrigger = forwardRef(function MenuTrigger(
  { open, onClick },
  forwardedRef,
) {
  const localRef = useRef(null);
  const setRef = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };
  useMagnetic(localRef, 0.12);

  return (
    <button
      ref={setRef}
      className="menu-trigger"
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-controls="fullscreen-menu"
      aria-label={open ? "Close navigation menu" : "Open navigation menu"}
      data-cursor={open ? "CLOSE" : "OPEN"}
    >
      <span>{open ? "Close" : "Menu"}</span>
      <span
        className={`menu-trigger__icon${open ? " menu-trigger__icon--close" : ""}`}
        aria-hidden="true"
      >
        <i />
        <i />
      </span>
    </button>
  );
});
