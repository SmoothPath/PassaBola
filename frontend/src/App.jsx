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

// Páginas principais
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
import CartPage from "./pages/CartPage";
import Parceiros from "./pages/Parceiros";

// Páginas de voluntários
import QueroSer from "./pages/Voluntarios/QueroSer";
import Oportunidades from "./pages/Voluntarios/Oportunidades";
import Historias from "./pages/Voluntarios/Historias";
import ComoFunciona from "./pages/Voluntarios/ComoFunciona";
import FAQ from "./pages/Voluntarios/FAQ";
import Contato from "./pages/Voluntarios/Contato";

// Contextos e rotas protegidas
import { AuthProvider } from "./components/contexts/AuthContext";
import { CartProvider } from "./components/contexts/CartContext";
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
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Navbar />
          <Routes>
            {/* Rotas principais */}
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
            <Route path="/carrinho" element={<CartPage />} />
             <Route path="/parceiros" element={<Parceiros/>} />

            {/* Rotas voluntários */}
            <Route path="/voluntarios/quero-ser" element={<QueroSer />} />
            <Route path="/voluntarios/oportunidades" element={<Oportunidades />} />
            <Route path="/voluntarios/historias" element={<Historias />} />
            <Route path="/voluntarios/como-funciona" element={<ComoFunciona />} />
            <Route path="/voluntarios/faq" element={<FAQ />} />
            <Route path="/voluntarios/contato" element={<Contato />} />

            {/* Rotas protegidas - admin */}
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
