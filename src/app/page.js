"use client";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Link from "next/link";

// Function to fetch initial data
const fetchInitialData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));
    const productsData = querySnapshot.docs.map((doc) => ({
      iid: doc.id,
      ...doc.data(),
    }));
    console.log("Initial data fetched:", productsData);
    return productsData;
  } catch (error) {
    console.log("Error fetching initial products:", error);
    return [];
  }
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const initialData = await fetchInitialData();
      setProducts(initialData);
      setLoading(false);

      try {
        const querySnapshot = await getDocs(collection(db, "product"));
        const productsData = querySnapshot.docs.map((doc) => ({
          iid: doc.id,
          ...doc.data(),
        }));
        console.log("test", productsData);
        setProducts(productsData);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
    console.log(products);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.iid}>
              <Link href={`/product/${product.iid}`}>
                {/* // <a
            //  
            //   href={`/product/${product.iid}`}
            //   className="group"
            // > */}

                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 h-80 w-xs">
                  <img
                    src={product.image}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {product.price}
                </p>
              </Link>
              {/* // </a> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
