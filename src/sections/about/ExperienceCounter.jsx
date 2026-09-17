export function ExperienceCounter({ value }) {
  return (
    <div className="experience" data-about-reveal>
      <p>
        <span data-experience-value={value}>{value}</span>
        <sup>+</sup>
      </p>
      <span>
        Years of
        <br />
        experience
      </span>
    </div>
  );
}
