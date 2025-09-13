import React from "react";
import Home from "./pages/Home"; // caminho relativo para Home.jsx
import { AuthProvider } from "./components/contexts/AuthContext"; // importa o AuthProvider

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <div className="App">
          <Home />
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
