import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  const isAdmin = user?.role === "admin" || user?.isAdmin;

  // Enquanto o estado de autenticação está carregando, não renderiza nada
  if (loading) return null;

  // Se não for admin, redireciona para a página inicial
  return isAdmin ? children : <Navigate to="/" replace />;
}
