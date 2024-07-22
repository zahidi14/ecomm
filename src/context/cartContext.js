"use client";

import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useReducer } from "react";

const initState = {
  product: [],
  loading: true,
  error: null,
  cart: [],
  count: 0,
  lastVisible: null,
};

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        count: state.count + 1,
      };
    case "FETCH_INIT":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        product: [...state.product, ...action.payload.products],
        lastVisible: action.payload.lastVisible,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const GetProduct = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  const pageSize = 8;

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const q = query(collection(db, "products"), orderBy("title"), limit(4));
      const snap = await getDocs(q);
      const products = snap.docs.map((doc) => ({
        iid: doc.id,
        ...doc.data(),
      }));
      const lastVisible = snap.docs[snap.docs.length - 1];
      dispatch({ type: "FETCH_SUCCESS", payload: { products, lastVisible } });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  };

  const loadMore = async () => {
    if (!state.lastVisible) return;
    dispatch({ type: "FETCH_INIT" });
    try {
      const q = query(
        collection(db, "products"),
        orderBy("title"),
        startAfter(state.lastVisible),
        limit(4)
      );
      const snap = await getDocs(q);
      const products = snap.docs.map((doc) => ({
        iid: doc.id,
        ...doc.data(),
      }));
      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          products: products,
          lastVisible: snap.docs[snap.docs.length - 1],
        },
      });
    } catch (error) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  };

  return (
    <CartContext.Provider value={{ ...state, dispatch, loadMore }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
