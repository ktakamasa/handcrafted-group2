import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Load environment variables from .env file
require("dotenv").config();

// Generate a secure key for JWT signing
const generateJwtSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

const jwtSecretKey = process.env.JWT_SECRET_KEY || generateJwtSecretKey();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { username, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Create and return a token or other authentication information
      const token = jwt.sign({ username: user.username }, jwtSecretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({ username: user.username, token });
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
