import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
    try {
        const { id }= params;
        const user = await prisma.users.findUnique({
            where: {
                id
            }
        });
        if (!user){
            NextResponse.json(
                {message: "User not found",err},
                {status: 404}
                );
        }

        return NextResponse.json(user);
    } catch(err){
        return NextResponse.json({ message: "GET Error", err}, { status: 500});
    }
}

/**************************************
 * editing/ updateing user attributes *
 **************************************/
export const PATCH = async (request, {params}) => {
    try {
        const body = await request.json();
        const {username, password, userType, email, address, city, phone, photo} = body;

        const {id} = params;

        const updateUser = await prisma.users.update({
            where: {
                id
            },
            data: {
                username,
                password,
                userType,
                email,
                address,
                city,
                phone,
                photo
            }
        })

        if(!updateUser) {
            return NextResponse.json(
                {message: "User not found", err},
                {status: 404}
            )
        }

        return NextResponse.json(updateUser);

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
  
      await prisma.users.delete({
          where: {
              id
          }
      });
  
      return NextResponse.json("User has been deleted");
    } catch (err) {
      return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
    }
  };