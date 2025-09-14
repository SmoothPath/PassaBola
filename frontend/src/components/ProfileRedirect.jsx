import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";  // <-- CORRIGIDO
import Perfil from "../pages/Perfil";              // <-- CORRIGIDO
import PerfilADM from "../pages/PerfilADM";        // <-- CORRIGIDO

export default function ProfileRedirect() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "admin") {
    return <PerfilADM />;
  }

  return <Perfil />;
}
