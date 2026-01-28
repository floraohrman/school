import { useEffect, useState } from "react";

function AnimatedText({ text }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % text.length);
    }, 150);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <h1>
      {text.slice(0, index + 1)}
    </h1>
  );
}

export default AnimatedText;