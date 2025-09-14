import React from "react";

export default function VoltarButton() {
  const handleVoltar = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleVoltar}
      style={{
        padding: "8px 12px",
        borderRadius: "4px",
        border: "none",
        backgroundColor: "#007bff",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "bold",
        marginBottom: "20px",
      }}
    >
      Voltar
    </button>
  );
}
