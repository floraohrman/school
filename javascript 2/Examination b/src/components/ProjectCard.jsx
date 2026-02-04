import { useState } from "react";

function ProjectCard({ project }) {

  const [favorite, setFavorite] = useState(false);
  const [hover, setHover] = useState(false);

  const cardStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    padding: "1.5rem",
    marginBottom: "1.5rem",
    transition: "0.3s",
    transform: hover ? "scale(1.03)" : "scale(1)",
    boxShadow: hover
      ? "0 0 25px rgba(255, 78, 205, 0.4)"
      : "none",
  };

  const titleStyle = {
    color: "#ff4ecd",
  };

  const buttonStyle = {
    marginTop: "1rem",
    background: "linear-gradient(90deg,#ff4ecd,#7c3aed)",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3 style={titleStyle}>{project.title}</h3>
      <p>{project.body}</p>

      <button
        style={buttonStyle}
        onClick={() => setFavorite(!favorite)}
      >
        {favorite ? "⭐ Favorit" : "☆ Lägg till favorit"}
      </button>
    </div>
  );
}

export default ProjectCard;