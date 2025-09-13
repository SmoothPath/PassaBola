import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import PerfilADM from "./pages/PerfilADM";               
import { AuthProvider } from "./components/contexts/AuthContext";
import AdminRoute from "./components/Admin";   

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PerfilADM />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
