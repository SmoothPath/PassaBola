import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // <- correto a partir de /routes

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin" || user?.isAdmin;
  if (!isAdmin) return <Navigate to="/" replace />;
  return children;
}
