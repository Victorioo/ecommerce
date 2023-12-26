"use client";
import React from "react";
import { SiWhatsapp } from "react-icons/si";
import { ProductTypes } from "../product/types";

const createCheckout = (array: ProductTypes[], totalPrice: Number) => {
  const texto: Array<String> = [];

  array.forEach((item) => {
    const { title, quantity, price } = item;
    texto.push(`${quantity} ${title} - $${price}`);
  });

  const textoFinal = `¡Hola!, quería pedirte: %0A${texto.join(
    "%0A"
  )} %0A %0A Total: $${totalPrice}%0A ¡Muchas Gracias!`;
  window.location.href = "https://wa.me/5493518794304?text=" + textoFinal;
  console.log(textoFinal);
  return textoFinal;
};

function CheckoutButton({
  array,
  totalPrice,
}: {
  array: ProductTypes[];
  totalPrice: Number;
}) {
  return (
    <button
      className="bg-green-700 w-[80%] rounded-full shadow-2xl flex items-center py-2 justify-center text-md gap-4 underline underline-offset-4"
      onClick={() => createCheckout(array, totalPrice)}
    >
      <SiWhatsapp className="w-5 h-5" /> Confirmar pedido
    </button>
  );
}

export default CheckoutButton;
