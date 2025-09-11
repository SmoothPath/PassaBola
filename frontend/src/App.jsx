import React from "react"
import Home from "./pages/Home"
import { AuthProvider } from "./components/contexts/AuthContext.jsx";

export default function App() {
  
  return (<AuthProvider>
      <Home />
    </AuthProvider>);
}

