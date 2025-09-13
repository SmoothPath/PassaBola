import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Páginas
import Home from "./pages/Home.jsx";
import Perfil from "./pages/Perfil.jsx";
import PerfilADM from "./pages/PerfilADM.jsx";
import EventosLista from "./pages/EventosLista.jsx";
import EventoNovo from "./pages/EventosNovo.jsx";

// Contextos e rotas protegidas
import { AuthProvider } from "./components/contexts/AuthContext.jsx";
import AdminRoute from "./components/routes/AdminRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Rotas protegidas */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PerfilADM />
              </AdminRoute>
            }
          />

          <Route path="/perfil" element={<Perfil />} />

          <Route
            path="/eventos"
            element={
              <AdminRoute>
                <EventosLista />
              </AdminRoute>
            }
          />

          <Route
            path="/eventos/novo"
            element={
              <AdminRoute>
                <EventoNovo />
              </AdminRoute>
            }
          />

          {/* Página 404 */}
          <Route
            path="*"
            element={<div style={{ padding: 24 }}>Página não encontrada</div>}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
