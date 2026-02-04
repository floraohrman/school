import AnimatedText from "../components/AnimatedText";

const heroStyle = {
  fontSize: "3rem",
  background: "linear-gradient(90deg,#ff4ecd,#7c3aed)",
  WebkitBackgroundClip: "text",
  color: "transparent",
};

function Home() {
  return (
    <>
      <AnimatedText text="Hej! Jag heter Flora, välkommen till min portfolio" />
      <p>Frontend student – JavaScript & React</p>
    </>
  );
}

export default Home;