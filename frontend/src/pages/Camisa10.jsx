import React from "react";
import PageWrapper from "../components/PageWrapper";

const produtos = [
  {
    id: 1,
    nome: "Camisa 10 - Passa a Bola",
    imagem: "https://i.imgur.com/3zFqZQX.png",
    preco: 120.0,
  },
  {
    id: 2,
    nome: "Camisa Oficial Feminina",
    imagem: "https://i.imgur.com/7tY1Hhe.png",
    preco: 150.0,
  },
  {
    id: 3,
    nome: "Camisa Treino",
    imagem: "https://i.imgur.com/MIjh98u.png",
    preco: 100.0,
  },
  {
    id: 4,
    nome: "Munhequeira",
    imagem: "https://via.placeholder.com/200x150.png?text=Munhequeira",
    preco: 50.0,
  },
  {
    id: 5,
    nome: "Garrafa",
    imagem: "https://via.placeholder.com/200x150.png?text=Garrafa",
    preco: 80.0,
  },
  {
    id: 6,
    nome: "Tornozeleira",
    imagem: "https://via.placeholder.com/200x150.png?text=Tornozeleira",
    preco: 60.0,
  },
];

export default function Camisa10() {
  return (
    <PageWrapper>
      <h1 style={{ marginBottom: 20 }}>Loja Camisa 10 – Passa a Bola</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 10,
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              style={{
                width: "100%",
                height: 150,
                objectFit: "cover",
                borderRadius: 4,
              }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/200x150.png?text=Imagem+Indisponível";
              }}
            />
            <h3 style={{ margin: "10px 0" }}>{produto.nome}</h3>
            <p>R$ {produto.preco.toFixed(2)}</p>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: 4,
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: 10,
              }}
              onClick={() =>
                alert(`Produto ${produto.nome} adicionado ao carrinho!`)
              }
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
