import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SidePanelApp from "./sidepanelApp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SidePanelApp />
  </StrictMode>
);