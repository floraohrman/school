import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

document.body.style.margin = "0";
document.body.style.fontFamily = "Inter, system-ui, sans-serif";
document.body.style.background =
  "radial-gradient(circle at 20% 20%, #1b0b2e, transparent 40%), radial-gradient(circle at 80% 30%, #0e1a40, transparent 40%), #05010a";
document.body.style.color = "#eae6ff";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);