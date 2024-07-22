// app/product/[iid]/page.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import StarRating from "@/components/misc/stars";
import { Review } from "@/components/misc/review";
import Image from "next/image";

async function fetchProduct(iid) {
  const docRef = doc(db, "products", iid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("Product not found");
  }

  return docSnap.data();
}

export default async function ProductPage({ params }) {
  const product = await fetchProduct(params.iid);

  return (
    <div className="font-sans bg-white">
      <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
        <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
          <div className="w-full lg:sticky top-0 sm:flex gap-2">
            <Image
              width={500}
              height={500}
              src={product.thumbnail}
              alt="Product"
              className="w-4/5 rounded-md object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {product.title}
            </h2>
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="text-gray-800 text-xl font-bold">
                ${product.price}
              </p>
            </div>
            <StarRating rating={product.rating} />

            <button
              type="button"
              className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md"
            >
              Add to cart
            </button>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Description</h3>
              <p className="text-gray-800">{product.description}</p>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-800">Reviews</h3>
              {product.reviews.map((rev) => (
                <div key={rev.id}>
                  <Review
                    comment={rev.comment}
                    rating={rev.rating}
                    reviewerName={rev.reviewerName}
                  />
                </div>
              ))}
              <button
                type="button"
                className="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent text-gray-800 text-sm font-semibold rounded-md"
              >
                Read all reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
