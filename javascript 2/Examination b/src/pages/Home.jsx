
const heroStyle = {
  fontSize: "3rem",
  background: "linear-gradient(90deg,#ff4ecd,#7c3aed)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

function Home() {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "4rem 2rem",
      }}
    >
      <h1
        style={{
          fontSize: "3.2rem",
          marginBottom: "1rem",
          background: "linear-gradient(90deg,#ffffff,#9f7aea)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Welcome to my Portfolio
      </h1>

      <p
        style={{
          opacity: 0.75,
          maxWidth: "600px",
          margin: "0 auto 2.5rem auto",
        }}
      >
        React SPA with API integration, routing and interactivity.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <button
          style={{
            padding: "0.9rem 2rem",
            borderRadius: "999px",
            border: "none",
            background: "linear-gradient(90deg,#ff5ccf,#8b5cf6)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          View Projects
        </button>

        <button
          style={{
            padding: "0.9rem 2rem",
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
            color: "#eae6ff",
            cursor: "pointer",
          }}
        >
          Contact
        </button>
      </div>
    </section>
  );
}

export default Home;