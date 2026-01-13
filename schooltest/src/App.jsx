import { useState } from "react"
import Header from "./Header"
import Home from "./Home"
import About from "./About"

function App() {
  const [showAbout, setShowAbout] = useState(false)

  return (
    <>
      <Header />

      <nav>
        <button onClick={() => setShowAbout(false)}>Home</button>
        <button onClick={() => setShowAbout(true)}>About</button>
      </nav>

      {showAbout ? <About /> : <Home />}
    </>
  )
}

export default App