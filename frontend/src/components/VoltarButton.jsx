import React from "react";

export default function VoltarButton() {
  function voltarPagina() {
    window.history.back();
  }

  return (
    <button
      onClick={voltarPagina}
      className="voltar-button"
      aria-label="Voltar à página anterior"
      type="button"
    >
      ← Voltar
    </button>
  );
}
