import React from "react";
import PageWrapper from "../components/PageWrapper";
import { useCart } from "../components/contexts/CartContext";
import { ShoppingCart, Shirt, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <div className="relative bg-gradient-to-br from-purple-50 via-white to-purple-100 min-h-screen py-16">

        {/* 🔙 Botão de voltar */}
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-purple-700 font-semibold px-5 py-2 rounded-lg border border-purple-300 hover:bg-purple-100 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={2.2} />
            Voltar
          </button>
        </div>

        {/* Cabeçalho */}
        <div className="flex flex-col items-center mb-12 px-6">
          <div className="flex items-center space-x-3 mb-3">
            <Shirt className="w-10 h-10 text-purple-700" strokeWidth={2.5} />
            <h1 className="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-indigo-600 drop-shadow-md">
              Loja <span className="text-purple-700">Camisa 10</span>
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-medium text-center max-w-xl">
            Estilo, conforto e paixão pelo jogo — encontre os melhores produtos para torcer com classe.
          </p>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="group relative bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105"
            >
              {/* Imagem centralizada e sem corte */}
              <div className="flex items-center justify-center bg-gray-50 h-72 p-4">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="max-h-full max-w-full object-contain mx-auto transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/300x300.png?text=Imagem+Indisponível';
                  }}
                />
              </div>

              {/* Conteúdo */}
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-800 transition-colors duration-300">
                  {produto.nome}
                </h3>
                <p className="text-xl font-semibold text-purple-700 mb-4">
                  R$ {produto.preco.toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(produto)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5" strokeWidth={2.2} />
                  <span>Adicionar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
