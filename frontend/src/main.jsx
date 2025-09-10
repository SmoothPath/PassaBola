import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/global.css";  // importa o CSS global

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);