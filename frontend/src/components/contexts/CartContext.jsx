import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (produto) => {
    setCart((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === produto.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === produto.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...produto, quantity: 1 }];
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
