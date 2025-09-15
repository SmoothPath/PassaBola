import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Componentes fixos
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Páginas
import Home from "./pages/Home";
import PerfilADM from "./pages/PerfilADM";
import EventosLista from "./pages/EventosLista";
import EventosNovo from "./pages/EventosNovo";
import JogaJunto from "./pages/JogaJunto";
import MeusEventos from "./pages/MeusEventos";
import ExplorarEventos from "./pages/ExplorarEventos";
import EventoDetalhes from "./pages/EventoDetalhes";
import Voluntarios from "./pages/Voluntarios";
import Doacao from "./pages/Doacao";
import Camisa10 from "./pages/Camisa10";
import CartPage from "./pages/CartPage"; // nova página do carrinho

// Contextos e rotas protegidas
import { AuthProvider } from "./components/contexts/AuthContext";
import { CartProvider } from "./components/contexts/CartContext"; // contexto do carrinho
import AdminRoute from "./components/routes/AdminRoute";
import Login from "./components/Login";
import ProfileRedirect from "./components/ProfileRedirect";

// Componente para resetar scroll ao mudar rota
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider> {/* Contexto do carrinho disponível na app inteira */}
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/perfil" element={<ProfileRedirect />} />
            <Route path="/perfiladm" element={<PerfilADM />} />
            <Route path="/eventos/meus/inscritos" element={<MeusEventos />} />
            <Route path="/eventos/:id" element={<EventoDetalhes />} />
            <Route path="/eventos" element={<ExplorarEventos />} />
            <Route path="/jogajunto" element={<JogaJunto />} />
            <Route path="/voluntarios" element={<Voluntarios />} />
            <Route path="/doacao" element={<Doacao />} />
            <Route path="/login" element={<Login />} />
            <Route path="/camisa10" element={<Camisa10 />} />
            <Route path="/carrinho" element={<CartPage />} /> {/* Rota do carrinho */}

            {/* Rotas protegidas para admin */}
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
      </CartProvider>
    </AuthProvider>
  );
}
