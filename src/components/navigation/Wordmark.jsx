import { Link } from "react-router-dom";

export function Wordmark({ onClick, inverse = false }) {
  return (
    <Link
      className={`wordmark${inverse ? " wordmark--inverse" : ""}`}
      to="/"
      onClick={onClick}
      aria-label="Huzaifa — home"
      data-cursor="GO"
    >
      <span className="wordmark__name">
        Huzaifa<span>.</span>
      </span>
      <span className="wordmark__role">Creative Developer</span>
    </Link>
  );
}
