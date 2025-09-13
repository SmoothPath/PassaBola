import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.isAdmin;
  return isAdmin ? children : <Navigate to="/" replace />;
}
