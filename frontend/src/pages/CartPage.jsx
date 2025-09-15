// src/pages/CartPage.jsx
import React from "react";
import { useCart } from "../components/contexts/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div style={{ padding: 20 }}>
      <h1>Seu Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} style={{ marginBottom: 10 }}>
              <strong>{item.nome}</strong> - R$ {item.preco.toFixed(2)}
              <button
                style={{ marginLeft: 10 }}
                onClick={() => removeFromCart(item.id)}
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
