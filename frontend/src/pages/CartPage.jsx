// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../components/contexts/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-6 text-center">Seu Carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-gray-200 rounded-xl p-4 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <strong className="text-lg text-gray-800">{item.nome}</strong>
                <p className="text-purple-600 font-semibold">R$ {item.preco.toFixed(2)}</p>
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
    </div>
  );
}
