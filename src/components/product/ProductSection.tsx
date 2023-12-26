/* eslint-disable @next/next/no-img-element */
"use client";
import { ProductTypes } from "./types";
import Product from "../../components/product/Product";
import React, { useEffect, useState } from "react";
import { data } from "../../api";
import CheckoutButton from "../checkout/checkout-btn";
import { FaCartShopping } from "react-icons/fa6";

function ProductSection() {
  const [cart, setCart] = useState<ProductTypes[]>([]);
  const [productsList, setProductsList] = useState<Object[]>([]);
  const [cartState, setCartState] = useState(false);
  const addToCart = (product: ProductTypes) => {
    setCart((prev) => [...prev, product]);
    const productIndex = cart.findIndex(
      (element) => element.title === product.title
    );

    // Si productIndex es diferente a -1,
    if (productIndex !== -1) {
      const newCart = [...cart];
      newCart[productIndex].quantity += 1;
      setCart(newCart);
    }
  };

  const totalPrice = () => {
    if (cart.length == 0) return;
    const cartTotalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return cartTotalPrice || 0;
  };

  const deleteCartItem = (item: string) => {
    const filteredArray: ProductTypes[] = cart.filter(
      (element) => element.title !== item
    );
    setCart(filteredArray);
  };

  useEffect(() => {
    const ProductMap = async () => {
      const productsList = await data();
      return productsList;
    };

    ProductMap()
      .then((data) => {
        setProductsList(data);
      })
      .catch((error) => console.log(error));

    totalPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const CartItemComponent = ({
    title,
    image,
    price,
    quantity,
  }: {
    title: string;
    image: string;
    price: number;
    quantity: number;
  }) => {
    return (
      <li className="bg-slate-950 px-4 py-2 flex items-center justify-between w-full gap-4 rounded-xl">
        <img
          src={image}
          alt={`Product image on cart of ${title}`}
          className="w-14 h-14 object-cover rounded-full"
        />
        <div className="flex flex-col items-start justify-between">
          <h1 className="overflow-ellipsis font-semibold w-[20ch] whitespace-nowrap overflow-hidden">
            {title}
          </h1>
          <span>${price}</span>
          <span>Cantidad: {quantity} </span>
        </div>
        <button
          className="bg-red-500 px-4 py-1 rounded-full"
          onClick={() => deleteCartItem(title)}
        >
          Quitar
        </button>
      </li>
    );
  };

  return (
    <>
      <button
        className="fixed bottom-10 bg-[#1f2937] backdrop-blur-xl px-14 py-2 rounded-full text-white font-semibold flex items-center justify-center gap-4 border-2 border-white"
        onClick={() => setCartState(!cartState)}
      >
        {cart.length}<FaCartShopping className="w-6 h-6" />
      </button>
      {cartState ? (
        <section className="bg-gray-800 flex flex-col items-center justify-between fixed -top-2 left-0 p-5 rounded-2xl min-w-96 gap-4">
          <ul className="flex flex-col items-center justify-start gap-2 overflow-y-auto h-[50vh]">
            {cart.map((item, key) => {
              const { title, price, image, quantity } = item as ProductTypes;
              return (
                <CartItemComponent
                  key={key}
                  title={title}
                  price={price}
                  image={image}
                  quantity={quantity}
                ></CartItemComponent>
              );
            })}
          </ul>
          <div className="flex items-center justify-between w-full px-4 py-2 font-semibold">
            <span className="text-md">Total:</span>
            <span className="text-md">$ {totalPrice() || 0}</span>
          </div>
          {cart.length !== 0 ? (
            <CheckoutButton array={cart} totalPrice={totalPrice() || 0} />
          ) : null}
        </section>
      ) : null}

      <article className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {productsList &&
          productsList.map((product, key) => {
            const { title, category, price, image } = product as ProductTypes;

            return (
              <Product
                key={key}
                title={title}
                category={category}
                price={price}
                image={image}
              >
                <button
                  className="w-full bg-black px-4 py-2 rounded-md hover:bg-neutral-800 transition-all buttoneitor"
                  onClick={() =>
                    addToCart({
                      title: title,
                      price: price,
                      image: image,
                      quantity: 1,
                      category: category,
                    })
                  }
                >
                  Añadir al carrito
                </button>
              </Product>
            );
          })}
      </article>
    </>
  );
}

export default ProductSection;
