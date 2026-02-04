import { NavLink } from "react-router-dom";

const navStyle = {
  background: "rgba(0,0,0,0.8)",
  padding: "1rem 2rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const logoStyle = {
  fontWeight: "bold",
  background: "linear-gradient(90deg, #ff4ecd, #7c3aed)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

const linkStyle = {
  marginLeft: "1.5rem",
  textDecoration: "none",
  color: "#9ca3af",
};

function Navbar() {
  return (
    <nav style={navStyle}>
      <h1 style={logoStyle}>Portfolio</h1>

      <div>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>
        <NavLink to="/projects" style={linkStyle}>Projects</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;