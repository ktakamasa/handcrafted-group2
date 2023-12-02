import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  try {
    const body = await request.json();
    const { item, seller, imgUrl, description, price, qty } = body;

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

    return NextResponse.json(newItem);
  } catch (err) {
    return NextResponse.json({ message: "P0ST Error", err }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const Items = await prisma.item.findMany();

    return NextResponse.json(Items);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};
