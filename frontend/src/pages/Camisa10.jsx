import React from "react";
import PageWrapper from "../components/PageWrapper";
import { useCart } from "../components/contexts/CartContext";
import { ShoppingCart, Shirt } from "lucide-react"; // ← Ícones importados

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
      <div className="relative bg-gradient-to-br from-purple-100 via-white to-purple-50 min-h-screen py-12">
        {/* Cabeçalho elegante */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center space-x-3 mb-3">
            <Shirt className="w-10 h-10 text-purple-700" strokeWidth={2.5} />
            <h1 className="text-4xl font-extrabold text-purple-900 tracking-wide drop-shadow-sm">
              Loja <span className="text-purple-700">Camisa 10</span>
            </h1>
          </div>
          <p className="text-gray-500 text-lg font-medium">
            Estilo, conforto e paixão pelo jogo.
          </p>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="group relative bg-white/70 backdrop-blur-md border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.03]"
            >
              {/* Imagem */}
              <div className="overflow-hidden">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200x150.png?text=Imagem+Indispon%C3%ADvel";
                  }}
                />
              </div>

              {/* Conteúdo */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-800 transition-colors duration-300">
                  {produto.nome}
                </h3>
                <p className="text-2xl font-semibold text-purple-700 mb-5">
                  R$ {produto.preco.toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(produto)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" strokeWidth={2.2} />
                  <span>Adicionar ao carrinho</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
