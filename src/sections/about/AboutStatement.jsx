export function AboutStatement({ statement }) {
  const words = statement.split(" ");
  return (
    <h2 id="about-title" className="about-statement" aria-label={statement}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} data-about-word aria-hidden="true">
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
}
