import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (produto) => {
    // ✅ Garantir que apenas strings e números entrem no cart
    const safeProduto = {
      ...produto,
      nome: String(produto.nome),
      preco: Number(produto.preco),
    };

    setCart((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === safeProduto.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === safeProduto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...safeProduto, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
