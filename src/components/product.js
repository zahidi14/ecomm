"use client";

import { useContext, useState } from "react";
import React from "react";
import Link from "next/link";
import { CartContext, useCart } from "@/context/cartContext";
import StarRating from "./misc/stars";
import Image from "next/image";

export default function Product() {
  const { loading, product, error, cart, count, lastVisible, loadMore } =
    useContext(CartContext);
  const { state, dispatch } = useCart();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error : {error}</div>;
  }

  const addToCart = (product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { title: product.title, price: product.price },
    });
  };

  return (
    <div className=" py-4 mx-auto lg:max-w-7xl sm:max-w-full bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((prod) => (
          <div
            key={prod.iid}
            className="bg-gray-50 shadow-md overflow-hidden rounded-lg cursor-pointer hover:-translate-y-2 transition-all relative pb-4"
          >
            <Link href={`/product/${prod.iid}`}>
              <div className="bg-gray-100 w-10 h-10 flex items-center justify-center rounded-full cursor-pointer absolute top-3 right-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16px"
                  className="fill-gray-800 inline-block"
                  viewBox="0 0 64 64"
                >
                  <path
                    d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                    data-original="#000000"
                  />
                </svg>
              </div>
              <div className="w-5/6 h-[260px] p-4 overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                <Image
                  src={prod.thumbnail}
                  alt="Product 1"
                  className="h-full w-full object-contain"
                  width={500}
                  height={500}
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-lg font-bold text-gray-800">
                  {prod.title}
                </h3>
                <h4 className="text-lg text-gray-800 font-bold mt-2">
                  ${prod.price}
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  <StarRating rating={prod.rating} />
                </p>
              </div>
            </Link>
            <div className="flex flex-col items-center justify-center ">
              <button
                type="button"
                className="min-w-[150px] px-6 py-3.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => addToCart(prod)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
        ;
      </div>
      {!loading && (
        <button
          onClick={loadMore}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-8 mb-8"
        >
          Load More
        </button>
      )}
    </div>
  );
}
