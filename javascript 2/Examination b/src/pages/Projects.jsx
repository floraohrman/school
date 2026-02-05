import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";

const gridStyle = {
  display: "grid",
  gap: "1.5rem",
};

function Projects() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: "2rem",
      }}
    >
      {[1, 2, 3].map((project) => (
        <div
          key={project}
          style={{
            padding: "1.5rem",
            borderRadius: "18px",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(10px)",
            transition: "0.3s",
          }}
        >
          <h3>Project {project}</h3>
          <p style={{ opacity: 0.7 }}>
            Example project description.
          </p>
        </div>
      ))}
    </div>
  );
}

export default Projects;