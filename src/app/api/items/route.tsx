import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

// Define a helper function to disconnect the Prisma Client after database operations
const disconnectPrisma = async () => {
  if (prisma.$disconnect) {
    await prisma.$disconnect();
  }
};

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { item, seller, imgUrl, description, price, qty } = body;

    // Perform the database operation
    const newItem = await prisma.item.create({
      data: {
        item,
        seller,
        imgUrl,
        description,
        price,
        qty,
      },
    });

    // Disconnect the Prisma Client after the operation
    await disconnectPrisma();

    // Return the result as a JSON response
    return NextResponse.json(newItem);
  } catch (err) {
    // Log the error
    console.error("POST Error:", err);

    // Disconnect the Prisma Client in case of an error
    await disconnectPrisma();

    // Return a JSON response with a 500 status code
    return NextResponse.json(
      { message: "POST Error", error: err },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    // Perform the database operation
    const items = await prisma.item.findMany();

    // Disconnect the Prisma Client after the operation
    await disconnectPrisma();

    // Return the result as a JSON response
    return NextResponse.json(items);
  } catch (err) {
    // Log the error
    console.error("GET Error:", err);

    // Disconnect the Prisma Client in case of an error
    await disconnectPrisma();

    // Return a JSON response with a 500 status code
    return NextResponse.json(
      { message: "GET Error", error: err },
      { status: 500 }
    );
  }
};
