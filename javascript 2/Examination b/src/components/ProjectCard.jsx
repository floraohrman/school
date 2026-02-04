import { useState } from "react";

function ProjectCard({ project }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h3>{project.title}</h3>
      <p>{project.body}</p>

      <button onClick={() => setFavorite(!favorite)}>
        {favorite ? "⭐ Favorit" : "☆ Lägg till favorit"}
      </button>
    </div>
  );
}

export default ProjectCard;