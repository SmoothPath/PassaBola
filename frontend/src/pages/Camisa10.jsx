import React from "react";
import PageWrapper from "../components/PageWrapper";
import { useCart } from "../components/contexts/CartContext"; // ✅ Importa o contexto do carrinho

const produtos = [
  {
    id: 1,
    nome: "Camisa 10 - Passa a Bola",
    imagem: "/assets/camisa10.png.jpg",
    preco: 120.0,
  },
  {
    id: 2,
    nome: "Camisa Oficial Feminina",
    imagem: "/assets/camisa-oficial.png.jpg",
    preco: 150.0,
  },
  {
    id: 3,
    nome: "Camisa Treino",
    imagem: "/assets/camisa-treino.png.jpg",
    preco: 100.0,
  },
  {
    id: 4,
    nome: "Munhequeira",
    imagem: "/assets/munhequeira.png.jpg",
    preco: 50.0,
  },
  {
    id: 5,
    nome: "Garrafa",
    imagem: "/assets/garrafa.png.jpg",
    preco: 80.0,
  },
  {
    id: 6,
    nome: "Par de Meiões",
    imagem: "/assets/meiao.png.jpg",
    preco: 60.0,
  },
];

export default function Camisa10() {
  const { addToCart } = useCart(); // ✅ Pega função do contexto

  return (
    <PageWrapper>
      <h1 style={{ marginBottom: 20, textAlign: "center" }}>
        Loja Camisa 10 – Passa a Bola
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 20px",
        }}
      >
        {produtos.map((produto) => (
          <div
            key={produto.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 10,
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
              transition: "transform 0.3s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <img
              src={produto.imagem}
              alt={produto.nome}
              style={{
                width: "100%",
                height: 220,
                objectFit: "contain",
                borderRadius: 8,
                marginBottom: 10,
              }}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/200x150.png?text=Imagem+Indisponível";
              }}
            />
            <h3 style={{ margin: "10px 0", fontWeight: "600" }}>
              {produto.nome}
            </h3>
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#7D1FA6",
              }}
            >
              R$ {produto.preco.toFixed(2)}
            </p>
            <button
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: 6,
                cursor: "pointer",
                fontWeight: "bold",
                marginTop: 10,
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = "#0056b3")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#007bff")
              }
              onClick={() => addToCart(produto)} // ✅ Agora adiciona ao carrinho real
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
