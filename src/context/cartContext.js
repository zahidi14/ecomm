"use client";
const { createContext, useReducer, useContext } = require("react");

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, action.payload];
    case "REMOVE_CART":
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
