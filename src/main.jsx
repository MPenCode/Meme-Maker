import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MemeProvider } from "./context/contextMeme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MemeProvider>
      <App />
    </MemeProvider>
  </StrictMode>
);
