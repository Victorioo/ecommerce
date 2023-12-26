"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";

function Product({
  title,
  category,
  image,
  price,
  children,
}: {
  title: string;
  category: string;
  image: string;
  price: number;
  children?: JSX.Element
}) {
  return (
    <div
      className="bg-indigo-500 px-6 py-6 flex flex-col items-start justify-center gap-4 rounded-lg shadow-2xl"
    >
      <h1 className="text-md">{title}</h1>
      <img
        src={image || ""}
        alt="locuras"
        width={100}
        height={100}
        className="w-full h-52 object-cover"
      />
      <h2 className="text-md text-gray-300">{category}</h2>
      <span className="text-lg">${price}</span>
      {children}
    </div>
  );
}
export default Product;
