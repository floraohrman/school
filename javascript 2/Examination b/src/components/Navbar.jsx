import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = {
    textDecoration: "none",
    color: "#cfc9ff",
    fontSize: "0.95rem",
    fontWeight: "500",
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        backdropFilter: "blur(12px)",
        background: "rgba(255,255,255,0.03)",
        marginBottom: "3rem",
      }}
    >
      <h2
        style={{
          background: "linear-gradient(90deg,#ff5ccf,#8b5cf6)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Portfolio
      </h2>

      <div style={{ display: "flex", gap: "2rem" }}>
        <NavLink to="/" style={linkStyle}>
          Home
        </NavLink>
        <NavLink to="/about" style={linkStyle}>
          About
        </NavLink>
        <NavLink to="/projects" style={linkStyle}>
          Projects
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;