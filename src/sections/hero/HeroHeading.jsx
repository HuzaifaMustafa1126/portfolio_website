export function HeroHeading({ title }) {
  const renderWord = (word) => (
    <span className="hero-heading__word" data-hero-word>
      {[...word].map((letter, index) => (
        <span className="hero-heading__char-mask" key={`${letter}-${index}`}>
          <span
            className="hero-heading__char"
            data-hero-char
            data-letter={letter}
            aria-hidden="true"
          >
            {letter}
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <h1 id="hero-title" className="hero-heading" aria-label={title.join(" ")}>
      <span className="hero-heading__mask hero-heading__name hero-heading__name--first">
        {renderWord(title[0])}
      </span>
      <span className="hero-heading__mask hero-heading__name hero-heading__name--last">
        {renderWord(title[1])}
      </span>
    </h1>
  );
}
