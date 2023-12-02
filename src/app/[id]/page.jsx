/* eslint-disable @next/next/no-async-client-component */
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

async function getData(id) {
  const res = await fetch(
    `https://handcrafted-group2.vercel.app/api/items/${id}`
  );
  if (!res.ok) {
    throw new Error(`Error fetching data for item ${id}`);
  }
  return res.json();
}

export default function ItemDetails({ params }) {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [data, setData] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const id = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(id);
        setData(result);
      } catch (error) {}
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    // Check if the item has been added to the cart
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const isItemAdded = existingCart.some((item) => item.name === data?.item);

    setIsAddedToCart(isItemAdded);
  }, [data]);

  const addToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    // Check if the item is already in the cart
    const isItemAdded = existingCart.some((item) => item.name === data?.item);

    if (!isItemAdded) {
      // Add the current item to the cart
      existingCart.push({
        name: data?.item,
        price: data?.price,
        seller: data?.seller,
        image: data?.imgUrl,
      });

      // Save the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
      setIsAddedToCart(true);
    }
  };

  const submitReview = async () => {
    // Check if the selectedRating is 0 (no stars selected)
    if (selectedRating === 0) {
      setErrorMessage("Please select a rating before submitting the review.");
      return;
    }

    try {
      const response = await fetch(
        "https://handcrafted-group2.vercel.app/api/reviews",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: data?.id,
            rating: selectedRating,
            review,
          }),
        }
      );

      if (response.ok) {
        // Refresh the data after submitting the review
        const updatedData = await getData(id);
        setData(updatedData);
        setSelectedRating(0);
        setReview("");
        setErrorMessage(""); // Clear the error message on successful submission
      } else {
        console.error("Error submitting review");
        setErrorMessage("Error submitting review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review", error.message);
      setErrorMessage("Error submitting review. Please try again.");
    }
  };

  const calculateAverageRating = () => {
    if (data?.ratings && data.ratings.length > 0) {
      const totalRating = data.ratings.reduce((sum, rating) => sum + rating, 0);
      return totalRating / data.ratings.length;
    }
    return 0; // Default to 0 if there are no ratings
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row bg-gray-100 p-4 shadow-md">
        <div className="md:w-1/2 mb-4 md:mb-0">
          <Image
            src={data?.imgUrl}
            width={500}
            height={500}
            alt={`Picture of the ${data?.item}`}
            className="rounded-md"
          />
        </div>
        <div className="md:w-1/2 md:pl-4">
          <h1 className="text-2xl font-bold mb-2">{data?.item}</h1>
          <p className="mb-2 text-gray-600">{data?.seller}</p>
          <p className="mb-2 text-gray-800">{data?.description}</p>
          <p className="mb-4 font-bold">${data?.price}</p>
          <button
            onClick={addToCart}
            className={`bg-blue-500 text-white py-2 px-4 rounded-md ml-auto ${
              isAddedToCart && "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={isAddedToCart}
          >
            {isAddedToCart ? "Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="mt-5 bg-gray-100 p-2">
        <h2 className="text-xl font-bold mb-2">Leave a Rating and Review</h2>
        {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}
        <div className="flex items-center mb-2">
          <p className="mr-2">Rating:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setSelectedRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`cursor-pointer text-3xl ${
                star <= hoverRating
                  ? "text-yellow-500"
                  : selectedRating >= star
                  ? "text-yellow-500"
                  : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <div className="flex items-center mb-2">
          <p className="mr-2">Average Rating:</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-3xl ${
                star <= averageRating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
          <span className="ml-2 text-gray-600">{averageRating.toFixed(1)}</span>
        </div>
        <label className="block mb-2">Review:</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="border rounded-md p-2 mb-2 w-full"
        />
        <button
          onClick={submitReview}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
        >
          Submit Review
        </button>
      </div>
      <div className="bg-gray-100 p-2">
        <h2 className="text-xl font-bold mb-2">Ratings and Reviews</h2>
        {data &&
          data.ratings &&
          data.reviews &&
          data.ratings.map((rating, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center">
                <div className="mr-1 font-bold">Rating:</div>
                <div className="text-l">{rating} ★</div>
              </div>
              <div className="flex items-center">
                <div className="mr-1 font-bold">Review: </div>
                <div>{data.reviews[index]}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
