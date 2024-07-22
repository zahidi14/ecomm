import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Product from "@/components/product";
import { CartProvider, GetProduct } from "@/context/cartContext";

// Function to fetch initial data

export default function Home({ children }) {
  return <Product />;
}
