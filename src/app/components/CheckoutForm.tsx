import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function CheckoutForm() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    fname: "",
    lname: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiration: "",
    code: "",
  });

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 25.0,
    taxRate: 0.07,
    tax: 0,
    orderTotal: 0,
  });

  useEffect(() => {
    const calculateOrderSummary = (items) => {
      const subtotal = items.reduce((total, item) => total + item.price, 0);
      const tax = subtotal * orderSummary.taxRate;
      const orderTotal = subtotal + orderSummary.shipping + tax;

      setOrderSummary({
        subtotal,
        shipping: orderSummary.shipping,
        tax,
        orderTotal,
      });
    };

    if (typeof window !== "undefined") {
      const storedCartItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCartItems);
      calculateOrderSummary(storedCartItems);
    }
  }, [orderSummary.taxRate, orderSummary.shipping]); // Include dependencies of calculateOrderSummary in the dependency array

  const handleShippingChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  return (
    <section className="max-w-4xl mx-auto p-8">
      <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <fieldset className="border border-solid border-black p-4">
          <legend className="text-lg font-semibold">
            Shipping Information
          </legend>
          <div className="mb-4">
            <label htmlFor="fname" className="block mb-2">
              First Name:
            </label>
            <input
              id="fname"
              name="fname"
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lname" className="block mb-2">
              Last Name:
            </label>
            <input
              id="lname"
              name="lname"
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="street" className="block mb-2">
              Street Address:
            </label>
            <input
              id="street"
              name="street"
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="city" className="block mb-2">
                City:
              </label>
              <input
                id="city"
                name="city"
                className="w-full p-2 border"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="block mb-2">
                State:
              </label>
              <input
                id="state"
                name="state"
                className="w-full p-2 border"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="zip" className="block mb-2">
              Zip Code:
            </label>
            <input
              id="zip"
              name="zip"
              className="w-full p-2 border"
              required
              pattern="(^\d{5}$)|(^\d{5}-\d{4}$)"
            />
          </div>
        </fieldset>

        {/* Payment Information */}
        <fieldset className="border border-solid border-black p-4">
          <legend className="text-lg font-semibold">Payment Information</legend>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block mb-2">
              Card Number:
            </label>
            <input
              id="cardNumber"
              name="cardNumber"
              className="w-full p-2 border"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="expiration" className="block mb-2">
                Expiration:
              </label>
              <input
                id="expiration"
                name="expiration"
                className="w-full p-2 border"
                required
                pattern="^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="code" className="block mb-2">
                Security Code:
              </label>
              <input
                id="code"
                name="code"
                className="w-full p-2 border"
                required
                pattern="^[0-9]{3,4}$"
              />
            </div>
          </div>
        </fieldset>

        {/* Order Items */}
        <fieldset className="border border-solid border-black p-4 col-span-2">
          <legend className="text-lg font-semibold">Order Items</legend>
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
              </div>
            </div>
          ))}
        </fieldset>

        {/* Order Summary */}
        <fieldset className="border border-solid border-black p-4 col-span-2">
          <legend className="text-lg font-semibold">Order Summary</legend>
          <p className="mb-2">Subtotal: ${orderSummary.subtotal.toFixed(2)}</p>
          <p className="mb-2">
            Shipping Estimate: ${orderSummary.shipping.toFixed(2)}
          </p>
          <p className="mb-2">Tax: ${orderSummary.tax.toFixed(2)}</p>
          <p className="text-xl font-semibold">
            Order Total: ${orderSummary.orderTotal.toFixed(2)}
          </p>
        </fieldset>

        {/* Checkout Button */}
        <button
          id="checkoutSubmit"
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Checkout
        </button>
      </form>
    </section>
  );
}
