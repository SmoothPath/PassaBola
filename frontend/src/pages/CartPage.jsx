// src/pages/CartPage.jsx
import React, { useState } from "react";
import { useCart } from "../components/contexts/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">
        Seu Carrinho
      </h1>

      {/* Botão para abrir modal */}
      {/* <button
        onClick={() => setModalOpen(true)}
        className="bg-violet-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-violet-700 transition"
      >
        Ver Itens no Carrinho ({cart.length})
      </button> */}

      {/* Modal */}
      {/* {modalOpen && (
        <> */}
      {/* Fundo escuro */}
      {/* <div
        onClick={() => setModalOpen(false)}
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div> */}

      {/* Conteúdo do modal */}
      <div className=" inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            Itens no Carrinho
          </h2>

          {cart.length === 0 ? (
            <p className="text-center text-gray-600">
              Seu carrinho está vazio.
            </p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 border border-gray-300 rounded-xl p-4 shadow-sm"
                >
                  <div>
                    <strong className="text-lg text-gray-800">
                      {item.nome}
                    </strong>
                    <p className="text-purple-600 font-semibold">
                      R$ {item.preco.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors duration-300"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Botão fechar */}
          <button
            onClick={() => setModalOpen(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 font-bold text-xl"
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </div>
      </div>
      {/* </> */}
      {/* // )} */}
    </div>
  );
}
