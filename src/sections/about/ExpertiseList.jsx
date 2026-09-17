export function ExpertiseList({ expertise }) {
  return (
    <div className="expertise-block">
      <div className="expertise-block__heading">
        <p>Selected expertise</p>
        <span>{String(expertise.length).padStart(2, "0")} disciplines</span>
      </div>
      <ol className="expertise-list">
        {expertise.map((item, index) => (
          <li key={item} tabIndex="0" data-expertise-row data-cursor="VIEW">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{item}</h3>
            <i aria-hidden="true">↗</i>
          </li>
        ))}
      </ol>
    </div>
  );
}
