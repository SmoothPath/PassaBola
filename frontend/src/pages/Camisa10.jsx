import React from "react";
import PageWrapper from "../components/PageWrapper";
import { useCart } from "../components/contexts/CartContext";

const produtos = [
  { id: 1, nome: "Camisa 10 - Passa a Bola", imagem: "/assets/camisa10.jpg", preco: 120.0 },
  { id: 2, nome: "Camisa Oficial Feminina", imagem: "/assets/camisa-oficial.jpg", preco: 150.0 },
  { id: 3, nome: "Camisa Treino", imagem: "/assets/camisa-treino.jpg", preco: 100.0 },
  { id: 4, nome: "Munhequeira", imagem: "/assets/munhequeira.jpg", preco: 50.0 },
  { id: 5, nome: "Garrafa", imagem: "/assets/garrafa.jpg", preco: 80.0 },
  { id: 6, nome: "Par de Meiões", imagem: "/assets/meiao.jpg", preco: 60.0 },
];

export default function Camisa10() {
  const { addToCart } = useCart();

  return (
    <PageWrapper>
      <h1 className="text-3xl font-extrabold text-center mb-8 text-purple-900">
        Loja Camisa 10 
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl mb-4">
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-60 object-contain transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/200x150.png?text=Imagem+Indispon%C3%ADvel";
                }}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">{produto.nome}</h3>
            <p className="text-xl font-bold text-purple-600 mb-4">R$ {produto.preco.toFixed(2)}</p>
            <button
              onClick={() => addToCart(produto)}
              className="bg-purple-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-xl transition-all duration-300"
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
