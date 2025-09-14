import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes fixos
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import PerfilADM from "./pages/PerfilADM";
import EventosLista from "./pages/EventosLista";
import EventosNovo from "./pages/EventosNovo";
import JogaJunto from "./pages/JogaJunto";
import MeusEventos from "./pages/MeusEventos";
import ExplorarEventos from "./pages/ExplorarEventos";
import Voluntarios from "./pages/Voluntarios";
import Doacao from "./pages/Doacao";
import Camisa10 from "./pages/Camisa10"; // Página Loja Camisa10

// Contextos e rotas protegidas
import { AuthProvider } from "./components/contexts/AuthContext";
import AdminRoute from "./components/routes/AdminRoute";
import Login from "./components/Login";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/perfiladm" element={<PerfilADM />} /> {/* ✅ Adicionada */}
          <Route path="/eventos/meus/inscritos" element={<MeusEventos />} />
          <Route path="/eventos" element={<ExplorarEventos />} />
          <Route path="/jogajunto" element={<JogaJunto />} />
          <Route path="/voluntarios" element={<Voluntarios />} />
          <Route path="/doacao" element={<Doacao />} />
          <Route path="/login" element={<Login />} />

          {/* Rota da página da loja */}
          <Route path="/camisa10" element={<Camisa10 />} />

          {/* Rotas admin protegidas */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <PerfilADM />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/eventos"
            element={
              <AdminRoute>
                <EventosLista />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/eventos/novo"
            element={
              <AdminRoute>
                <EventosNovo />
              </AdminRoute>
            }
          />

          {/* Página 404 */}
          <Route
            path="*"
            element={<div style={{ padding: 24 }}>Página não encontrada</div>}
          />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}
