import { use } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

async function fetchProduct(iid) {
  const docRef = doc(db, "product", iid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Product not found");
  }

  return docSnap.data();
}

export default function ProductPage({ params }) {
  const product = use(fetchProduct(params.iid));

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: "300px" }} />
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
