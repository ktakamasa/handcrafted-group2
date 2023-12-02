import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

require("dotenv").config();

// Generate a secure key for JWT signing
const generateJwtSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const jwtSecretKey = process.env.JWT_SECRET_KEY || generateJwtSecretKey();

export const POST = async (request: any) => {
  try {
    const body = await request.json();
    const { username, password, userType, email, address, city, phone, photo } = body;

    // Hash the password using bcrypt
    //const hashedPassword = await bcrypt.hash(password, 10);

    const newItem = await prisma.users.create({
      data: {
        username,
        password, //: hashedPassword,
        userType,
        email,
        address,
        city,
        phone,
        photo

      },
    });

    // Generate a token for the newly registered user
    const token = jwt.sign({ username: newItem.username }, jwtSecretKey, {
      expiresIn: "1h",
    });

    // Return the new user and the token in the response
    return NextResponse.json({ user: newItem, token });
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const Items = await prisma.users.findMany();

    return NextResponse.json(Items);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};
