import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Product from "@/components/product";

// Function to fetch initial data

export default function Home() {
  return (
    <div>
      <Navbar />

      <Product />
      <Footer />
    </div>
  );
}
