import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Handle GET requests for a specific review by ID
export const GET = async (request) => {
  try {
    const { id } = request.params;

    // Fetch review by ID
    const review = await prisma.review.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Handle POST requests for a specific review by ID
export const POST = async (request) => {
  try {
    const { id } = request.params;
    const body = await request.json();
    const { rating, review } = body;

    // Fetch existing review data
    const existingReview = await prisma.review.findUnique({
      where: { id: parseInt(id, 10) },
    });

    // Update review with new rating and review
    const updatedReview = await prisma.review.update({
      where: { id: parseInt(id, 10) },
      data: {
        rating: [...existingReview.rating, rating],
        review: [...existingReview.review, review],
      },
    });

    // Respond with the updated review data
    return NextResponse.json(updatedReview);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
