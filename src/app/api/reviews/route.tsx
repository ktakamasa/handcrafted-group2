import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Handle GET requests
export const GET = async (request) => {
  try {
    // Fetch all reviews
    const reviews = await prisma.review.findMany();
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Handle POST requests
export const POST = async (request) => {
  try {
    const body = await request.json();
    const { itemId, rating, review } = body;

    // Fetch existing item data
    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
    });

    // Update item with new ratings and reviews
    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        ratings: [...existingItem.ratings, rating],
        reviews: [...existingItem.reviews, review],
      },
    });

    // Respond with the updated item data
    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
