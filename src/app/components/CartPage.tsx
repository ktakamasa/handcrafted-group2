import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCartItems);
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center border-b border-gray-300 py-2"
            >
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  width={50}
                  height={50}
                  alt={item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>
              <div className="flex-grow ml-4">
                <p className="font-semibold">{item.name}</p>
                <p className="font-light">{item.seller}</p>
              </div>
              <div className="text-right">
                <p>Price: ${item.price.toFixed(2)}</p>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <p className="font-semibold">
              Order Total: ${calculateTotal().toFixed(2)}
            </p>
          </div>
          <div className="mt-8">
            <a href="/checkout" className="bg-blue-500 text-white p-2 rounded">
              Proceed to Checkout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
