"use client";
import { useEffect, useState } from "react";

async function getData() {
  const res = await fetch("/api/users");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function User({ params }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const users = await getData();
      console.log("User Data:", users); // Log user data for inspection
      const foundUser = users.find((u) => u.username === params.id);

      setUser(foundUser);
    };

    fetchData();
  }, [params.id]);

  if (!user) {
    // Loading state or user not found
    return <div>Loading...</div>;
  }

  const { userType = "", username, email, address, city } = user;

  return (
    <div className="mx-auto max-w-4xl mt-4">
      <div className="my-5 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <p className="mb-2">
            <span className="font-bold">Name:</span> {username}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {email}
          </p>
          <p className="mb-2">
            <span className="font-bold">Address:</span> {address}
          </p>
          <p>
            <span className="font-bold">City:</span> {city}
          </p>
        </div>

        {userType.toLowerCase() === "buyer" && (
          <div className="bg-blue-100 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Buyer Information</h2>
            <p>Welcome, {username}! Thank you for being a valued buyer.</p>
          </div>
        )}

        {userType.toLowerCase() === "seller" && (
          <div className="bg-green-100 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Seller Information</h2>
            <p>
              Hello, {username}! Manage your product listings and sales here.
            </p>
            {/* Add more seller-specific content as needed */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Your Products</h3>
              <div className="grid grid-cols-2 gap-4">
                {/* Sample product cards */}
                <div className="bg-gray-200 p-4 rounded-md shadow-md">
                  Product 1
                </div>
                <div className="bg-gray-200 p-4 rounded-md shadow-md">
                  Product 2
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
