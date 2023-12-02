import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id }= params;
        const item = await prisma.item.findUnique({
            where: {
                id
            }
        });
        if (!item){
            NextResponse.json(
                {message: "Item not found",err},
                {status: 404}
                );
        }

        return NextResponse.json(item);
    } catch(err){
        return NextResponse.json({ message: "GET Error", err}, { status: 500});
    }
}

/**************************************
 * editing/ updateing item attributes *
 **************************************/
export const PATCH = async (request, {params}) => {
    try {
        const body = await request.json();
        const {item, seller, imgUrl, description, price, qty} = body;

        const {id} = params;

        const updateItem = await prisma.item.update({
            where: {
                id
            },
            data: {
                item,
                seller,
                imgUrl,
                description,
                price,
                qty
            }
        })

        if(!updateItem) {
            return NextResponse.json(
                {message: "Item not found", err},
                {status: 404}
            )
        }

        return NextResponse.json(updateItem);

    } catch(err) {
        return NextResponse.json({message: "update Error", err}, {status: 500})
    }
}
/**************************************
 * Deleting a record                  *
 **************************************/

export const DELETE = async (request, { params }) => {
    try {
      const { id } = params;
  
      await prisma.item.delete({
          where: {
              id
          }
      });
  
      return NextResponse.json("Item has been deleted");
    } catch (err) {
      return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
  };