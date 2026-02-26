// Heading.jsx
import "../styles/Perspectives.css";

export default function Heading({ title, subtitle }) {
  return (
    <div className="perspectives-header">
      <h2>{title}</h2>
      {/* Optionally render subtitle if provided */}
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}