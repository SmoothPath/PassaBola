import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importa o CSS global (Tailwind + estilos customizados)
import "./styles/global.css";

// Renderiza o app no elemento root
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
